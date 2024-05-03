import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import TitleWrap from '../../components/common/TitleWrap';
import InputTextBoxWithArrow from '../../components/common/InputTextBoxWithArrow';
import FriendList from './FriendList';
import { FriendCheck } from '../../models/FriendCheck';
import DateUtil from '../../utils/DateUtil';
import Event from './Event';
import EventType from './EventType';
import MindType from './MindType';
import MoneyOption from './MoneyOption';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RootStore from '../../store/RootStore';
import ErrorMessage from '../../components/common/ErrorMessage';
import NullChecker from '../../utils/NullChecker';
import { ItemProto } from '../../prototypes/common/ItemProto';
import { ItemTypeProto } from '../../prototypes/common/type/ItemTypeProto';
import { DateProto } from '../../prototypes/common/DateProto';
import ImgExelBtn from "../../assets/images/icon/ic_exel_btn.svg";
import ModalConfirm from "../../components/common/ModalConfirm";
import ImgDelBtn from "../../assets/images/icon/ic_delete.svg";
import axios from 'axios';
import { MindPostRequestProto, MindPutRequestProto, MindRequestProto } from '../../prototypes/mind/MindRequestProto';
import { MindTypeProto } from '../../prototypes/common/type/MindTypeProto';
import IcCamera from "../../assets/images/icon/ic_camera.png";
import IcDefaultImage from '../../assets/images/icon/ic_default_image.png';
import Calendar from '../../components/common/Calendar';
import ScrollableCalendar from '../../components/common/ScrollableCalendar';

const Mind = () => {

  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
  const [inputArray, setInputArray] = useState<string[]>(['', '', '']);
  const [validCheckArray, setValidCheckArray] = useState<boolean[]>([true, true, true, true]);

  const [eventType, setEventType] = useState<string>('give');
  const [mindType, setMindType] = useState<string>('gift');
  const [money, setMoney] = useState<number>(0);
  const [gift, setGift] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  const [selectedFriendSeqList, setSelectedFriendSeqList] = useState<string[]>([]);

  // 마음 수정하기에 필요한 값
  const [mindSeq, setMindSeq] = useState<string>('');
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOkOpen, setIsOkOpen] = useState<boolean>(false);
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false);

  // 사진 업로드 기능에 필요한 값
  const [photoUpload, setPhotoUpload] = useState<boolean>(false);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [imageFile, setImageFile] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();

  const moneyInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const giftRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const pathParams = useParams();

  useEffect(() => {
    const todayString: string = DateUtil.getTodayString();

    let list: string[] = [...inputArray];
    // 날짜 default값 : 오늘 날짜
    list[1] = todayString;

    // 관계 등록 후 넘어왔을 경우
    if (location.state?.friendData) {
      const friendData = location.state.friendData;

      let text = '';
      let friendSeqList: string[] = [];
      if (Array.isArray(friendData)) {
        friendData.forEach((obj: any) => {

          text += `${obj.nickname}, `
          friendSeqList.push(obj.sequence);

        });

        setSelectedFriendSeqList(friendSeqList);

        text = text.trim();
        text = text.slice(0, -1);
      } else {
        text += friendData.nickname;
        pushFriendSeq(friendData.sequence);

        text = text.trim();
      }

      list[0] = text;

      if (!NullChecker.isEmpty(text)) {
        let array = validCheckArray;
        array[0] = true;
        setValidCheckArray([...array]);
      }
    }

    // 마음 수정하기에서 넘어왔을 경우

    if (pathParams.sequence && pathParams.nickname) {
      const mindSeq: string = pathParams.sequence;
      const nickname: string = pathParams.nickname;
      const friendSeq: string = pathParams.friendSequence as string;

      setMindSeq(mindSeq);
      setEditMode(true);
      setSelectedFriendSeqList([friendSeq]);

      const fetchMindDetail = async () => {
        try {
          const response = await RootStore.mindStore.getMind(mindSeq);

          if (response?.sequence) {
            pushFriendSeq(friendSeq);
            list[0] = nickname;
            if (response.date) {
              list[1] = DateUtil.getDateString(response.date);
            }

            if (response.event) {
              list[2] = response.event;
            }

            if (response.type) {

              setEventType('TAKEN' === response.type ? 'take' : 'give');
            }

            if (response.item) {
              const itemType = response.item.type as string;
              const itemName = response.item.name as string;

              setMindType(itemType === "PRESENT" ? 'gift' : 'cash');

              if (itemType === "PRESENT") {
                if (giftRef.current) {
                  giftRef.current.value = itemName;
                }
                setGift(itemName);
              } else {
                if (moneyInputRef.current) {
                  moneyInputRef.current.value = displayMoneyForm(parseInt(itemName));
                  setMoney(parseInt(itemName));
                }
              }

              if (response.item.imageLink && !NullChecker.isEmpty(response.item.imageLink)) {
                if (imageRef.current) {
                  imageRef.current.hidden = false;
                  imageRef.current.src = response.item.imageLink;
                  setPhotoUpload(true);
                }
              }
            }

            if (response.memo) {
              setMemo(response.memo);
            }
          }

        } catch (error) {
          // Handle any errors that might occur during the API call
          console.error("Error fetching relationship detail:", error);
        }
      };

      fetchMindDetail();
    }

    setInputArray(list);

    // FriendList에 뜰 친구 리스트 미리 세팅
    RootStore.friendStore.setFriendList();
  }, []);

  const displayMoneyForm = (money: number): string => {
    return money.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
  }

  const handleInputClick = (index: number) => {

    let list: boolean[] = [...openModal];
    list[index] = true;
    setOpenModal(list);
  }

  const handleClose = (index: number) => {
    let list: boolean[] = [...openModal];
    list[index] = false;
    setOpenModal(list);
  }

  const setContainerHeight = (ref: any, height: string) => {
    if (ref.current) {
      ref.current.style.height = `${height}`;
    }
  }

  const pushFriendSeq = (id: string) => {
    let temp = selectedFriendSeqList;
    temp.push(id);
    setSelectedFriendSeqList([...temp]);
  }

  const appendFriendList = (friendList: FriendCheck[]) => {
    let text = '';
    let friendSeqList: string[] = [];
    friendList.forEach(obj => {
      if (obj.check) {
        text += `${obj.friend.name}, `
        friendSeqList.push(obj.friend.id);
      }
    })

    // 마지막 comma 제거
    text = text.trim();
    text = text.slice(0, -1);

    let list: string[] = [...inputArray];
    list[0] = text;

    setInputArray(list);
    setSelectedFriendSeqList(friendSeqList);

    if (!NullChecker.isEmpty(text)) {
      let array = validCheckArray;
      array[0] = true;
      setValidCheckArray([...array]);
    }

  }

  const addMoney = (add: number) => {

    let sum = add + money;

    setMoney(sum);

    if (moneyInputRef.current) {
      moneyInputRef.current.value = displayMoneyForm(sum);
    }
  }

  const onChangeMoneyInput = () => {
    let inputNumber: number = 0;

    if (moneyInputRef.current) {

      let inputText = moneyInputRef.current.value;
      inputText = inputText.replace(/[^0-9$]/g, '');

      inputText = !NullChecker.isEmpty(inputText) ? inputText : "0";

      inputNumber = parseInt(inputText.replaceAll(',', '').replace('원', ''));
      setMoney(inputNumber);
    }
  }

  const memoHandler = (e: any): void => {
    const text = e.target.value;
    setMemo(text);

  }

  const checkValidation = (): boolean => {

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
      if (moneyInputRef?.current) {
        const input = moneyInputRef.current.value;

        if (NullChecker.isEmpty(input)) {
          let array = validCheckArray;
          array[3] = false;
          setValidCheckArray([...array]);
          valid = false;
        }
      }
    } else if (mindType === 'gift') {
      if (giftRef?.current) {
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

  const save = async () => {

    /*
      API 로 작성된 데이터 전송.
    */

    if (!checkValidation()) {
      return;
    }

    let saveList: MindRequestProto[] = [];
    const friendSequence = selectedFriendSeqList;
    const type: MindTypeProto = eventType === 'give' ? MindTypeProto.GIVEN : MindTypeProto.TAKEN;
    const event = inputArray[2];
    let itemType: ItemTypeProto = ItemTypeProto.CASH;
    let item = '';

    if (mindType === 'cash' && moneyInputRef.current) {
      item = moneyInputRef.current.value;

      item = item.replace('원', '');
      item = item.replace(',', '');

      itemType = ItemTypeProto.CASH;
    }

    if (mindType === 'gift' && giftRef.current) {
      item = giftRef.current.value;
      itemType = ItemTypeProto.PRESENT;
    }

    const eventDate: string = inputArray[1];

    const memoTxt = memo;

    let imageExtension = "";

    if (!NullChecker.isEmpty(imageFileName)) {
      if (imageFileName.includes(".")) {
        const splited = imageFileName.split(".");
        imageExtension = splited[splited.length - 1];
      }
    }

    const itemProto: ItemProto = {
      imageLink: "",
      name: item,
      type: itemType,
      imageExtension: imageExtension,
      image: imageFile
    }

    const dateProto: DateProto = {
      year: parseInt(eventDate.split("-")[0]),
      month: parseInt(eventDate.split("-")[1]),
      day: parseInt(eventDate.split("-")[2])
    }

    for (const seq of friendSequence) {
      saveList.push({
        relationshipSequence: seq,
        type: type,
        event: event,
        date: dateProto,
        item: itemProto,
        memo: memoTxt
      });
    }

    if (isEditMode) {
      const mindPutRequestProto: MindPutRequestProto = {
        sequence: mindSeq,
        relationshipSequence: friendSequence[0],
        type: type,
        event: event,
        date: dateProto,
        item: itemProto,
        memo: memoTxt
      };

      await RootStore.mindStore.putMind(mindPutRequestProto);
    } else {
      const mindPostRequestProto: MindPostRequestProto = {
        minds: saveList
      };

      const response = await RootStore.mindStore.postMind(mindPostRequestProto);
    }

    setIsSaveOpen(true);
  }

  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = undefined;
    let base64String = '';

    const reader: FileReader = new FileReader();
    if (e.target.files) {
      file = e.target.files[0];


      reader.onloadend = (e) => {
        if (imageRef.current) {
          imageRef.current.src = reader.result as string;
        }

        base64String = reader.result?.toString() as string;

        if (base64String) {
          setImageFile(base64String.split(",")[1].trim());
        }

      };

      if (file) {
        reader.readAsDataURL(file);
        if (imageRef.current) {
          imageRef.current.hidden = false;
          setPhotoUpload(true);
          setImageFileName(file.name);


        }
      }
    }

  }

  const handleExelBtn = () => {
    setIsReady(true);
  }

  const setEventInput = (event: string) => {
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
  function formatNumberWithCommas(number: any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onChangeMindContent = (type: string): void => {

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

  const handleDeleteTrue = async () => {

    const baseUrl: string = process.env.REACT_APP_SERVICE_URI as string;

    try {
      const response = await axios.delete(`${baseUrl}/api/minds/${mindSeq}`, {
        headers: {
          Authorization: RootStore.userStore.getJwtKey
        }
      });

      if (response.status === 200) {
        setIsOpen(false);
        setIsOkOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const confirmNavigation = () => {
    if (isEditMode) {
      navigate(-1);
    } else {
      navigate('/page/main');
    }
  }

  const onBlurMoneyInput = () => {
    if (moneyInputRef.current) {
      let moneyText = moneyInputRef.current.value;
      moneyText = moneyText.replace(/[^0-9$]/g, '');

      moneyText = !NullChecker.isEmpty(moneyText) ? moneyText : "0";
      setMoney(parseInt(moneyText));
      moneyText = parseInt(moneyText) > 0 ? displayMoneyForm(parseInt(moneyText)) : '';
      moneyInputRef.current.value = moneyText;
    }
  }

  const formatFriendNames = () => {
    if (!inputArray[0]) {
      return "";
    }
    const names: string[] = inputArray[0].split(',');

    if (names.length >= 4) {
      const displayedNames = names.slice(0, 3).join(', ');
      return `${displayedNames} 외 ${names.length}명`;
    } else {
      return inputArray[0];
    }

  }

  return (
    <div className="Mind inner">
      <button type="button" className="exel-btn" onClick={handleExelBtn}><img src={ImgExelBtn} alt="exel-btn" /></button>
      <TitleWrap title="마음 기록하기" />
      <EventType
        selected={eventType}
        setEventType={setEventType}
      />
      <form className='mind-register-wrap'>
        <InputTextBoxWithArrow
          inputTitle='이름'
          placeholder='이름을 선택하세요.'
          id='friends'
          onClick={() => handleInputClick(0)}
          value={formatFriendNames()}
        />
        {!validCheckArray[0] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
        {/* <InputTextBoxWithArrow
          inputTitle='날짜'
          id='date'
          onClick={() => handleInputClick(1)}
          value={inputArray[1]}
        />
        {!validCheckArray[1] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        }
        <InputTextBoxWithArrow
          inputTitle='이벤트'
          id='event'
          onClick={() => handleInputClick(2)}
          value={inputArray[2]}
          placeholder={`${eventType === 'give' ? '준' : '받은'} 이유를 선택하세요.`}
        />
        {!validCheckArray[2] &&
          <ErrorMessage
            message='필수 입력 사항입니다.'
          />
        } */}
        <div className='mind-content'>
          <MindType
            defaultSelect={mindType}
            onSelect={setMindType}
          />
          {mindType === 'cash' &&
            <Fragment>
              <div className="InputTextBox">
                <input
                  type="text"
                  className="input-text-box"
                  id='cash-input'
                  placeholder='금액을 입력하세요'
                  ref={moneyInputRef}
                  defaultValue={money > 0 ? money + '원' : ''}
                  onBlur={() => onBlurMoneyInput()}
                  onKeyUp={() => { onChangeMindContent("cash"); onChangeMoneyInput(); }}
                />
              </div>
              <MoneyOption
                options={['1', '5', '10']}
                onSelect={addMoney}
              />
              {!validCheckArray[3] &&
                <ErrorMessage
                  message='필수 입력 사항입니다.'
                />
              }
            </Fragment>
          }
          {
            mindType !== 'cash' &&
            <Fragment>
              <div className="gift-InputTextBox">
                <input
                  type="text"
                  className="input-text-box"
                  id='gift-input'
                  placeholder={`어떤 마음을 ${eventType === 'give' ? '주셨나요?' : '받으셨나요?'} (선택 입력)`}
                  defaultValue={gift}
                  ref={giftRef}
                  onKeyUp={() => onChangeMindContent("gift")}
                />
              </div>
              {!validCheckArray[3] &&
                <ErrorMessage
                  message='필수 입력 사항입니다.'
                />
              }
              <div className='photo-upload'>
                <button id="save-photo-button"
                  onClick={(e) => { e.preventDefault(); handleFileInput(); }}>
                  <p>
                    <img
                      src={IcCamera} alt="upload"
                    />
                  </p>
                  <p>
                    사진 첨부하기 {photoUpload ? '(1/1)' : '(0/1)'}
                  </p>
                </button>
                <input
                  type="file"
                  accept='image/*'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleUploadPhoto}
                />
                <div className={`upload-image-div ${photoUpload ? 'uploaded' : ''}`}>
                  <img ref={imageRef} src={IcDefaultImage} alt='default image'
                    className='upload-image'
                    hidden
                  />
                </div>
              </div>
            </Fragment>
          }
        </div>

        <InputTextBoxWithArrow
          inputTitle={eventType === 'give' ? '준 날짜' : '받은 날짜'}
          id='friends'
          onClick={() => handleInputClick(1)}
          value={inputArray[1]}
        />

        <div className="InputTextBox memo">
          <label className="input-title">메모 (선택)</label>
          <textarea
            className="input-text-box memo"
            placeholder="입력하세요 (최대 40자)"
            value={memo}
            onChange={memoHandler}
            id="memo"
          />
        </div>

        {
          isEditMode ? (
            <div className="register-btn-wrap edit">
              <button type="button" className="register-btn remove"
                onClick={() => setIsOpen(true)}>
                <img src={ImgDelBtn} alt="delete-btn" />
              </button>
              <button type="button"
                className="register-btn edit"
                onClick={() => save()}>저장하기</button>
            </div>
          ) : (
            <div className="register-btn-wrap">
              <button type="button"
                className="register-btn"
                onClick={() => save()}>저장하기</button>
            </div>
          )
        }
      </form>
      <FriendList
        isOpen={openModal[0]}
        selectedFriendSeqList={selectedFriendSeqList}
        onClose={() => handleClose(0)}
        setContainerHeight={setContainerHeight}
        appendFriendList={appendFriendList}
      />
      {/* <Calendar
        isOpen={openModal[1]}
        onClose={() => handleClose(1)}
        title={"날짜"}
        inputArray={inputArray}
        setInputArray={setInputArray}
        setContainerHeight={setContainerHeight}
      /> */}
      <ScrollableCalendar
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
      <ModalConfirm
        isOpen={isReady}
        modalChoice="type1"
        mainText="엑셀 파일 불러오기는 아직 준비중이에요."
        confirmAction={() => setIsReady(false)}
        confirmText="확인"
      />
      <ModalConfirm
        isOpen={isOpen}
        modalChoice="type2"
        mainText="마음을 삭제하시겠어요?"
        confirmAction={handleDeleteTrue}
        cancelAction={() => setIsOpen(false)}
        confirmText="삭제"
        cancelText="취소"
      />
      <ModalConfirm
        isOpen={isOkOpen}
        modalChoice="type1"
        mainText="삭제가 완료되었습니다."
        confirmAction={() => navigate(-1)}
        confirmText="확인"
      />
      <ModalConfirm
        isOpen={isSaveOpen}
        modalChoice="type1"
        mainText="등록이 완료되었습니다."
        confirmAction={() => confirmNavigation()}
        confirmText="확인"
      />
    </div>
  );
};

export default Mind;
