import React from "react";

type Props = {
    label:string, 
    value:string, 
    setText?:(value: React.SetStateAction<string>) => void, 
    validator?:Function, 
    validateText?:string, 
    noEdit?:boolean, 
    labelClass?:string, 
    inputClass?:string,
    maxLength?:number,
    minLength?:number,
    alphanumeric?: boolean
}

export default function TextInputComponent({label, value, setText, validator, validateText, noEdit, labelClass, inputClass, maxLength, minLength, alphanumeric}:Props) {
    const validate = validator == null? true : validator(value)
    const alphanumericCheck = alphanumeric == null ? false: /[^0-9a-zA-Z]/.test(value)
    return(
        <div className="form-group row ">
            <label className={ labelClass != null? labelClass : "col-5 col-sm-3 col-form-label text-center mb-4 ms-3"} ><h3>{label}</h3></label>
            <div className={inputClass == null ? "col-6 col-sm-5" : inputClass}>
                <input maxLength={maxLength!} minLength={minLength!}  className={noEdit?"form-control bg-white fw-bolder fs-5 pt-0 mt-1 " :"form-control form-control-lg input-text"} 
                    style={{'border': noEdit ? 'none': ''}} type="text" value={value} onChange={(e) => setText != null ? setText(e.target.value): {}} disabled={noEdit}/>
            </div>
            {(!validate && value != '') && <div className="col-12 col-sm-3 text-center">
                <p className="mt-2 text-danger">{validateText}</p>
            </div>}
            {(minLength != null && value != '' && value.length < minLength!) && <div className="col-12 col-sm-3 text-center">
                <p className="mt-2 text-danger">{`Invalid Input Length`}</p>
            </div>}
            {(alphanumericCheck && value != '' && (value.length >= minLength! || minLength == null)) && <div className="col-12 col-sm-3 text-center">
                <p className="mt-2 text-danger">{`Not Alphanumeric`}</p>
            </div>}
        </div>
        
        
    )
}