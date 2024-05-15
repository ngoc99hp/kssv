// src/api/create-user.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userName, email, password } = req.body;
    try {
      const response = await axios({
        url: 'https://api.clerk.dev/v1/users',
        method: 'post',
        data: {
          email_addresses: [{ email_address: email }],
          username: userName,
          password: password,
          skip_password_checks: true,
        },
        headers: {
          authorization: `Bearer ${import.meta.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
