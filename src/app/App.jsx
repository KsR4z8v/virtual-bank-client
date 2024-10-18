import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormsView from "../components/forms/FormsView";
import Signup from "../components/forms/Signup";
import Sign from "../components/forms/Sign";
import RecoverPass from "../components/forms/RecoverPass";
import UpdatePass from "../components/forms/UpdatePass";
import Adminview from "../components/admin/Adminview";
import { UserContextProvider } from "../context/userContext";
import "./app.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <FormsView />,
    children: [
      { path: "/", element: <Sign /> },
      { path: "signup", element: <Signup /> },
      { path: "recoverpass", element: <RecoverPass /> },
      { path: "newpass", element: <UpdatePass /> },
     
    ],
   
  } ,{ path: "adminview", element: <Adminview />}
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
