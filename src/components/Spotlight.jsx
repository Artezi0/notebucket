import React from "react"
import { useState } from "react"
import '../styles/app.scss'

export default function Spotlight({ notes, setActive }) {
    const [ search, setSearch ] = useState('')

    return (
        <div className='spotlight'>
            <div className='spotlight__input'>
                <input 
                    type="text" 
                    placeholder='Search' 
                    spellCheck='false' 
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className='spotlight__result'>
                <ul className="spotlight__result-list">

                </ul>
            </div>
        </div>

    )
}