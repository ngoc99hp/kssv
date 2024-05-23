import axios from "axios";

export default async function handler(req, res) {
  const {
    ma,
    ho_dem,
    ten,
    email,
    sdt,
    dia_chi,
    cccd,
    dvct,
    gender,
    tenant,
    type,
  } = req.body;
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

    const result1 = await axios({
      url: type === "I" ? process.env.VITE_INSERT_TENANT : "",
      method: type === "I" ? "post" : "",
      headers: {
        "x-hasura-admin-secret": `i0KMdAfgp5TGyWEGA4Hqw8tkROrSqlaN488nT3C8qfiK76aLlzhaRRxqSkUV7rZ0`,
        "Content-Type": "application/json",
      },
      data: {
        objects: {
          address: dia_chi,
          cccd,
          code: ma,
          email,
          gender_id: gender.value,
          name: `${ho_dem} ${ten}`,
          phone_number: sdt,
          tenants_type_id: tenant.value,
          work_place: dvct,
        },
      },
    });

    if (result.data.statusCode === "SUCCESS" && result1.status === 200)
      return res.status(200).json({ result: "Successfully!" });
    else return res.status(400).json({ result: "Failed!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ result: "Failed!", error });
  }
}
