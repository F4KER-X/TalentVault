//shell of a header, will need work

import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className="header">
        <div className="logo">
            <Link to='/'>TalentVault</Link>
        </div>

        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt>Login</FaSignInAlt>
                </Link>
            </li>


            <li>
                <Link to='/register'>
                    <FaUser>Register</FaUser>
                </Link>
            </li>
        </ul>



    </header>
  )
}

export default Header
