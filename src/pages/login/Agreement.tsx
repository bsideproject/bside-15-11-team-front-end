import { useState } from 'react';
import terms from '../../assets/terms.json';
import { useNavigate } from 'react-router-dom';
import IcFrontBtn from '../../assets/images/icon/ic_front_btn.png';
import IcCheckOn from '../../assets/images/icon/ic_check_on.png';
import IcCheckOff from '../../assets/images/icon/ic_check_off.png';

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

    const go2MainPage = () => {
        navigate("/main");
    }

    return (
        <div className='agreement-page'>
            {isContentVisible && (
            <div className="agreement">
                <p>서비스 이용을 위해 동의가 필요해요</p>
                <form>
                    {agreements.map((agreement, index) => (
                        <p key={index}>
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
                                <div style={{width : '2vw', display : 'block', float : 'left', marginLeft : '2vw'}}>
                                    <img
                                        onClick={() => openPopup(index)}
                                        src={IcFrontBtn}
                                        alt='open-popup'
                                    />
                                </div>
                            </label>
                        </p>
                    ))}
                    <button id="agreement-submit"
                        disabled={checkAgreements()}
                        onClick={() => go2MainPage()}>
                        동의 후 시작하기
                    </button>
                </form>
            </div>
            )}
            {
                currentPopupIndex !== null && (
                    <>
                        <div className="popup" style={{overflow : "scroll"}}>
                            <div dangerouslySetInnerHTML={{__html : terms.ServiceUseTerm}}></div>
                        </div>
                        <div>
                            <button onClick={() => {closePopup(currentPopupIndex)}}>닫기</button>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Agreement;