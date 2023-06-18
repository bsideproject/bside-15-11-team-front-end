import React from 'react';
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import RadioWrap from "../../components/common/RadioWrap";

const Friend = () => {
    return(
        <div className="Friend inner">
            <TitleWrap title="친구 등록하기" />
            <form className="friend-register-wrap">
                <InputTextBox
                    inputTitle="이름 (필수)"
                    placeholder="입력하세요."
                    id="friendName"
                    value=""
                    onChange=""
                />
                <RadioWrap 
                    inputTitle='관계 (필수)'
                    options={
                        [
                            {
                                name : 'relation',
                                id : 'family',
                                htmlFor : 'family',
                                content : '가족'
                            },{
                                name : 'relation',
                                id : 'friend',
                                htmlFor : 'friend',
                                content : '친구'
                            },{
                                name : 'relation',
                                id : 'colleague',
                                htmlFor : 'colleague',
                                content : '동료'
                            }, {
                                name : 'relation',
                                id : 'jiin',
                                htmlFor : 'jiin',
                                content : '지인'
                            }, {
                                name : 'relation',
                                id : 'directInput',
                                htmlFor : 'directInput',
                                content : '직접 입력'
                            }
                        ]
                    }
                />
                <InputTextBox
                    inputTitle="메모"
                    placeholder="입력하세요. (최대 50자)"
                    id="friendMemo"
                    value=""
                    onChange=""
                />
                <div className="register-btn-wrap">
                    <button type="button" className="register-btn">등록하기</button>
                    <button type="button" className="register-btn">등록 후 마음 기록하기</button>
                </div>
            </form>
        </div>
    )
}

export default Friend;
