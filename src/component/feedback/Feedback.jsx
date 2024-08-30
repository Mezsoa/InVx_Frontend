import "../feedback/Feedback.css";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";
import TextareaAutosize from "react-textarea-autosize"
import { useState } from "react";

const Feedback = () => {
const [value, setvalue] = useState("");

const handleChange = event => {
  setvalue(event.target.value);
}






  return (
    <>
    <div className="feedback-container">
      <CategoryDropdown />
      <div className="feedback-input-container">
      
      <TextareaAutosize
      value={value}
      // minRows={1}
      // maxRows={10}
      className="feedback-textarea"
      onChange={handleChange}
      placeholder="Put thoughts here...."
      />

      <button className="feedback-send-btn">Publish</button>
    </div>
    </div>
    </>
    
  );
};
export default Feedback;
