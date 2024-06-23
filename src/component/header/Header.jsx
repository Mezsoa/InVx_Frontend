import "../header/Header.css";
import { Link } from "react-router-dom";
import InVx from "../../assets/InVx.png";





const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-container">
      <Link to="/">
          <img src= {InVx} className="logo" alt="Logo"/>
        </Link>
      </div>
    </div>
  );
};
export default Header;
