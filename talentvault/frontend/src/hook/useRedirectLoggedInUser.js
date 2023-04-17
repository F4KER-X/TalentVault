import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectRole } from "../redux/features/auth/authSlice";

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