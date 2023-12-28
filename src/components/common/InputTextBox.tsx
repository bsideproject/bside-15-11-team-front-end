import React from "react"
import IcPlusBtnWh from "../../assets/images/icon/ic_plus_btn_white_c.svg";
import IcMinusBtnWh from "../../assets/images/icon/ic_minus_btn_white_c.svg";
import IcDelBtnX from "../../assets/images/icon/ic_del_x_btn.svg";
import NullChecker from "../../utils/NullChecker";

interface PropsType {
    inputTitle?: string,
    placeholder?: string,
    value?: any,
    onChange?: any,
    id?: string,
    addFriend?: any,
    removeFriend?: any,
    friendName?: any,
    maxLength?: number,
    inputRef?: any,
    onKeyUp?: any,
    style?: any,
    getEdit?: any,
    disabled?: boolean
}

const InputTextBox = ({
    inputTitle,
    placeholder,
    value,
    onChange,
    id,
    addFriend,
    removeFriend,
    friendName,
    maxLength,
    inputRef,
    onKeyUp,
    style,
    getEdit,
    disabled
}: PropsType) => {
    return (
        <div className="InputTextBox">
            {!NullChecker.isEmpty(inputTitle) ? <label className="input-title">{inputTitle}</label> : null}
            {id === "friendName" ?
                friendName.map((name: any, key: any) => (
                    <div className="input-text-box-wrap" key={key}>
                        <input
                            type="text"
                            className="input-text-box many"
                            id={id}
                            placeholder={placeholder}
                            value={name}
                            onChange={(event) => onChange(key, event)}
                            maxLength={maxLength}
                        />
                        {key === 0 ? null : <span onClick={() => removeFriend(key)} className="text-box-del-btn"><img src={IcMinusBtnWh} alt="remove-btn" /></span>}
                    </div>
                )) :
                <input
                    type="text"
                    className="input-text-box"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    ref={inputRef}
                    onKeyUp={onKeyUp}
                    style={style}
                    disabled={disabled}
                />
            }
            {!getEdit && id === "friendName" ?
                <div className="friend-name-add" onClick={addFriend}>
                    <img src={IcPlusBtnWh} alt="plus-btn" /><span>여러 사람 등록하기</span>
                </div> : null
            }
        </div>
    )
}



export default InputTextBox;
