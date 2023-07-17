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
import { useLocation, useNavigate } from 'react-router-dom';
import RootStore from '../../store/RootStore';
import { RelationshipRequestProto } from '../../prototypes/common/RelationshipProto';
import ErrorMessage from '../../components/common/ErrorMessage';
import NullChecker from '../../utils/NullChecker';
import { ItemProto } from '../../prototypes/common/ItemProto';
import { ItemTypeProto } from '../../prototypes/common/type/ItemTypeProto';
import { DateProto } from '../../prototypes/common/DateProto';
import { RelationshipTypeProto } from '../../prototypes/common/type/RelationshipTypeProto';
import { RelationshipPostRequestProto } from '../../prototypes/relationship/RelationshipRequestProto';
import queryString from 'query-string';
import DatePickers from "../../components/common/DatePickers";

const Mind = () => {

  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
  const [inputArray, setInputArray] = useState<string[]>(['','','']);
  const [validCheckArray, setValidCheckArray] = useState<boolean[]>([true, true, true, true]);

  const [eventType, setEventType] = useState<string>('give');
  const [mindType, setMindType] = useState<string>('');
  const [money, setMoney] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');

  const [selectedSeq, setSelectedSeq] = useState("");

  const moneyInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const giftRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const todayString : string = DateUtil.getTodayString();

    let list : string[] = [...inputArray];
    // 날짜 default값 : 오늘 날짜
    list[1] = todayString;

    if (location.search) {
      const params = location.search;
      const query = queryString.parse(params);

      if (query.friendName) {
        list[0] = query.friendName as string;
      }
    }
    setInputArray(list);

    RootStore.friendStore.setFriendList();
  }, []);

  const handleInputClick = (index : number) => {
    let list : boolean[] = [...openModal];
    list[index] = true;
    setOpenModal(list);
  }

  const handleClose = (index : number) => {
    let list : boolean[] = [...openModal];
    list[index] = false;
    setOpenModal(list);
  }

  const setContainerHeight = (ref : any, height : string) => {
    if (ref.current) {
      ref.current.style.height = `${height}`;
    }
  }

  const appendFriendList = (friendList : FriendCheck[]) => {
    let text = '';

    friendList.forEach(obj => {
      if (obj.check) {
        text+=`${obj.friend.name}, `
        setSelectedSeq(obj.friend.id);
      }
    })

    // 마지막 comma 제거
    text = text.trim();
    text = text.slice(0, -1);

    let list : string[] = [...inputArray];
    list[0] = text;

    setInputArray(list);

    if (!NullChecker.isEmpty(text)) {
      let array = validCheckArray;
      array[0] = true;
      setValidCheckArray([...array]);
    }

  }

  const addMoney = (add : number) => {
    let sum = add + money;
    console.log(sum)
    setMoney(sum);

    if (moneyInputRef.current) {
      moneyInputRef.current.valueAsNumber = sum;
    }
  }

  const memoHandler = (e : any) : void => {
    const text = e.target.value;
    setMemo(text);

  }

  const checkValidation = () : boolean => {

    let valid = true;

    for (const i in inputArray) {
      const input = inputArray[i];

      if (NullChecker.isEmpty(input)) {
        let array = validCheckArray;
        array[i] = false;
        setValidCheckArray([...array]);
        valid = false;
      }
    }

    if (NullChecker.isEmpty(mindType)) {
      let array = validCheckArray;
      array[3] = false;
      setValidCheckArray([...array]);
      valid = false;
    } else if (mindType === 'cash') {
      if (moneyInputRef && moneyInputRef.current) {
        const input = moneyInputRef.current.value;

        if (NullChecker.isEmpty(input)) {
          let array = validCheckArray;
          array[3] = false;
          setValidCheckArray([...array]);
          valid = false;
        }
      }
    } else if (mindType === 'gift') {
      if (giftRef && giftRef.current) {
        const input = giftRef.current.value;

        if (NullChecker.isEmpty(input)) {
          let array = validCheckArray;
          array[3] = false;
          setValidCheckArray([...array]);
          valid = false;
        }
      }
    }

    return valid;
  }

  const save = async() => {

    /*
      API 로 작성된 데이터 전송.
    */

    if (!checkValidation()) {
      return;
    }

    let saveList : RelationshipRequestProto[] = [];
    const friendSequence = selectedSeq;
    const type : RelationshipTypeProto = eventType === 'give' ? RelationshipTypeProto.GIVEN : RelationshipTypeProto.TAKEN;
    const event = inputArray[2];
    let itemType : ItemTypeProto = ItemTypeProto.CASH;
    let item = '';

    if (mindType === 'cash' && moneyInputRef.current) {
      item = moneyInputRef.current.value;
      itemType = ItemTypeProto.CASH;
    }

    if (mindType === 'gift' && giftRef.current) {
      item = giftRef.current.value;
      itemType = ItemTypeProto.PRESENT;
    }

    const eventDate : string = inputArray[1];

    const memoTxt = memo;

    const itemProto : ItemProto = {
      imageLink : "",
      name : item,
      type : itemType
    }

    const dateProto : DateProto = {
      year : parseInt(eventDate.split("-")[0]),
      month : parseInt(eventDate.split("-")[1]),
      day : parseInt(eventDate.split("-")[2])
    }

    saveList.push({
      friendSequence : friendSequence,
      type : type,
      event : event,
      date : dateProto,
      item : itemProto,
      memo : memoTxt
    });

    const relationshipPostRequestProto : RelationshipPostRequestProto = {
      relationships : saveList
    };

    await RootStore.mindStore.postMind(relationshipPostRequestProto);

    navigate("/page/main");
  }

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleUploadPhoto = async(e : React.ChangeEvent<HTMLInputElement>) => {
    let file = undefined;
    const reader : FileReader = new FileReader();

    if (e.target.files) {
      file = e.target.files[0];

      reader.onloadend = () => {
        if (imageRef.current) {
          imageRef.current.src = reader.result as string;
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

  }

  const setEventInput = (event : string) => {
    if (!NullChecker.isEmpty(event)) {
      let inputList = inputArray;
      inputList[2] = event;
      setInputArray([...inputList]);

      let validList = validCheckArray;
      validList[2] = true;
      setValidCheckArray([...validList]);
    }
  }

  // 3자리 콤마 함수
  function formatNumberWithCommas(number:any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onChangeMindContent = (type : string) : void => {

    if (type === "cash") {
      let text = "";
      if (moneyInputRef.current) {
        text = moneyInputRef.current.value;
        if (!NullChecker.isEmpty(text)) {
          let array = validCheckArray;
          array[3] = true;
          setValidCheckArray([...array]);
        }
      }
    } else if (type === "gift") {
      let text = "";
      if (giftRef.current) {
        text = giftRef.current.value;

        if (!NullChecker.isEmpty(text)) {
          let array = validCheckArray;
          array[3] = true;
          setValidCheckArray([...array]);
        }
      }
    }

  }

  return (
    <div className="Mind inner">
      <TitleWrap title="마음 기록하기" />
      <form className='mind-register-wrap'>
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
        { !validCheckArray[0] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
        <InputTextBoxWithArrow
          inputTitle='날짜 (필수)'
          id='date'
          onClick={() => handleInputClick(1)}
          value={inputArray[1]}
        />
        { !validCheckArray[1] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
        <InputTextBoxWithArrow
          inputTitle='이벤트 (필수)'
          id='event'
          onClick={() => handleInputClick(2)}
          value={inputArray[2]}
          placeholder={`${eventType === 'give' ? '준' : '받은'} 이유를 선택하세요.`}
        />
        { !validCheckArray[2] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
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
                onKeyUp={() => onChangeMindContent("cash")}
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
          <Fragment>
            <div className="gift-InputTextBox">
              <input
                type="text"
                className="input-text-box"
                id='gift-input'
                placeholder='선물을 입력하세요'
                ref={giftRef}
                onKeyUp={() => onChangeMindContent("gift")}
              />
            </div>
            {/*<div style={{marginBottom : '5vw'}}>*/}
            {/*  <button id="save-photo-button"*/}
            {/*    onClick={(e) => {e.preventDefault();handleFileInput();}}*/}
            {/*  >*/}
            {/*    <img src={IcPhotoUploadBtn} alt='photo upload' />*/}
            {/*  </button>*/}
            {/*  <input*/}
            {/*    type="file"*/}
            {/*    accept='image/*'*/}
            {/*    ref={fileInputRef}*/}
            {/*    style={{display : 'none'}}*/}
            {/*    onChange={handleUploadPhoto}*/}
            {/*  />*/}
            {/*  <img ref={imageRef} src={IcDefaultImage} alt='default image'*/}
            {/*    className='upload-image'*/}
            {/*  />*/}
            {/*</div>*/}
          </Fragment>
        }
        { !validCheckArray[3] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
        <div className="InputTextBox">
          <label className="input-title">메모 (선택)</label>
          <textarea
              className="input-text-box memo"
              placeholder="입력하세요 (최대 40자)"
              value={memo}
              onChange={memoHandler}
              id="memo"
          />
        </div>
        <div className="register-btn-wrap">
          <button type="button"
            className="register-btn"
            onClick={() => save()}>등록하기</button>
        </div>
      </form>
      <FriendList
        isOpen={openModal[0]}
        onClose={() => handleClose(0)}
        setContainerHeight={setContainerHeight}
        appendFriendList={appendFriendList}
      />
      <DatePickers
        isOpen={openModal[1]}
        onClose={() => handleClose(1)}
        title={"날짜"}
        inputArray={inputArray}
        setInputArray={setInputArray}
        setContainerHeight={setContainerHeight}
      />
      <Event
        isOpen={openModal[2]}
        onClose={() => handleClose(2)}
        inputArray={inputArray}
        setEventInput={setEventInput}
        setContainerHeight={setContainerHeight}
      />
    </div>
  );
};

export default Mind;
