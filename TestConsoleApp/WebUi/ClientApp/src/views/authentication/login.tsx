import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosGet, axiosPost } from "../../common/API";
import { PasswordComponent } from "../../component/shared/PasswordComponent";
import TextInputComponent from "../../component/shared/TextInputComponent";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setUser } from "../../redux/slices/user";

export default function ()  {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

    const handleClickShowErrorMessage =() => {
        setShowErrorMessage(!showErrorMessage)
    }
    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault()
        const user = {EmailAddress: userName, Password: password}
        try{
            const response = await axiosPost("/api/auth", user)
            dispatch(setUser(response.data))
            navigate("/")
        }
        catch (e: any){ 
            setErrorMessage(e.response.data)
            setShowErrorMessage(true)
        }
    }
    return (
        <div className="w-100">
            <div className="card mt-5 w-50 ms-auto me-auto">
                <div className=" card-header border-0" style={{backgroundColor:"Lavender"}}>
                    <h3 className='mb-4 mt-4 text-center'>Sign In</h3>
                </div>
                <div className="p-3 alert alert-danger" style={{display: showErrorMessage ?  'block' : 'none'  }}>
                    <h5 className="text-center d-inline msg-text">{` ${errorMessage}`}</h5>
                    <button className="me-2 d-inline float-end bg-transparent border-0 msg-text" onClick={handleClickShowErrorMessage}>
                        <FontAwesomeIcon icon="multiply"  type="button" />
                    </button>
                </div>
                <form className="mb-4" onSubmit={handleSignIn}>
                    <div className="card-body">
                        <TextInputComponent label={"Email Address"} value={userName} setText={setUserName} />
                        <PasswordComponent labelText={"Password"} password={password} setNewPassword={setPassword}/>
                    </div>
                    <div className=" mb-4 pe-5" >
                        <button type="submit"  className="btn float-end btn-bitbucket " disabled={userName == '' || password == '' }>
                            <span >Sign In </span>
                        </button>
                        <button type="submit"  className="btn float-end btn-bitbucket me-2" onClick={() => navigate("/register")}>
                            <span >Register </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}