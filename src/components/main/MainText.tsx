import React from "react";

interface PropsType{
    isEmptyList: boolean,
}

const MainText = ({ isEmptyList }:PropsType) => {
    return(
        <div className="MainText">
            {isEmptyList ?
                    <p className="main-text">친구를 등록하고<br/>주고 받은 마음을 기록해보세요.</p> :
                    <p className="main-text">유주님은 <em className="color">8명</em>의 친구와<br/>총 <em className="color">8번</em>의 마음을 기록했어요.</p>
            }
        </div>
    )
}

export default MainText;
