interface ModalProps{
    isOpen: boolean,
    modalChoice: string,
    mainText?: string,
    subText?: string,
    confirmAction?: any,
    cancelAction?: any,
    confirmText?: string,
    cancelText?: string
}

const ModalConfirm = ({
    isOpen,
    modalChoice,
    mainText,
    subText,
    confirmAction,
    cancelAction,
    confirmText,
    cancelText
}:ModalProps) => {

    return(
        <>
            {isOpen &&
                <div className="ModalConfirm">
                    <div className="modal-wrap">
                        <p className="modal-text">{mainText}</p>
                        <p className="modal-sub-text">{subText}</p>
                        <div className="modal-btn-wrap">
                            {modalChoice === "type1"?
                                <button className="confirm-btn" type="button" onClick={confirmAction}>{confirmText}</button>
                                :null
                            }
                            {modalChoice === "type2"?
                                <>
                                    <button className="cancel-btn" type="button" onClick={cancelAction}>{cancelText}</button>
                                    <button className="confirm-btn" type="button" onClick={confirmAction}>{confirmText}</button>
                                </>
                                :null
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalConfirm;
