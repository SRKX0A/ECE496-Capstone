import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function LoadingPageComponent({text}: {text?:string}) {

    return(
        <div className=" ms-auto me-auto" style={{marginTop:'0%'}}>
            <div className=" align-middle">
                <h1 className="text-center">
                    <span>{text == null ? '' : text}</span>
                    <div  className="ms-2 me-2 spinner-border text-secondary"></div>
                </h1>

            </div>
        </div>
    )
}