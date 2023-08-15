import React, {useEffect, useState} from 'react';
import ImgDelBtn from "../../assets/images/icon/ic_delete.svg";
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import RadioWrap from "../../components/common/RadioWrap";
import InputTextBoxWithArrow from "../../components/common/InputTextBoxWithArrow";
import RootStore from "../../store/RootStore";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import ModalConfirm from "../../components/common/ModalConfirm";
import axios from "axios";
import DatePickers from "../../components/common/DatePickers";
import { RelationshipResponseProto } from '../../prototypes/relationship/RelationshipResponseProto';

const Friend = () => {
    let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    let navigate = useNavigate();
    const getSequence:string|null = new URLSearchParams(window.location.search).get("sequence");
    const getEdit:string|null = new URLSearchParams(window.location.search).get("edit");
    // 오늘 날짜
    let now = new Date();
    let year= now.getFullYear();
    let month = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0'+(now.getMonth() + 1);
    let date = (now.getDate() + 1) > 9 ? (now.getDate()) : '0'+(now.getDate());
    let nowDate = `${year}-${month}-${date}`;

    const relation = ["가족", "친구", "동료", "지인"];
    const [friendName, setFriendName] = useState<string[]>([""]);
    const [friendRelation, setFriendRelation] = useState("");
    const [friendMemo, setFriendMemo] = useState("");
    const [friendDirectInput, setFriendDirectInput] = useState("");
    const [isLunar, setIsLunar] = useState<boolean>(false);
    const [birthUnKnown, setBirthUnknown] = useState<boolean>(true);

    const [openModal, setOpenModal] = useState<boolean[]>([false, false, false]);
    const [inputArray, setInputArray] = useState<string[]>(['','','']);

    const [isValidation, setIsValidation] = useState<boolean[]>([true, true, true, true, true]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOkOpen, setIsOkOpen] = useState<boolean>(false);
    const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false);
    const [goRegister, setGoRegister] = useState<boolean>(false);
    // edit
    const [detailInfo, setDetailInfo] = useState<any>();

    const [registerResponse, setRegisterResponse] = useState<RelationshipResponseProto>();

    useEffect(() => {
        if(getEdit && getEdit === "edit"){
            apiCallSet(getSequence);
        }
    }, []);

    useEffect(() => {
        // 이름
        detailInfo && setFriendName([detailInfo?.nickname]);
        // 메모
        detailInfo && setFriendMemo(detailInfo?.memo);
        // 관계
        if(detailInfo && !relation.includes(detailInfo?.relationship)){
            setFriendRelation("directInput")
            setFriendDirectInput(detailInfo?.relationship);
        }else{
            detailInfo && setFriendRelation(detailInfo?.relationship);
        }
        // 생일
        if(detailInfo && Object.keys(detailInfo?.birth).length !== 0){
            setBirthUnknown(false);
            let copy = [...inputArray];

            const year = detailInfo?.birth?.date?.year;
            const month = detailInfo?.birth?.date?.month;
            const day = detailInfo?.birth?.date?.day;

            if (year && month && day) {

                copy[1] = detailInfo && `${detailInfo?.birth?.date?.year}-${detailInfo?.birth?.date?.month < 10 ? "0"+detailInfo?.birth?.date?.month : detailInfo?.birth?.date?.month}-${detailInfo?.birth?.date?.day < 10 ? "0"+detailInfo?.birth?.date?.day : detailInfo?.birth?.date?.day}`;
                
                detailInfo && setInputArray(copy);
            }
        }else{
            setBirthUnknown(true);
            let copy = [...inputArray];
            copy[1] = detailInfo && ``;
            detailInfo && setInputArray(copy);
        }
        if(detailInfo && detailInfo?.birth?.isLunar === "N"){
            setIsLunar(false);
        }else{
            detailInfo && setIsLunar(true);
        }

    }, [detailInfo]);

    // 등록된 정보 불러오기
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
    const handleConfirm = async () => {
        await RootStore.friendStore.setRegisterFriend(
            friendName, friendRelation,
            friendDirectInput, friendMemo,
            inputArray[1], isLunar, birthUnKnown,
            getEdit && getEdit,getSequence && getSequence,
            setRegisterResponse
        );
    }

    // 등록 버튼
    const handleSubmit = () => {

        let copy = isValidation;

        // name check
        for (const name of friendName) {
            if(name === ""){
                copy[0] = false;
                setIsValidation([...copy]);
                break;
            } else if (regExp.test(name)) {
                copy[3] = false;
                setIsValidation([...copy]);
                break;
            } else{
                copy[3] = true;
                setIsValidation([...copy]);
            }
        }
        // relation check
        if(
            (friendRelation === "" && friendDirectInput === "") ||
            (friendRelation === "directInput" && friendDirectInput === "")
        ){
            copy[1] = false;
            setIsValidation([...copy]);
        }else{
            copy[1] = true;
            setIsValidation([...copy]);
        }
        if(friendRelation === "directInput" && regExp.test(friendDirectInput)){
            copy[4] = false;
            setIsValidation([...copy]);
        }else{
            copy[4] = true;
            setIsValidation([...copy]);
        }
        // birth check
        if(inputArray[1] === "" && !birthUnKnown){
            copy[2] = false;
            setIsValidation([...copy]);
        }else{
            copy[2] = true;
            setIsValidation([...copy]);
        }

        for (const check of copy) {
            if (!check) {
                return;
            }
        }

        // success
        handleConfirm();
        setIsSaveOpen(true);
    }

    const baseUrl = process.env.REACT_APP_SERVICE_URI
    // 삭제 확인 버튼
    const handleDeleteTrue = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/api/friends/${getSequence}`,{
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

    const confirmNavigation = () => {
        if (getEdit === "edit") {
            navigate(`/page/detail?sequence=${getSequence}`);
        } else {
            if (goRegister) {
                navigate('/page/relationship',
                {state :
                    {
                        friendData : registerResponse
                    }
                });
            } else {
                navigate('/page/main');
            }
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
                    getEdit={getEdit}
                />
                {!isValidation[0] &&
                    <ErrorMessage message='필수 입력 사항입니다.' />
                }
                {!isValidation[3] &&
                    <ErrorMessage message='사용할 수 없는 문자가 포함되어 있습니다.' />
                }
                <RadioWrap
                    inputTitle='관계'
                    handleRegister={handleRegister}
                    friendRelation={friendRelation}
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
                {!isValidation[4] &&
                    <ErrorMessage message='사용할 수 없는 문자가 포함되어 있습니다.' />
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
                    value={
                        !isLunar ? `${inputArray[1]}` :
                        detailInfo && Object.keys(detailInfo?.birth).length === 0 ?
                            `${inputArray[1]}` : `${inputArray[1]} (음력)`
                    }
                    onChange={setBirthUnknown}
                    checked={birthUnKnown}
                    inactive={friendName.length > 1}
                />
                {!isValidation[2] &&
                    <ErrorMessage message='필수 입력 사항입니다.' />
                }
                <DatePickers
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
                        wrap="hard"
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
                        <button type="button" className="register-btn edit" onClick={handleSubmit}>저장하기</button>
                    </div> :
                    <div className="register-btn-wrap">
                        <button type="button" className="register-btn" onClick={handleSubmit}>저장하기</button>
                        <button type="button" className="register-btn" onClick={() => {setGoRegister(true); handleSubmit()}
                        }>바로 마음 기록하기</button>
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
            <ModalConfirm
                isOpen={isSaveOpen}
                modalChoice="type1"
                mainText="등록이 완료되었습니다."
                confirmAction={() => confirmNavigation()}
                confirmText="확인"
            />
        </div>
    )
}

export default Friend;

