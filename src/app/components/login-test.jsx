import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState , useContext} from "react";
import "../globals.css";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { loginMsg } = router.query || {}; // Set loginMsg to an empty object if router.query is undefined
  const decodedLoginMsg = loginMsg ? decodeURIComponent(loginMsg) : ''; // Decode the loginMsg parameter
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
 
    return (
      <>
      
      <div className="error-signup">
      {decodedLoginMsg && <p className="error-message"  style={{ fontSize: 20 , color: "crimson", justifyContent: "center"}}>{decodedLoginMsg}</p>} {/* Display login error message */}
      
        </div>
      
        <div className="container_login_form_both"> 
        <div className="container_login_form"> 
    <div className="h2"> Login </div>

          <br />
          <form action='/api/login' method='POST'>
            <label htmlFor="User">Username</label>
    <TextField
      placeholder="Enter your username"
      className="textField_form"
      name="User"
      id="User"
    />


    <label htmlFor="password">Password</label>
    <TextField
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      name="Password" 
      id="Password"
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
      <div className="move_link_end_container">
      <Link href="/forgot-password" className="color_link">Forgot password? </Link>
      </div>
       <> &nbsp; </>
      <button  type="submit" className="glow-on-hover">
        Submit
      </button>
    </form>
    &nbsp;
    <li>
        <Link href="/signup">Create an Account </Link>
      </li>
    </div>
    <div className="container_login_form2"> 
    
    </div>
    </div>
      </>
    );
  }
