import "../feedback/Feedback.css";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

const Feedback = () => {
  const [value, setValue] = useState({
    category: "",
    description: "",
  });

  const handleDescriptionChange = (event) => {
    setValue((prevValue) => ({
      ...prevValue,
      description: event.target.value,
    }));
    console.log("Description updated: ", event.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    setValue((prevValue) => ({
      ...prevValue,
      category: selectedCategory,
    }));
    console.log("Category selected: ", selectedCategory);
  };

  const createFeedback = async (e) => {
    e.preventDefault();
    const loggedUserId = localStorage.getItem("loggedInUserId");

    if (!loggedUserId) {
      alert("No user is logged in!");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        category: value.category,
        message: value.description,
        username: loggedUserId,
      }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/userFeedback/create`,
        options
      );
      if (res.ok) {
        console.log("Feedback sent successfully with data:", value);
        alert("Feedback sent to the Dev Team!");
        setValue({ category: "", description: "" });
      } else {
        alert("Failed to send feedback.");
      }
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("Failed to send feedback.");
    }
  };

  return (
    <>
      <div className="feedback-container">
        <CategoryDropdown onSelect={handleCategoryChange} />
        <div className="feedback-input-container">
          <TextareaAutosize
            value={value.description}
            className="feedback-textarea"
            onChange={handleDescriptionChange}
            placeholder="Put thoughts here...."
          />
          <button className="feedback-send-btn" onClick={createFeedback}>
            Publish
          </button>
        </div>
      </div>
    </>
  );
};
export default Feedback;
