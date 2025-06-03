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

import "./app.css";
import EditOptions from "../components/configs/EditOptions";
import EditFormProfile from "../components/configs/EditFormProfile";
import EditFormSecurity from "../components/configs/EditFormSecurity";
import TransactionDetails from "../components/lobby/TransactionDetails";
import EditFormBlocks from "../components/configs/EditFormBlocks";
import UserDetail from "../components/admin/UserDetail";

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
  {
    path: "/admin",
    element: <Adminview />,
    children: [
      { path: "", element: <UserDetail /> },
      { path: "user", element: <UserDetail /> },
    ],
  },
  { path: "lobby", element: <Lobby /> },
  { path: "config", element: <EditOptions /> },
  { path: "config/user", element: <EditFormProfile /> },
  { path: "config/security", element: <EditFormSecurity /> },
  { path: "config/blocks", element: <EditFormBlocks /> },
  { path: "transfer", element: <Transfers /> },
  { path: "transfer/details/:id", element: <TransactionDetails /> },
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
