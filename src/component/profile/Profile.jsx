import "../profile/Profile.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
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
import { WebsocketContext } from "../context/WebSocketContext.jsx";

const Profile = () => {
  const [points, setPoints] = useState(0);
  const [buyOneCell, setBuyOneCell] = useState([]);
  const [purchasedIcons, setPurchasedIcons] = useState([]);
  const [showIconContainer, setShowIconContainer] = useState(false);
  const [showUpgradeIconContainer, setShowUpgradeIconContainer] =
    useState(false);
  const [availableUpgrades, setAvailableUpgrades] = useState([]); // New state for upgrades
  const [chooseIcon, setChooseIcon] = useState(null);
  const iconContainerRef = useRef(null);
  const [iconImages] = useState([
    bluedragonegg,
    greendragonegg,
    redorangedragonegg,
    turquoisedragonegg,
  ]);
  const dragonUpgrade = {
    greendragonegg: "/assets/dragonicon.png",
    redorangedragonegg: "/assets/redorangebabydragon.png",
  };
  const { notifications } = useContext(WebsocketContext);
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // TEST AREA ------------------------------------------------------------

  // ----------------------------------------------------------------------
  useEffect(() => {
    checkAvailableUpgrades();// this checks for upgrades whenever purchasedIcons changes
  }, [purchasedIcons]);

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
      // storing all ppurchased icons
      setPurchasedIcons(purchasedIconsData);
      console.log("Purchased Icons: ", purchasedIconsData);

      const updatedIcons = purchasedIconsData.map((icon) => ({
        index: icon.cellIndex,
        iconTag: icon.iconTag,
      }));
      // updating the gameboard
      setBuyOneCell(updatedIcons);
    } catch (err) {
      console.log("Error fetching purchased icons:", err);
    }
  };

  const savePurchasedIcon = async (cellIndex, iconUrl = null) => {
    try {
      const chooseIconToSave = iconUrl || chooseIcon; // new
      if (!chooseIconToSave) {
        //modified
        throw new Error("No icon has been selected");
      }

      const iconUrlString =
        typeof chooseIconToSave === "string"
          ? chooseIconToSave
          : chooseIconToSave.original; //new

      const response = await fetch(iconUrlString); // modified
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
      formData.append("iconTag", iconUrlString.split("/").pop()); // modified
      formData.append("cellIndex", cellIndexNumber);
      formData.append("file", imgBlob, iconUrlString); // modified

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
        checkAvailableUpgrades(); // re-check for possible icon upgrades
      } else {
        alert("All the cells have already been purchased.");
      }
    } else {
      alert("You need more points to buy this icon.");
    }
  };

  const handleUpgradedPurchase = async (icon) => {
    if (!icon || !icon.upgrade) {
      console.error("No valid icon selected for upgrade:", icon);
      alert("No icon selected for upgrade.");
      return;
    }

    const iconName = icon.original.split("/").pop().replace(".png", "");
    const upgradeIcon = dragonUpgrade[iconName];

    if (!upgradeIcon) {
      alert("No available upgrade for this egg.");
      return;
    }

    // Find the old icon in purchasedIcons and buyOneCell to replace it
    const replaceIndex = purchasedIcons.findIndex(
      (purchasedIcon) => purchasedIcon.iconTag === icon.original
    );

    if (replaceIndex !== -1) {
      const cellIndex = purchasedIcons[replaceIndex].cellIndex;
      const userId = purchasedIcons[replaceIndex].userId;

      // 1. Remove the original icon from the database
      try {
        const deleteResponse = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/purchaseIcon/remove?userId=${userId}&cellIndex=${cellIndex}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!deleteResponse.ok) {
          const errorText = await deleteResponse.text();
          console.error("Delete response:", deleteResponse.status, errorText);
          throw new Error("Failed to delete the original icon");
        }
      } catch (error) {
        console.error("Error deleting original icon:", error);
        alert("Failed to delete the original icon. Upgrade aborted.");
        return;
      }

      // 2. Create new arrays for purchasedIcons and buyOneCell without the old icon
      const updatedPurchasedIcons = [
        ...purchasedIcons.slice(0, replaceIndex),
        { cellIndex, iconTag: upgradeIcon },
        ...purchasedIcons.slice(replaceIndex + 1),
      ];

      const updatedBuyOneCell = [
        ...buyOneCell.filter((cell) => cell.index !== cellIndex), // Remove original icon from buyOneCell
        { index: cellIndex, iconTag: upgradeIcon },
      ];

      // 3. Update the state with the new upgraded icon
      setPurchasedIcons(updatedPurchasedIcons);
      setBuyOneCell(updatedBuyOneCell);

      // 4. Save the upgraded icon to the backend
      await savePurchasedIcon(cellIndex, upgradeIcon);
      alert("Upgrade successful!");

      checkAvailableUpgrades(); // ensuring the upgrades is recalculated.
    } else {
      alert("Could not find the egg to upgrade.");
    }
  };

  const checkAvailableUpgrades = () => {
    const uniqueIcons = new Set();

    const upgrades = purchasedIcons
      .filter((icon) => {
        const iconName = icon.iconTag.split("/").pop().replace(".png", "");
        if (uniqueIcons.has(iconName)) return false;
        uniqueIcons.add(iconName);
        return Object.prototype.hasOwnProperty.call(dragonUpgrade, iconName);
      })
      .map((icon) => {
        const iconName = icon.iconTag.split("/").pop().replace(".png", "");
        return {
          original: icon.iconTag,
          upgrade: dragonUpgrade[iconName],
          cellIndex: icon.cellIndex,
        };
      });

    setAvailableUpgrades(upgrades); // Update state with available upgrades
  };


  // const checkAvailableUpgrades = () => {

  //   // Använd en Set för att lagra unika iconTags
  //   const uniqueIcons = new Set();
  //   const upgrades = purchasedIcons
  //     .filter((icon) => {
  //       const iconName = icon.iconTag.split("/").pop().replace(".png", "");

  //       // Om ikonen redan finns i Set, hoppa över den
  //       if (uniqueIcons.has(iconName)) {
  //         return false;
  //       } else {
  //         uniqueIcons.add(iconName); // Lägg till ikonen i Set om den inte redan finns
  //         return Object.prototype.hasOwnProperty.call(dragonUpgrade, iconName);
  //       }
  //     })
  //     .map((icon) => {
  //       const iconName = icon.iconTag.split("/").pop().replace(".png", "");
  //       return {
  //         original: icon.iconTag,
  //         upgrade: dragonUpgrade[iconName],
  //         cellIndex: icon.cellIndex,
  //       };
  //     });

  //   setAvailableUpgrades(upgrades);
  // };

  // const calculateAvailableUpgrades = () => {
  //   const uniqueIcons = new Set();

  //   const upgrades = purchasedIcons
  //     .filter((icon) => {
  //       const iconName = icon.iconTag.split("/").pop().replace(".png", "");
  //       if (uniqueIcons.has(iconName)) return false;
  //       uniqueIcons.add(iconName);
  //       return Object.prototype.hasOwnProperty.call(dragonUpgrade, iconName);
  //     })
  //     .map((icon) => {
  //       const iconName = icon.iconTag.split("/").pop().replace(".png", "");
  //       return {
  //         original: icon.iconTag,
  //         upgrade: dragonUpgrade[iconName],
  //         cellIndex: icon.cellIndex,
  //       };
  //     });

  //   setAvailableUpgrades(upgrades); // Update available upgrades state
  // };

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
      <div>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notifications, index) => (
              <li key={index}>{notifications}</li>
            ))
          ) : (
            <li>No notis yet.</li>
          )}
        </ul>
      </div>
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
          {Array.from({ length: 36 }).map((upgrade, index) => (
            <div key={index} className="grid-cell">
              {buyOneCell
                .filter((item) => item.index === index)
                .map((item) => (
                  <img
                    key={`${item.index}-${item.iconTag}`}
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
                  chooseIcon && chooseIcon.original === icon ? "selected" : ""
                }`}
                onClick={
                  () => setChooseIcon(icon) // Spara ikonen som "original"
                }
              >
                <img src={icon} alt={`Icon ${index}`} className="dragon-egg" />
                <p className="dragon-icon-price">
                  5<BiDollar style={smallDollarCoinStyle} />
                </p>
              </div>
            ))}
            <button
              className="buy-icon"
              type="button"
              onClick={() => handlePurchase()}
            >
              Purchase Icon <BiDollar style={smallDollarCoinStyle} />
            </button>
          </div>
        )}

        {showUpgradeIconContainer && (
          <div ref={iconContainerRef} className="profile-iconboard-container">
            {availableUpgrades.map((upgrade, kaka) => (
              <div
                key={kaka}
                className={`profile-iconboard-icon ${
                  chooseIcon && chooseIcon.upgrade === upgrade.upgrade
                    ? "selected"
                    : ""
                }`}
                onClick={
                  () => setChooseIcon(upgrade) // Spara både "original" och "upgrade"
                }
              >
                <img
                  src={upgrade.upgrade}
                  alt={`Upgrade Icon ${kaka}`}
                  className="dragon-egg"
                />
                <p className="dragon-icon-price">
                  10
                  <BiDollar style={smallDollarCoinStyle} />
                </p>
              </div>
            ))}
            <button
              className="buy-icon"
              type="button"
              onClick={() => handleUpgradedPurchase(chooseIcon)} // Skicka chooseIcon som argument
            >
              Upgrade Icon <BiDollar style={smallDollarCoinStyle} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
