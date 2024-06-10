
import Home from './home'
import clientPromise from "../ABI/mongodb";
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';



export default function ProfilePage( {user} ) {
  const router = useRouter();
  const open = () => {
    router.push('/profile');
  }

  return (
    <> 
      <div className="title">
        <h3> <strong>{user}</strong></h3>
      </div> 
      &nbsp;
      &nbsp;
   
      <Home />
   
    </>
  );
}
export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  const user = getCookie('user', { req, res }); // Consistent cookie name

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
  }
  const client = await clientPromise;
  const db = client.db("SonoWeb");
  const users = await db.collection("USERS").find({"User": user}).toArray();
 
  return {
    props: {user: user},
  }
}
