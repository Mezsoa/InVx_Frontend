import "../profile/Profile.css"
import { Link } from "react-router-dom";
import IMG_7585 from "../../assets/IMG_7585.jpg"
const Profile = () => {

  return (
    <div className="profile-container">
        <div>
          <Link>
          <img src={IMG_7585} alt="profile picture" className="profile-profilepicture" />
          </Link>
        </div>
        <div className="profile-user-container">
            
            <div>

            </div>
            
          </div>
    </div>
  )
}
export default Profile;
