import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setLength] = useState(8);
  const [numberShow, setNumbershow] = useState(false);
  const [characterShow, setCharacterShow] = useState(false);

  const [password, setPassword] = useState("");
  const [copy , setCopy] = useState("copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijhklmnopqrstuvwxyz";

    if (numberShow) str += "0123456789";
    if (characterShow) str += "!@#$%^&*(){}_+?";

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberShow, characterShow, setPassword]);


  useEffect(() => {
    passwordGenerator()
    setCopy("copy");
  }, [length, numberShow, characterShow]);

  const passwordRef = useRef(null);

  const copyToPasswordClipBoard = useCallback(() => {
    setCopy("✅");
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-100">
        <h1 className="text-lg text-center mb-2 text-black">Passsword generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button id="button" className="shadow bg-gray-800 p-2" onClick={copyToPasswordClipBoard}>{copy}</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={50} value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberShow}
              id="numberInput"
              onChange={() => {
                setNumbershow((prev) => !prev)
              }}
              className="cursor-pointer"
            />

            <label htmlFor="numberInput">Numbers</label>


          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberShow}
              id="charInput"
              onChange={() => {
                setCharacterShow((prev) => !prev)
              }}
              className="cursor-pointer"
            />

            <label htmlFor="charInput">Characters</label>


          </div>
         
        </div>
      </div>
    </>
  )
}

export default App
