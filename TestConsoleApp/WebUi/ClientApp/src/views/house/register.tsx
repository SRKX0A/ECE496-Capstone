import React, { useState } from "react";
import { WizardOption } from "../../common/store";
import { ProgressWizard } from "../../component/shared/ProgressComponent";
import TextInputComponent from "../../component/shared/TextInputComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimezoneSelect from "react-timezone-select";
import { validate as EmailValidate } from 'email-validator';
import { PasswordComponent } from "../../component/shared/PasswordComponent";

export default function(){

    const [section, setSection] = useState<string>("Household")
    const optionSections: WizardOption[] = [{icon:'house', label: "Household"}, {icon:'user', label: "Administrator"}]

    const [houseName, setHouseName] = useState<string>("")
    const [houseEmail, setHouseEmail] = useState<string>("")
    const [limit, setLimit] = useState<number>(0)

    const [adminName, setAdminName] = useState<string>("")
    const [adminEmail, setAdminEmail] = useState<string>("")
    const [timezone, setTimezone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    return(
        <div className="mb-4 ms-auto me-auto ">
            <div className=" border-0">
                    <h1 className=' ms-1 header-text'><FontAwesomeIcon icon="tablet-button" className="fs-3 me-2" />{"Register"}</h1>
                </div>
            <ProgressWizard sections={optionSections} currentSection={section} />
            {section == "Household" && <div className="card w-75 ms-auto me-auto">
                <div className="card-header border-0" style={{backgroundColor:"Lavender"}}>
                    <h2 className="text-center">Household</h2>
                </div>
                <div className="card-body">
                    <TextInputComponent label={"Name"} value={houseName} setText={setHouseName} />
                    <TextInputComponent label={"Email"} value={houseEmail} setText={setHouseEmail} validator={EmailValidate} validateText={"Invalid Email Address"} />
                    <div className="form-group row">
                        <label className="col-5 col-sm-3 col-form-label text-center ms-3" ><h3>{"Household Limit"}</h3></label>
                        <div className="col-6 col-sm-5">
                            <input className="align-bottom form-control  " min={0} type="number" id="flexSwitchCheckDefault" value={limit}  onChange={(e) => setLimit(Number(e.target.value))}  />
                        </div>
                    </div>
                </div>
                <div className="card-footer pt-0 ">
                    <div className="mb-1 pe-3 float-end ">
                        <button className="btn float-end btn-flickr add-btn-text " disabled={ houseName == "" || houseEmail == "" || (!EmailValidate(houseEmail))} onClick={() => setSection("Administrator")} >
                            <span >{`Next`}</span>
                        </button>
                    </div>
                </div>
            </div>}
            {section == "Administrator" && <div className="card w-75 ms-auto me-auto">
                <div className="card-header border-0" style={{backgroundColor:"Lavender"}}>
                    <h2 className="text-center">Administrator</h2>
                </div>
                <div className="card-body">
                    <TextInputComponent label={"Name"} value={adminName} setText={setAdminName} />
                    <TextInputComponent label={"Email"} value={adminEmail} setText={setAdminEmail} validator={EmailValidate} validateText={"Invalid Email Address"}  />
                    <div className="form-group row mb-4">
                        <label className="col-5 col-sm-3  col-form-label text-center ms-3" ><h3>{"TimeZone"}</h3></label>
                        <div className="col-6 col-sm-5">
                            <TimezoneSelect placeholder={"Select Timezone"} value={timezone} onChange={(e) => setTimezone(e.value)} />
                        </div>
                    </div>
                    <TextInputComponent label={"Email"} value={adminEmail} setText={setAdminEmail} validator={EmailValidate} validateText={"Invalid Email Address"}  />
                    <PasswordComponent labelText={"New Password"} password={password} setNewPassword={setPassword} />
                    <PasswordComponent labelText={"Confirm Password"} password={confirmPassword} setNewPassword={setConfirmPassword} />
                    <div className="form-group" style={{ display: confirmPassword != password ? 'block' : 'none' }} >
                        <p className="text-danger text-center">{"Passwords Do Not Match"}</p>
                    </div>
                </div>
                <div className="card-footer pt-0 ">
                    <div className="mb-1 pe-3">
                        <button className="btn float-begin btn-flickr add-btn-text " onClick={() => setSection("Household")} >
                            <span >{`Previous`}</span>
                        </button>
                        
                        <button className="btn float-end btn-dribbble add-btn-text " disabled={ adminName == "" || password == "" || adminEmail == "" || timezone == "" ||  (!EmailValidate(adminEmail))} onClick={() => setSection("Household")} >
                            <span >{`Register`}</span>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}