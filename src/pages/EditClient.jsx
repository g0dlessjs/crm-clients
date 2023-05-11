import React from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  redirect,
} from "react-router-dom";
import { getClient, updateClient } from "../data/clients";
import FormNewClient from "../components/FormNewClient";
import Error from "../components/Error";

export async function loader({ params }) {
  const client = await getClient(params.clientId);
  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no fue encontrado",
    });
  }
  return client;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const email = formData.get("email");

  // Validación
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errors.push("El Email no es válido");
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  // Actualizar cliente
  await updateClient(params.clientId, data);
  return redirect("/");
}

const EditClient = () => {
  const navigate = useNavigate();
  const client = useLoaderData();
  const errors = useActionData();

  console.log(client);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuación podras modificar los datos de un cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
        {errors?.length &&
          errors.map((error, idx) => <Error key={idx}>{error}</Error>)}
        <Form method="post">
          <FormNewClient client={client} />
          <input
            type="submit"
            className="mt-5 w-full p-3 bg-blue-700 hover:bg-blue-800 uppercase font-bold text-white text-lg cursor-pointer"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
};

export default EditClient;
