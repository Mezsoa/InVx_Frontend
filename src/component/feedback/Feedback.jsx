import "../feedback/Feedback.css";
import CategoryDropdown from "../categoryDropdown/CategoryDropdown";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";

const Feedback = () => {
  const [value, setValue] = useState({
    category: "",
    description: "",
  });

  

  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.role) && user.role.length > 0) {
      return user.role[0];
    }
    return null;
  };
  const userRole = getUserRole();
    // Defining a Function that take the argument(PARAMETER) event.
  const handleDescriptionChange = (event) => {
    // accesses the pre-value of setValue state
    setValue((prevValue) => ({
      ...prevValue, // Copies all other values to a new object as unchanged.
      // Updates the description attribute with the new value being typed in by the user.
      // event.target.value gets the new value. 
      description: event.target.value, 
    }));
    console.log("Description updated: ", event.target.value);
  };
  const handleCategoryChange = (selectedCategory) => {
    setValue((prevValue) => ({
      ...prevValue,
      category: selectedCategory, // Updates Category attribute with the new value typed in by user.
    }));
    console.log("Category selected: ", selectedCategory);
  };
    // This function is declared as an async function wich means it will allways return a promise.
  const createFeedback = async (e) => {
    e.preventDefault(); // Changes the standard behavior to prevent a page refreash.

    const userId = JSON.parse(localStorage.getItem("user"));
    
    console.log(userId);
    if (!userId) { // if null or undefined it shows alert and ends the function.
      alert("No user is logged in!");
      return;
    }
    const options = { // creates an options object with settings in it.
      method: "POST", // specifies what kind request call it is (POST,DELETE,GET,PUT etc.).
      headers: {"Content-Type": "application/json",}, // defines that the data is sent as JSON.
      credentials: "include", // includes that cookie(session data) is being sent with the request.
      body: JSON.stringify({ // This is the actuall data being sent, now as a JSON string 
        category: value.category,
        message: value.description,
        userId: userId.id,
        username: userId.username,
      }),
    };
    try {
        // await pauses the function until the await have the promise(either resolved or reject).
      const res = await fetch( // sends the POST-request to the endpoint with the setting from options.
        `${import.meta.env.VITE_API_URL}/userFeedback/create`,
        options
      );
      if (res.ok) { // if res.ok is true it sends confirmation and clears setValue 
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
    <div>
    {userRole === "ROLE_ADMIN" ? (
      <div>
        <p>ADMIN DISPLAY</p>
      </div>
    ) : (
      <div className="feedback-container">
        <CategoryDropdown categoryOnSelect={handleCategoryChange} />
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
      )}
      </div>
    </>
  );
};
export default Feedback;
