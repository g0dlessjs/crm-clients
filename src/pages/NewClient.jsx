import React from "react";
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import FormNewClient from "../components/FormNewClient";
import Error from "../components/Error";
import { addClient } from "../data/clients";

export async function action({ request }) {
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

  await addClient(data);

  return redirect("/");
}

const NewClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
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
          <FormNewClient />
          <input
            type="submit"
            className="mt-5 w-full p-3 bg-blue-700 hover:bg-blue-800 uppercase font-bold text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NewClient;

// Debug formData
// console.log([...formData])
