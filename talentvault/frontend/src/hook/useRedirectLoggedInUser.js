import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from '../redux/features/auth/authService'

const UseRedirectLoggedInUser = (path) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const redirectLoggedInUser = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if (isLoggedIn) {
                navigate(path)
                return
            }
        }
        redirectLoggedInUser()


    }, [navigate, path, dispatch])

}

export default UseRedirectLoggedInUser