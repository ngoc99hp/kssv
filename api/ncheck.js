import axios from "axios";

export default async function handler(req, res) {
  const { ma, ho_dem, ten, email } = req.body;
  try {
    const result = await axios({
      url: `${process.env.VITE_BASE_URL}/api/ncheck/user`,
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NCHECK_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        employeeCode: ma,
        firstName: ho_dem,
        lastName: ten,
        email,
      },
    });

    if (result.data.statusCode === "SUCCESS")
      return res.status(200).json({ result: "Successfully!" });
    else return res.status(400).json({ result: "Failed!" });
  } catch (error) {
    return res.status(400).json({ result: "Failed!", error });
  }
}
