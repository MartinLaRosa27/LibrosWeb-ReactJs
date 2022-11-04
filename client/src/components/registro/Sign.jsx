import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUsuario } from "../../hook/useUsuario";

export const Sign = () => {
  // ------------------------------------------------------------------------------------ //
  const { postUsuario } = useUsuario();

  // ------------------------------------------------------------------------------------ //
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordAux: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio")
        .email("Email invalido")
        .min(5, "El email ingresado debe tener entre 5 y 90 caracteres")
        .max(90, "El email ingresado debe tener entre 5 y 90 caracteres"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .matches("[0-9]", "La contraseña debe tener al menos un numero")
        .oneOf(
          [Yup.ref("passwordAux")],
          "Las contraseñas ingresadas no coinciden"
        )
        .min(8, "La contraseña ingresada debe tener entre 8 y 25 caracteres")
        .max(25, "La contraseña ingresada debe tener entre 8 y 25 caracteres"),
      passwordAux: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (FormData) => {
      postUsuario(FormData);
      formik.handleReset();
    },
  });

  // ------------------------------------------------------------------------------------ //
  return (
    <div className="container">
      {(formik.errors.email || formik.errors.password) && (
        <div className="alert alert-warning text-center mt-4" role="alert">
          {formik.errors.email || formik.errors.password}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          ></input>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña Nuevamente</label>
          <input
            type="password"
            className="form-control"
            name="passwordAux"
            onChange={formik.handleChange}
            value={formik.values.passwordAux}
            required
          ></input>
        </div>

        <button type="submit" className="btn btn-primary text-uppercase">
          Registrarse
        </button>
      </form>
    </div>
  );
};
