import React, { useState } from 'react'
import { useAuth } from '../Context/Context'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import PATH from '../Utiles/PATH'

function Navbar() {
    const navigate = useNavigate();
    const { auth, setAuth, user, setUser } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        const response = await axios.post(PATH.AUTH.LOGOUT, {}, {
            headers: {
                'Content-Type': "application/json"
            },
            withCredentials: true
        });
        if (response.status === 200) {
            setAuth(false);
            setUser(null);
            toast.success('Logout Successfully');
            navigate('/');
        }
        console.log(auth);
        console.log(user);
    }

    return (
        <div className="bg-white shadow-md flex justify-between items-center p-4">            
            <Link to={'/'} className='text-2xl font-semibold'>Linkfy</Link>

            
            <button 
                className="sm:hidden text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                &#9776;
            </button>

            <ul className={`sm:flex space-x-6 ${menuOpen ? "flex-col items-center text-center absolute top-16 left-0 w-full bg-amber-100 p-4" : "hidden lg:flex"}`}>
                <li>
                    <Link to="/" className="block p-2 hover:text-amber-200 font-semibold">Home</Link>
                </li>
                <li>
                    <Link to="/about" className="block p-2  hover:text-amber-200 font-semibold">About</Link>
                </li>
                <li>
                    <Link to="/contact" className="block p-2  hover:text-amber-200 font-semibold">Contact</Link>
                </li>
                {auth ? (
                <div className="sm:hidden mt-4 flex gap-4 justify-center items-center">
                    <Link to={'/dashboard'} className="btn btn-warning">
                        Dashboard
                    </Link>
                    <button className='btn btn-success' onClick={() => { handleLogout() }}>
                        Logout
                    </button>
                </div>
            ) : (
                <Link to={'/login'} className="bg-green-500 text-white px-4 py-2 sm:hidden rounded hover:bg-green-600">
                    Login
                </Link>
            )}
            </ul>

            {auth ? (
                <div className="gap-4 hidden sm:flex justify-center items-center">
                    <Link to={'/dashboard'} className="btn btn-warning">
                        Dashboard
                    </Link>
                    <button className='btn btn-success' onClick={() => { handleLogout() }}>
                        Logout
                    </button>
                </div>
            ) : (
                <Link to={'/login'} className="btn btn-warning hidden sm:flex">
                    Login
                </Link>
            )}
        </div>
    )
}

export default Navbar;