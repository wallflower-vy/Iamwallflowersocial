import "./style.scss";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Leftbar from "./Components/Leftbar/Leftbar";
import Rightbar from "./Components/Rightbar/Rightbar";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { useContext, useState } from "react";
import {DarkModeContext} from './contex/darkModeContext'
import { AuthContext } from "./contex/authContext";


function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode}=useContext(DarkModeContext);
 


  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? 'dark' :'light'}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

// created a function protectedroute to check if the user has being logged in before
  const ProtectedRoute =({children})=>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }
    return children
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute> ,
      //the children is the 'layout component'
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
