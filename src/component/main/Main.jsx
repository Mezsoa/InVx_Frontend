import { useEffect, useState } from "react";
import "../../component/main/main.css";
import Dropdown from "../dropdown/Dropdown.jsx";
import { BiDollar } from "react-icons/bi";
import { dollarCoinStyle } from "../../helper/index.jsx";


const Main = () => {
  const [task, setTask] = useState([]);
  const [points, setPoints] = useState(0);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
  });

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log("logged in user:", loggedInUserId);

  useEffect(() => {
    if (loggedInUserId) {
      fetchTasks();
      fetchUserPoints();
    }
    //  CONSICTENCY THING
    const storedDeletedTasks = JSON.parse(localStorage.getItem("deletedTasks"));
    if (storedDeletedTasks) setDeletedTasks(storedDeletedTasks);
  }, [loggedInUserId]);

  
  // HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // FETCHES
  //fetch a users points
  const fetchUserPoints = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/points/${loggedInUserId}`
      );
      const score = await res.json();
      setPoints(score.points); // Updates the state with the actual value
    } catch (err) {
      console.log("Error trying to fetch the users points");
    }
  };

  // Getting all tasks owned by the loggedInUserId
  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/task/find/all/${loggedInUserId}`
      );
      const data = await res.json();
      setTask(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Save the task to backend database.
  const saveTaskToBackend = async (e) => {
    e.preventDefault();
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (!loggedInUserId) {
      alert("User is not logged in or user ID is missing");
      return;
    }

    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...inputData, userId: loggedInUserId }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/task/create`,
        options
      );
      if (res.status === 200) {
        // alert("The task was saved successfully!");
        fetchTasks();
        setInputData({
          title: "",
        });
      }
    } catch (error) {
      console.log("Error saving task:", error);
      alert("Failed to create the task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/task/delete/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (res.ok) {

         const deletedDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
  
         // Add the deleted date to localStorage
         const updatedDeletedTasks = [...deletedTasks, deletedDate];
         localStorage.setItem("deletedTasks", JSON.stringify(updatedDeletedTasks));
         setDeletedTasks(updatedDeletedTasks);
  
         console.log("Deleted tasks updated in localStorage:", updatedDeletedTasks); 
  
         // Update the task list to reflect the deletion
         setTask((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
         fetchUserPoints();
      }
    } catch (err) {
      console.log("Error deleting the task:", err);
      alert("Failed to delete the task.");
    }
  };

  return (
    <>
      <Dropdown></Dropdown>
      <div className="score-container">
        <div className="score-score">
        <p className="score-score-points">{points}</p>
        <p><BiDollar style={dollarCoinStyle} /></p>
        </div>
      </div>
      <div className="main-container">
        <div className="task-container">
          <div className="task-header">
            <p>Add New Task</p>
          </div>
          <form className="task-form" onSubmit={saveTaskToBackend}>
            <input
              name="title"
              id="title"
              placeholder="Title"
              type="text"
              value={inputData.title}
              onChange={handleInputChange}
            />
          </form>
        </div>
        <div className="task-list-header">
          <h4 className="h">The plans you have created</h4>
        </div>
        <div className="task-list">
          {task.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <div>
              {task.map((taskItem) => (
                <div key={taskItem.id} className="task-info">
                  <label
                    className="task-label"
                    onClick={() => deleteTask(taskItem.id)}
                  >
                    <span className="task-title">{taskItem.title}</span>
                    <input type="checkbox" />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
};
export default Main;
