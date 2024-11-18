import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lobby from "../components/lobby/Lobby";
import { UserContextProvider } from "../context/userContext";
import Sign from "../components/forms/Sign";
import Signup from "../components/forms/Signup";
import RecoverPass from "../components/forms/RecoverPass";
import UpdatePass from "../components/forms/UpdatePass";
import Home from "../pages/Home";
import Forms from "../components/forms/Forms";
import Adminview from "../components/admin/Adminview";
import Transfers from "../components/forms/transfers";
import Header from "../components/forms/Header";  

import "./app.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forms",
    element: <Forms />,
    children: [
      { path: "", element: <Sign /> },
      { path: "signup", element: <Signup /> },
      { path: "recoverpass", element: <RecoverPass /> },
      { path: "newpass", element: <UpdatePass /> },
    ],
  },
  { path: "admin", element: <Adminview /> },
  { path: "lobby", element: <Lobby /> },
  { path: "transfers", element: <Transfers /> },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
