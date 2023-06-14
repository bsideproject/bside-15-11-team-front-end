import React from 'react';
import RootStore from '../../store/RootStore';
import { inject, observer } from 'mobx-react';
import {ReactComponent as SettingBtn} from '../../assets/svg/setting.svg';

const Main = () => {
    return (
        <div id="main-page">
            <div className="setting-bar">
                <SettingBtn />
            </div>
            <div className="guide-text-div">
                <p>
                    친구를 등록하고
                </p>
                <p>
                    주고 받은 마음을 기록해보세요.
                </p>
            </div>
            <div id="mind-info">
                <div className='mind-count'>
                    준마음 <span>{RootStore.mindStore.getGiveCount}회</span>
                </div>
                <div className='mind-count'>
                    받은 마음 <span>{RootStore.mindStore.getTakeCount}회</span>
                </div>
            </div>
        </div>
    );
};

export default inject('RootStore')(observer(Main));
