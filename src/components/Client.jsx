import React from "react";
import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteClient } from "../data/clients";

export async function action({ params }) {
  await deleteClient(params.clientId);
  return redirect("/");
}

const Client = ({ client }) => {
  const navigate = useNavigate();

  const { name, phone, email, company, id } = client;

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{company}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {phone}
        </p>
      </td>
      <td className="p-6 flex gap-3">
        <button
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          type="button"
          onClick={() => navigate(`/clients/${id}/edit`)}
        >
          Editar
        </button>

        <Form
          method="POST"
          action={`/clients/${id}/delete`}
          onSubmit={(e) => {
            if (!confirm("¿Deseas eliminar este registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
            type="submit"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Client;
