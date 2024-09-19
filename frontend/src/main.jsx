import React, { useEffect, useContext, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import useUser, { AuthProvider } from "./context/AuthContext";
import App from "./App";
import IntroPage from "./pages/IntroPage/IntroPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminProfil from "./pages/AdminProfil/AdminProfil";
import Classement from "./pages/Classement/Classement";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SpotZone from "./pages/SpotZone/SpotZone";
import SubmitWork from "./pages/SubmitWork/SubmitWork";
import UserProfil from "./pages/UserProfil/UserProfil";
import Information from "./pages/Information/Information";
import ContactUs from "./pages/Contact/ContactUs/ContactUs";
import ComplimentUs from "./pages/Contact/ComplimentUs/ComplimentUs";
import Reclamation from "./pages/Contact/Reclamation/Reclamation";
import AskUs from "./pages/Contact/AskUs/AskUs";
import SpotZoneById from "./pages/SpotZoneById/SpotZoneById";
import Profil from "./pages/Profil/Profil";
import Loading from "./components/LoadingComponent/Loading";

// Route safe //
function PrivateRoute({ children }) {
  const { user, isLoading } = useContext(useUser);

  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading || loading) {
      setPage(<Loading />);
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } else if (!user) {
      navigate("/login");
    } else {
      setPage(children);
    }
    return () => clearTimeout();
  }, [user, isLoading, location, loading]);
  return page;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <IntroPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,

        loader: () => {
          return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/image`, {
            credentials: "include",
          });
        },
      },
      {
        path: "/spotzone",
        element: <SpotZone />,

        loader: () => {
          return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/location`, {
            credentials: "include",
          });
        },
      },
      {
        path: "/spotzonebyid/:location",
        element: <SpotZoneById />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profil",
        element: (
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        ),
      },
      {
        path: "/userProfil",
        element: (
          <PrivateRoute>
            <UserProfil />
          </PrivateRoute>
        ),
        loader: () => {
          return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            credentials: "include",
          });
        },
      },
      {
        path: "/adminprofil",

        element: (
          <PrivateRoute>
            <AdminProfil />
          </PrivateRoute>
        ),
      },
      {
        path: "/classement",
        element: (
          <PrivateRoute>
            <Classement />
          </PrivateRoute>
        ),
      },
      {
        path: "/submitwork",
        element: (
          <PrivateRoute>
            <SubmitWork />
          </PrivateRoute>
        ),
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/askus",
        element: <AskUs />,
      },
      {
        path: "/complimentus",
        element: <ComplimentUs />,
      },
      {
        path: "/reclamation",
        element: <Reclamation />,
      },
      {
        path: "/information",
        element: (
          <PrivateRoute>
            <Information />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
