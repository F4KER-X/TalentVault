import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserRole } from "../redux/features/auth/authService";
import { SET_ROLE } from "../redux/features/auth/authSlice";

const UseRedirectNotAuthorizedRole = (path, userRole) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const redirectNotAuthorizedRole = async () => {
            const { role } = await getUserRole()
            dispatch(SET_ROLE(role))

            if (role !== userRole) {
                navigate(path)
                return
            }

        }
        redirectNotAuthorizedRole()


    }, [dispatch, navigate, path, userRole])

}

export default UseRedirectNotAuthorizedRole