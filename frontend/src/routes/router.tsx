import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Error from '../pages/Error';
import App from "../App";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000'
const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '*', element: <Error /> },
    {
        element: <App />,
        children: [
            { path: '/', index: true, element: <Dashboard /> }
        ]
    },
]);

export default router;