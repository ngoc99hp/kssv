import axios from "axios";

export default async function POST(req) {
  const { userName, password, email } = req.body;
  try {
    const res = await axios({
      url: `${process.env.VITE_CLERK_API_END_POINT}/users`,
      method: "post",
      data: {
        email_address: [email],
        username: userName,
        password: password,
        skip_password_checks: true,
      },
      headers: {
        authorization: `Bearer ${process.env.VITE_CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      return res
        .status(res.status)
        .json({ error: "Failed to update user metadata" });
    }
    return res.status(200).json({ result: "successful" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
