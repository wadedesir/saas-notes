import { useState, useEffect } from 'react'
import {createNote, updateNote, useQuery} from 'wasp/client/operations'




export default function NoteInput({display, stopEdit, data}) {
    
    let editing = data.edit ? true : false
    
    const [content, setContent] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        setName(editing ? data.title : '')
        setContent(editing ? data.content : '')
    }, [data])


    const addOrUpdate = async () => {
        let newContent = content
        let newTitle = name
        setContent('')
        setName('')
        if(!editing){
            const ret = await createNote({content: newContent, title: newTitle, like: 0})
            return
        }else{
            const ret = await updateNote({id: data.id, content: newContent, title: newTitle})
        }
        
        stopEdit()
    }

    return (
        <div className={`fixed w-full h-full left-0 top-0 z-50 ${display ? 'flex' : 'hidden' } flex-col justify-center items-center`} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}} >
            
            <div className="w-150">
                <input className="text-white w-150 bg-transparent rounded-lg mb-4" value={name} onChange={(e) => setName(e.target.value)} placeholder="Note Title"/>
            </div>
            <div>
                <textarea 
                    className="text-white w-150 h-80 bg-transparent pb-12 rounded-lg" 
                    placeholder="This is where the magic happens..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <button
                    type='button'
                    className='mx-2 min-w-[7rem] font-medium text-gray-800/90 bg-blue-200 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-white duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
                    onClick={() => stopEdit()}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className='mx-2 min-w-[7rem] font-medium text-gray-800/90 bg-blue-200 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-white duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
                    onClick={() => addOrUpdate()}
                >
                    Save
                </button>
            </div>
            
        </div>
    )
}