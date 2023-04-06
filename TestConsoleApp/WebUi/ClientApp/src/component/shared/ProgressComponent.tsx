import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OptionType, WizardOption } from "../../common/store";


export default function ProgressComponent ({sections,currentSection} :{sections:string[], currentSection:string}){
    const width = ((100 - (0.45 * sections.length-1)) / sections.length) ;
    const newSections:string[] =[]
    sections.forEach(element => {
        newSections.push(element)
        if(sections.indexOf(element) != sections.length - 1)
            newSections.push('break')
    });
    return (
        <div className="progress mt-4" style={{height: '55px'}}>
            { newSections?.map ((section:string) => (
                    <div key={Math.random() }className={`progress-bar h-100 ${section == 'break' ? 'bg-white' : currentSection == section ? 'bg-info' :'bg-secondary'} `} style={{ width: section != 'break' ? width+'%': '0.45%'}}role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100} >
                        {section != 'break' && <span className="text-white fs-3">{section}</span>}
                    </div>
            ))}
        </div>
    )
}

export function ProgressWizard({sections,currentSection} :{sections:WizardOption[], currentSection:string}){
    const width = ((100 - (15 * (sections.length))) / (sections.length - 1)) ;
    const newSections:WizardOption[] =[]
    sections.forEach(element => {
        newSections.push(element)
        if(sections.indexOf(element) != sections.length - 1){
            const object:WizardOption = {icon: "magnifying-glass", label:"break"}
            newSections.push(object)
        }
    });
    const barWidth = sections.length < 3 ? 'w-50' : sections.length < 6 ? 'w-75' : 'w-100'
    return (
        <div className={`progress mt-5 ${barWidth} ms-auto me-auto bg-none`} style={{height: '100px', backgroundColor: "transparent"}}>
            { newSections?.map ((section:WizardOption) => (
                    <div key={Math.random() }className={`progress-bar h-100 `} style={{ width: section.label != 'break' ? '50%': width+'%', backgroundColor: "transparent"}}role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100} >
                        {section.label != 'break' && 
                            <div className={`w-100  h-100 border-3 ${newSections.indexOf(section) < newSections.indexOf(newSections.find(e => e.label == currentSection)!) ? 'border-success' : section.label == currentSection ? "border-info" : "" } `}>
                                <div className={` ms-auto me-auto  `}>
                                    <FontAwesomeIcon icon={section.icon} style={{width:'24px', height:'24px'}}  
                                    className={` mb-2 ${newSections.indexOf(section) < newSections.indexOf(newSections.find(e => e.label == currentSection)!) ? 'text-success fw-bold' : section.label == currentSection ? "text-info" : "text-dark" }`}  />
                                </div>
                                <span style={{whiteSpace:"normal"}} className={`fs-4 
                                ${newSections.indexOf(section) < newSections.indexOf(newSections.find(e => e.label == currentSection)!) ? 'text-success fw-bold' : section.label == currentSection ? "text-info" : "text-dark" }`} >
                                    {section.label}
                                </span>
                            </div>
                        }
                        {section.label == 'break' &&
                            <div className={`w-100  h-100 border-3 ${newSections.indexOf(section) < newSections.indexOf(newSections.find(e => e.label == currentSection)!) ? 'border-success' : "" }`}>
                            </div>
                        }
                    </div>
            ))}
        </div>
    )
}