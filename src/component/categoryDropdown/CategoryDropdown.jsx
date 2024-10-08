import { useState } from "react";
import "../categoryDropdown/CategoryDropdown.css";

const CategoryDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Choose Category");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    "Featuers",
    "Design",
    "Functionality Bugs",
    "Responsive Design",
    "Other",
  ];

  const handleSelectedOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
