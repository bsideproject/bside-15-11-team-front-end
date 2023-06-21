import NullChecker from '../../utils/NullChecker';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.png';

interface PropsType {
  inputTitle : string,
  placeholder? : string,
  onClick : any,
  id : string,
  value? : string
};

const InputTextBoxWithArrow = ({
  inputTitle,placeholder, onClick, id, value
} : PropsType) => {
  return (
    <div className='InputTextBoxWithArrow' onClick={onClick}>
      <div className="InputTextBox">
        <label className="input-title">{inputTitle}</label>
        <input
          type="text"
          className="input-text-box"
          id={id}
          placeholder={placeholder}
          value={NullChecker.isEmpty(value) ? '' : value}
          disabled
        />
      </div>
      <div className="front-btn" 
      ><img src={IcFrontBtn} alt="front-btn" /></div>
    </div>
  );
};

export default InputTextBoxWithArrow;