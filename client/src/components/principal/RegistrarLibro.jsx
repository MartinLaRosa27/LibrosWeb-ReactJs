import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLibro } from "../../hook/useLibro";

export const RegistrarLibro = (props) => {
  // ------------------------------------------------------------------------------------ //
  const { postLibro } = useLibro();

  // ------------------------------------------------------------------------------------ //
  const formik = useFormik({
    initialValues: {
      nombre: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El libro es obligatorio")
        .min(1, "El libro debe tener entre 1 y 90 caracteres")
        .max(90, "El libro ingresado debe tener entre 5 y 90 caracteres")
        .matches(
          /^[A-Za-z0-9 ]+$/,
          "El nombre del libro solo puede contener letras o numeros"
        ),
    }),
    onSubmit: (FormData) => {
      postLibro(FormData, props.usuario._id);
      formik.handleReset();
    },
  });

  // ------------------------------------------------------------------------------------ //
  return (
    <div className="container text-uppercase">
      <h3 className="pt-5 text-center">Ingrese un nuevo libro</h3>

      {formik.errors.nombre && (
        <div className="alert alert-warning text-center mt-4" role="alert">
          {formik.errors.nombre}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del libro</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            onChange={formik.handleChange}
            value={formik.values.nombre}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary text-uppercase">
          guardar libro
        </button>
      </form>
    </div>
  );
};
