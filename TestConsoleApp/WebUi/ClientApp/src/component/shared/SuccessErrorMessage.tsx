import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavItem } from "react-bootstrap";

export default function SuccessErrorMessage({successMessage, showSuccessMessage, setShowSuccessMessage, errorMessage, showErrorMessage, setShowErrorMessage }:
    {successMessage:string, showSuccessMessage:boolean, setShowSuccessMessage:(value: React.SetStateAction<boolean>) => void , 
        errorMessage?:string, showErrorMessage?:boolean, setShowErrorMessage?:(value: React.SetStateAction<boolean>) => void  }) {

    const handleClickShowErrorMessage =() => {
        if (setShowErrorMessage != null)
            setShowErrorMessage(!showErrorMessage)
    }
    const handleClickShowSuccessMessage =() => {
        setShowSuccessMessage(!showSuccessMessage)
    }

    return(
        <div>
            <div className="p-3 alert alert-success " style={{display: showSuccessMessage ?  'block' : 'none'  }}>
                <button className="me-2 d-inline float-end bg-transparent border-0 " onClick={handleClickShowSuccessMessage} >
                    <FontAwesomeIcon icon="multiply" type="button" />
                </button>
                <h5 className="text-center d-inline">{successMessage}</h5>
            </div>
            <div className="p-3 alert alert-danger" style={{display: showErrorMessage ?  'block' : 'none'  }}>
                <button className="me-2 d-inline float-end bg-transparent border-0  " onClick={handleClickShowErrorMessage}>
                    <FontAwesomeIcon icon="multiply"  type="button" />
                </button>
                <h5 className="text-center d-inline">{`${errorMessage}`}</h5>
            </div>
        </div>
    )
}