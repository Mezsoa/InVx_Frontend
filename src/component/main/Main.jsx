import { useEffect, useState } from "react";
import "../../component/main/main.css";
import invx from "../../assets/invx.png";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown.jsx";

const Main = () => {
  const [task, setTask] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
  });

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log("logged in user:", loggedInUserId);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        alert("The task was saved successfully!");
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

  // Getting all tasks owned by the loggedInUserId
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/task/find/all/${loggedInUserId}`);
      const data = await res.json();
      setTask(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <Dropdown></Dropdown>
      <div className="task-container">
        <Link to={""} className="home-link">
          <img src={invx} className="logo-h" />
        </Link>
        <form className="task-form" onSubmit={saveTaskToBackend}>
          <div className="task-header">
            <p>Add New Task</p>
          </div>
          <input
            name="title"
            id="title"
            placeholder="Title"
            type="text"
            value={inputData.title}
            onChange={handleInputChange}
          />
          <input type="submit" value="submit" id="submit-btn" />
        </form>
      </div>

      <div className="task-list">
        <div className="task-info">
          <h2 className="h">TASKS</h2>
          {task.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <ul>
              {task.map((taskItem) => (
                <div key={taskItem.id}>
                  <div className="task-space">
                    <br />
                    <h3 className="h3">{taskItem.title}</h3>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default Main;
