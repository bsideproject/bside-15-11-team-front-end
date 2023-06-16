import React from "react"
import IcPlusBtnBl from "../../assets/images/icon/ic_plus_btn_black.png"

interface PropsType{
    inputTitle: string,
    placeholder: string,
    value: any,
    onChange: any,
    id: string
}

const InputTextBox = ({
    inputTitle, placeholder,
    value, onChange, id
}:PropsType) => {
    return (
        <div className="InputTextBox">
            <label className="input-title">{inputTitle}</label>
            <input
                type="text"
                className="input-text-box"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {id === "friendName" ?
                <div className="friend-name-add">
                    <img src={IcPlusBtnBl} alt="plus-btn" /><span>여러 사람 등록하기</span>
                </div> : null
            }
        </div>
    )
}

export default InputTextBox;
