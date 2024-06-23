import "../../component/main/main.css"



const Main = () => {

  return (
    <>
    <div className="task-container">
        <form className="task-form">
            <div className="task-header">
            <p>Add New Task</p>
            </div>

            <input
            name="title"
            id="title"
            placeholder="Title"
            type="text"
            />

            <input 
            name="description"
            id="description"
            placeholder="Description"
            type="text" />

            <input
            name="status"
            id="status"
            placeholder="Status" 
            type="text" />

            <input
            name="priority"
            id="priority"
            placeholder="Priority"
            type="text" />
        </form>
    </div>
    </>
    
  )
}
export default Main;