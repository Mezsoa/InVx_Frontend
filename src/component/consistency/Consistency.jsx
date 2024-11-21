import { useEffect, useState } from "react";
import "../consistency/Consistency.css";

const Consistency = () => {
  const [deletedTaskDates, setDeletedTaskDates] = useState([]);

  // Load `deletedTaskDates` from `localStorage` when the component mounts
  // useEffect(() => {
  //   const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
  //   setDeletedTaskDates(storedDeletedTasks);
  //   console.log("Loaded deletedTaskDates:", storedDeletedTasks); // Log to confirm loaded dates
  // }, []);
  
  // Updated version where user updates to the current logged in user 
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) {
      alert("User is not logged in or user ID is missing");
      return;
    }
  
    const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || {};
    const userDeletedTasks = storedDeletedTasks[loggedInUserId] || [];
    setDeletedTaskDates(userDeletedTasks);
    console.log("Loaded deletedTaskDates for user:", userDeletedTasks); // Log to confirm loaded dates
  }, []);
  

  // Helper function to check if a date has a deleted task
  const isTaskDeletedOnDate = (date) => deletedTaskDates.includes(date);

  // Generate all dates from January 1st to December 31st of the current year
  const generateDatesForYear = () => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); // January 1st of the current year
    const dates = [];
    const endDate = new Date(currentYear, 11, 31); // December 31st of the current year

    while (startDate <= endDate) {
      dates.push(startDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const datesForYear = generateDatesForYear();

  return (
    <div className="consistency-container">
      <div className="consistency-tracker-container">
        <div className="consistency-tracker-header">
          <p>Monthly Consistency</p>
        </div>
        <div className="consistency-tracker-board-container">
          <div className="consistency-tracker-board-subcontainer">
            <p className="consistency-tracker-board-months">Jan</p>
            <p className="consistency-tracker-board-months">Feb</p>
            <p className="consistency-tracker-board-months">Mar</p>
            <p className="consistency-tracker-board-months">Apr</p>
            <p className="consistency-tracker-board-months">May</p>
            <p className="consistency-tracker-board-months">Jun</p>
            <p className="consistency-tracker-board-months">Jul</p>
            <p className="consistency-tracker-board-months">Aug</p>
            <p className="consistency-tracker-board-months">Sep</p>
            <p className="consistency-tracker-board-months">Oct</p>
            <p className="consistency-tracker-board-months">Nov</p>
            <p className="consistency-tracker-board-months">Dec</p>
          </div>
          <div className="consistency-tracker-board">
            {datesForYear.map((date, index) => (
              <div
                key={index}
                className={`consistency-grid-cell ${
                  isTaskDeletedOnDate(date) ? "deleted-task-cell" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consistency;





// import { useEffect, useState } from "react";
// import "../consistency/Consistency.css";

// const Consistency = () => {
//   const [deletedTaskDates, setDeletedTaskDates] = useState([]);

//   // Load deleted task dates from localStorage when the component mounts
//   useEffect(() => {
//     const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
//     setDeletedTaskDates(storedDeletedTasks);
//   }, []);

//   // Helper function to check if a given date has a deleted task
//   const isTaskDeletedOnDate = (date) => deletedTaskDates.includes(date);

//   // Generate dates for the entire year starting from Jan 1 to today
//   const generateDatesForYear = () => {
//     const currentYear = new Date().getFullYear();
//     const startDate = new Date(currentYear, 0, 1); // Jan 1st of the current year
//     const today = new Date();
//     const dates = [];

//     while (startDate <= today) {
//       dates.push(startDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     return dates;
//   };

//   const datesForYear = generateDatesForYear();
//   const totalCells = 364;

//   return (
//     <div className="consistency-container">
//       <div className="consistency-tracker-container">
//         <div className="consistency-tracker-header">
//           <p>Monthly Consistency</p>
//         </div>
//         <div className="consistency-tracker-board-container">
//           <p>2024 - 2025</p>
//           <div className="consistency-tracker-board-subcontainer">
//             <p className="consistency-tracker-board-months">Jan</p>
//             <p className="consistency-tracker-board-months">Feb</p>
//             <p className="consistency-tracker-board-months">Mar</p>
//             <p className="consistency-tracker-board-months">Apr</p>
//             <p className="consistency-tracker-board-months">Jun</p>
//             <p className="consistency-tracker-board-months">Jul</p>
//             <p className="consistency-tracker-board-months">Aug</p>
//             <p className="consistency-tracker-board-months">Sep</p>
//             <p className="consistency-tracker-board-months">Oct</p>
//             <p className="consistency-tracker-board-months">Nov</p>
//             <p className="consistency-tracker-board-months">Dec</p>
//           </div>
//           <div className="consistency-tracker-board">
//             {Array.from({ length: totalCells }).map((_, index) => {
//               const date = datesForYear[index];
//               const isPastDate = date !== undefined;
//               const isDeletedTask = isPastDate && isTaskDeletedOnDate(date);

//               return (
//                 <div
//                   key={index}
//                   className={`consistency-grid-cell ${
//                     isDeletedTask ? "deleted-task-cell" : ""
//                   } ${!isPastDate ? "future-date-cell" : ""}`}
//                 ></div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Consistency;

// import "../consistency/Consistency.css";
// import { useEffect, useState } from "react";

// const Consistency = () => {
//   const [deletedTaskDates, setDeletedTaskDates] = useState([]);

//   useEffect(() => {
//     const storedDeletedTasks =
//       JSON.parse(localStorage.getItem("deletedTasks")) || [];
//     setDeletedTaskDates(storedDeletedTasks);
//   }, []);

//   // Helper to check if a given date has a deleted task
//   const isTaskDeletedOnDate = (date) => deletedTaskDates.includes(date);

//   // Generate dates for the year up to today's date
//   const generateDatesForYear = () => {
//     const currentYear = new Date().getFullYear();
//     const startDate = new Date(currentYear, 0, 1); // Jan 1st of the current year
//     const today = new Date();
//     const dates = [];

//     while (startDate <= today) {
//       dates.push(startDate.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
//       startDate.setDate(startDate.getDate() + 1);
//     }

//     return dates;
//   };

//   const datesForYear = generateDatesForYear();
//   const totalCells = 364;

//   return (
//     <>
//       <div className="consistency-container">
//         <div className="consistency-tracker-container">
//           <div className="consistency-tracker-header">
//             <p>Monthly Consistency</p>
//           </div>
//           <div className="consistency-tracker-board-container">
//             <p>2024 - 2025</p>
//             <div className="consistency-tracker-board-subcontainer">
//               <p className="consistency-tracker-board-months">Jan</p>
//               <p className="consistency-tracker-board-months">Feb</p>
//               <p className="consistency-tracker-board-months">Mar</p>
//               <p className="consistency-tracker-board-months">Apr</p>
//               <p className="consistency-tracker-board-months">Jun</p>
//               <p className="consistency-tracker-board-months">Jul</p>
//               <p className="consistency-tracker-board-months">Aug</p>
//               <p className="consistency-tracker-board-months">Sep</p>
//               <p className="consistency-tracker-board-months">Okt</p>
//               <p className="consistency-tracker-board-months">Nov</p>
//               <p className="consistency-tracker-board-months">Dec</p>
//             </div>
//             <div className="consistency-tracker-board">
//               {/* {Array.from({ length: 364 }).map((_, index) => (
//                 <div key={index} className="consistency-grid-cell"></div>
//               ))} */}
// {/* 
//               {datesForYear.map((date, index) => (
//               <div
//                 key={index}
//                 className={`consistency-grid-cell ${
//                   isTaskDeletedOnDate(date) ? "deleted-task-cell" : ""
//                 }`}></div>))}  */}

//               {Array.from({ length: totalCells }).map((_, index) => {
//                 const date = datesForYear[index];
//                 const isPastDate = date !== undefined;
//                 const isDeletedTask = isPastDate && isTaskDeletedOnDate(date);
//                 return (
//                   <div
//                     key={index}
//                     className={`consistency-grid-cell ${
//                       isDeletedTask ? "deleted-task-cell" : ""
//                     } ${!isPastDate ? "future-date-cell" : ""}`}
//                   ></div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Consistency;
