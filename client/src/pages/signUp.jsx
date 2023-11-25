import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/authSlice";


const Signup = ({ setSignuppop, setLoginpop }) => {
  const dispatch = useDispatch();  
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError]=useState(false)
  const [passwordError, setPasswordError]=useState(false)

  const handleSignup = (e) => {
    if(!name || !password || !email){
      return
    }
    e.preventDefault();

    const data={ name, email, password }

    dispatch(registerUser(data)).unwrap()
      .then((data) => {
        toast.success(data.msg)
        setSignuppop(false)
    }).catch((err)=>{
        toast.error(err)
    })

  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(e.target.value);

    // Email validation check
    const emailRegex = /^\S+@\S+\.\S+$/;
    setEmailError(!emailRegex.test(input));
    // setDisableGuestBtn(false)
  }; 
  const handlePassword=(e)=>{
    setPassword(e.target.value);
    if(e.target.value.length<6){
      setPasswordError(true)
    }
    else{
      setPasswordError(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setSignuppop(false)}
      ></div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="items-center px-4 py-8 "
      >
        <div className="rz-80 relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="relative bg-white">
            <button
              onClick={() => setSignuppop(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl flex items-center justify-center font-medium text-gray-900">
                <span className="font-serif">Sign Up</span>
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-start block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name<span className="text-red-400">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-start block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email<span className="text-red-400">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="name@gmail.com"
                    required
                  />
                  {emailError && <p className="text-red-600 text-start">Please Enter a valid Email</p> }
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-start block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your password<span className="text-red-400">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                  {passwordError && <p className="text-red-600 text-start">Password must be Atleast 6 character Long</p>}
                </div>
                
                <button
                  disabled={emailError || passwordError}
                  onClick={handleSignup}
                  className={`w-full text-white ${(emailError || passwordError)? "bg-gray-500": "bg-blue-700 hover:bg-blue-800"} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  Sign Up
                </button>
                <div className="text-sm font-medium text-gray-500">
                  Already have an account?{" "}
                  <a
                    onClick={() => {
                      setSignuppop(false);
                      setLoginpop(true);
                    }}
                    className="text-blue-700 hover:underline"
                  >
                    SignIn
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
