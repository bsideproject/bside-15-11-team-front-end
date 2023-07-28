import TitleWrap from "../../components/common/TitleWrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.svg';
import ModalConfirm from "../../components/common/ModalConfirm";
import RootStore from "../../store/RootStore";

const Setting = () => {

    const getNick = RootStore.userStore.getUserName;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOkOpen, setIsOkOpen] = useState<boolean>(false);

    const logOut = () => {
        window.ReactNativeWebView.postMessage('logout');
    }

    return(
        <div className="Setting inner">
            <TitleWrap title="설정" />
            <div className="setting-cont">
                <div className="user-name">
                    <span>{getNick}님</span>
                </div>
                <Link to={`/page/setting/nickname?nick=${getNick}`} className="setting-list">닉네임 변경<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
            </div>
            <div className="setting-cont">
                <Link to="/page/setting/optin" className="setting-list">이벤트 및 마케팅 수신 동의<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
                <Link to="" className="setting-list">1:1 문의하기<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
                <span className="setting-list">버전<em>v1.0.0</em></span>
                <Link to="/page/setting/terms" className="setting-list">이용약관<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
            </div>
            <div className="setting-cont">
                <span onClick={() => setIsOpen(true)} className="setting-list">로그아웃<i><img src={IcFrontBtn} alt="arr-icon" /></i></span>
            </div>
            <Link to="/page/setting/withdrawal" className="withdrawal">회원 탈퇴</Link>
            <ModalConfirm
                isOpen={isOpen}
                modalChoice="type2"
                mainText="로그아웃 하시겠어요?"
                subText=""
                confirmAction={() => {setIsOpen(false); setIsOkOpen(true);}}
                cancelAction={() => setIsOpen(false)}
                confirmText="확인"
                cancelText="취소"
            />
            <ModalConfirm
                isOpen={isOkOpen}
                modalChoice="type1"
                mainText="로그아웃 되었습니다."
                confirmAction={() => logOut()}
                confirmText="확인"
            />
        </div>
    )
}

export default Setting;
