import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserRole } from "../redux/features/auth/authService";
import { selectRole, SET_ROLE } from "../redux/features/auth/authSlice";

const UseRedirectNotAuthorizedRole = (path, userRole) => {
    const navigate = useNavigate()
    const role = useSelector(selectRole)

    useEffect(() => {
        if (role !== userRole) {
            navigate(path)
            return
        }
    }, [navigate, path, role, userRole])

}

export default UseRedirectNotAuthorizedRole