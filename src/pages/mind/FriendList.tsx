import React, { useRef, useEffect, useState } from "react";
import Sheet from 'react-modal-sheet';
import FriendInfo from "./FriendInfo";
import { FriendCheck } from "../../models/FriendCheck";
import IcCloseBtn from '../../assets/images/icon/ic_close_btn.png';
import RootStore from "../../store/RootStore";
import { RelationshipResponseProto } from './../../prototypes/relationship/RelationshipResponseProto';
import IcBackBtn from "../../assets/images/icon/ic_back_btn.svg";
import IcSearch from "../../assets/images/icon/ic_search.svg";
import SelectedFriendCard from "./SelectedFriendCard";
import EmptyResultNotice from "./EmptyResultNotice";
import RegisterFriendModal from "./RegisterFriendModal";
import IcPlusBtnWhite from "../../assets/images/icon/ic_plus_btn_white.svg";

interface PropsType {
  isOpen: boolean;
  selectedFriendSeqList: string[];
  onClose: (arg0: number) => void;
  setContainerHeight: (arg0: any, arg1: string) => void;
  appendFriendList: (arg0: FriendCheck[]) => void;
}

const FriendList = ({ isOpen, onClose, setContainerHeight, appendFriendList, selectedFriendSeqList }: PropsType) => {
  // sheet-modal height이 기존 react-sheet-modal에서 최대로
  // 안 올라가는 문제가 있어서 sheet container dom을 직접 가지고
  // height을 조정
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [friendList, setFriendList] = useState<FriendCheck[]>([]);
  const [selectedFriendList, setSelectedFriendList] = useState<FriendCheck[]>([]);
  const [checkCount, setCheckCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [isEmptyResult, setEmptyResult] = useState<boolean>(false);

  const [haveFriends, setHaveFriends] = useState<boolean>(false);

  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false);

  useEffect(() => {
    setContainerHeight(containerRef, '100vh');
    initData();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpenRegisterModal) {
      initData();
    }
  }, [isOpenRegisterModal])

  const initData = () => {
    let friendCheckList: FriendCheck[] = [];
    let selectedFriendCheckList: FriendCheck[] = [];

    let friendList: RelationshipResponseProto[] = RootStore.friendStore.getFriendList;

    let tempCheckCount: number = 0;

    friendList.forEach(friend => {
      if (friend.sequence && friend.nickname) {

        const sequenceContains: boolean = selectedFriendSeqList.includes(friend.sequence);

        friendCheckList.push({
          friend: {
            id: friend.sequence,
            name: friend.nickname,
            relation: ''
          },
          check: sequenceContains,
          display: true
        });

        if (sequenceContains) {
          tempCheckCount++;
          selectedFriendCheckList.push({
            friend: {
              id: friend.sequence,
              name: friend.nickname,
              relation: ''
            },
            check: sequenceContains,
            display: true
          })
        }
      }
    });

    friendCheckList.sort((f1, f2) => {
      if (f1.friend.name > f2.friend.name) {
        return 1;
      } else if (f1.friend.name < f2.friend.name) {
        return -1;
      } else {
        return 0;
      }
    });

    setFriendList(friendCheckList);
    setSelectedFriendList(selectedFriendCheckList);

    setTotalCount(friendCheckList.length);
    setCheckCount(tempCheckCount);

    const text: string = inputRef.current?.value as string;

    if ((!text || text.length === 0) && friendList.length !== 0) {
      setHaveFriends(true);
    }
  }

  const handleInput = () => {
    const text: string = inputRef.current?.value as string;

    let list: FriendCheck[] = [];

    let existDisplayResult = false;

    friendList.forEach(friendCheck => {
      const name = friendCheck.friend.name;
      if (!name.startsWith(text)) {
        friendCheck.display = false;
      } else {
        friendCheck.display = true;
        existDisplayResult = true;
      }

      list.push(friendCheck);
    });

    setEmptyResult(!existDisplayResult);

    setFriendList(list);
  }

  const updateCheck = (friendCheck: FriendCheck) => {
    if (friendCheck) {

      const id = friendCheck.friend.id;

      const check: boolean = !friendCheck.check;

      let friendCheckList: FriendCheck[] = [...friendList];

      let tempList: FriendCheck[] = [...selectedFriendList];

      const friendIdx = friendCheckList.findIndex(element => element.friend.id === id);

      friendCheckList[friendIdx].check = check;

      setFriendList(friendCheckList);

      if (check) {
        tempList.push(friendCheck);
        setSelectedFriendList(tempList);
        setCheckCount(checkCount + 1);
      } else {
        const index = tempList.findIndex(element => element.friend.id === id);

        if (index !== -1) {
          tempList.splice(index, 1);
          setSelectedFriendList(tempList);
          setCheckCount(checkCount - 1);
        }
      }
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

  const hideCloseBtn = (): boolean => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      if (length > 0) {
        return false;
      }
    }

    return true;
  }

  const openModal = () => {
    setIsOpenRegisterModal(true);
  }

  return (
    <Sheet className='FriendList Inner'
      isOpen={isOpen}
      onClose={function () { }}
      disableDrag={true}
    >
      <Sheet.Container
        ref={containerRef}
        style={{
          backgroundColor: "#242424",
        }}
      >
        <Sheet.Content className="friend-list-content">
          <div className='title-wrap'>
            <span className="back-btn" onClick={() => onClose(0)}><img src={IcBackBtn} alt="back-btn" /></span>
            <h2 className='title'>
              <div className="left">
                친구 목록
              </div>
              <div className="right" onClick={openModal}>
                <div style={{ width: "16px", height: "16px" }}>
                  <img src={IcPlusBtnWhite} alt="plus" />
                </div>
                등록하기
              </div>
            </h2>
          </div>
          <div className="modal-InputTextBox">
            <span className="search-icon">
              <img src={IcSearch} alt="search-icon" />
            </span>
            <input
              type="text"
              className="input-text-box"
              onKeyUp={() => handleInput()}
              placeholder="찾으시는 이름이 있으신가요?"
              ref={inputRef}
            />
            <div className="close-button">
              <img src={IcCloseBtn} alt="close"
                onClick={deleteKeyword}
                hidden={hideCloseBtn()}
              />
            </div>
          </div>
          {
            checkCount > 0 ?
              <div id="selected-friend-list">
                {
                  selectedFriendList.map((obj) => (
                    <SelectedFriendCard
                      friendCheck={obj}
                      updateCheck={updateCheck}
                      key={obj.friend.id}
                    />
                  ))
                }
              </div> : null
          }
          <div id='friend-list'>
            {
              !haveFriends ?
                <EmptyResultNotice
                  noticeText1="아직 등록된 친구가 없어요."
                  noticeText2="친구를 등록하시겠어요?"
                  openModal={openModal}
                /> : (
                  !isEmptyResult ? friendList.map((obj) => (
                    <FriendInfo
                      friendCheck={obj}
                      key={obj.friend.id}
                      updateCheck={updateCheck}
                    />
                  )) :
                    <EmptyResultNotice
                      noticeText1="등록되지 않은 이름이에요."
                      noticeText2="친구로 등록하시겠어요?"
                      openModal={openModal}
                    />
                )
            }
          </div>
          <div className="save-button-wrap">
            <button disabled={checkCount === 0} className='save-button' onClick={
              () => { saveFriends(); onClose(0); }}>
              저장
            </button>
          </div>
          <RegisterFriendModal
            isOpen={isOpenRegisterModal}
            setOpen={setIsOpenRegisterModal}
            name={inputRef.current?.value as string}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default FriendList;
