import React from "react";

const RelationWrap = () => {
    return (
        <div className="RelationWrap">
            <label className="input-title">관계 (필수)</label>
            <div className="relation-wrap">
                <input type="radio" name="relation" id="family" />
                <label htmlFor="family">가족</label>
                <input type="radio" name="relation" id="friend" />
                <label htmlFor="friend">친구</label>
                <input type="radio" name="relation" id="colleague" />
                <label htmlFor="colleague">동료</label>
                <input type="radio" name="relation" id="jiin" />
                <label htmlFor="jiin">지인</label>
                <input type="radio" name="relation" id="directInput" />
                <label htmlFor="directInput">직접 입력</label>
            </div>
        </div>
    )
}

export default RelationWrap;

