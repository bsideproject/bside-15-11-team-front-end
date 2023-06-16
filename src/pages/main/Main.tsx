import React, {useState} from 'react';
import IcSettingBtn from "../../assets/images/icon/ic_setting_btn.png";
import IcPlusBtnWh from "../../assets/images/icon/ic_plus_btn_white.png";
import { inject, observer } from 'mobx-react';
import MainText from "../../components/main/MainText";
import MainExchangedCount from "../../components/main/MainExchangedCount";
import MainSearch from "../../components/main/MainSearch";
import FilterBtn from "../../components/main/MainFilterBtn";
import MainFriendList from "../../components/main/MainFriendList";
import MainRegister from "../../components/main/MainRegister";

const Main = () => {

    const [isEmptyList, setIsEmptyList] = useState<boolean>(false);
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);

    const handleRegisterBtn = () => {
        if(registerBtn){
            setRegisterBtn(false);
        } else {
            setRegisterBtn(true);
        }
    }

    return (
        <div className="Main inner">
            <span className="setting-btn"><img src={IcSettingBtn} alt="setting-btn" /></span>
            <MainText isEmptyList={isEmptyList} />
            <MainExchangedCount />
            <MainSearch />
            <FilterBtn />
            <MainFriendList isEmptyList={isEmptyList} />
            {registerBtn ? <MainRegister handleRegisterBtn={handleRegisterBtn} /> :
                <button type="button" className="add-btn" onClick={handleRegisterBtn}>
                    <span className="add-btn-plus"><img src={IcPlusBtnWh} alt="ic_plus_btn"/></span>
                </button>
            }
        </div>
    );
};


export default inject('RootStore')(observer(Main));
