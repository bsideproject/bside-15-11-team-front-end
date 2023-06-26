import React, {useState} from 'react';
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import RadioWrap from "../../components/common/RadioWrap";

const Friend = () => {

    const [friendName, setFriendName] = useState("");
    const [friendRelation, setFriendRelation] = useState("");
    const [friendMemo, setFriendMemo] = useState("");
    const [friendDirectInput, setFriendDirectInput] = useState("");

    const handleRegister = (event: any) => {
        if(event.target.id === "friendName"){
            setFriendName(event.target.value);
        }else if(event.target.name === "relation"){
            setFriendRelation(event.target.value);
        }else if(event.target.id === "friendMemo"){
            setFriendMemo(event.target.value);
        }else if(event.target.id === "friendDirectInput"){
            setFriendDirectInput(event.target.value);
        }
    }

    const handleConfirm = () => {
        alert("등록이 완료되었습니다.");
        console.log(
            "friendName: "+ friendName,
            "friendRelation: "+ friendRelation,
            "friendDirectInput: "+ friendDirectInput,
            "friendMemo: "+ friendMemo,
        );
    }

    const handleSubmit = () => {
        if(friendName !== "" && friendRelation !== ""){
            if(friendRelation !== "directInput"){
                handleConfirm();
            }else if(friendRelation === "directInput" && friendDirectInput !== ""){
                handleConfirm();
            }else{
                alert("이름 또는 관계를 확인해주세요.");
            }
        }else{
            alert("이름 또는 관계를 확인해주세요.");
        }
    }

    return(
        <div className="Friend inner">
            <TitleWrap title="관계 등록하기" />
            <form className="friend-register-wrap">
                <InputTextBox
                    inputTitle="이름"
                    placeholder="입력하세요 (최대 8자)"
                    id="friendName"
                    value={friendName}
                    onChange={handleRegister}
                />
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
                {
                    friendRelation === "directInput" ?
                        <InputTextBox
                            inputTitle=""
                            placeholder="입력하세요 (최대 8자)"
                            id="friendDirectInput"
                            value={friendDirectInput}
                            onChange={handleRegister}
                        /> : null
                }
                <InputTextBox
                    inputTitle="메모 (선택)"
                    placeholder="입력하세요 (최대 40자)"
                    id="friendMemo"
                    value={friendMemo}
                    onChange={handleRegister}
                />
                <div className="register-btn-wrap">
                    <button type="button" className="register-btn" onClick={handleSubmit}>등록하기</button>
                    <button type="button" className="register-btn">등록 후 마음 기록하기</button>
                </div>
            </form>
        </div>
    )
}

export default Friend;

