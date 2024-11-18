import { useState } from "react";
import "../categoryDropdown/CategoryDropdown.css";

const CategoryDropdown = ({ categoryOnSelect }) => { // categoryOnSelect it the middleman between Feedback.jsx and CategoryDropdown.jsx
  const [selectedOption, setSelectedOption] = useState("Choose Category");
  const [isOpen, setIsOpen] = useState(false);

  const options = [ // Array that contains all categories to chose from
    "Features",
    "Design",
    "Functionality Bugs",
    "Responsive Design",
    "Other",
  ];

  const handleSelectedOption = (option) => { 
    setSelectedOption(option); // Updates the state with the selected option.
    setIsOpen(false); // Closes the dropdown menu.
    categoryOnSelect(option); // calls a function categoryOnSelect and passes the option as agrument(PARAMETER).
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-list-item"
              onClick={() => handleSelectedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CategoryDropdown;
