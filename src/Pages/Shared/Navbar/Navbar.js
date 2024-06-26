import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Navbar = ({ theme, setTheme }) => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("photoURL");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("displayName");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Successfully',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar:"true"
    });
  }
  
 

  const userDp = localStorage.photoURL;
  let menuRef=useRef();
   useEffect(()=>{
    document.addEventListener("mousedown",(e)=>{
      if(!menuRef.current?.contains(e.target)){
        setIsOpen(false)
      }
      
    })
   },[])
   

  useEffect(() => {
    if (localStorage.darktheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");

      localStorage.setItem("darktheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handlethemeswitcher = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("darktheme", "light");
  };
 



  const Menuitems = (
    <>
     

     <button className="transparent  " onClick={handlethemeswitcher} >
    
        {theme === "dark" ? (
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        )}
      
     </button>

  
    <li className="mx-2"  onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Link to="/home">Home</Link>
      </li>
      <li className="mx-2"   onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Link to="/about">About</Link>
      </li>
      <li className="mx-2"   onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Link to="/appiontment">Appiontment</Link>
      </li>
      <li className="mx-2"   onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li className="mx-2"   onClick={() => setIsOpen(isOpen => !isOpen)}>
        <Link to="/contactus">Contact US</Link>
        {user && <Link className="mx-2" to="/dashboard">Dashboard</Link>}
      </li  >
     
      <li className="mx-2"   onClick={() => setIsOpen(isOpen => !isOpen)}>
        {user ? (
          <>
           <button
              onClick={logout}
              className="btn btn-primary w-auto"
            >
              Logout
            </button> 
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    
      <div className="dropdown relative">
              <Link
                to=""
                className="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {localStorage.photoURL ? (
                  <div className="avatar  ">
                    <div className="w-12 mx-6 rounded-full ">
                      <img className="" src={userDp} alt="" />
                    </div>
                  </div>
                ) : (
                  user?.photoURL && (
                    <div className="avatar">
                      <div className="w-12 rounded-full	mx-6 ">
                        <img className="" src={user?.photoURL} alt="" />
                      </div>
                    </div>
                  )
                )}
              </Link>
            </div>
    </>

   
  );
  return (
    <div 
    ref={menuRef}
    
    className="navbar">
      <div className="navbar-start">
        <div className={` dropdown dark:bg-black   dark:text-white`}>
          <label 
            
             onClick={() => setIsOpen(isOpen => !isOpen)}
          tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          
          <ul
            style={{display:`${isOpen? "block":"none"}`}}
            tabIndex="0"
            className={` menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box flex flex-col w-52 font-normal dark:bg-black  dark:text-white z-10`}
          >
          
          {Menuitems}
          
           
          </ul>
        
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Doctors Portal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex justify-between items-center">
          {Menuitems}
        
        </ul>
      </div>
      <div className="navbar-end lg:hidden">
        <label
          tabIndex="1"
          htmlFor="my-drawer-2"
          className=" drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
