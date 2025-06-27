import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import "./App.css";

function App() {
  const [filterStatus, setFilterStatus] = useState("Todas");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Proyecto: Task Manager</h1>

      <TaskForm />
      <TaskFilter value={filterStatus} onChange={setFilterStatus} />
      <TaskList filterStatus={filterStatus} />
    </div>
  );
}

export default App;
