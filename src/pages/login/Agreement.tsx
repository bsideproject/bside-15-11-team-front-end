import { useState } from 'react';
import terms from '../../assets/terms.json';
import { useNavigate } from 'react-router-dom';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.png';
import IcCheckOn from '../../assets/images/icon/ic_check_on.png';
import IcCheckOff from '../../assets/images/icon/ic_check_off.png';
import { UserPatchRequestProto } from '../../prototypes/user/UserRequestProto';
import RootStore from '../../store/RootStore';
import { KakaoUserResponse } from '../../models/KakaoResponse';
import { OauthServiceTypeProto } from '../../prototypes/common/type/OauthServiceTypeProto';
import { DateProto } from '../../prototypes/common/DateProto';
import { SexTypeProto } from '../../prototypes/common/type/SexTypeProto';
import { AgeRangeTypeProto } from '../../prototypes/common/type/AgeRangeTypeProto';

class Agree {
    label : string | undefined;
    checked : boolean | undefined;

    constructor(label : string, checked : boolean) {
        this.label = label;
        this.checked = checked;
    }
}

function Agreement() {

    const [agreements, setAgreements] = useState<Agree[]>([
        new Agree('[필수] 서비스 이용 약관', false),
        new Agree('[필수] 개인정보 수집 및 이용 동의', false),
        new Agree('[선택] 이벤트 및 마케팅 수신 동의', false),
    ]);

    const [showPopup, setShowPopup] = useState<boolean[]>([false, false, false]);
    const [currentPopupIndex, setCurrentPopupIndex] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState<boolean>(true);

    const navigate = useNavigate();

    const handleAgreement = (index: number) => {
        const updatedAgreements = [...agreements];
        const agreement = updatedAgreements[index];
        if (agreement.checked !== undefined) {
          agreement.checked = !agreement.checked;
          setAgreements(updatedAgreements);
        }
    };

    const closePopup = (index: number) => {
        const updatedShowPopup = [...showPopup];
        updatedShowPopup[index] = false;
        setShowPopup(updatedShowPopup);
        setIsContentVisible(true);
        setCurrentPopupIndex(null);
    }

    const checkAgreements = (): boolean | undefined => {
        for (const agreement of agreements) {
          if (!agreement.checked) {
            return true;
          }
        }
        return false;
    };

    const openPopup = (index : number) => {
        setShowPopup(showPopup.map((_, idx) => idx === index));
        setCurrentPopupIndex(index);
        setIsContentVisible(false);
    }

    const patchUserData = async() => {

        const kakaoData : KakaoUserResponse = await RootStore.kakaoStore.getKakaoUserData();

        const userPatchRequest : UserPatchRequestProto = convertResponse2PatchRequest(kakaoData, OauthServiceTypeProto.KAKAO);

        const patchData = await RootStore.userStore.patchUser(userPatchRequest);

        console.log("patchData : " + JSON.stringify(patchData));

        navigate("/main");
    }

    const convertResponse2PatchRequest = (data : KakaoUserResponse, oauthType : OauthServiceTypeProto) : UserPatchRequestProto => {

        const birthday : string = data.kakao_account?.birthday as string;
    
        const month : number = parseInt(birthday.slice(0,2));
        const day : number = parseInt(birthday.slice(2));
    
        const birthDayObj : DateProto = {
          year : 1995,
          month : month,
          day : day
        };
    
        const sexType : SexTypeProto = data.kakao_account?.gender === 'male' ? SexTypeProto.MALE : SexTypeProto.FEMALE;
    
        const ageRangeText : string = data.kakao_account?.age_range as string;
    
        let ageRange : AgeRangeTypeProto = AgeRangeTypeProto.UNDER_TEEN;
    
        switch(ageRangeText) {
          case '1~9' :
            ageRange = AgeRangeTypeProto.UNDER_TEEN;
            break;
          case '10~14' :
            ageRange = AgeRangeTypeProto.TEENS;
            break;
          case '15~19' :
            ageRange = AgeRangeTypeProto.TEENS;
            break;
          case '20~29' :
            ageRange = AgeRangeTypeProto.TWENTIES;
            break;
          case '30~39' :
            ageRange = AgeRangeTypeProto.THIRTIES;
            break;
          case '40~49' :
            ageRange = AgeRangeTypeProto.FORTIES;
            break;
          case '50~59' :
            ageRange = AgeRangeTypeProto.FIFTIES;
            break;
          case '60~69' :
            ageRange = AgeRangeTypeProto.OVER_FIFTY;
            break;
          case '70~79' :
            ageRange = AgeRangeTypeProto.OVER_FIFTY;
            break;
          case '80~89' :
            ageRange = AgeRangeTypeProto.OVER_FIFTY;
            break;
          case '90~' :
            ageRange = AgeRangeTypeProto.OVER_FIFTY;
            break;
          default :
            break;
        }
    
        const request : UserPatchRequestProto = {
          oauthServiceType : oauthType,
          serviceUserId : data.id,
          userInformation : {
            profileImageLink : data.properties?.profile_image,
            profileNickname : data.properties?.nickname,
            sexType : sexType,
            ageRangeType : ageRange,
            birth : birthDayObj
          }
        }
    
        return request;
      }

    return (
        <div className='agreement-page'>
            {isContentVisible && (
            <div className="agreement">
                <p>서비스 이용을 위해 동의가 필요해요</p>
                <form>
                    {agreements.map((agreement, index) => (
                        <div key={index} className='row'>
                            <label>
                                <div style={{width : '5vw', display : 'block', float : 'left'}}>
                                    <img 
                                        onClick={() => handleAgreement(index)}
                                        src={agreement.checked ? IcCheckOn : IcCheckOff}
                                        alt='agree'
                                    />
                                </div>
                                <div style={{float : 'left'}}>
                                    {agreement.label}
                                </div>
                                <div style={{width : '4vw', display : 'block', float : 'left', marginLeft : '2vw'}}>
                                    <img
                                        onClick={() => openPopup(index)}
                                        src={IcFrontBtn}
                                        alt='open-popup'
                                    />
                                </div>
                            </label>
                        </div>
                    ))}
                    <button id="agreement-submit"
                        disabled={checkAgreements()}
                        onClick={(e) => {
                            e.preventDefault();
                            patchUserData();
                        }}>
                        동의 후 시작하기
                    </button>
                </form>
            </div>
            )}
            {
                currentPopupIndex !== null && (
                    <>
                        <div className="popup" style={{overflow : "scroll"}}>
                            <div dangerouslySetInnerHTML={{__html : terms.ServiceUseTerm}}
                                className='term'></div>
                        </div>
                        <div>
                            <button onClick={() => {closePopup(currentPopupIndex)}}
                              className='close-button'>닫기</button>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Agreement;