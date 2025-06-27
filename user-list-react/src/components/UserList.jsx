import { useEffect, useState } from "react";
import "./UserList.css";

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchUser, setSearch] = useState("");
  const listaFiltrada = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(searchUser.toLowerCase())
  );
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => setUsuarios(datos));
  }, []);
  return (
    <div>
      <input
        type="text"
        value={searchUser || ""}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filtra aquí tu usuario :)"
      ></input>
      <ul>
        {listaFiltrada.map((usuario) => (
          <li key={usuario.id}>
            <p>Nombre: {usuario.name}</p>
            <p>Email: {usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
