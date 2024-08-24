import "../profile/Profile.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ClickOutside from "../customHooks/ClickOutside.jsx";
import { BiDollar } from "react-icons/bi";
import IMG_7585 from "/assets/IMG_7585.jpg"; // Example profile picture
import bluedragonegg from "/assets/bluedragonegg.png"; // Your icon images
import greendragonegg from "/assets/greendragonegg.png";
import redorangedragonegg from "/assets/redorangedragonegg.png";
import turquoisedragonegg from "/assets/turquoisedragonegg.png";
import { dollarCoinStyle, smallDollarCoinStyle } from "../../helper/index.jsx";
import Dropdown from "../dropdown/Dropdown.jsx";

const Profile = () => {
  const [points, setPoints] = useState(0);
  const [buyOneCell, setBuyOneCell] = useState([]);
  const [showIconContainer, setShowIconContainer] = useState(false);
  const [chooseIcon, setChooseIcon] = useState(null);
  const [iconImages] = useState([
    bluedragonegg,
    greendragonegg,
    redorangedragonegg,
    turquoisedragonegg,
  ]);
  const iconContainerRef = useRef(null);

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const url1 = import.meta.env.VITE_API_URL;

  ClickOutside(iconContainerRef, () => setShowIconContainer(false));

  const fetchUserPoints = async () => {
    try {
      const res = await fetch(`${url1}/user/points/${loggedInUserId}`);
      const score = await res.json();
      setPoints(score.points);
    } catch (err) {
      console.log("Error fetching user points");
    }
  };

  const fetchPurchasedIcon = async () => {
    try {
      const res = await fetch(
        `${url1}/purchaseIcon/load/icon/${loggedInUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch purchased icons");
      const purchasedIcons = await res.json();

      const updatedIcons = purchasedIcons.map((icon) => ({
        ...icon,
        iconTag: icon.iconTag.replace("/src/assets", "/assets"),
      }));

      const uniqueIcons = Array.from(
        new Map(updatedIcons.map((icon) => [icon.cellIndex, icon])).values()
      );
      setBuyOneCell(uniqueIcons);
    } catch (err) {
      console.log("Error fetching purchased icons:", err);
      setBuyOneCell([]);
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
        setBuyOneCell([...buyOneCell, { index: randomCell, icon: chooseIcon }]);
        setPoints(points - 5);
        setChooseIcon(null);
        setShowIconContainer(false);
      } else {
        alert("All the cells have already been purchased.");
      }
    } else {
      alert("You need more points to buy this icon.");
    }
  };

  // const handlePurchase = async () => {
  //   if (points >= 5) {
  //     // Randomly select an available cell
  //     const availableCells = Array.from({ length: 36 });
  //     const unpurchasedCells = availableCells.filter(
  //       (cell) => !buyOneCell.some((item) => item.index === cell)
  //     );

  //     if (unpurchasedCells.length > 0) {
  //       const randomCell =
  //         unpurchasedCells[Math.floor(Math.random() * unpurchasedCells.length)];
  //       console.log("Random cell selected: " + randomCell);

  //       // Save the icon purchase to backend
  //       await savePurchasedIcon(Number(randomCell));

  //       // Update state
  //       setBuyOneCell([...buyOneCell, { index: randomCell, icon: chooseIcon }]);
  //       setPoints(points - 5);
  //       setChooseIcon(null);
  //       setShowIconContainer(false);
  //     } else {
  //       alert("All the cells have already been purchased.");
  //     }
  //   } else {
  //     alert("You need more points to buy this icon.");
  //   }
  // };

  const savePurchasedIcon = async (cellIndex) => {
    try {
      const imageFile = await fetchIconAsImage(chooseIcon);

      const cellIndexNumber = Number(cellIndex);
      if (isNaN(cellIndexNumber)) {
        throw new Error("Invalid cellIndex: not a number");
      }

      // Prepare your data object to send to the backend
      const imgData = new Blob([imageFile], { type: "image/png" });
      const formData = new FormData();
      formData.append("userId", loggedInUserId);
      // formData.append("iconTag", chooseIcon);
      formData.append("cellIndex", cellIndexNumber);
      formData.append("file", imgData, chooseIcon);

      // Log FormData entries for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/purchaseIcon/add`, {
        method: "POST",
        body: formData,
      });

      const text = await res.text(); // Read the raw response as text
      console.log("Raw response:", text);

      if (!res.ok) throw new Error("Image upload failed");
      return text; // Optional: Handle response if needed
    } catch (err) {
      console.log("Error saving purchased icon:", err);
    }
  };


  const fetchIconAsImage = async (icon) => {
    // Map icon tags to their corresponding image paths
    const iconMap = {
      "bluedragonegg": "/assets/bluedragonegg.png",
      "greendragonegg": "/assets/greendragonegg.png",
      "redorangedragonegg": "/assets/redorangedragonegg.png",
      "turquoisedragonegg": "/assets/turquoisedragonegg.png",
    };

    // Get the correct image source path
    const imageSrc = iconMap[icon];

    if (!imageSrc) {
        throw new Error(`No image found for icon: ${icon}`);
    }

    // Fetch the image from the public folder
    const response = await fetch(imageSrc);

    if (!response.ok) {
        throw new Error(`Failed to fetch image at path: ${imageSrc}`);
    }

    // Convert the response to a Blob (binary large object)
    const imageBlob = await response.blob();
    return imageBlob; // Return the Blob for further processing
};



  // const fetchIconAsImage = async (icon) => {
  //   const iconMap = {
  //     [bluedragonegg]: bluedragonegg,
  //     [greendragonegg]: greendragonegg,
  //     [redorangedragonegg]: redorangedragonegg,
  //     [turquoisedragonegg]: turquoisedragonegg,
  //   };
  //   const imageSrc = iconMap[icon];
  //   const response = await fetch(imageSrc);
  //   return response; // Fetch the image and convert to Blob
  // };

  useEffect(() => {
    fetchUserPoints();
    fetchPurchasedIcon();
  }, []);

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
                    src={`${url1}${item.iconTag}`}
                    alt={item.iconTag}
                    className="purchased-icon"
                  />
                ))}
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
      </div>
    </>
  );
};

export default Profile;

// import "../profile/Profile.css";
// import { Link } from "react-router-dom";
// import Dropdown from "../dropdown/Dropdown";
// import { dollarCoinStyle, smallDollarCointStyle } from "../../helper/index.jsx";
// import { useEffect, useRef, useState } from "react";
// import ClickOutside from "../customHooks/ClickOutside.jsx";

// // REACT ICON IMPORTS
// import { BiDollar } from "react-icons/bi";

// // IMAGE IMPORTS
// import IMG_7585 from "/assets/IMG_7585.jpg";
// import bluedragonegg from "/assets/bluedragonegg.png";
// import redorangedragonegg from "/assets/redorangedragonegg.png";
// import greendragonegg from "/assets/greendragonegg.png";
// import turquoisedragonegg from "/assets/turquoisedragonegg.png";

// const Profile = () => {
//   const [points, setPoints] = useState(0);
//   const [buyOneCell, setBuyOneCell] = useState([]);
//   const [showIconContainer, setShowIconContainer] = useState(false);
//   const [chooseIcon, setChooseIcon] = useState(null);

//   // creating a reference for my icon container
//   const iconContainerRef = useRef(null);

//   const loggedInUserId = localStorage.getItem("loggedInUserId");

//   // HANDLER
//   const handleClick = () => {
//     setShowIconContainer(true);
//   };

//   const handleIconClick = (icon) => {
//     setChooseIcon(icon);
//   };

//   const url1 = import.meta.env.VITE_API_URL;
//   const fetchPurchasedIcon = async () => {
//     try {
//       const res = await fetch(
//         `${
//           url1
//         }/purchaseIcon/find/all/${loggedInUserId}`,
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Failed to fetch");
//       }

//       const purchasedIcons = await res.json();

//       console.log("Purchased icons:", purchasedIcons);

//       const updatedIcons = purchasedIcons.map((icon) => ({
//         ...icon,
//         iconTag: icon.iconTag.replace("/src/assets", "/assets"),
//       }));

//       //Remove duplicates
//       const uniqueIcons = Array.from(
//         new Map(updatedIcons.map((icon) => [icon.cellIndex, icon])).values()
//       );
//       setBuyOneCell(uniqueIcons);
//     } catch (err) {
//       console.log("error fetching purchased icons");
//       setBuyOneCell([]);
//     }
//   };

//   const fetchUserPoints = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/user/points/${loggedInUserId}`
//       );
//       const score = await res.json();
//       setPoints(score.points); // Updates the state with the actual value
//     } catch (err) {
//       console.log("Error trying to fetch the user's points");
//     }
//   };

//   const handlePurchase = async () => {
//     if (points >= 5) {
//       const availableCells = Array.from({ length: 36 }).map(
//         (_, index) => index
//       );

//       const unpurchasedCells = availableCells.filter(
//         (cell) => !buyOneCell.some((item) => item.index === cell)
//       );

//       if (unpurchasedCells.length > 0) {
//         const randomCell =
//           unpurchasedCells[Math.floor(Math.random() * unpurchasedCells.length)];

//         const updateBuyOneCell = [
//           ...buyOneCell,
//           { index: randomCell, icon: chooseIcon },
//         ];

//         setBuyOneCell(updateBuyOneCell);
//         setPoints(points - 5);
//         setChooseIcon(null);

//         try {
//           await fetch(`${import.meta.env.VITE_API_URL}/user/updatePoints`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: loggedInUserId,
//               points: -5,
//             }),
//           });

//           // Save the icon purchase to backend
//           await fetch(`${import.meta.env.VITE_API_URL}/purchaseIcon/add`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: loggedInUserId,
//               iconTag: chooseIcon,
//               cellIndex: randomCell,
//             }),
//           });

//           // await fetchUserPoints();
//           // await fetchPurchasedIcon();

//           // Close the icon container after purchase
//           setShowIconContainer(false);
//           setChooseIcon(null);
//         } catch (err) {
//           console.log("error updating the user points");
//         }
//       } else {
//         alert(
//           "All the cells have already been purchased, try upgrading them instead!"
//         );
//       }
//     } else {
//       alert("You need to complete more todos to buy this icon");
//     }
//   };

//   // ARRAY LIST WITH OBJECTS INSIDE (Represents different icon images for my gameboard field.)
//   // const iconImages = [
//   //   { src: bluedragonegg, alt: "Blue Dragon Egg" },
//   //   { src: greendragonegg, alt: "Green Dragon Egg" },
//   //   { src: redorangedragonegg, alt: "Red and Orange Dragon Egg" },
//   //   { src: turquoisedragonegg, alt: "Turquoise Dragon Egg" },
//   // ];

//   // Here I will use my custom hook to handle the clicks outside the icon container
//   ClickOutside(iconContainerRef, () => setShowIconContainer(false));

//   // const iconMap = {
//   //   // [bluedragonegg]: bluedragonegg,
//   //   // [greendragonegg]: greendragonegg,
//   //   // [redorangedragonegg]: redorangedragonegg,
//   //   // [turquoisedragonegg]: turquoisedragonegg,

//   //   bluedragonegg: "/assets/bluedragonegg.png",
//   //   greendragonegg: "/assets/greendragonegg.png",
//   //   redorangedragonegg: "/assets/redorangedragonegg.png",
//   //   turquoisedragonegg: "/assets/turquoisedragonegg.png",
//   // };

//   // const getImageSrc = (tag) => {
//   //   return iconMap[tag] || "";
//   // };

//   useEffect(() => {
//     fetchUserPoints();
//     fetchPurchasedIcon();
//   }, []);

//   return (
//     <>
//       <Dropdown></Dropdown>
//       <div className="profile-container">
//         <div>
//           <Link to=" ">
//             <img
//               src={IMG_7585}
//               alt="profile picture"
//               className="profile-profilepicture"
//             />
//           </Link>
//         </div>
//
//         <div className="profile-user-info-container">
//           <p>Profile info</p>
//         </div>

//         <div className="profile-gameboard-container">
//           {Array.from({ length: 36 }).map((_, index) => (
//             <div key={index} className="grid-cell">
//               {buyOneCell
//                 .filter((item) => item.index === index)
//                 .map((item) => (
//                   <img
//                     key={item.index}
//                     src={`${import.meta.env.VITE_API_URL + item.iconTag}`}
//                     // src={import.meta.env.VITE_API_URL + iconMap[item.iconTag]}
//                     // src={import.meta.env.BASE_URL + item.iconTag}
//                     alt={item.iconTag}
//                     className="purchased-icon"
//                   />
//                 ))}
//             </div>
//           ))}
//         </div>
//         <div className="profile-upgrade-buy-container">
//           <div className="profile-upgrade">
//             <button className="upgrade">
//               Upgrade <BiDollar style={dollarCoinStyle} />
//             </button>
//           </div>

//           <div className="profile-buy">
//             <button className="buy" onClick={handleClick}>
//               Buy <BiDollar style={dollarCoinStyle} />
//             </button>
//           </div>
//         </div>
//         {showIconContainer && (
//           <div ref={iconContainerRef} className="profile-iconboard-container">
//             {iconImages.map((icon, index) => (
//               <div
//                 key={index}
//                 className={`profile-iconboard-icon ${
//                   chooseIcon === icon.src ? "selected" : ""
//                 }`}
//                 onClick={() => handleIconClick(icon.src)}
//               >
//                 <img src={icon.src} alt={icon.alt} className="dragon-egg" />
//                 <p className="dragon-icon-price">
//                   5<BiDollar style={smallDollarCointStyle} />
//                 </p>
//               </div>
//             ))}
//             <button className="buy-icon" type="button" onClick={handlePurchase}>
//               Purchase Dragon <BiDollar style={dollarCoinStyle} />
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default Profile;
