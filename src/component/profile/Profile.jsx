import "../profile/Profile.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { dollarCoinStyle, smallDollarCoinStyle } from "../../helper/index.jsx";

import ClickOutside from "../customHooks/ClickOutside.jsx";
import IMG_7585 from "/assets/IMG_7585.jpg"; // Example profile picture
import bluedragonegg from "/assets/bluedragonegg.png";
import greendragonegg from "/assets/greendragonegg.png";
import redorangedragonegg from "/assets/redorangedragonegg.png";
import turquoisedragonegg from "/assets/turquoisedragonegg.png";
// import dragonicon from "/assets/dragonicon.png";
// import redorangebabydragon from "/assets/redorangebabydragon.png";
import Dropdown from "../dropdown/Dropdown.jsx";

const Profile = () => {
  const [points, setPoints] = useState(0);
  const [buyOneCell, setBuyOneCell] = useState([]);
  const [purchasedIcons, setPurchasedIcons] = useState([]);
  const [showIconContainer, setShowIconContainer] = useState(false);
  const [showUpgradeIconContainer, setShowUpgradeIconContainer] =
    useState(false);
  const [chooseIcon, setChooseIcon] = useState(null);
  const iconContainerRef = useRef(null);
  const [iconImages] = useState([
    bluedragonegg,
    greendragonegg,
    redorangedragonegg,
    turquoisedragonegg,
  ]);
  // const [upgradeIconImage] = useState([dragonicon]);
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // TEST AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const [testUpgradedIcons, setTestUpgradedIcons] = useState([]);

  const dragonUpgrade = {
    greendragonegg: "/assets/dragonicon.png",
    redorangedragonegg: "/assets/redorangebabydragon.png",
  };

  const fetchUserPoints = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/points/${loggedInUserId}`
      );
      const score = await res.json();
      setPoints(score.points);
    } catch (err) {
      console.log("Error fetching user points");
    }
  };

  const fetchPurchasedIcon = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/purchaseIcon/load/icon/${loggedInUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch purchased icons");
      const purchasedIconsData = await res.json();
      console.log("Purchased Icons: ", purchasedIconsData);

      const updatedIcons = purchasedIconsData.map((icon) => ({
        index: icon.cellIndex,
        iconTag: icon.iconTag,
      }));
      // updating the gameboard
      setBuyOneCell(updatedIcons);
      // storing all ppurchased icons
      setPurchasedIcons(purchasedIconsData);
    } catch (err) {
      console.log("Error fetching purchased icons:", err);
    }
  };

  const savePurchasedIcon = async (cellIndex) => {
    try {
      if (!chooseIcon) {
        throw new Error("No icon has been selected");
      }

      const response = await fetch(chooseIcon);
      if (!response.ok) {
        throw new Error("Failed to fetch the image");
      }

      const imgBlob = await response.blob(); // converting the response to a blob object here

      // checking so cellIndex is a valid number
      const cellIndexNumber = Number(cellIndex);
      if (isNaN(cellIndexNumber)) {
        throw new Error("Invalid cellIndex: not a number");
      }
      // Prepare your data object to send to the backend
      const formData = new FormData();
      formData.append("userId", loggedInUserId);
      formData.append("iconTag", chooseIcon.split("/").pop());
      formData.append("cellIndex", cellIndexNumber);
      formData.append("file", imgBlob, chooseIcon);

      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/purchaseIcon/add`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const text = await res.text(); // Read the raw response as text
      console.log("Raw response:", text);

      if (!res.ok) throw new Error("Image upload failed");
      return text;
    } catch (err) {
      console.log("Error saving purchased icon:", err);
    }
  };

  const handlePurchase = async () => {
    if (points >= 5) {
      // Create an array of 36 elements representing cell indices from 0 to 35
      const availableCells = Array.from({ length: 36 }, (_, index) => index);

      // Filter out cells that have already been purchased
      const unpurchasedCells = availableCells.filter(
        (cell) => !buyOneCell.some((item) => item.index === cell)
      );

      if (unpurchasedCells.length > 0) {
        // Select a random unpurchased cell
        const randomCell =
          unpurchasedCells[Math.floor(Math.random() * unpurchasedCells.length)];
        console.log("Random cell selected:", randomCell);

        // Save the icon purchase to the backend
        await savePurchasedIcon(randomCell);

        // Update state
        setBuyOneCell([
          ...buyOneCell,
          { index: randomCell, iconTag: chooseIcon },
        ]);
        setPoints(points - 5);
        setShowIconContainer(false);
      } else {
        alert("All the cells have already been purchased.");
      }
    } else {
      alert("You need more points to buy this icon.");
    }
  };

  const checkAvailableUpgrades = () => {
    // Använd en Set för att lagra unika iconTags
    const uniqueIcons = new Set();

    const upgrades = purchasedIcons
      .filter((icon) => {
        const iconName = icon.iconTag.split("/").pop().replace(".png", "");

        // Om ikonen redan finns i Set, hoppa över den
        if (uniqueIcons.has(iconName)) {
          return false;
        } else {
          uniqueIcons.add(iconName); // Lägg till ikonen i Set om den inte redan finns
          return dragonUpgrade.hasOwnProperty(iconName);
        }
      })
      .map((icon) => {
        const iconName = icon.iconTag.split("/").pop().replace(".png", "");
        return {
          original: icon.iconTag,
          upgrade: dragonUpgrade[iconName],
          cellIndex: icon.cellIndex,
        };
      });

    console.log("Available icons:", upgrades);
    return upgrades;
  };

  useEffect(() => {
    fetchUserPoints();
    fetchPurchasedIcon();
  }, [loggedInUserId]);
  ClickOutside(iconContainerRef, [
    setShowIconContainer,
    setShowUpgradeIconContainer,
  ]);

  return (
    <>
      <Dropdown />
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
        <div className="profile-user-info-container">
          <p>Profile info</p>
        </div>
        <div className="profile-gameboard-container">
          {Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="grid-cell">
              {buyOneCell
                .filter((item) => item.index === index)
                .map((item) => (
                  <img
                    key={item.index}
                    src={item.iconTag}
                    alt={item.iconTag}
                    className="purchased-icon"
                  />
                ))}
            </div>
          ))}
        </div>
        <div className="profile-upgrade-buy-container">
          <div className="profile-upgrade">
            <button
              className="upgrade"
              onClick={() => setShowUpgradeIconContainer(true)}
            >
              Upgrade <BiDollar style={dollarCoinStyle} />
            </button>
          </div>
          <div className="profile-buy">
            <button className="buy" onClick={() => setShowIconContainer(true)}>
              Buy <BiDollar style={dollarCoinStyle} />
            </button>
          </div>
        </div>
        {showIconContainer && (
          <div ref={iconContainerRef} className="profile-iconboard-container">
            {iconImages.map((icon, index) => (
              <div
                key={index}
                className={`profile-iconboard-icon ${
                  chooseIcon === icon ? "selected" : ""
                }`}
                onClick={() => setChooseIcon(icon)}
              >
                <img src={icon} alt={`Icon ${index}`} className="dragon-egg" />
                <p className="dragon-icon-price">
                  5<BiDollar style={smallDollarCoinStyle} />
                </p>
              </div>
            ))}
            <button className="buy-icon" type="button" onClick={handlePurchase}>
              Purchase Icon <BiDollar style={smallDollarCoinStyle} />
            </button>
          </div>
        )}
        {showUpgradeIconContainer && (
          <div ref={iconContainerRef} className="profile-iconboard-container">
            {checkAvailableUpgrades().map((upgrade, index) => (
              <div key={index} className="profile-iconboard-icon">
                <img
                  src={upgrade.upgrade}
                  alt={`Upgrade Icon ${index}`}
                  className="dragon-egg"
                />

                <p className="dragon-icon-price">
                  10
                  <BiDollar style={smallDollarCoinStyle} />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
