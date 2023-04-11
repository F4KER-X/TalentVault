import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectRole, SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from '../redux/features/auth/authService'

const UseRedirectLoggedInUser = (path) => {
    const navigate = useNavigate()
    const role = useSelector(selectRole)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            if (role === 'applicant') {
                navigate('/dashboard')
                return
            }
            if (role === 'recruiter') {
                navigate('/job/my-jobs')
                return
            }
        }
    }, [navigate, path, isLoggedIn, role])

}

export default UseRedirectLoggedInUser