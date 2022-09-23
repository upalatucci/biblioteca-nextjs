import React, { useEffect, useRef } from 'react'

type ParagraphWithNotesProps = {
    content: string;
    notes: string[];
}

const ParagraphWithNotes: React.FC<ParagraphWithNotesProps> = ({notes, content}) => {
  const [notesToShow, setNotesToShow] = React.useState<number[]>([])
  const notesRef= useRef<HTMLDivElement>()


  const onNoteClick = (e) => {

    const idNote = Number(e.target.id.replace('ref-', ''))

    if (idNote !== NaN && idNote > 0) {

        const noteIndex = idNote - 1

        e.preventDefault()

        if (notesToShow.find(n => n === noteIndex) === undefined) {
            setNotesToShow([...notesToShow, noteIndex])
            notesRef.current?.focus()
        }
    }

  }


  return (
    <>
        <p dangerouslySetInnerHTML={{__html: content}} onClick={onNoteClick} />
        <div className='font-sans my-4' ref={notesRef}>
            {notesToShow.sort().map(noteIndex => (
                <div id={`note-text-${noteIndex + 1}`} key={noteIndex} className='relative rounded-2xl text-secondary bg-defaultBg pl-4 pr-8 py-4 mb-4'>
                    <button className='text-primary text-sm p-1 py-0 shadow-md rounded-xl bg-white absolute right-4 font-sans' onClick={() => setNotesToShow(notesToShow.filter(n => n !== noteIndex))}>X</button>
                    <span  dangerouslySetInnerHTML={{__html: `${noteIndex + 1} ${notes[noteIndex]}`}} />
                </div>
            ))}
        </div>
    </>
  )
}

export default ParagraphWithNotes;