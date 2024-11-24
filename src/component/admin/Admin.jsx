import { useState, useEffect } from "react";
import "../admin/Admin.css";

export const Admin = () => {
  const [feedback, setFeedback] = useState([]);
  const [popupContent, setPopupContent] = useState(null);
  

  // FETCHES
  //fetch a users feedback
  const fetchUserFeedback = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/userFeedback/find/all`
      );
      const message = await res.json();
      setFeedback(message); // Updates the state with the actual value
      console.log(message);
    } catch (err) {
      console.log("Error trying to fetch the users points");
    }
    
  };

  
  // Fetches feedback data when the component loads
  useEffect(() => {
    fetchUserFeedback();
  }, []);

  // Handle popup open
  const openPopup = (feedbackText) => {
    setPopupContent(feedbackText);
  };

  // Handle popup close
  const closePopup = () => {
    setPopupContent(null);
  };

  
  return (
    <div className="one">
      <div className="two">
        {feedback.map((item, index) => (
          <div key={index} className="feedback-item">
            <div
              className="three"
              onClick={() => openPopup(item.feedbackText)} // Open popup on click
            >
              {item.category} {/* Feedback category */}
            </div>
            <div
              className="four"
              onClick={() => openPopup(item.feedbackText)} // Open popup on click
            >
              {item.username} {/* Username */}
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupContent}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
