import TitleWrap from "../../components/common/TitleWrap";
import React from "react";

const SettingOptIn = () => {
    return(
        <div className="SettingOptIn inner">
            <TitleWrap title="이벤트 및 마케팅 수신 동의" />
            <div className="setting-cont">
                <span className="setting-list">이벤트 및 마케팅 수신 동의<label><input role="switch" type="checkbox" /></label></span>
            </div>
        </div>
    )
}

export default SettingOptIn;
