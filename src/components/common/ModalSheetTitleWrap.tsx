import React from 'react';
import IcCloseUnionBtn from '../../assets/images/icon/ic_close_union_btn.png';

interface PropsType {
    title : string,
    onClose : any
}

const ModalSheetTitleWrap = ({title, onClose} : PropsType) => {
    return (
        <div className='title-wrap'>
            <h2 className='title'>{title}</h2>
            <button className='save-button'>
                <img src={IcCloseUnionBtn} alt='close'
                    onClick={onClose}
                />
            </button>
        </div>
    );
};

export default ModalSheetTitleWrap;