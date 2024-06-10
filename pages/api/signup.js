import Cookies from 'cookies'
import clientPromise from "../../ABI/mongodb";
const {createHash} = require('node:crypto');

export default async function handler(req, res) {
  if (req.method == "POST"){
    const user = req.body['User']
    const password = req.body['Password']
    const passwordagain = req.body['Passwordagain']
    if (password != passwordagain){
        res.redirect("/signup?msg=The two passwords don't match");
        return;
    }
    const client = await clientPromise;
    const db = client.db("SonoWeb");
    const users = await db.collection("USERS").find({"User": user}).toArray();
    if (users.length > 0){
        res.redirect("/signup?msg=This username is already taken. Please choose another one ");
        return;
    }
    const password_hash = createHash('sha256').update(password).digest('hex');
    const currentDate = new Date().toUTCString();
    const bodyObject = {
        User: user,
        Password: password_hash,
        Created: currentDate
    }
    await db.collection("USERS").insertOne(bodyObject);
    const cookies = new Cookies(req, res)
    cookies.set('User', user)
    res.redirect("/profile")
  } else {
    res.redirect("/")
  }
}