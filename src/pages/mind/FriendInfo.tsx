import IcCheckOn from '../../assets/images/icon/ic_check_on_og.svg'
import IcCheckOff from '../../assets/images/icon/ic_check_off.svg'
import { FriendCheck } from '../../models/FriendCheck';

interface PropTypes {
    friendCheck: FriendCheck
    updateCheck: (arg0: FriendCheck) => void
}

const FriendInfo = ({ friendCheck, updateCheck }: PropTypes) => {

    const check = () => {
        updateCheck(friendCheck);
    }

    return friendCheck.display ? (
        <div className='select-friend' onClick={() => check()}>
            <div className='friend-info'>
                <p>{friendCheck.friend.name}</p>
            </div>
            <div style={{ width: '24px', flexShrink: '0' }}>
                <img src={friendCheck.check ? IcCheckOn : IcCheckOff} alt='check' />
            </div>
        </div>
    ) : (<></>);
};

export default FriendInfo;
