// import { useEffect, useState } from "react";
// import "../../component/main/main.css";

// const Main = () => {
//   const [task, setTask] = useState([]);
//   const [inputData, setInputData] = useState({
//     title: "",
//     description: "",
//     status: "",
//     priority: "",
//   });

//   const fetchTasks = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/task/find/all`);
//       const data = await res.json();
//       setTask(data);
//     } catch (error) {
//       console.log("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const saveTaskToBackend = async (e) => {
//     e.preventDefault();

//     var options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(inputData),
//     };

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/task/create`,
//         options
//       );
//       if (res.status === 200) {
//         alert("The task was save successfully!");
//         fetchTasks();
//         setInputData({
//           title: "",
//           description: "",
//           status: "",
//           priority: "",
//         });
//       }
//     } catch (error) {
//       console, log("Error saving task:", error);
//       alert("Failed to create the task");
//     }
//   };

//   return (
//     <>
//       <div className="task-container">
//         <form className="task-form" >
//           <div className="task-header">
//             <p>Add New Task</p>
//           </div>

//           <input 
//           name="title" 
//           id="title" 
//           placeholder="Title" 
//           type="text" 
//           value={inputData.setTitle}
//           onChange={handleInputChange}/>

//           <input
//             name="description"
//             id="description"
//             placeholder="Description"
//             type="text"
//             value={inputData.setDescription}
//             onChange={handleInputChange}/>

//           <input 
//           name="status" 
//           id="status" 
//           placeholder="Status" 
//           type="text" 
//           value={inputData.setStatus}
//           onChange={handleInputChange}/>

//           <input
//             name="priority"
//             id="priority"
//             placeholder="Priority"
//             type="text"
//             value={inputData.setPriority}
//           onChange={handleInputChange}/>

//           <input type="submit" value="submit" id="submit-btn" onSubmit={saveTaskToBackend} />
//         </form>
//       </div>
//       <div className="task-list">
//         <h2>Tasks</h2>
//         {task.length === 0 ? (
//           <p>No tasks available</p>
//         ) : (
//           <ul>
//             {task.map((task) => (
//               <li key={task.id}>
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <p>Status: {task.status}</p>
//                 <p>Priority: {task.priority}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };
// export default Main;


















import { useEffect, useState } from "react";
import "../../component/main/main.css";

const Main = () => {
  const [task, setTask] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/task/find/all`);
      const data = await res.json();
      setTask(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

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

    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(inputData),
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
          description: "",
          status: "",
          priority: "",
        });
      }
    } catch (error) {
      console.log("Error saving task:", error);
      alert("Failed to create the task");
    }
  };

  return (
    <>
      <div className="task-container">
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

          <input
            name="description"
            id="description"
            placeholder="Description"
            type="text"
            value={inputData.description}
            onChange={handleInputChange}
          />

          <input
            name="status"
            id="status"
            placeholder="Status"
            type="text"
            value={inputData.status}
            onChange={handleInputChange}
          />

          <input
            name="priority"
            id="priority"
            placeholder="Priority"
            type="text"
            value={inputData.priority}
            onChange={handleInputChange}
          />

          <input type="submit" value="submit" id="submit-btn" />
        </form>
      </div>
      <div className="task-list">
        <h2 className="h2">Tasks</h2>
        {task.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul>
            {task.map((task) => (
              <div key={task.id}>
                <br />
                <h3 className="h3">{task.title}</h3>
                <p className="p">{task.description}</p>
                <p className="p">Status: {task.status}</p>
                <p className="p">Priority: {task.priority}</p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default Main;
