import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pendiente");

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
    setStatus("Pendiente");
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Completada">Completada</option>
      </select>
      <br />
      <button onClick={handleAdd}>Agregar tarea</button>
    </div>
  );
}
