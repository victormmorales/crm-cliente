import Link from "next/link";
import Layout from "../components/Layout";

const Login = () => {
  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-8">
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
                />
              </div>

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
                />
              </div>

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
