import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPatchRequestProto } from '../../prototypes/user/UserRequestProto';
import RootStore from '../../store/RootStore';
import { KakaoUserResponse } from '../../models/KakaoResponse';
import { OauthServiceTypeProto } from '../../prototypes/common/type/OauthServiceTypeProto';
import { DateProto } from '../../prototypes/common/DateProto';
import { SexTypeProto } from '../../prototypes/common/type/SexTypeProto';
import { AgeRangeTypeProto } from '../../prototypes/common/type/AgeRangeTypeProto';
import IcChecked from '../../assets/images/icon/ic_checked.png';
import IcUnchecked from '../../assets/images/icon/ic_unchecked.png';

function Agreement() {

    const navigate = useNavigate();

    const [check1, setCheck1] = useState<boolean>(false);
    const [check2, setCheck2] = useState<boolean>(false);

    const checkRef1 = useRef<HTMLInputElement>(null);
    const checkRef2 = useRef<HTMLInputElement>(null);

    const patchUserData = async() => {

        const kakaoData : KakaoUserResponse = await RootStore.kakaoStore.getKakaoUserData();

        const userPatchRequest : UserPatchRequestProto = convertResponse2PatchRequest(kakaoData, OauthServiceTypeProto.KAKAO);

        const patchData = await RootStore.userStore.patchUser(userPatchRequest);

        console.log("patchData : " + JSON.stringify(patchData));

        navigate("/page/main");
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

    const checkAll = () : void => {
      if (check1 && check2) {
        setCheck1(false);
        setCheck2(false);

        if (checkRef1.current) {
          checkRef1.current.checked = false;
        }

        if (checkRef2.current) {
          checkRef2.current.checked = false;
        }

      } else {
        setCheck1(true);
        setCheck2(true);

        if (checkRef1.current) {
          checkRef1.current.checked = true;
        }

        if (checkRef2.current) {
          checkRef2.current.checked = true;
        }
      }
    }

    return (
        <div className='agreement-page'>
          <div className="term-header">
            <span className='title'>서비스 사용을 위한</span>
            <span className='title'>약관에 동의해주세요.</span>
          </div>
          <div className='term-body'>
            <div className='term-row'>
                <input type="checkbox" id="check-all" 
                  onClick={() => checkAll()}/>
                <label htmlFor='check-all'>전체 선택</label>
            </div>
            <div className='term-row'>
              <input type="checkbox" id="check1" 
                ref={checkRef1}
                onClick={() => setCheck1(!check1)}/>
              <label htmlFor='check1'>
                <span className='term-text'>별자취 </span>
                <span className='term-text-click'>이용약관 </span>
                <span className='term-text'>및 </span>
                <span className='term-text-click'>개인정보 수집 및 이용</span>
                <span className='term-text'>에 동의합니다.</span>
                <span className='mandatory'>(필수)</span>
              </label>
            </div>
            <div className='term-row'>
              <input type="checkbox" id="check2" 
                ref={checkRef2}
                onClick={() => setCheck2(!check2)}/>
              <label htmlFor='check2'>
                <span className='term-text'>이벤트 및 마케팅 수신 동의(선택)</span>
              </label>
            </div>
          </div>
          <div className='button-div'>
            <button className='next-button' disabled={!check1}
              onClick={() => patchUserData()}>
              다음
            </button>
          </div>
        </div>
    );
};

export default Agreement;