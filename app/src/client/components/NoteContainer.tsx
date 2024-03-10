
import { useState } from "react"
import Note from "./Note"

export default function NoteContainer({notes, display, setDisplay, edit}) {
    
    return (
        <div className="w-full">
            {/* <ContextMenu menu={menu} setMenu={setMenu}/> */}
            {notes.map(note => <Note data={note} display={display} setDisplay={setDisplay} edit={edit}/>)}
        </div>
    )
}
