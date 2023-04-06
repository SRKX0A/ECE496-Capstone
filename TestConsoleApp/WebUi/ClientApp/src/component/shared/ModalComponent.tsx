import React from "react";

export const ModalComponent = ({modalTitle, modalText, buttonText,  showModal, setShowModal, actionFunction}:
    {modalTitle:string, modalText:string, buttonText?:string, showModal:boolean, setShowModal:(value: React.SetStateAction<boolean>) => void, actionFunction?: Function}) => {

    return (
        <div className={showModal ? "modal fade show" : "modal"} style={{display: showModal? "block" : "none", background: " rgba(0, 0, 0, 0.6)"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{modalTitle}</h5>
                    <button type="button" className="btn-close" onClick={e => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                    <p>{modalText}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={e => setShowModal(false)}>Close</button>
                    {actionFunction != null && <button type="button" className="btn btn-primary" onClick={() => actionFunction()}>{buttonText}</button>}
                </div>
                </div>
            </div>
        </div>
    )
}