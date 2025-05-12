import React, { useState, useEffect } from "react";
import "./taiwin.css"; // Đảm bảo rằng bạn đã import đúng file CSS của Tailwind

const Tabbar = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [addedTasks, setAddedTasks] = useState([]);

  // Load dữ liệu từ Local Storage khi component được render lần đầu
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setAddedTasks(savedTasks);
    }
  }, []);

  // Lưu dữ liệu vào Local Storage khi có sự thay đổi trong addedTasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(addedTasks));
  }, [addedTasks]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...addedTasks, { text: newTask, completed: false }];
      setAddedTasks(updatedTasks);
      setNewTask("");
    }
  };

  const handleTaskCompleteToggle = (index) => {
    const updatedTasks = [...addedTasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setAddedTasks(updatedTasks);
  };

  const handleClearCompleted = () => {
    const filteredTasks = addedTasks.filter((task) => !task.completed);
    setAddedTasks(filteredTasks);
  };

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="container">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All
          </button>
          <button
            className={`tab-button ${activeTab === "active" ? "active" : ""}`}
            onClick={() => handleTabClick("active")}
          >
            Active
          </button>
          <button
            className={`tab-button ${
              activeTab === "completed" ? "active" : ""
            }`}
            onClick={() => handleTabClick("completed")}
          >
            Completed
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            className="task-input"
            placeholder="Add details"
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>
        <div className="text-center task-list">
          {activeTab === "all" && (
            <ul>
              {addedTasks.map((task, index) => (
                <li
                  key={index}
                  className={`task-item ${task.completed ? "completed" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskCompleteToggle(index)}
                    className="mr-2"
                  />
                  {task.text}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "active" && (
            <ul>
              {addedTasks
                .filter((task) => !task.completed)
                .map((task, index) => (
                  <li
                    key={index}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompleteToggle(index)}
                      className="mr-2"
                    />
                    {task.text}
                  </li>
                ))}
            </ul>
          )}
          {activeTab === "completed" && (
            <ul>
              {addedTasks
                .filter((task) => task.completed)
                .map((task, index) => (
                  <li
                    key={index}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompleteToggle(index)}
                      className="mr-2"
                    />
                    {task.text}
                  </li>
                ))}
            </ul>
          )}
          {activeTab === "completed" && (
            <div className="mt-4">
              <button
                className="clear-completed bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
