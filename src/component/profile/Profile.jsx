import "../profile/Profile.css";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import { dollarCoinStyle } from "../../helper/index.jsx";
import { useEffect, useState } from "react";

// REACT ICON IMPORTS
import { BiDollar } from "react-icons/bi";

// IMAGE IMPORTS
import IMG_7585 from "../../assets/IMG_7585.jpg";
import dragonicon from "../../assets/dragonicon.png";
import bluedragonegg from "../../assets/bluedragonegg.png";
import redorangedragonegg from "../../assets/redorangedragonegg.png";
import greendragonegg from "../../assets/greendragonegg.png";

const Profile = () => {
  const [points, setPoints] = useState(0);
  const [buyOneCell, setBuyOneCell] = useState([]);
  const [showIconContainer, setShowIconContainer] = useState(false);

  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // HANDLER
  const handleClick = () => {
    setShowIconContainer(true);
  };

  const fetchUserPoints = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/points/${loggedInUserId}`
      );
      const score = await res.json();
      setPoints(score.points); // Updates the state with the actual value
    } catch (err) {
      console.log("Error trying to fetch the users points");
    }
  };

  const handlePurchase = async () => {
    if (points >= 5) {
      const availableCells = Array.from({ length: 36 }).map(
        (_, index) => index
      );
      const unpurchasedCells = availableCells.filter(
        (cell) => !buyOneCell.includes(cell)
      );
      if (unpurchasedCells.length > 0) {
        const randomCell =
          unpurchasedCells[Math.floor(Math.random() * unpurchasedCells.length)];

        setBuyOneCell([...buyOneCell, randomCell]);

        // erase 5 points for the bought icon. icon prize = 5 coins or score
        setPoints(points - 5);

        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/user/updatePoints`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: loggedInUserId,
                points: -5,
              }),
            }
          );
        } catch (err) {
          console.log("error updating the user points");
        }
      } else {
        alert(
          "All the cells have already been purchased, try upgrading them instead!"
        );
      }
    } else {
      alert("You need to complete more todos to buy this icon");
    }
  };

  useEffect(() => {
    fetchUserPoints();
  }, []);

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
            <div key={index} className="grid-cell">
              {buyOneCell.includes(index) && (
                <img
                  src={bluedragonegg}
                  alt="Purchased Icon"
                  className="purchased-icon"
                />
              )}
            </div>
          ))}
        </div>

        <div className="profile-upgrade-buy-container">
          <div className="profile-upgrade">
            <button className="upgrade">
              Upgrade <BiDollar style={dollarCoinStyle} />
            </button>
          </div>

          <div className="profile-buy">
            <button className="buy" onClick={handleClick}>
              Buy <BiDollar style={dollarCoinStyle} />
            </button>
          </div>
        </div>
        {showIconContainer && (
          <div className="profile-iconboard-container">
            <div className="profile-iconboard-icon">
              <img
                src={bluedragonegg}
                alt="Image of a blue dragon egg"
                className="blue-bronze-dragon-egg"
              />
              <img
                src={redorangedragonegg}
                alt="Image of a red orange dragon egg"
                className="red-orange-dragon-egg"
              />
              <img src={greendragonegg} alt="Image of a green dragon egg" className="green-dragon-egg" />
            </div>
            <button className="buy-icon" type="button" onClick={handlePurchase}>
              Buy <BiDollar style={dollarCoinStyle} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
