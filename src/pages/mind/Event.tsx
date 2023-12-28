import React, { useEffect, useRef, useState } from 'react';
import Sheet from 'react-modal-sheet';
import ModalSheetTitleWrap from '../../components/common/ModalSheetTitleWrap';
import IcCheckOn from '../../assets/images/icon/ic_check_on2.svg';
import IcCheckOff from '../../assets/images/icon/ic_check_off2.svg';
import InputTextBox from "../../components/common/InputTextBox";

interface PropsType {
    isOpen: boolean,
    onClose: any,
    inputArray: string[],
    setEventInput: (arg0: string) => void,
    setContainerHeight: (arg0: any, arg1: string) => void
}

const Event = ({ isOpen, onClose, inputArray, setEventInput, setContainerHeight }: PropsType) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isSavable, setSavable] = useState<boolean>(false);

    const events = ['생일', '결혼식', '장례식', '기념일', '기타'];

    const [selectEvent, setSelectEvent] = useState<string>('');

    const [otherEvent, setOtherEvent] = useState<string>('');

    useEffect(() => {

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '70%');

        if (isOpen) {
            if (textAreaRef.current) {
                textAreaRef.current.value = otherEvent;
            }
        }

    }, [isOpen]);

    useEffect(() => {
        checkValidation();
    }, [selectEvent]);

    const setContainerTopBorderRadius = (left: number, right: number): void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const onKeyUpHandler = () : void => {
        if (textAreaRef.current) {
            let inputString = '';
            // input 태그의 maxLength 로 완전히 글자 수 제한이 안됨
            if (textAreaRef.current.value && textAreaRef.current.value.length > 6) {
                inputString = textAreaRef.current.value.substring(0, 6);
            } else {
                inputString = textAreaRef.current.value;
            }
            setOtherEvent(inputString);
        }

        checkValidation();
    }

    const checkValidation = (): void => {
        if (selectEvent && selectEvent.length > 0) {
            if (selectEvent === '기타') {
                if (textAreaRef.current) {
                    const text = textAreaRef.current.value;
                    if (text && text.length > 0) {
                        setSavable(true);
                    } else {
                        setSavable(false);
                    }
                } else {
                    setSavable(false);
                }
            } else {
                setSavable(true);
            }
        }
    }

    const save = (): void => {
        if (selectEvent === '기타' && textAreaRef.current) {
            const text = textAreaRef.current.value;
            setEventInput(text);
        } else {
            setEventInput(selectEvent);
        }

        onClose();
    }

    return (
        <Sheet className='event-sheet'
            isOpen={isOpen}
            onClose={function () { onClose(); }}
            disableDrag={true}
        >
            <Sheet.Container
                ref={containerRef}
                style={{
                    backgroundColor: "#242424",
                }}
            >
                <Sheet.Content>
                    <ModalSheetTitleWrap
                        title='이벤트'
                        onClose={onClose}
                    />
                    <div className='event-option-list'>
                        {
                            events.map((event) => (
                                <div className='event-option' key={event} onClick={() => { setSelectEvent(event); }}>
                                    <div style={{ width: '6.67vw' }}>
                                        <img src={event === selectEvent ? IcCheckOn : IcCheckOff}
                                            alt='select'

                                        />
                                    </div>
                                    <span>
                                        {event}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <InputTextBox
                        inputTitle=""
                        placeholder="입력하세요 (최대 6자)"
                        inputRef={textAreaRef}
                        onKeyUp={() => onKeyUpHandler()}
                        maxLength={6}
                        disabled={selectEvent !== '기타'}
                    />
                    <div className="save-button-wrap">
                        <button
                            className='save-button'
                            disabled={!isSavable}
                            onClick={() => save()}
                        >저장하기</button>
                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop
                onTap={onClose}
            />
        </Sheet>
    );
};

export default Event;
