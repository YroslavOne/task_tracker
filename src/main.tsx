import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login.tsx";
import Registration from "./pages/signup/Registration.tsx";
import { AuthLayout } from "./layout/auth/AuthLayout.tsx";
import Layout from "./layout/menu/Layout.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: (
				<RequireAuth> <Layout /></RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
						<Dashboard />
				)
			},
		// 	{
		// 		path: '/success',
		// 		element: (
		// 			<Success/>
		// 		)
		// 	},
			// {
			// 	path: '/cart',
			// 	element: <Cart />
			// },
			// {
			// 	path: '/product/:id',
			// 	element: <Product />,
			// 	errorElement: <>Ошибка</>,
			// 	loader: async ({ params }) => {
			// 		return defer({
			// 			data: new Promise<void>((resolve, reject) => {
			// 				setTimeout(() => {
			// 					axios
			// 						.get(`${PREFIX}/products/${params.id}`)
			// 						.then((data) => resolve(data))
			// 						.catch((e) => reject(e));
			// 				}, 2000);
			// 			})
			// 		});
			// 	}
			// }
		]
	},
	{
		path: '/auth',
		element: < AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Registration />
			}
		]
	},

	// {
	// 	path: '*',
	// 	element: <Error />
	// }
]);



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <RouterProvider router={router}/>
    {/* </Provider> */}
  </React.StrictMode>
);
