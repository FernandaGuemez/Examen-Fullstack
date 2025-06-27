import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import { useState } from "react";

export default function TaskList({ filterStatus }) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("Pendiente");

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditClick = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status || "Pendiente");
  };

  const handleSaveClick = () => {
    if (!editTitle.trim() || !editDescription.trim()) return;

    dispatch(
      updateTask({
        id: editId,
        updatedTask: {
          id: editId,
          title: editTitle,
          description: editDescription,
          status: editStatus,
        },
      })
    );

    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("Pendiente");
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("Pendiente");
  };

  const filteredTasks =
    filterStatus === "Todas"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);
  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id} style={{ marginBottom: "0.5rem" }}>
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <br />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <br />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
              </select>
              <br />
              <button onClick={handleSaveClick}>Guardar</button>
              <button
                onClick={handleCancelClick}
                style={{ marginLeft: "0.5rem" }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <strong>{task.title}</strong>: {task.description}
              <button
                onClick={() => handleEditClick(task)}
                style={{ marginLeft: "1rem" }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Eliminar
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
