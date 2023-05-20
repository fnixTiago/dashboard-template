import { Navigate, useRoutes } from "react-router-dom";
import LoginPage from "../pages/Login/Login"
import RegisterPage from "../pages/Register/Register"
import ForgetPasswordPage from "../pages/ForgetPassword/ForgetPassword"
import Dashboard from "../Dashboard/Dashboard"
import Contacts from "../Dashboard/Contacts/Contacts"
import Inscritos from "../Dashboard/Inscritos/Inscritos"
import Users from "../Dashboard/Users/Users"
import Page404 from "../Page404/Page404"
import PrivateLayout from "../components/layout/PrivateLayout";
import RootLayout from "../components/layout/RootLayout";
export default function Router() {
    const routes = useRoutes([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <LoginPage />
                },
                {
                    path: "register",
                    element: <RegisterPage />
                },
                {
                    path: "reset",
                    element: <ForgetPasswordPage />
                },
                {
                    path: "dashboard",
                    element: <PrivateLayout />,
                    children: [
                        {
                            index: true,
                            element: <Dashboard />
                        },
                        {
                            path: 'users',
                            element: <Users />
                        },
                        {
                            path: 'inscritos',
                            element: <Inscritos />
                        },
                        {
                            path: 'contacts',
                            element: <Contacts />
                        },
                    ]
                },
            ]
        },
        {
            path: '404',
            element: <Page404 />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },

    ])
    return routes;

}