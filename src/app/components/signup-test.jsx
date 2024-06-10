
import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import "../globals.css";
import Link from 'next/link'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export default function SignupForm( ) {
  
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 
 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };



    const { msg } = router.query
    return (
        <>
        <div className="error-signup">
        {msg && <p className="error-message"  style={{ fontSize: 20 , color: "crimson", justifyContent: "center"}} >{msg}</p>} {/* Display error message if present */}
        </div>
    <div className="container_signup_form">
    <div className="h1">Sign Up</div>
   
            <form action='/api/signup' method='POST'>
           
            <label htmlFor="User">Username</label>
        <TextField
          placeholder="Enter your username"
          className="textField_form"
          id="User" 
          minLength="3" 
          name="User"
        />

        <label htmlFor="Password">Password</label>
        <TextField
          type={showPassword ? "text" : "Password"}
          placeholder="Enter your password"
          name="Password"
          id="Password" 
          minLength="5"
          className="textField_form"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    

      

        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextField
          type={showPassword ? "text" : "Password"}
          placeholder="Confirm password" required
          name="Passwordagain"
          id="Passwordagain"
          className="textField_form"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    
        <button type="submit" className="glow-on-hover" > 
          Create Account
        </button>
        &nbsp;
        &nbsp;
            <li>
              <Link href="/">or back to Login </Link>
            </li>
      </form>
            </div> 
          
         
            </>
    );
}

