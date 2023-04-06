import React from "react";
import { OptionType } from "../../common/store";

export default function RadioComponent({label, options, currentVal, setCurrentVal, noEdit, labelClass, padding, radioClass}:
    {label?:string, options:OptionType[], currentVal:string, setCurrentVal:Function , noEdit?: boolean, labelClass?: string, padding?:boolean, radioClass?:string }){

    return(
        <div className="form-group row ">
            {label != null && <label className={labelClass == null ? "col-5 col-sm-3 col-form-label text-center" : labelClass} ><h3>{label}</h3></label>}
            {(padding != null && label == null) && <div className="col-sm-4 col-0"></div> }
            <div className={ radioClass == null ? "col-6 col-sm-7 col-form-label" : radioClass}>
                { options.map((e: OptionType) => (
                    <div className="d-inline ms-4" key={e.label}>
                        <label className="text-center mt-1" ><h4>{e.label}</h4></label>
                        <input className="ms-2" type="radio" id=""  value={0} checked={currentVal == e.value} onChange={() => setCurrentVal(e.value!)} disabled={noEdit || e.i1 != null}/>
                    </div>
                ))}
            </div>
        </div>
    )
} 
