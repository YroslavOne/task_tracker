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
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import VitalTask from "./pages/vitalTask/VitalTask.tsx";
import MyTask from "./pages/myTask/MyTask.tsx";
import Help from "./pages/help/Help.tsx";
import Settings from "./pages/settings/Settings.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        {" "}
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/vital-task",
        element: <VitalTask />,
      },
      {
        path: "/my-task",
        element: <MyTask />,
      },
      
      {
        path: "/settings",
        element: <Settings />,
      },
      
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },

  {
  	path: '*',
  	element: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
