import "../profile/Profile.css";
import { Link } from "react-router-dom";
import IMG_7585 from "../../assets/IMG_7585.jpg";
import Dropdown from "../dropdown/Dropdown";
import { BiDollar } from "react-icons/bi";
import { dollarCoinStyle } from "../../helper/index.jsx"

const Profile = () => {
  return (
    <>
      <Dropdown></Dropdown>
      <div className="profile-container">
        <div>
          <Link to=" ">
            <img
              src={IMG_7585}
              alt="profile picture"
              className="profile-profilepicture"
            />
          </Link>
        </div>

        <div className="profile-name">
          <p>JOHN</p>
        </div>
        <div className="profile-user-info-container">
          <p>Profile info</p>
        </div>

        <div className="profile-gameboard-container">
          {Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="grid-cell"></div>
          ))}
        </div>

        <div className="profile-upgrade-buy-container">

          <div className="profile-upgrade">
            <button className="upgrade" type="button" value="">
              Upgrade <BiDollar style={dollarCoinStyle}/>
            </button>

          </div>

          <div className="profile-buy">
            
            <button className="buy" type="button" value="">
              Buy <BiDollar style={dollarCoinStyle}/>
            </button>
            
          </div>

        </div>
      </div>
    </>
  );
};
export default Profile;
