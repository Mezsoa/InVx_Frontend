import { useState } from "react";
import "../feedback/Feedback.css";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";

const Feedback = () => {











  return (
    <div className="feedback-container">
          <CategoryDropdown />
        <div className="feedback-input-container">
        <textarea className="feedback-textarea" placeholder="Your thoughts......"></textarea>
        
        </div>
        <button className="feedback-send-btn">
          Publish
        </button>

    </div>
  )
}
export default Feedback;