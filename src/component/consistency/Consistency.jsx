import "../consistency/Consistency.css";
import Dropdown from "../dropdown/Dropdown";

const Consistency = () => {
  return (
    <>
      <div className="consistency-container">
        <div className="consistency-tracker-container">
          <div className="consistency-tracker-header">
            <p>Monthly Consistency</p>
          </div>
          <div className="consistency-tracker-board-container">
            <p>2024 - 2025</p>
            <div className="consistency-tracker-board-subcontainer">
              <p className="consistency-tracker-board-months">Jan</p>
              <p className="consistency-tracker-board-months">Feb</p>
              <p className="consistency-tracker-board-months">Mar</p>
              <p className="consistency-tracker-board-months">Apr</p>
              <p className="consistency-tracker-board-months">Jun</p>
              <p className="consistency-tracker-board-months">Jul</p>
              <p className="consistency-tracker-board-months">Aug</p>
              <p className="consistency-tracker-board-months">Sep</p>
              <p className="consistency-tracker-board-months">Okt</p>
              <p className="consistency-tracker-board-months">Nov</p>
              <p className="consistency-tracker-board-months">Dec</p>
            </div>
            <div className="consistency-tracker-board">
              {Array.from({ length: 364 }).map((_, index) => (
                <div key={index} className="consistency-grid-cell"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consistency;
