import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import Layout from "../components/Layout";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();

  //mutation para crear usuarios en apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  const [mensaje, setMensaje] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        setMensaje("Autenticando...");

        //guardar token localstorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);

        //redireccionar hacia clientes
        setTimeout(() => {
          setMensaje(null);
          router.push("/");
        }, 1500);
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

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>

        {mensaje && mostrarMensaje()}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8"
              onSubmit={formik.handleSubmit}
            >
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>

              {formik.touched.password && formik.errors.password && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded">
                  <p>{formik.errors.password}</p>
                </div>
              )}

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded hover:bg-gray-700 cursor-pointer"
                value="Iniciar sesión"
              />
              <div className="mt-8">
                <Link href="/nuevacuenta">
                  <a className="text-gray-600 text-sm hover:text-gray-800">
                    Ir a crear nueva cuenta
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

export default Login;
