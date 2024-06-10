'use client'

import LoginForm from "./components/login-test";
import { getCookie } from 'cookies-next';



export default function Home() {

 
  return (
  
    <div className="App">
      
      <>
        <div className="title">
      <div className="h1">Welcome to SonoWeb</div>
      </div> 
      </>
      <LoginForm /> 
     
    
  </div>

);
}
/*export async function getServerSideProps(context: any) {
  const req = context.req;
  const res = context.res;
  var username = getCookie('username', { req, res });
  if (username == undefined){
    username = false;
  }
  return { props: { username } };
}*/