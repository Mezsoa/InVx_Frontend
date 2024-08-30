import { useState } from "react";
import "../feedback/Feedback.css";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";
import 

const Feedback = () => {
  const [text, setText] = useState("");

  const handleChange = (i) => {
    setText(i.target.value);
  } 

  return (
    <div className="feedback-container">
      <CategoryDropdown />
      <div className="feedback-input-container">
        <reactTextareaAutosize
          className="feedback-textarea"
          placeholder="Your thoughts......"
          value={text}
          onChange={handleChange}
          minRows={1}
        />
      </div>
      <button className="feedback-send-btn">Publish</button>
    </div>
  );
};
export default Feedback;
