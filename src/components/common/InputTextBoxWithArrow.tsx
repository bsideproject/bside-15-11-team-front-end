import NullChecker from '../../utils/NullChecker';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.svg';
import IcFrontBtnInactive from '../../assets/images/icon/ic_front_btn_inactive.svg';
import IcBirthCheckOff from "../../assets/images/icon/ic_check_off.svg";
import IcBirthCheckOn from "../../assets/images/icon/ic_check_on_og.svg"
import React from "react";
import ErrorMessage from './ErrorMessage';

interface PropsType {
  id: string,
  inputTitle: string,
  name?: string,
  onClick: any,
  placeholder?: string,
  value?: string,
  onChange?: any,
  checked?: any,
  inactive?: boolean,
}

const InputTextBoxWithArrow = ({
  inputTitle,
  placeholder,
  onClick,
  id, value,
  onChange,
  checked, inactive
}: PropsType) => {

  return (
    <div className='InputTextBoxWithArrow' >
      <div className="InputTextBox" onClick={id === "birth" && (checked || inactive) ? null : onClick}>
        <label className="input-title">{inputTitle}</label>
        <div
          className={(checked ? "input-text-box" : `input-text-box ${id}`)}
          id={id}
        ><div className={'inner-div '
          + (` ${NullChecker.isEmpty(value) ? "placeholder" : ""}`)
          + (`${inactive ? "inactive" : ""}`)}>{NullChecker.isEmpty(value) ? placeholder : value}</div></div>
      </div>
      {id === "birth" ?
        <div className="friend-name-add" >
          <input
            type="checkbox"
            id="birthCheck"
            checked={checked}
            className={inactive ? 'inactive' : ''}
            onChange={({ target: { checked } }) => onChange(checked)}
          />
          <label htmlFor="birthCheck">
            {checked ? <img src={IcBirthCheckOn} alt="check-btn" /> : <img src={IcBirthCheckOff} alt="check-btn" />}
            <span>생일 모름</span>
          </label>
        </div> : null
      }
      <div className="front-btn">
        <img src={inactive ? IcFrontBtnInactive : IcFrontBtn} alt="front-btn" />
      </div>
    </div>
  );
};

export default InputTextBoxWithArrow;
