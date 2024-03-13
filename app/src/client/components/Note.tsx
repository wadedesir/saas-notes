import { useState } from "react"
import { deleteNote } from "wasp/client/operations"


export default function Note({data, edit}) {
    /*
  {
    Name: 'Test Note',
    Content: 'this is a test note for our compponent',
    Author: 'Wade Desir',
    Date: '10/1/2023',
    Likes: 10
  },
    */
    const id = data.id
    const [menu, setMenu] = useState(false)
    const [pos, setPos] = useState([0,0])
  
    const showMenu = (e) => {
        setPos([e.clientY, e.clientX])
        setMenu(true)
    }

    return (
        <div className="w-full bg-blue-50 border-blue-200 dark:bg-gray-800 rounded-lg p-3 border-2 dark:border-gray-700 mb-3">
            <p className="w-full flex justify-between mb-2 dark:text-white">
                <span className="text-slate-600 dark:text-white text-md font-semi-bold">{data.title} <span className="font-thin text-xs ">{'12/13/2323 -> date'}</span></span>
                <span className="font-bold text-xl text-black dark:text-white hover:cursor-pointer hover:text-blue-500 dark:hover:text-blue-500" onClick={(e) => showMenu(e)}>...</span>
                <ContextMenu id={id} menu={menu} setMenu={setMenu} pos={pos} data={data} edit={edit}/>
            </p>
            <p className="font-thin mb-3  text-slate-400">{data.content}</p>
            <p className="w-full flex justify-between  text-slate-400 dark:text-white">
                    <span className="text-sm text-slate-600 dark:text-white">Author: <span className="font-thin text-xs">{'no author'}</span></span> 
                    <span>{0} Likes</span>
            </p>
            
        </div>
    )
}

function ContextMenu({id, menu, setMenu, pos, data, edit}) {
    
    const removeNote = async (id) => {
        try{
            await deleteNote(id)
        }catch(err){
            console.log(err)
        }
    }

    return (
    <div className={`fixed rounded-lg border bg-blue-100 border-blue-300  dark:bg-slate-600 p-3 ${menu ? 'block' : 'hidden' }`} style={{top:pos[0], left:pos[1]}}>
        <ul className="hover:cursor-pointer">
            <li onClick={() => {
                edit(data)
                setMenu(false)
            }} className="hover:text-blue-400">✏️ Edit</li>
            <li 
                onClick={() => {
                removeNote({id})
                setMenu(false)
            }}
                className="hover:text-red-500">
                    🗑️ Delete
            </li>
            <li 
                onClick={() => setMenu(false)} 
                className="hover:text-red-500">
                    ✖️ Cancel
            </li>
        </ul>
    </div>
    )
}