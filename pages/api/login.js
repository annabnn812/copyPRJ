import Cookies from 'cookies';
import clientPromise from '../../ABI/mongodb';
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  const loginMsg = 'Incorrect the name of your username or password';
  if (req.method === 'POST') {
    try {
      const user = req.body['User'];
      const guess = req.body['Password'];
      const client = await clientPromise;
      const db = client.db('SonoWeb');
      const users = await db.collection('USERS').find({ User: user }).toArray();

      if (users.length === 0) {
        res.redirect(`/?loginMsg=${encodeURIComponent(loginMsg)}`);
        return;
      }

      const username = users[0];
      const guess_hash = createHash('sha256').update(guess).digest('hex');

      // Check if the stored password is hashed
      const isHashed = username.Password.length === 64; // SHA-256 hash length is 64 characters

      if ((isHashed && guess_hash === username.Password) || (!isHashed && guess === username.Password)) {
        const cookies = new Cookies(req, res);
        
        cookies.set('user', user, { httpOnly: true }); // Assuming 'user' should be set to the username
        res.redirect('/profile');
        
      } else {
        res.redirect(`/?loginMsg=${encodeURIComponent(loginMsg)}`);
      }
    } catch (error) {
      console.error('Error during login process:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.redirect('/profile');
  }
}
