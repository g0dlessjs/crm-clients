import React from "react";
import { useLoaderData } from "react-router-dom";
import Client from "../components/Client";

export function loader() {
  const clients = [
    {
      id: 1,
      name: "Juan",
      phone: 102013313,
      email: "juan@juan.com",
      company: "Codigo Con Juan",
    },
    {
      id: 2,
      name: "Karen",
      phone: 138198313,
      email: "karen@juan.com",
      company: "Codigo Con Juan",
    },
    {
      id: 3,
      name: "Josue",
      phone: 31983913,
      email: "josue@juan.com",
      company: "Codigo Con Juan",
    },
    {
      id: 4,
      name: "Miguel",
      phone: 319381983,
      email: "miguel@juan.com",
      company: "Codigo Con Juan",
    },
    {
      id: 5,
      nombre: "Pedro",
      telefono: 1398198938,
      email: "pedro@juan.com",
      empresa: "Codigo Con Juan",
    },
  ];
  return clients;
}

const Index = () => {
  const clients = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clients.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Client client={client} key={client.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No Hay Clientes Aún</p>
      )}
    </>
  );
};

export default Index;
