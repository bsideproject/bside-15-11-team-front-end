import React, { useRef, useEffect, useState } from "react";
import Sheet from 'react-modal-sheet';
import FriendInfo from "./FriendInfo";
import { FriendCheck } from "../../models/FriendCheck";
import IcCloseBtn from '../../assets/images/icon/ic_close_btn.png';

interface PropsType {
  isOpen : boolean;
  onClose : (arg0 : number) => void;
  setContainerHeight : (arg0 : any, arg1 : number) => void;
  appendFriendList : (arg0 : FriendCheck[]) => void;
}

const FriendList = ({isOpen, onClose, setContainerHeight, appendFriendList} : PropsType) => {

  // sheet-modal height이 기존 react-sheet-modal에서 최대로
  // 안 올라가는 문제가 있어서 sheet container dom을 직접 가지고
  // height을 조정
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [friendList, setFriendList] = useState<FriendCheck[]>([]);
  const [checkCount, setCheckCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    setContainerHeight(containerRef, 100);
  }, [isOpen]);

  useEffect(() => {
    let list : FriendCheck[] = [
      {
        friend : {
          id :'김유주',
          name : '김유주',
          relation : '친구'
        }, check : false, display : true
      },{
        friend : {
          id :'한유주',
          name : '한유주',
          relation : '친구'
        }, check : false, display : true
      },{
        friend : {
          id :'김선주',
          name : '김선주',
          relation : '친구'
        }, check : false, display : true
      },
      {
        friend : {
          id :'김선화',
          name : '김선화',
          relation : '친구'
        }, check : false, display : true
      }
    ];

    list.sort((f1, f2) => {
      if (f1.friend.name > f2.friend.name) {
        return 1;
      } else if (f1.friend.name < f2.friend.name) {
        return -1;
      } else {
        return 0;
      }
    })

    setFriendList(list);

    setTotalCount(list.length);
  }, [])

  const handleInput = () => {
    const text : string = inputRef.current?.value as string;

    let list : FriendCheck[] = [];

    friendList.forEach(friendCheck => {
      const name = friendCheck.friend.name;
      if (!name.startsWith(text)) {
        friendCheck.display = false;
      } else {
        friendCheck.display = true;
      }

      list.push(friendCheck);
    });

    setFriendList(list);
  }

  const updateCheckCount = (check : boolean) => {
    if (check) {
      setCheckCount(checkCount + 1);
    } else {
      setCheckCount(checkCount - 1);
    }
  }

  const saveFriends = () => {
    appendFriendList(friendList);
  }

  const deleteKeyword = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleInput();
    }
  }

  const hideCloseBtn = () : boolean => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      if (length > 0) {
        return false;
      }
    }

    return true;
  }

  return (
    <Sheet className='FriendList Inner'
      isOpen={isOpen} 
      onClose={function(){}}
      disableDrag={true}
      >
      <Sheet.Container className="sheet-content-container"
        ref={containerRef}
      >
        <Sheet.Content>
          <div className='title-wrap'>
            <h2 className='title'>관계 목록</h2>
            <button className='save-button' onClick={
              () => {saveFriends();onClose(0);}}>
              저장
            </button>
          </div>
          <div className="InputTextBox">
            <input
                type="text"
                className="input-text-box"
                placeholder={'검색어'}
                onKeyUp={() => handleInput()}
                ref={inputRef}
            />
            <div className="close-button">
              <img src={IcCloseBtn} alt="close" 
                onClick={deleteKeyword}
                hidden={hideCloseBtn()}
              />
            </div>
          </div>
          <div className="count-div">
            <p>{`${checkCount} / ${totalCount}`}</p>
          </div>
          <div id='friend-list'>
            {friendList.map((obj) => (
              <FriendInfo 
                friendCheck={obj}
                key={obj.friend.id}
                updateCheckCount={updateCheckCount}
              />
            ))}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default FriendList;
