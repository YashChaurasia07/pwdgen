import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'
function App() {
  const [length, setLen] = useState(8)
  const [num, setNum] = useState(false);
  const [cha, setChar] = useState(false);
  const [pwd, setPwd] = useState("")

  //ref
  const pwdRef=useRef(null);
  const copyPasswordToClipboard = useCallback(()=>{
    pwdRef.current?.select()
    window.navigator.clipboard.writeText(pwd)
  }, [pwd])
  const pwdGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str += "0123456789"
    if(cha) str += "~`!@#$%^&*()"

    for(let i = 1; i<=length; i++)
    {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPwd(pass)
  }, [length, num, cha, setPwd])
  useEffect(() => {
    pwdGen()
  }, [length, num, cha, pwdGen])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>  
          <input 
            type="text"
            value={pwd}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={pwdRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 sgrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLen(e.target.value)}}
            />
            <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={num}
              id="numberInput"
              onChange={() =>{
                setNum((prev) =>!prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={cha}
              id="charInput"
              onChange={() =>{
                setChar((prev) =>!prev);
              }}
            />
            <label>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
