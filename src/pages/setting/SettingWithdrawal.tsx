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
    const [etcReason, setEctReason] = useState<string>("");

    const [checkList, setCheckList] = useState<boolean[]>([false, false, false, false, false, false]);

    const handleReason = (index : number) => {

        let tempList = [...checkList];

        tempList[index] = !tempList[index];

        console.log("check : " + index, tempList[index]);

        setCheckList(tempList);
    }

    const handleEtcReason = (e : any) => {
        setEctReason(e.target.value);
    }

    const handleWithdrawal = () => {
        setIsOpen(true);
    }

    const withdrawalConfirm = async() => {
        setIsOpen(false); 
        setIsOkOpen(true);

        // 별자취 db에서 내용 삭제
        await RootStore.userStore.deleteUser(reason);
    }

    const logOut = () => {
        window.ReactNativeWebView.postMessage('logout');
    }

    return(
        <div className="SettingWithdrawal inner">
            <TitleWrap title="회원 탈퇴" />
            <div className="setting-cont">
                <label className="setting-list">
                    <input type="radio" name="withdrawal" id="a" onClick={()=> handleReason(0)}
                        checked={checkList[0]} readOnly
                    />
                    <label htmlFor="a"></label>
                    이용이 불편하고 장애가 많아요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawalB" id="b" onClick={()=> handleReason(1)} 
                        checked={checkList[1]} readOnly
                    />
                    <label htmlFor="b"></label>
                    삭제하고 싶은 내용이 있어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawalC" id="c" onClick={()=> handleReason(2)} 
                        checked={checkList[2]} readOnly
                    />
                    <label htmlFor="c"></label>
                    나에게 필요한 기능이 없어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawalD" id="d" onClick={()=> handleReason(3)} 
                        checked={checkList[3]} readOnly
                    />
                    <label htmlFor="d"></label>
                    다른 서비스를 대신 사용하게 되었어요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawalE" id="e" onClick={()=> handleReason(4)} 
                        checked={checkList[4]} readOnly
                    />
                    <label htmlFor="e"></label>
                    사용 빈도가 너무 낮아요.
                </label>
                <label className="setting-list">
                    <input type="radio" name="withdrawalF" id="f"
                        onClick={()=> handleReason(5)} checked={checkList[5]} readOnly
                    />
                    <label htmlFor="f"></label>
                    기타
                    <textarea
                        className="etc-input"
                        placeholder="입력하세요 (최대 40자)"
                        id="etc"
                        disabled={!checkList[5]}
                        onChange={handleEtcReason}
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
                confirmAction={() => logOut()}
                confirmText="확인"
            />
        </div>
    )
}

export default SettingWithdrawal;
