import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const NuevaCuenta = () => {
  //obtener productos Graphql
  const { data, loading, error } = useQuery(QUERY);

  console.log(data);
  console.log(loading);
  console.log(error);

  const [disabled, setDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacía")
        .min(6, "El password debe ser de al menos 6 caracteres"),
    }),
    onSubmit: (valores) => {
      console.log("enviando ", valores);
    },
  });

  const validationForm =
    formik.errors.nombre ||
    formik.errors.apellido ||
    formik.errors.email ||
    formik.errors.password;

  useEffect(() => {
    setDisabled(validationForm);
  }, [validationForm]);

  if (loading) return "Cargando...";

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">
          Crear nueva cuenta
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-700 leading-tight focua:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.nombre && formik.errors.nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded">
                  <p>{formik.errors.nombre}</p>
                </div>
              )}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-700 leading-tight focua:outline-none focus:shadow-outline"
                  id="apellido"
                  type="text"
                  placeholder="Apellido usuario"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.apellido && formik.errors.apellido && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded">
                  <p>{formik.errors.apellido}</p>
                </div>
              )}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-700 leading-tight focua:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded">
                  <p>{formik.errors.email}</p>
                </div>
              )}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none rounded w-full py-2 px-3 text-700 leading-tight focua:outline-none focus:shadow-outline"
                  id="password"
                  type="Password"
                  placeholder="********"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded">
                  <p>{formik.errors.password}</p>
                </div>
              )}

              <input
                type="submit"
                className={`w-full mt-5 p-2 text-white uppercase rounded cursor-pointer ${
                  disabled ? "bg-gray-500" : "bg-gray-800   hover:bg-gray-700 "
                } `}
                value="Crear cuenta"
                disabled={disabled}
              />
              <div className="mt-8">
                <Link href="/login">
                  <a className="text-gray-600 text-sm hover:text-gray-800">
                    Ir a iniciar sesión
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaCuenta;
