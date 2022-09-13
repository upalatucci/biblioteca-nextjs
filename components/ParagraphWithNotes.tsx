import React from 'react'

type ParagraphWithNotesProps = {
    content: string;
    notes: string[];
}

const ParagraphWithNotes: React.FC<ParagraphWithNotesProps> = ({notes, content}) => {
  const [notesToShow, setNotesToShow] = React.useState<number[]>([])

  const onNoteClick = (e) => {

    const idNote = Number(e.target.id.replace('ref-', ''))

    if (idNote !== NaN && idNote > 0) {

        const noteIndex = idNote - 1
        console.log(notesToShow)
        console.log(noteIndex)
        console.log(notesToShow.find(n => n === noteIndex))

        e.preventDefault()

        if (notesToShow.find(n => n === noteIndex) === undefined)
            setNotesToShow([...notesToShow, noteIndex])
    }

  }

  return (
    <>
        <p dangerouslySetInnerHTML={{__html: content}} onClick={onNoteClick} />
        <div className='notes'>
            {notesToShow.sort().map(noteIndex => (
                <div key={noteIndex} className='paragraph-note'>
                    <button className='paragraph-note-x-button' onClick={() => setNotesToShow(notesToShow.filter(n => n !== noteIndex))}>X</button>
                    {noteIndex + 1} {notes[noteIndex]}
                </div>
            ))}
        </div>
    </>
  )
}

export default ParagraphWithNotes;