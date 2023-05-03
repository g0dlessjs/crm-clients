import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const NewClient = () => {
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
        <form>
          <Form />
          <input
            type="submit"
            className="mt-5 w-full p-3 bg-blue-700 hover:bg-blue-800 uppercase font-bold text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </form>
      </div>
    </>
  );
};

export default NewClient;
