export default function TaskFilter({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Filtrar por estado: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="Todas">Todas</option>
        <option value="Pendiente">Pendiente </option>
        <option value="En Progreso">En Progreso</option>
        <option value="Completada">Completada</option>
      </select>
    </div>
  );
}

//este es un componente controlado, el valor padre viene de app.jsx y el hijo solo muestra y avisa
