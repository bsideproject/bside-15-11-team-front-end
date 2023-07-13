import React, {useEffect, useState} from 'react';
import ImgDelBtn from "../../assets/images/icon/ic_delete.svg";
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import RadioWrap from "../../components/common/RadioWrap";
import Calendar from "../../components/common/Calendar";
import InputTextBoxWithArrow from "../../components/common/InputTextBoxWithArrow";
import RootStore from "../../store/RootStore";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import ModalConfirm from "../../components/common/ModalConfirm";
import axios from "axios";

const Friend = () => {
    let navigate = useNavigate();
    const getSequence:string|null = new URLSearchParams(window.location.search).get("sequence");
    const getEdit:string|null = new URLSearchParams(window.location.search).get("edit");
    // 오늘 날짜
    let now = new Date();
    let year= now.getFullYear();
    let month = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0'+(now.getMonth() + 1);
    let date = (now.getDate() + 1) > 9 ? (now.getDate() + 1) : '0'+(now.getDate() + 1);
    let nowDate = `${year}-${month}-${date}`;

    const [friendName, setFriendName] = useState<string[]>([""]);
    const [friendRelation, setFriendRelation] = useState("");
    const [friendMemo, setFriendMemo] = useState("");
    const [friendDirectInput, setFriendDirectInput] = useState("");
    const [isLunar, setIsLunar] = useState<boolean>(false);
    const [birthUnKnown, setBirthUnknown] = useState<boolean>(false);

    const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
    const [inputArray, setInputArray] = useState<string[]>(['','','']);

    const [isValidation, setIsValidation] = useState<boolean[]>([true, true, true]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOkOpen, setIsOkOpen] = useState<boolean>(false);
    // edit
    const [detailInfo, setDetailInfo] = useState<any>();
    let yearF = "";
    let monthF = "";
    let dayF = "";

    useEffect(() => {
        if(getEdit && getEdit === "edit"){
            apiCallSet(getSequence);
        }
    }, []);
    useEffect(() => {
        const nameF = detailInfo?.nickname;

        setFriendMemo(detailInfo?.memo);
        if(detailInfo?.birth === "{}"){
            setBirthUnknown(true);
        }else{
            yearF = detailInfo?.birth?.year;
            monthF = detailInfo?.birth?.month;
            dayF = detailInfo?.birth?.day;
        }
        // setFriendRelation(detailInfo?.relationship);
        // setFriendDirectInput(detailInfo?.nickname);

        if(detailInfo?.isLunar === "N"){
            setIsLunar(false);
        }else{
            setIsLunar(true);
        }
        setIsLunar(detailInfo?.isLunar);

    }, [detailInfo]);
    console.log(detailInfo)
    const apiCallSet = async (sequence:any) => {
        await RootStore.friendStore.getFriendDetail(sequence, setDetailInfo);
    }

    const setContainerHeight = (ref : any, height : string) => {
        if (ref.current) {
            ref.current.style.height = `${height}`;
        }
    }

    const handleInputClick = (index : number) => {
        let list : boolean[] = [...openModal];
        list[index] = true;
        setOpenModal(list);
    }

    // 생일 modal 닫기
    const handleClose = (index : number) => {
        let list : boolean[] = [...openModal];
        list[index] = false;
        setOpenModal(list);
    }
    // handle friend name
    const handleAddName = (): void => {
        setFriendName([...friendName, ""]);
    }
    const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
        const newFriendName = [...friendName];
        newFriendName[index] = event.target.value;
        setFriendName(newFriendName);
    }
    const handleRemoveName = (index: number): void => {
        const newFriendName = [...friendName];
        newFriendName.splice(index, 1);
        setFriendName(newFriendName);
    }

    // handle input text
    const handleRegister = (event: any) => {
        if(event.target.name === "relation"){
            setFriendRelation(event.target.value);
        }else if(event.target.id === "friendMemo"){
            setFriendMemo(event.target.value);
        }else if(event.target.id === "friendDirectInput"){
            setFriendDirectInput(event.target.value);
        }
        if(friendRelation !== "directInput" && friendRelation !== ""){
            setFriendDirectInput("");
        }
    }

    // 등록 완료 후 action
    const handleConfirm = (page : string) => {
        alert("등록이 완료되었습니다.");
        RootStore.friendStore.setRegisterFriend(
            friendName, friendRelation,
            friendDirectInput, friendMemo,
            inputArray[1], isLunar, birthUnKnown
        );
        navigate(`/page/${page}`);
    }

    // 등록 버튼
    const handleSubmit = (page : string) => {

        if(friendName[0] === ""){
            let copy = isValidation;
            copy[0] = false;
            setIsValidation([...copy]);
        }else if(
            (friendRelation === "" && friendDirectInput === "") ||
            (friendRelation === "directInput" && friendDirectInput === "")
        ){
            let copy = isValidation;
            copy[1] = false;
            setIsValidation([...copy]);
        }else if(inputArray[1] === "" && !birthUnKnown){
            let copy = isValidation;
            copy[2] = false;
            setIsValidation([...copy]);
        }else{
            handleConfirm(page);
        }
    }

    const baseUrl = process.env.REACT_APP_SERVICE_URI
    // 삭제 확인 버튼
    const handleDeleteTrue = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/api/friend/${getSequence}`,{
                headers : {
                    Authorization : RootStore.userStore.getJwtKey
                },
            });
            if(response.status === 200){
                setIsOpen(false);
                setIsOkOpen(true);
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <div className="Friend inner">
            <TitleWrap title={`관계 ${getEdit === "edit" ? "수정" : "등록"}하기`} />
            <form className="friend-register-wrap">
                <InputTextBox
                    inputTitle="이름"
                    placeholder="입력하세요 (최대 6자)"
                    id="friendName"
                    friendName={friendName}
                    onChange={handleNameChange}
                    addFriend={handleAddName}
                    removeFriend={handleRemoveName}
                    maxLength={6}
                />
                {!isValidation[0] &&
                    <ErrorMessage message='필수 입력 사항입니다.' />
                }
                <RadioWrap
                    inputTitle='관계'
                    handleRegister={handleRegister}
                    options={
                        [{
                            name : 'relation',
                            id : 'family',
                            htmlFor : 'family',
                            content : '가족',
                            value : '가족',
                        },{
                            name : 'relation',
                            id : 'friend',
                            htmlFor : 'friend',
                            content : '친구',
                            value : '친구',
                        },{
                            name : 'relation',
                            id : 'colleague',
                            htmlFor : 'colleague',
                            content : '동료',
                            value : '동료',
                        }, {
                            name : 'relation',
                            id : 'jiin',
                            htmlFor : 'jiin',
                            content : '지인',
                            value : '지인',
                        }, {
                            name : 'relation',
                            id : 'directInput',
                            htmlFor : 'directInput',
                            content : '직접 입력',
                            value : "directInput",
                        }]
                    }
                />
                {!isValidation[1] &&
                    <ErrorMessage message='필수 선택 사항입니다.' />
                }
                {
                    friendRelation === "directInput" ?
                        <InputTextBox
                            inputTitle=""
                            placeholder="입력하세요 (최대 8자)"
                            id="friendDirectInput"
                            value={friendDirectInput}
                            onChange={handleRegister}
                            maxLength={8}
                        /> : null
                }
                <InputTextBoxWithArrow
                    inputTitle="생일"
                    placeholder={nowDate}
                    id="birth"
                    onClick={() => handleInputClick(1)}
                    value={inputArray[1]}
                    onChange={setBirthUnknown}
                    checked={birthUnKnown}
                />
                {!isValidation[2] &&
                    <ErrorMessage message='필수 입력 사항입니다.' />
                }
                <Calendar
                    isOpen={openModal[1]}
                    onClose={() => handleClose(1)}
                    title="생일"
                    inputArray={inputArray}
                    setInputArray={setInputArray}
                    setContainerHeight={setContainerHeight}
                    id="isLunar"
                    onChange={setIsLunar}
                    checked={isLunar}
                />
                <div className="InputTextBox">
                    <label className="input-title">메모 (선택)</label>
                    <textarea
                        className="input-text-box memo"
                        placeholder="입력하세요 (최대 40자)"
                        id="friendMemo"
                        value={friendMemo}
                        onChange={handleRegister}
                    />
                </div>
                {getEdit === "edit" ?
                    <div className="register-btn-wrap edit">
                        <button type="button" className="register-btn remove" onClick={() => setIsOpen(true)}>
                            <img src={ImgDelBtn} alt="delete-btn" />
                        </button>
                        <button type="button" className="register-btn edit" onClick={() => handleSubmit(`/page/detail?sequence=${getSequence}`)}>저장하기</button>
                    </div> :
                    <div className="register-btn-wrap">
                        <button type="button" className="register-btn" onClick={() => handleSubmit("main")}>등록하기</button>
                        <button type="button" className="register-btn" onClick={() => handleSubmit(`relationship?friendName=${friendName}`)}>등록 후 마음 기록하기</button>
                    </div>
                }
            </form>

            <ModalConfirm
                isOpen={isOpen}
                modalChoice="type2"
                mainText="관계를 삭제하시겠어요?"
                subText="삭제 시 마음 히스토리도 함께 삭제됩니다."
                confirmAction={handleDeleteTrue}
                cancelAction={() => setIsOpen(false)}
                confirmText="삭제"
                cancelText="취소"
            />
            <ModalConfirm
                isOpen={isOkOpen}
                modalChoice="type1"
                mainText="삭제가 완료되었습니다."
                confirmAction={() => navigate("/page/main")}
                confirmText="확인"
            />
        </div>
    )
}

export default Friend;

