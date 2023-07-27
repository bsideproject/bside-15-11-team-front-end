import TitleWrap from "../../components/common/TitleWrap";
import React, {useState, useRef} from "react";
import ModalConfirm from "../../components/common/ModalConfirm";
import {useNavigate} from "react-router-dom";
import RootStore from "../../store/RootStore";

const SettingWithdrawal = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOkOpen, setIsOkOpen] = useState<boolean>(false);
    const [reason, setReason] = useState<any>("");
    const [etcReason, setEctReason] = useState<any>("");

    const etcRef = useRef<HTMLInputElement>(null);

    const handleReason = (event:any) => {

        if(event.target.name === "withdrawal"){
            setReason(event.target.id);
        }else if(event.target.id === "etc"){
            setEctReason(event.target.value);
        }
    }

    const handleWithdrawal = () => {
        setIsOpen(true);
    }

    const withdrawalConfirm = async() => {
        setIsOpen(false); 
        setIsOkOpen(true);

        await RootStore.userStore.deleteUser(reason);

        
    }

    return(
        <div className="SettingWithdrawal inner">
            <TitleWrap title="회원 탈퇴" />
            <div className="setting-cont">
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="a" onChange={handleReason} />
                    <label htmlFor="a"></label>
                    이용이 불편하고 장애가 많아요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="b" onChange={handleReason} />
                    <label htmlFor="b"></label>
                    삭제하고 싶은 내용이 있어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="c" onChange={handleReason} />
                    <label htmlFor="c"></label>
                    나에게 필요한 기능이 없어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="d" onChange={handleReason} />
                    <label htmlFor="d"></label>
                    다른 서비스를 대신 사용하게 되었어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="e" onChange={handleReason} />
                    <label htmlFor="e"></label>
                    사용 빈도가 너무 낮아요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="f" onChange={handleReason} ref={etcRef}/>
                    <label htmlFor="f"></label>
                    기타
                    <textarea
                        className="etc-input"
                        placeholder="입력하세요 (최대 40자)"
                        id="etc"
                        disabled={!etcRef.current?.checked}
                        onChange={handleReason}
                        value={etcReason}
                    />
                </label>
            </div>
            <div className="save-button-wrap">
                <button
                    className="save-button"
                    onClick={handleWithdrawal}
                    disabled={reason === ""}
                >탈퇴하기</button>
            </div>
            <ModalConfirm
                isOpen={isOpen}
                modalChoice="type2"
                mainText="회원을 탈퇴하시겠어요?"
                subText="탈퇴하면 등록된 모든 정보가 영구적으로 삭제되며 다시 복구할 수 없습니다."
                confirmAction={() => {withdrawalConfirm()}}
                cancelAction={() => setIsOpen(false)}
                confirmText="탈퇴"
                cancelText="취소"
            />
            <ModalConfirm
                isOpen={isOkOpen}
                modalChoice="type1"
                mainText="회원이 탈퇴되었습니다."
                confirmAction={() => window.ReactNativeWebView.postMessage('logout')}
                confirmText="확인"
            />
        </div>
    )
}

export default SettingWithdrawal;
