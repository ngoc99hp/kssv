import fetch from "node-fetch";

export default async function handler(request, response) {
  const { userName, password, email } = request.body;

  const res = await fetch(`${process.env.VITE_CLERK_API_END_POINT}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
      // "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email_address: [email],
      username: userName,
      password: password,
      skip_password_checks: true,
    }),
  })


  const data = await res.json();
  console.log(data)
  return response.status(200).json({ result: "successfull",data});
}
