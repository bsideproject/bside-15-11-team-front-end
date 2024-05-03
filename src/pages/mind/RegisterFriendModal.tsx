import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import DateUtil from '../../utils/DateUtil';
import ModalConfirm from '../../components/common/ModalConfirm';
import RootStore from '../../store/RootStore';
import NullChecker from '../../utils/NullChecker';

interface PropsType {
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    name?: string,
}

const RegisterFriendModal = ({
    isOpen,
    setOpen,
    name
}: PropsType) => {

    const [isSaveOpen, setSaveOpen] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        inputName: '',
        birthday: '',
        memo: ''
    });

    const nameRef = useRef<HTMLInputElement>(null);
    const birthdayRef = useRef<HTMLInputElement>(null);
    const memoRef = useRef<HTMLInputElement>(null);

    const close = () => {
        setOpen(false);
        setSaveOpen(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof formData) => {
        const value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleSubmit = async () => {
        // form 데이터 처리
        console.log('Submitted Data:', formData);

        const name = NullChecker.fixNullString(formData.inputName);
        const memo = NullChecker.fixNullString(formData.memo);
        const birthday = NullChecker.fixNullString(formData.birthday);

        await RootStore.friendStore.setRegisterFriend(
            [name],
            memo,
            birthday,
            true,
            NullChecker.isEmpty(birthday),
            null,
            null
        );

        await RootStore.friendStore.setFriendList();

        // 모달 열기 등의 추가 로직 수행
        setSaveOpen(true);
    }

    return (
        <>
            {isOpen &&
                <div className='register-friend-modal'>
                    <div className='register-friend-container'>
                        <form className='register-form'>
                            <div className='title'>
                                친구를 등록하세요.
                            </div>
                            <div className='input-wrap'>
                                <label className="input-title">이름</label>
                                <div className="input-text-box-wrap">
                                    <input
                                        className='input-text-box'
                                        placeholder='이름을 입력하세요.'
                                        ref={nameRef}
                                        onChange={(e) => handleInputChange(e, 'inputName')}
                                    />
                                </div>
                            </div>
                            <div className='input-wrap'>
                                <label className="input-title">생일 (선택)</label>
                                <div className="input-text-box-wrap">
                                    <input
                                        className='input-text-box'
                                        placeholder={DateUtil.getTodayString()}
                                        ref={birthdayRef}
                                        onChange={(e) => handleInputChange(e, 'birthday')}
                                    />
                                </div>
                            </div>
                            <div className='input-wrap'>
                                <label className="input-title">메모 (선택)</label>
                                <div className="input-text-box-wrap">
                                    <input
                                        className='input-text-box'
                                        placeholder='메모를 입력하세요.'
                                        ref={memoRef}
                                        onChange={(e) => handleInputChange(e, 'memo')}
                                    />
                                </div>
                            </div>
                            <div className='modal-btn-wrap2'>
                                <button className="cancel-btn" type="button" onClick={close}>취소</button>
                                <button
                                    className={`confirm-btn ${NullChecker.isEmpty(formData.inputName) ? 'inactive' : 'active'}`}
                                    type="button"
                                    onClick={handleSubmit}>저장하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <ModalConfirm
                isOpen={isSaveOpen}
                modalChoice="type1"
                mainText="등록이 완료되었습니다."
                confirmAction={() => close()}
                confirmText="확인"
            />
        </>
    );
};

export default RegisterFriendModal;