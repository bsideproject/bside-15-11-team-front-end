import TitleWrap from "../../components/common/TitleWrap";
import React from "react";
import {Link} from "react-router-dom";
import IcFrontBtn from "../../assets/images/icon/ic_front_btn.svg";

const SettingTerms = () => {
    return(
        <div className="SettingTerms inner">
            <TitleWrap title="이용 약관" />
            <div className="setting-cont">
                <Link target="_blank" to="/page/setting/term/1" className="setting-list">서비스 이용약관<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
                <Link target="_blank" to="/page/setting/term/2" className="setting-list">개인 정보 수집 및 이용 안내<i><img src={IcFrontBtn} alt="arr-icon" /></i></Link>
            </div>
        </div>
    )
}

export default SettingTerms;
