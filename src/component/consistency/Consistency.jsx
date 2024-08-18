import "../consistency/Consistency.css";
import Dropdown from "../dropdown/Dropdown";

const Consistency = () => {
  return(
    <>
    
    <div className="consistency-container">
      <div className="consistency-tracker-container">
        <div className="consistency-tracker-header">
            <p>Monthly Consistency</p>
        </div>
        <div className="consistency-tracker-board">
            {Array.from({ length: 364 }).map((_, index) => (
                <div key={index} className="consistency-grid-cell"></div>
            ))}
        </div>
      </div>
    </div>
    </>
  )
};

export default Consistency;


