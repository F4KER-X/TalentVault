import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";

const UseRedirectLoggedOutUser = () => {
    const navigate = useNavigate()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Session expired, please login to continue")
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

}

export default UseRedirectLoggedOutUser