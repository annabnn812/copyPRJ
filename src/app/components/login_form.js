import Link from 'next/link'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState , useContext} from "react";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js"
import poolData from "./user_pool";
import { useRouter } from 'next/navigation';
import { AccountContext } from './profile_page_status';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); 
 
  const{authenticate} = useContext(AccountContext)

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email, password)
    .then(data =>{
      console.log("Logged in", data)
    })
    .catch((err)=>{
      console.error("failed to login", err)
    })
    setError(""); // Clear previous error when submitting

    const user  = new CognitoUser({
      Username: email,
      Pool: poolData 
    })
 
  const authDetails = new AuthenticationDetails({
    Username : email,
    Password : password,
  });
  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      console.log('Logged in', data);
      // Redirect to /profile_page after successful login
      router.push('/profile_page');
    },
    onFailure: (err) => {
      console.error("onFailure: ", err);
      setError("Invalid email or password");
     
    },
    newPasswordRequired: (data) => {
      console.log("newPasswordRequired: ", data);
      // Handle cases where a new password is required
    }
  });
};

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className="container_login_form"> 
    <div className="h2"> Login </div>
    <form onSubmit={onSubmit}>
    <label htmlFor="email">Email</label>
    <TextField
      type="email"
      placeholder="Enter your email"
      className="textField_form"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />


    <label htmlFor="password">Password</label>
    <TextField
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
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
   {error && <p className="error">{error}</p>}
      <div className="move_link_end_container">
      <Link href="/forgot-password" className="color_link">Forgot password? </Link>
      </div>
       &nbsp;
      <button  type="submit" className="button_registration">
        Submit
      </button>
    </form>
    &nbsp;
    <li>
        <Link href="/signup">Create an Account </Link>
      </li>
    </div>
  );
};
export default LoginForm;