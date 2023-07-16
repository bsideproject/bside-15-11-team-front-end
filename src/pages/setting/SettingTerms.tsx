import TitleWrap from "../../components/common/TitleWrap";
import React from "react";
import {Link} from "react-router-dom";
import IcFrontBtn from "../../assets/images/icon/ic_front_btn.svg";

const SettingTerms = () => {
    return(
        <div className="SettingTerms inner">
            <TitleWrap title="이벤트 및 마케팅 수신 동의" />
            <div className="setting-cont">
                <Link to="" className="setting-list">서비스 이용약관<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
                <Link to="" className="setting-list">개인 정보 수집 및 이용 안내<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
            </div>
        </div>
    )
}

export default SettingTerms;
