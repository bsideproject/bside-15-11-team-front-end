import React, { useEffect, useRef, useState } from 'react';
import Sheet from 'react-modal-sheet';
import ModalSheetTitleWrap from '../../components/common/ModalSheetTitleWrap';
import IcCheckOn from '../../assets/images/icon/ic_check_on2.svg';
import IcCheckOff from '../../assets/images/icon/ic_check_off2.svg';
import InputTextBox from "../../components/common/InputTextBox";

interface PropsType {
    isOpen : boolean,
    onClose : any,
    inputArray : string[],
    setEventInput : (arg0 : string) => void,
    setContainerHeight : (arg0 : any, arg1 : string) => void
}

const Event = ({isOpen, onClose, inputArray, setEventInput, setContainerHeight} : PropsType) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isSavable, setSavable] = useState<boolean>(false);

    const events = ['생일', '결혼식', '장례식', '기념일', '기타'];

    const [selectEvent, setSelectEvent] = useState<string>('');

    useEffect(() => {

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '80%');
    }, [isOpen]);

    useEffect(() => {
        checkValidation();
    }, [selectEvent]);

    const setContainerTopBorderRadius = (left : number, right : number) : void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const checkValidation = () : void => {
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

    const save = () : void => {
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
            onClose={function(){}}
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
                            <div className='event-option' key={event} onClick={() => {setSelectEvent(event);}}>
                                <div style={{width : '5vw'}}>
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
                        style={{
                            backgroundColor: "#383838"
                        }}
                        inputTitle=""
                        placeholder="입력하세요 (최대 6자)"
                        ref={textAreaRef}
                        onKeyUp={() => checkValidation()}
                        maxLength={6}
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
            <Sheet.Backdrop />
        </Sheet>
    );
};

export default Event;
