import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OptionType } from "../../common/store";

export default function HeaderSectionsComponent({sections, currentSection, setCurrentSection, label}: 
    {sections:OptionType[], currentSection:string, setCurrentSection:(value: React.SetStateAction<string>) => void, label:string }){
    return(
        <div className="card">
            <div className="card-header">
                <div className="mb-0 card-title h4"><FontAwesomeIcon icon="cog" className="fs-4 me-2" />{label}</div>
            </div>
            <div className="list-group list-group-flush">
                    {sections.map(((e:OptionType) =>(
                            <a key={e.label} className={currentSection == e.value ? "list-group-item active list-group-item-action" : "list-group-item  list-group-item-action"}  onClick={() => setCurrentSection(e.value!)}>
                                <h5 className={currentSection == e.value ? "tab-text text-white" : "tab-text"}>{e.label}</h5>
                            </a>
                    )))}
            </div>
        </div>
    )
}