import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import About from './pages/About'
import axios from 'axios'
import PATH from './Utiles/PATH'
import { useAuth } from './Context/Context'
import Dashboard from './pages/Dashboard'
import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './pages/ProtectedRoute'
import Contact from './pages/Contact'

function App() {
  
  const { user, setUser, auth, setAuth } = useAuth();  
  const [loading,setLoading] = useState(true);

  async function fetchUser() {
    try {      
      setLoading(true);
      const response = await axios.post(PATH.AUTH.GETUSER, {}, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setAuth(true);
        setUser(response.data.data);
      } else {
        setAuth(false);
        setUser(null);
      }
    } catch (error) {
      setAuth(false);
      setUser(null);

    } finally {
      setLoading(false);
    }
  }

  console.log(auth);
  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App