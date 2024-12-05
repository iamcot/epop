'use client'
import { forwardRef, useEffect, useRef } from "react"

const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
});

export default function Page() {
    const myInput = useRef(null);

    function handleClick() {
        myInput.current.focus();
    }

    useEffect(() => {
        myInput.current.focus();
    });

    return (
        <div className="p-3">
            <h1>Study about REF</h1>

            <div>
                <MyInput ref={myInput}/>
                <button onClick={handleClick} className="border rounded ml-2 pl-1 pe-1 btn btn-success">Focus</button>
            </div>
        </div>
    )
}