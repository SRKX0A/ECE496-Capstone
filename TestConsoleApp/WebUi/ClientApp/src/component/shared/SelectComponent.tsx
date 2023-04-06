import React from "react";
import { OptionType } from "../../common/store";

export default function({options, value, onChange, className, placeholder}:{options:any[], value:string|undefined, onChange: Function, className?:string, placeholder?:string}){

    return(
        <select  placeholder={placeholder} name="" id="" value={value} className={className} onChange={(e) => {onChange(e)}} >
            {
                options.map((e:OptionType) => (
                <option value={e.value} label={e.label} key={Math.random()}></option>
                ))
            }
        </select>
    )
}