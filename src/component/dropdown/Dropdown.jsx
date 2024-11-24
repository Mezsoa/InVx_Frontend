import { useContext, useState } from "react";
import "../dropdown/Dropdown.css"
import { AuthContext } from "../context/AuthContext";
import { authenticate, authenticateRole} from "../../helper";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

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
                <div >
                    <BiMenu className="dropdown-react-menu-icon"/>
                </div>
            </label>
        </nav>
    </div>

    <div className={isActive ? "dropdown-active" : "dropdown-not-active"}>
          {loggedInUser ? <><p className="dd-misc">{loggedInUser.username}</p><p className="dd-misc"></p></> : null}
          {auth ? <Link className="dd-link" to="/todo">Todos</Link> : null} 
          {auth ? <Link className="dd-link" to="/profile">Profile</Link> : null}
          {auth ? <Link className="dd-link" to="/consistency">Consistency</Link> : null}
          {auth && !authRole ? <Link className="dd-link" to="/feedback">Feedback</Link> : null}
          {auth ? <Link className="dd-link" to="/settings">Settings</Link> : null}
          {auth ? <Link className="dd-link" to="/admin">Admin</Link> : null}
          {auth ? null : <><p className="dd-misc"></p><Link className="dd-link" to="/signup">Register</Link></>}
          {auth ? null : <Link className="dd-link" to="/login">Sign in</Link>}
          {auth ? <><p className="dd-misc"></p><Link className="dd-link" to="/login" onClick={handleLogout}>Sign out</Link></> : null}
      </div>
    </>
  )
}

export default Dropdown;