import React, { Fragment, useEffect, useRef, useState } from 'react';
import TitleWrap from '../../components/common/TitleWrap';
import InputTextBoxWithArrow from '../../components/common/InputTextBoxWithArrow';
import FriendList from './FriendList';
import { FriendCheck } from '../../models/FriendCheck';
import DateUtil from '../../utils/DateUtil';
import Calendar from '../../components/common/Calendar';
import Event from './Event';
import EventType from './EventType';
import MindType from './MindType';
import MoneyOption from './MoneyOption';
import InputTextBox from '../../components/common/InputTextBox';
import IcSaveRecordBtn from '../../assets/images/icon/Ic_save_record_btn.png';
import { useNavigate } from 'react-router-dom';

const Mind = () => {

  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
  const [inputArray, setInputArray] = useState<string[]>(['','','']);

  const [eventType, setEventType] = useState<string>('give');
  const [mindType, setMindType] = useState<string>('');
  const [money, setMoney] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');

  const moneyInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const todayString : string = DateUtil.getTodayString();

    let list : string[] = [...inputArray];

    list[1] = todayString;

    setInputArray(list);

  }, []);

  const handleInputClick = (index : number) => {
    console.log("handleInputClick ", index);
    let list : boolean[] = [...openModal];
    list[index] = true;
    setOpenModal(list);
  }

  const handleClose = (index : number) => {
    let list : boolean[] = [...openModal];
    list[index] = false;
    setOpenModal(list);
  }

  const setContainerHeight = (ref : any, height : number) => {
    if (ref.current) {
      ref.current.style.height = `${height}vh`;
    }
  }

  const appendFriendList = (friendList : FriendCheck[]) => {

    let text = '';

    friendList.forEach(obj => {
      if (obj.check) {
        text+=`${obj.friend.name}, `
      }
    })

    // 마지막 comma 제거
    text = text.trim();
    text = text.slice(0, -1);

    let list : string[] = [...inputArray];
    list[0] = text;

    setInputArray(list);
  }

  const addMoney = (add : number) => {
    let sum = add + money;

    setMoney(sum);

    if (moneyInputRef.current) {
      moneyInputRef.current.valueAsNumber = sum;
    }
  }

  const memoHandler = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    const text = e.target.value;
    setMemo(text);

  }

  const save = () : void => {

    /*
      API 로 작성된 데이터 전송.
    */

    navigate("/main");
  }

  return (
    <div className="Friend inner">
      <TitleWrap title="마음 기록하기" />
      <form className='friend-register-wrap'>
        <EventType 
          selected={eventType}
          setEventType={setEventType}
        />
        <InputTextBoxWithArrow
          inputTitle='이름 (필수)'
          placeholder='기록할 친구들을 선택하세요.'
          id='friends'
          onClick={() => handleInputClick(0)}
          value={inputArray[0]}
        />
        <InputTextBoxWithArrow
          inputTitle='날짜 (필수)'
          id='date'
          onClick={() => handleInputClick(1)}
          value={inputArray[1]}
        />
        <InputTextBoxWithArrow 
          inputTitle='이벤트 (필수)'
          id='event'
          onClick={() => handleInputClick(2)}
          value={inputArray[2]}
          placeholder={`${eventType === 'give' ? '준' : '받은'} 이유를 선택하세요.`}
        />
        <MindType 
          onSelect={setMindType}
        />
        { mindType === 'cash' &&
          <Fragment>
            <div className="InputTextBox">
              <input
                type="number"
                className="input-text-box"
                id='cash-input'
                placeholder='금액을 입력하세요'
                ref={moneyInputRef}
              />
            </div>
            <MoneyOption 
              options={['1', '5', '10']}
              onSelect={addMoney}
            />
          </Fragment>
        }
        {
          mindType === 'gift' &&
          <div className="InputTextBox">
            <input
              type="text"
              className="input-text-box"
              id='gift-input'
              placeholder='선물을 입력하세요'
            />
          </div>
        }
        <InputTextBox 
          inputTitle='메모(선택)'
          placeholder='입력하세요. (최대 50자)'
          value={memo}
          onChange={memoHandler}
          id="memo"
        />
        <button style={{background : 'white'}}
          onClick={() => save()}
        >
          <img src={IcSaveRecordBtn} alt="save" />
        </button>
      </form>
      <FriendList 
        isOpen={openModal[0]}
        onClose={() => handleClose(0)}
        setContainerHeight={setContainerHeight}
        appendFriendList={appendFriendList}
      />
      <Calendar 
        isOpen={openModal[1]}
        onClose={() => handleClose(1)}
        title={"날짜"}
        inputArray={inputArray}
        setInputArray={setInputArray}
      />
      <Event 
        isOpen={openModal[2]}
        onClose={() => handleClose(2)}
        inputArray={inputArray}
        setInputArray={setInputArray}
      />
    </div>
  );
};

export default Mind;