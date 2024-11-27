import { useState, useEffect } from "react";
import "../admin/Admin.css";

export const Admin = () => {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Tracks selected feedback

  // FETCHES
  // Fetch user feedback
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

  // Open popup with selected feedback
  const openPopup = (feedbackItem) => {
    setSelectedFeedback(feedbackItem); // Set the clicked feedback as selected
  };

  // Close popup
  const closePopup = () => {
    setSelectedFeedback(null); // Clear the selected feedback
  };

  // Fetch feedback data when the component loads
  useEffect(() => {
    fetchUserFeedback();
  }, []);

  return (
    <div className="notifications-container">
      {feedback.map((item, index) => (
        <div
          key={index}
          className="notification-item"
          onClick={() => openPopup(item)}
        >
          <div className="notification-header">{item.category}</div>
          {/* <div className="notification-body">{item.username}</div> */}
          <div className="notification-body">{item.description}</div>
        </div>
      ))}
      {/* Expanded Popup */}
      {selectedFeedback && (
        <div className="popupAdmin">
          <div className="popup-contentAdmin">
            <div className="popup-categoryAdmin">{selectedFeedback.category}</div>
            <span className="popup-usernameAdmin">
              {selectedFeedback.username}
            </span>
            <div className="popup-messageAdmin">{selectedFeedback.description}</div>
            <button onClick={closePopup} className="popup-close-buttonAdmin">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
