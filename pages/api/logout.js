import Cookies from 'cookies';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cookies = new Cookies(req, res);
    cookies.set('user', '', { expires: new Date(0) }); // Clear the cookie
    res.redirect("/");
  } else {
    res.redirect("/");
  }
}
