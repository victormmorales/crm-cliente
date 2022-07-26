import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import Layout from "../components/Layout";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;

const NuevaCuenta = () => {
  //Crear nuevo usuario
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

  const [mensaje, setMensaje] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

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
    onSubmit: async (valores) => {
      // console.log("enviando ", valores);
      const { nombre, apellido, email, password } = valores;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });

        //usuario creado
        setMensaje(`¡Bienvenido ${data.nuevoUsuario.nombre}!`);

        setTimeout(() => {
          setMensaje(null);
          router.push("/login");
        }, 3000);
      } catch (error) {
        setMensaje(error.message);

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  const validationForm =
    formik.errors.nombre ||
    formik.errors.apellido ||
    formik.errors.email ||
    formik.errors.password;

  useEffect(() => {
    setDisabled(validationForm);
  }, [validationForm]);

  return (
    <>
      <Layout>
        {mensaje && mostrarMensaje()}
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
