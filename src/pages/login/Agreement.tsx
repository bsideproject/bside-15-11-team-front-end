import { RightOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';

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

    return (
        <div className='agreement-page'>
            {isContentVisible && (
            <div className="agreement">
                <p>서비스 이용을 위해 동의가 필요해요</p>
                <form>
                    {agreements.map((agreement, index) => (
                        <p key={index}>
                            <label>
                                <CheckOutlined
                                    onClick={() => handleAgreement(index)}
                                    style={{ color: agreement.checked ? 'blue' : 'gray' }}
                                />
                                {agreement.label}
                                <RightOutlined 
                                    style={{color : 'gray'}}
                                    onClick={() => openPopup(index)}
                                />
                            </label>
                        </p>
                    ))}
                    <button id="agreement-submit"
                        disabled={checkAgreements()}>
                        동의 후 시작하기
                    </button>
                </form>
            </div>
            )}
            {
                currentPopupIndex !== null && (
                    <div className='popup'>
                        <p>Description of Agreement {currentPopupIndex + 1}</p>
                        <button onClick={() => closePopup(currentPopupIndex)}>Close</button>
                    </div>
                )
            }
        </div>
    );
};

export default Agreement;