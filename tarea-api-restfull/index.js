const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("LINSTENING ON PORT 3000");
});

//funcion middleware:
function validarTarea(req, res, next) {
  const { titulo, descripcion, estado } = req.body;

  if (!titulo || !descripcion || !estado) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  next();
}

const tareas = [];
let siguienteId = 1;

app.post("/tareas", validarTarea, (req, res) => {
  const tarea = req.body;
  tarea.id = siguienteId++;
  tareas.push(tarea);
  res.status(201).json(tarea);
});

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.get("/tareas/:id", (req, res) => {
  const id = Number(req.params.id); //esto porque la url siempre llega como texto, por lo que requiero convertirlo a num para buscarlo en el arreglo de tareas donde sus id son num.
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(tarea);
});

app.put("/tareas/:id", validarTarea, (req, res) => {
  const id = Number(req.params.id);
  const tareaIndex = tareas.findIndex((t) => t.id === id);
  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  const { titulo, descripcion, estado } = req.body;
  //Actualizar tarea
  tareas[tareaIndex] = {
    id,
    titulo,
    descripcion,
    estado,
  };
  res.json(tareas[tareaIndex]);
});

app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const tareaIndex = tareas.findIndex((t) => t.id === id);
  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  tareas.splice(tareaIndex, 1);
  res.status(204).send(); // para responder que fue exitoso y ya no hay contenido
});
