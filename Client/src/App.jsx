import React from 'react'
import './App.scss'
import Navbar from './components/navbar/Navbar'
import Login from "./pages/login/Login";
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Gigs from './pages/gigs/Gigs'
import Gig from './pages/gig/Gig'
import Orders from './pages/orders/Orders'
import Mygigs from './pages/mygigs/Mygigs'
import Add from './pages/add/Add'
import Messages from './pages/messages/Messages'
import Message from './pages/message/Message'
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
        <ToastContainer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <Mygigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />

    </div>
  )
}

export default App
