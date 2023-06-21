import React, { useEffect, useState } from 'react';
import TitleWrap from '../../components/common/TitleWrap';
import InputTextBoxWithArrow from '../../components/common/InputTextBoxWithArrow';
import RadioWrap from '../../components/common/RadioWrap';
import FriendList from './FriendList';
import { FriendCheck } from '../../models/FriendCheck';
import DateUtil from '../../utils/DateUtil';
import Calendar from '../../components/common/Calendar';

const Mind = () => {

  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
  const [inputArray, setInputArray] = useState<string[]>(['','','']);

  useEffect(() => {
    const todayString : string = DateUtil.getTodayString();

    let list : string[] = [...inputArray];

    list[1] = todayString;

    setInputArray(list);

  }, [])

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

  return (
    <div className="Friend inner">
      <TitleWrap title="마음 기록하기" />
      <form className='friend-register-wrap'>
        <RadioWrap
          inputTitle=''
          options={
            [
              {
                name : 'type',
                id : 'give',
                htmlFor : 'give',
                content : '준 마음'
              }, {
                name : 'type',
                id : 'take',
                htmlFor : 'take',
                content : '받은 마음'
              }
            ]
          }
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
    </div>
  );
};

export default Mind;