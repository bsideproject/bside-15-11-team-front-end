import React from 'react';
import IcCloseBtn from "../../assets/images/icon/ic_close_btn2.png";
import { FriendCheck } from '../../models/FriendCheck';

interface PropsType {
    friendCheck: FriendCheck,
    updateCheck: (arg0: FriendCheck) => void,
}

const SelectedFriendCard = ({ friendCheck, updateCheck }: PropsType) => {
    return (
        <div className="selected-friend-card">
            <div className='name'>{friendCheck.friend.name}</div>
            <div onClick={() => updateCheck(friendCheck)}><img src={IcCloseBtn} alt="close" /></div>
        </div>
    );
};

export default SelectedFriendCard;