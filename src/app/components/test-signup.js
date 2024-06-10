import React, { useState, useEffect } from "react";
import UserPoolOrg from "../components/user_pool_organization";
import poolDataIndv from "./user_pool";
import "../globals.css";
import Link from 'next/link'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State for password requirements
  const [containsNumber, setContainsNumber] = useState(false);
  const [containsSpecialChar, setContainsSpecialChar] = useState(false);
  const [containsUppercase, setContainsUppercase] = useState(false);
  const [containsLowercase, setContainsLowercase] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('') 
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const router = useRouter(); 


  useEffect(() => {
    // Re-render on state change
  }, [containsNumber, containsSpecialChar, containsUppercase, containsLowercase])

  // Email validation
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email || !re.test(email)) {
      setEmailError('Invalid email')
      return false
    } 
    setEmailError('')
    return true
  }

  // Password validation 
  const validatePassword = (password) => {
    // Check if password contains at least 1 number
    setContainsNumber(/\d/.test(password));

    // Check if password contains at least 1 special character
    setContainsSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));

    // Check if password contains at least 1 uppercase letter
    setContainsUppercase(/[A-Z]/.test(password));

    // Check if password contains at least 1 lowercase letter
    setContainsLowercase(/[a-z]/.test(password));

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return false
    }
    setPasswordError('')
    return true
  }
  

  const handleRoleTypeChange = (e) => {
    setRoleType(e.target.value);
  };
  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  
    // Validate on each change
    validatePassword(event.target.value); 
  }


  const onSubmit = (event) => {
    event.preventDefault();
   // Validate email
   const isValidEmail = validateEmail(email)
   if (!isValidEmail) return
 
   // Validate password
   const isValidPassword = validatePassword(password)
   if (!isValidPassword) return
 
   // Check confirm password
   if (password !== confirmPassword) {
     setConfirmPasswordError('Passwords do not match')
     return
   }
    const attributes = [
      // ... other attributes
      {
        Name: 'custom:roleType',
        Value: roleType,
      },
    ];

    if (!agreeTerms) {
        console.error("Please agree to the Terms and Conditions");
        // Handle the error, e.g., display a message to the user
        return;
      }

    if (password !== confirmPassword) {
        console.error("Password and Confirm Password do not match");
        // Handle the error, e.g., display a message to the user
        return;
      }
  
    if (roleType === 'Individual') {
      poolDataIndv.signUp(email, password, attributes, null, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
      });
    }
  
    if (roleType === 'Organization') {
      UserPoolOrg.signUp(email, password, attributes, null, (err, data) => {
        if (err) {
          console.error(err);
        }
        console.log(data);
      });
    }
    const signupSuccess = true;

    if (signupSuccess) {
      // Redirect to /profile
      router.push('/verification_email');
    } else {
      // Handle login failure
      actions.setFieldError("email", "Invalid email or password");
      actions.setFieldError("password_login", "Invalid email or password");
    }
  
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    // Check if password contains at least 1 number
    setContainsNumber(/\d/.test(newPassword));

    // Check if password contains at least 1 special character
    setContainsSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));

    // Check if password contains at least 1 uppercase letter
    setContainsUppercase(/[A-Z]/.test(newPassword));

    // Check if password contains at least 1 lowercase letter
    setContainsLowercase(/[a-z]/.test(newPassword));

    // Update the password state
    setPassword(newPassword);
  };
  const isButtonDisabled = !roleType || !email || !password || !confirmPassword || !agreeTerms;

  return (
    <div className="container_signup_form">
    <div className="h1">Sign Up</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <TextField
          type="email"
          placeholder="Enter your email"
          className="textField_form"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      {emailError && <p className="error">{emailError}</p>}

        <label htmlFor="password">Password</label>
        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange} 
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
          className="textField_form"
        />
        {passwordError && <p className="error">{passwordError}</p>} 

        <div className="password-requirements">
          <p className="p">{containsNumber ? '✅' : '🔲'} Contains at least 1 number</p>
          <p className="p">{containsSpecialChar ? '✅' : '🔲'} Contains at least 1 special character</p>
          <p className="p">{containsUppercase ? '✅' : '🔲'} Contains at least 1 uppercase letter</p>
          <p className="p">{containsLowercase ? '✅' : '🔲'} Contains at least 1 lowercase letter</p>
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
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
       {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
        <label htmlFor="roleType">Role Type</label>
        <select
          name="roleType"
          value={roleType}
          onChange={handleRoleTypeChange}
        >
          <option value="">Please select a type</option>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={handleAgreeTermsChange}
          />
          <span>I have read and agree to  
            <Link href="/Privacy-Policy" className="color_link"> Privacy Policy  
            </Link> and <Link href="/Terms-and-Conditions" className="color_link">Terms and Conditions </Link> 
            </span>
        </label>

        <button type="submit" className="button_registration" disabled={isButtonDisabled}>
          Create Account
        </button>
        &nbsp;
            <li>
              <Link href="/">Or Login </Link>
            </li>
      </form>
    </div>
  );
};

export default Signup;