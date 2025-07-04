import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { API, setAuthToken } from "config/api";
import { connect } from "react-redux";
import { handleLogin } from "actions";
import axios from "axios";

const LoginForm = (props) => {
  const navigate = useNavigate ();

   const [see, setSee] = useState(false);
     const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
 
 
  const StatusLog = window.localStorage.getItem("LogStatus");
  const handleRedirect = () => {
    window.location.reload();
  };
  return (
   <>
   <div class="form-heading d-flex align-items-center justify-content-center mx-8">
    Masuk  untuk memulai</div>

     <form className="mx-5">
            <div className="mb-3">
               <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-envelope"></i>
         </span>
         <input type="email" className="form-control border-start-0" placeholder="Masukkan email anda" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
       </div>
            </div>
           
            <div className="mb-3">
              <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-lock"></i>
         </span>
         <input type={see==false ? `password` : `text`} className="form-control border-start-0 border-end-0" placeholder="Buat password" value={password} onChange={(e)=> {setPassword(e.target.value)}} /> { see == false ? <span class="input-group-text border-start-0 bg-white" onClick={()=> setSee(true)} > <i class="bi bi-eye" id="togglePassword"></i>
         </span> : <span class="input-group-text border-start-0 bg-white" onClick={()=> setSee(false)}> <i class="bi bi-eye-slash" id="togglePassword"></i>
         </span> }
       </div>
            </div>
           
            <button type="submit" className="btn btn-danger w-100"
            onClick={() => {navigate('/home')}}
            >Login</button>
          
          </form>
   </>
    
          
    
  );
};

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

const mapDispatchprops = (dispatch) => {
  return { onHandleLogin: () => dispatch(handleLogin()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LoginForm);
