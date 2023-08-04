import TitleWrap from "../../components/common/TitleWrap";
import React, {useEffect, useState} from "react";
import RootStore from "../../store/RootStore";
import {get} from "../../apis/RestApis";

const SettingOptIn = () => {

    const baseUrl = process.env.REACT_APP_SERVICE_URI
    const [agree, setAgree] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        getAgreeState()
    }, []);

    const handleAgree = async(event:any) => {
        const { checked } = event.target;
        setAgree(checked);

        await RootStore.userStore.changeAllowInformation(checked);
    };

    const getAgreeState = async () => {
        try{
            const res = await get(`${baseUrl}/api/users`, {
                headers : {
                    Authorization : RootStore.userStore.getJwtKey
                },
            });
            // @ts-ignore
            setAgree(res?.allowInformation.eventMarketingYn)
        }catch (err){
            console.log(err);
        }
    }

    const handleModal = () => {
        if(agree){
            setText("이벤트 및 마케팅 수신 동의를 해제하셨습니다.");
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 1500);
        }else{
            setText("이벤트 및 마케팅 수신을 동의하셨습니다.");
            setActive(true);
            setTimeout(() => {
                setActive(false);
            }, 1500);
        }
    }

    return(
        <div className="SettingOptIn inner">
            <TitleWrap title="이벤트 및 마케팅 수신 동의" />
            <div className="setting-cont">
                <span className="setting-list">이벤트 및 마케팅 수신 동의
                    <label onClick={handleModal}>
                        <input
                            role="switch"
                            type="checkbox"
                            checked={agree}
                            onChange={handleAgree} // 체크박스 변경 시 핸들러 호출
                        />
                    </label>
                </span>
            </div>
            <p className={active ? "optin-modal active" : "optin-modal"}>{text}</p>
        </div>
    )
}

export default SettingOptIn;
