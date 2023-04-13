import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLoginStatus } from "../redux/features/auth/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";

const UseRedirectLoggedOutUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(SET_LOGIN(status));
            if (!status) {
                toast.info("Session expired, please login to continue")
                navigate('/login')
            }
        }
        loginStatus();
    }, [dispatch, navigate])

}

export default UseRedirectLoggedOutUser