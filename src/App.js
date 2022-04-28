import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [textInfo, setTextInfo] = useState({
    selectedText: "",
    note: "",
  });
  const [toggleBtn, setToggleBtn] = useState(false);

  const ref = useRef();

  let reg = new RegExp(textInfo.selectedText, "g");
  let innerHTML = ref.current?.innerHTML;

  const handleChangeColor = (color) => {
    if (textInfo.selectedText) {
      let clearSelectedText = textInfo.selectedText.replace("</span>", "");

      ["red", "yellow", "green"].forEach(
        (item) =>
          (clearSelectedText = clearSelectedText.replace(
            `<span style="background-color: ${item}">`,
            ""
          ))
      );

      if (color == "white") {
        ref.current.innerHTML = innerHTML.replace(reg, clearSelectedText);
      } else {
        ref.current.innerHTML = innerHTML.replace(
          reg,
          `<span style='background-color: ${color}'>${clearSelectedText}</span>`
        );
      }

      setTextInfo({ ...textInfo, selectedText: "" });
    }
  };

  const handleAddNote = () => {
    if (textInfo.note && textInfo.selectedText) {
      ref.current.innerHTML = innerHTML.replace(reg, textInfo.note);

      setToggleBtn(false);
      setTextInfo({ selectedText: "", note: "" });
    }
  };

  const getSelection = () => {
    let text = Array.prototype.reduce.call(
      document.getSelection().getRangeAt(0).cloneContents().childNodes,
      (result, node) => result + (node.outerHTML || node.nodeValue),
      ""
    );

    setTextInfo({
      ...textInfo,
      selectedText: text,
    });
  };

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__container-editor">
          <div className="app__container-text">
            <h1>Lorem ipsum</h1>
            <p ref={ref} onMouseUp={getSelection}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="app__container-control">
            <button
              className="app__container-control-red"
              onClick={() => handleChangeColor("red")}
            >
              R
            </button>
            <button
              className="app__container-control-yellow"
              onClick={() => handleChangeColor("yellow")}
            >
              Y
            </button>
            <button
              className="app__container-control-green"
              onClick={() => handleChangeColor("green")}
            >
              G
            </button>
            <button
              className="app__container-control-white"
              onClick={() => handleChangeColor("white")}
            >
              C
            </button>
            <button
              className="app__container-control-add"
              onClick={() => setToggleBtn(true)}
            >
              +
            </button>
          </div>
        </div>
        {toggleBtn && (
          <div id="note" className="app__container-note">
            <b>Enter note:</b>
            <input
              value={textInfo.note}
              onChange={({ target }) =>
                setTextInfo({ ...textInfo, note: target.value })
              }
            />
            <small className="app__container-note__help">
              please select text after you have entered the note; then press
              "Add" button
            </small>
            <button
              className="app__container-note__btn"
              onClick={handleAddNote}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
