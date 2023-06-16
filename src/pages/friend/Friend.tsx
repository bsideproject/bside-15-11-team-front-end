import React from 'react';
import TitleWrap from "../../components/common/TitleWrap";
import InputTextBox from "../../components/common/InputTextBox";
import RelationWrap from "../../components/friend/RelationWrap";

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
                <RelationWrap />
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
