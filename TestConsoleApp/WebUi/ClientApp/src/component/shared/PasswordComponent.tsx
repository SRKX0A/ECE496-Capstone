import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export function PasswordComponent({labelText, password,  setNewPassword }:
    {labelText: string, password:string, setNewPassword:(value: React.SetStateAction<string>) => void  }) {
        
    const [showPassword, setShowPassowrd] = useState<boolean>(false)
    const handleClickShowPassword =() => {
        setShowPassowrd(!showPassword)
    }
    
    return(
        <div className="form-group row mb-4 ">
            <label className=" col-5 col-sm-3 col-form-label text-center edit-label-text ms-3" ><h3>{labelText}</h3></label>
            <div className="col-6 col-sm-5">
                <div className="input-group ">
                    <input  type={showPassword ? "text" : "password"} name="" id={labelText} className="form-control input-text" value={password} onChange={e => setNewPassword(e.target.value)} />
                    <div className="input-group-append border-0 ">
                        <span className=" bg-transparent form-control input-text">
                            <FontAwesomeIcon icon="eye" onClick={handleClickShowPassword} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}