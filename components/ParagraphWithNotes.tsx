import classNames from "classnames";
import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type NoteProps = {
  onClose: () => void;
  note: string;
  noteIndex: number;
};

const Note: React.FC<NoteProps> = ({ onClose, note, noteIndex }) => {
  return (
    <li
      id={`note-text-${noteIndex + 1}`}
      className="relative rounded-3xl text-secondary bg-white pl-4 pr-12 py-4 mb-4 shadow-md"
    >
      <button
        className="text-primary border border-grey-500 bg-defaultBg text-xs p-1 w-7 h-7 shadow rounded-xl absolute right-4 font-sans hover:shadow-inner"
        onClick={onClose}
      >
        X
      </button>
      <span
        dangerouslySetInnerHTML={{
          __html: `<span class="n-nota">${noteIndex + 1}</span>. ${note}`,
        }}
      />
    </li>
  );
};

type ParagraphWithNotesProps = {
  content: string;
  notes: string[];
  fontSize?: string;
};

const ParagraphWithNotes: React.FC<ParagraphWithNotesProps> = ({
  notes,
  content,
  fontSize,
}) => {
  const [notesToShow, setNotesToShow] = React.useState<number[]>([]);
  const notesRef = useRef<HTMLDivElement>();

  const onNoteClick = (e) => {
    const idNote = Number(e.target.id.replace("ref-", ""));

    if (!Number.isNaN(idNote) && idNote > 0) {
      const index = idNote - 1;

      e.preventDefault();

      if (
        notesToShow.find((n) => n === index) === undefined &&
        notes?.[index]
      ) {
        setNotesToShow([...notesToShow, index]);
        notesRef.current?.focus();
      }
    }
  };

  return (
    <>
      <p
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={onNoteClick}
        className={classNames("my-4", fontSize)}
      />
      <div
        className={classNames("font-sans", { "my-4": notesToShow.length })}
        ref={notesRef}
      >
        <TransitionGroup component="ul">
          {notesToShow.sort().map((noteIndex) => (
            <CSSTransition
              timeout={500}
              classNames="fade"
              unmountOnExit
              key={noteIndex}
            >
              <Note
                key={noteIndex}
                onClose={() =>
                  setNotesToShow(notesToShow.filter((n) => n !== noteIndex))
                }
                note={notes[noteIndex]}
                noteIndex={noteIndex}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default ParagraphWithNotes;
