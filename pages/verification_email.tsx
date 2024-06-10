import Link from 'next/link'
import style from "./../styles/Home.module.css"

export default function VerificationEmail() {
    return (
      <div className={style.container_verify_email}> 
     
    <h1>Please verify your email address</h1>
    <h3> We have sent you a verification link to your email.</h3>
   
    <li>
        <Link href="/">Go back to Login </Link>
      </li>
      </div>
    )
  }