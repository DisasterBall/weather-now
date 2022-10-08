import Admin from "./pages/Admin.js";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, STATISTIC_ROUTE} from "./utils/constsRoutes.js";
import Auth from "./pages/Auth.js";
import Main from "./pages/Main.js";
import Statistic from "./pages/Statistic.js";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: STATISTIC_ROUTE,
        Component: Statistic
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]