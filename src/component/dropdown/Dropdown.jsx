import { useContext, useState } from "react";
import "../dropdown/Dropdown.css"
import { AuthContext } from "../context/AuthContext";
import { authenticate, authenticateRole} from "../../helper";
import { Link } from "react-router-dom";


const Dropdown = () => {
    const {logout} = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState((JSON.parse(localStorage.getItem("user"))))

    const auth = authenticate();
    const authRole = authenticateRole();

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    const handleLogout = async () => {
        await logout();
        window.location.reload();
    };











  return (
    <>
    <div className="dropdown-container">
        <nav id="navbar" className="navigation" role="navigation">
            <input id="toggle-dropdown" type="checkbox" onClick={handleClick} />
            <label className="dropdown" htmlFor="toggle-dropdown">
                <div className="top"></div>
                <div className="middle"></div>
                <div className="bottom"></div>
            </label>
        </nav>
    </div>

    <div className={isActive ? "dropdown-active" : "dropdown-not-active"}>
          {loggedInUser ? <><p className="dd-misc">{loggedInUser.username}</p><p className="dd-misc">____________</p></> : null}
          {authRole ? <Link className="dd-link" to="/admin">Admin</Link> : null}
          {auth ? <Link className="dd-link" to="/profile">Profile</Link> : null}
          <Link className="dd-link" to="/about">About</Link>
          <Link className="dd-link" to="/contact">Contact</Link>
          {auth ? null : <><p className="dd-misc">____________</p><Link className="dd-link" to="/signup">Register</Link></>}
          {auth ? null : <Link className="dd-link" to="/login">Sign in</Link>}
          {auth ? <><p className="dd-misc">____________</p><Link className="dd-link" to="/login" onClick={handleLogout}>Sign out</Link></> : null}
      </div>
    </>
  )
}

export default Dropdown;