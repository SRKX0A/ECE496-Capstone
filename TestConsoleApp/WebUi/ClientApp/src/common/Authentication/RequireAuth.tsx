import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { getUser } from "../../redux/slices/user";
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function({ children }: { children: JSX.Element }){
    let navigate =useNavigate();
    const user = useAppSelector(getUser)
    
    if (user == null)
        return(
            <Navigate to='/login' replace></Navigate>
        )

    return(
        <Navigate to='/' replace></Navigate>
    )

}