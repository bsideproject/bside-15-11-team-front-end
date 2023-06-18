import React from 'react';
import InputTextBox from './InputTextBox';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.png';

interface PropsType {
  inputTitle : string,
  placeholder : string,
  value : any,
  onChange : any,
  onClick : any,
  id : string
};

const InputTextBoxWithArrow = (props : PropsType) => {
  return (
    <div className='InputTextBoxWithArrow'>
      <InputTextBox 
        inputTitle={props.inputTitle}
        placeholder={props.placeholder}
        value={props.value}
        id={props.id}
        onChange={props.onChange}
      />
      <div className="front-btn" 
        onClick={props.onClick}
      ><img src={IcFrontBtn} alt="front-btn" /></div>
    </div>
  );
};

export default InputTextBoxWithArrow;