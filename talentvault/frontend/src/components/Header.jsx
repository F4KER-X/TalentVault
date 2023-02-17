//shell of a header, will need work

import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import '../index.css';
import logo from'./logo.jpg';

function Header() {
  return (
    <header className="header">
    <div className='header-item-holder'>
        <div className="Our-logo">
            <Link to='/'>
                <img src={logo} alt="TalentVault Logo"  width="110" height="40"></img>
            </Link>
        </div>
        
            <div className='login-ref'>
                <Link to='/login'>
                    Log in
                </Link>
            </div>


            <div className='register-ref'>
                <Link to='/register'>
                    <FaUser>Register</FaUser>
                </Link>
            </div>
    </div>

    </header>
  )
}

export default Header
