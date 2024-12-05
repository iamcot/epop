import { useState } from "react"

export default function ListCam({list}) {
    
    return (<ul>
        {list.map(file => {
            return (<li key={file['Key']}>
                {file['Key']}
            </li>);
        })}
    </ul>);
}