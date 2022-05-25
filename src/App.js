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

      ["#ff000085", "yellow", "#0080008a"].forEach(
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
            <h1>لورم ایپسوم</h1>
            <p ref={ref} onMouseUp={getSelection}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
          </div>
          <div className="app__container-control">
            <button
              className="app__container-control-red"
              onClick={() => handleChangeColor("#ff000085")}
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
              onClick={() => handleChangeColor("#0080008a")}
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
            <b>متن جدید :</b>
            <input
            className="app__container-note__input"
              value={textInfo.note}
              onChange={({ target }) =>
                setTextInfo({ ...textInfo, note: target.value })
              }
            />
            {!(textInfo.note && textInfo.selectedText) &&
            <small className="app__container-note__help">
              لطفا بعد از وارد کردن متن، سطری که می خواهید با متن شما جایگزین شود را انتخاب نمایید
            </small>}
            <div>
              <button
                className="app__container-note__btn--cancel"
                onClick={()=>{
                  setToggleBtn(false)
                  setTextInfo({ selectedText: "", note: "" })
                }}
                  
              >
                لغو
              </button>
              <button
                className="app__container-note__btn--add"
                onClick={handleAddNote}
              >
                افزودن
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
