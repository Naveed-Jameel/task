import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Sidebar = (props) => {
    const { setLoginpop, setSignuppop, isLogged, logout } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogin = () => {
        setSignuppop(false)
        setLoginpop(true)
    }

    const handleSignup = () => {
        setLoginpop(false)
        setSignuppop(true)
    }

    return (
        <>
            <div className={`z-20 absolute top-3 left-10 w-64 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}>
                <HiMenu size={28} className="cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className={`z-50 fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-end">
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                        <HiX />
                    </button>
                </div>
                {/* Sidebar Tabs */}
                <div className="p-4">
                    <div className="mb-4" onClick={toggleSidebar}>
                        <Link to="/" className={`text-white text-start block w-full py-2 px-4 rounded-md outline-none  hover:bg-gray-700 ${location.pathname == '/' ? "bg-gray-700" : "bg-gray-600"}`}>
                            All Posts
                        </Link>
                    </div>
                    <div className="mb-4" onClick={toggleSidebar}>
                        <Link to="/add" className={`text-white text-start block w-full py-2 px-4 rounded-md outline-none  hover:bg-gray-700 ${location.pathname == '/add' ? "bg-gray-700" : "bg-gray-600"}`}>
                            Add Post
                        </Link>
                    </div>
                    { isLogged ? 
                        <div className="mb-4">
                            <button onClick={logout} className={`text-white text-start block w-full py-2 px-4 rounded-md outline-none bg-gray-600  hover:bg-gray-700   `}>
                                Logout
                            </button>
                        </div>:
                        <div className="mb-4" onClick={toggleSidebar}>
                            <button onClick={handleLogin} className={`text-white text-start block w-full py-2 px-4 rounded-md outline-none bg-gray-600 hover:bg-gray-700 `}>
                                Login
                            </button>
                        </div>
                    }

                    {!isLogged &&
                        <div className="mb-4" onClick={toggleSidebar}>
                            <button onClick={handleSignup} className={`text-white text-start block w-full py-2 px-4 rounded-md outline-none bg-gray-600 hover:bg-gray-700 `}>
                                SignUp
                            </button>
                        </div>
                    }

                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: function () {
            dispatch(logout());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

