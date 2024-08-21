import "../profile/Profile.css";
import { Link } from "react-router-dom";
import IMG_7585 from "../../assets/IMG_7585.jpg";
import Dropdown from "../dropdown/Dropdown";
import { BiDollar } from "react-icons/bi";
import { dollarCoinStyle } from "../../helper/index.jsx";
import { useEffect, useState } from "react";

const Profile = () => {
  const [points, setPoints] = useState(0);
  const [buyOneCell, setBuyOneCell] = useState([]);

  const loggedInUserId = localStorage.getItem("loggedInUserId");

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

        // erase 5 points for the purchase
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
        alert("All the cells have already been purchased, try upgrading them instead!");
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
            <div key={index} className={`grid-cell ${buyOneCell.includes(index) ? "purchased" : ""}`}></div>
          ))}
        </div>

        <div className="profile-upgrade-buy-container">
          <div className="profile-upgrade">
            <button className="upgrade" type="button" value="">
              Upgrade <BiDollar style={dollarCoinStyle} />
            </button>
          </div>

          <div className="profile-buy">
            <button className="buy" type="button" onClick={handlePurchase}>
              Buy <BiDollar style={dollarCoinStyle} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
