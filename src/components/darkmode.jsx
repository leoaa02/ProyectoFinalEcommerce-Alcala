import { useState, useEffect } from "react";


let toggle= <label htmlFor="toggle" id="label_toggle"><i className="bx bx-moon text-2xl cursor-pointer "></i></label>
const inputMode= <input type="checkbox" id="toggle" />

function modoOscuro(){
const [darkMode,setDarkMode]=useState(false)

const changeMode=()=>{
    setDarkMode(!darkMode)
}
}

export default darkMode