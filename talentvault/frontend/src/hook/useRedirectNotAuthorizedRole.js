import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectRole } from "../redux/features/auth/authSlice";

const UseRedirectNotAuthorizedRole = (path, userRole) => {
    const navigate = useNavigate()
    const role = useSelector(selectRole)

    useEffect(() => {
        if (role !== userRole) {
            navigate(path)
        }
    }, [navigate, path, role, userRole])

}

export default UseRedirectNotAuthorizedRole