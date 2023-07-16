import React, {useEffect, useState} from "react";
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import ModalConfirm from "../../components/common/ModalConfirm";
import {useNavigate} from "react-router-dom";

const SettingNickname = () => {

    const getNick = new URLSearchParams(window.location.search).get("nick");

    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        getNick && setNickname(getNick);
    }, []);

    const handleNick = (event:any) => {
        if(event.target.id === "nickName"){
            setNickname(event.target.value);
        }
    }
    const handleSubmit = () => {
        setIsOpen(true);
    }

    return(
        <div className="SettingNickname inner">
            <TitleWrap title="닉네임 변경" />
            <InputTextBox
                inputTitle="닉네임"
                placeholder="입력하세요 (최대 6자)"
                id="nickName"
                maxLength={6}
                onChange={handleNick}
                value={nickname || ""}
            />
            <div className="save-button-wrap">
                <button
                    className='save-button'
                    disabled={nickname === getNick}
                    onClick={handleSubmit}
                >저장하기</button>
            </div>
            <ModalConfirm
                isOpen={isOpen}
                modalChoice="type1"
                mainText="변경이 완료되었습니다."
                confirmAction={() => navigate("/page/main")}
                confirmText="확인"
            />
        </div>
    )
}

export default SettingNickname;
