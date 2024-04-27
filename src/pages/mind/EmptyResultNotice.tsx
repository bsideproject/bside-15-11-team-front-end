import React from 'react';

interface PropsType {
    noticeText1: string,
    noticeText2: string,
    openModal: () => void
}

const EmptyResultNotice = ({
    noticeText1,
    noticeText2,
    openModal,
}: PropsType) => {

    return (
        <div className='empty-result-notice'>
            <div className='empty-result-text'>
                {noticeText1}
                <br />
                {noticeText2}
            </div>
            <div className='button-wrap'>
                <button onClick={() => openModal()}>
                    등록하기
                </button>
            </div>
        </div>
    );
};

export default EmptyResultNotice;