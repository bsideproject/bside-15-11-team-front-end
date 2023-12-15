import React from 'react';
import IcBirthCheckOn from "../../assets/images/icon/ic_check_on_og.svg";
import IcBirthCheckOff from "../../assets/images/icon/ic_check_off.svg";
import IcBackBtn from "../../assets/images/icon/ic_back_btn.svg";

interface PropsType {
    title: string,
    onClose: any,
    id?: string,
    onChange?: any,
    checked?: boolean
}

const ModalSheetTitleWrap = ({ title, onClose, id, onChange, checked }: PropsType) => {
    return (
        <div className='title-wrap modal'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span className='save-button'>
                    <img src={IcBackBtn} alt='close'
                        onClick={onClose}
                    />
                </span>
                <h2 className='title'>{title}</h2>
            </div>
            {id === "isLunar" ?
                <div className="friend-name-add isLunar" >
                    <input
                        type="checkbox"
                        id={id}
                        checked={checked}
                        onChange={({ target: { checked } }) => onChange(checked)}
                    />
                    <label htmlFor="isLunar">
                        {checked ? <img src={IcBirthCheckOn} alt="check-btn" /> : <img src={IcBirthCheckOff} alt="check-btn" />}
                        <span style={{ color: '#818181' }}>음력</span>
                    </label>
                </div> : null
            }
        </div>
    );
};

export default ModalSheetTitleWrap;
