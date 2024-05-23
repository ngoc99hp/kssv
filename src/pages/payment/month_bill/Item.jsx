import { useEffect, useState, useCallback } from "react";
import formatToVND from "../../../components/formatToVND";
import formatDate from "../../../components/formatDate";
import { BiMessageDetail } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import emailjs from "emailjs-com";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";

const Item = ({ data, index }) => {
  const { getToken } = useAuth();
  const [checked, setChecked] = useState(false);
  const month = new Date(data.month).getMonth() + 1;

  const tenantData = useQuery({
    queryKey: ["GET_TENANTS_ACTIVE", data.id],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_TENANTS_ACTIVE,
        method: "post",
        data: {
          date: data.month,
          room_id: data.room_id,
        },
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
      }).then((res) => res.data.result);
    },
  });

  // console.log("Hoá đơn:", data);
  // console.log("Người thuê", tenantData.data);

  const billData = {
    room_name: data.category_room.name,
    month: month,
    start_date: formatDate(data.start_date),
    end_date: formatDate(data.end_date),
    current_num_tenants: data.current_num_tenants,
    start_electricity: data.start_electricity,
    end_electricity: data.end_electricity,
    start_water: data.start_water,
    end_water: data.end_water,
    electricity_price: formatToVND(data.electricity_price),
    water_price: formatToVND(data.water_price),
    total_electricity_charge: formatToVND(data.total_electricity_charge),
    total_water_charge: formatToVND(data.total_water_charge),
    room_price: formatToVND(data.room_price),
    total_revenue: formatToVND(data.total_revenue),
  };

  // console.log(billData);

  const handleSendEmail = () => {
    // key
    const serviceId = "service_ie5a6gk";
    const templateId = "template_5etat14";
    const publicKey = "UtuprXhs068mzoPag";

    tenantData.data.forEach((person) => {
      // Template
      let templateParams = {
        to_name: person.tenant.name,
        to_email: person.tenant.email,
        room_name: data.category_room.name,
        month: billData.month,
        start_date: billData.start_date,
        end_date: billData.end_date,
        current_num_tenants: billData.current_num_tenants,
        start_electricity: billData.start_electricity,
        end_electricity: billData.end_electricity,
        start_water: billData.start_water,
        end_water: billData.end_water,
        electricity_price: billData.electricity_price,
        water_price: billData.water_price,
        total_electricity_charge: billData.total_electricity_charge,
        total_water_charge: billData.total_water_charge,
        room_price: billData.room_price,
        total_revenue: billData.total_revenue,
      };

      // console.log("param email", templateParams);

      // Send email

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((res) => {
          toast.success("Gửi email thành công!");
        })
        .catch((error) => {
          toast.error("Gửi email không thành công!");
        });
    });
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{data?.category_room.name}</td>
        <td>{month}</td>
        <td>{formatToVND(data.room_price)}</td>
        {/* <td>Số nước tháng trước</td>
        <td>Số nước tháng này</td>  
        <td>Số điện tháng trước</td>
        <td>Số điện tháng này</td>
        <td>Đơn giá nước</td>
        <td>Đơn giá điện</td> */}
        <td>{formatToVND(data.total_water_charge)}</td>
        <td>{formatToVND(data.total_electricity_charge)}</td>
        <td>{formatToVND(data.total_revenue)}</td>
        <td>
          <>
            <label
              // htmlFor={`modal_fix_${data.id}`}
              className="btn btn-sm btn-ghost w-fit items-center tooltip flex justify-center"
              data-tip="Chi tiết"
            >
              <BiMessageDetail size={20} onClick={() => setChecked(!checked)} />
            </label>
            <>{/* <Edit data={data} /> */}</>
          </>
        </td>
      </tr>
      <tr>
        <td colSpan={8}>
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Từ ngày</th>
                            <th>Đến ngày</th>
                            <th>Chỉ số nước đầu</th>
                            <th>Chỉ số nước cuối</th>
                            <th>Chỉ số điện đầu</th>
                            <th>Chỉ số điện cuối</th>
                            <th>Đơn giá nước</th>
                            <th>Đơn giá điện</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{formatDate(data.start_date)}</td>
                            <td>{formatDate(data.end_date)}</td>
                            <td>{data.start_water}</td>
                            <td>{data.end_water}</td>
                            <td>{data.start_electricity}</td>
                            <td>{data.end_electricity}</td>
                            <td>{formatToVND(data.water_price)}</td>
                            <td>{formatToVND(data.electricity_price)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <h6 className="self-center my-5">
                      Nhưng người đang thuê phòng
                    </h6>
                    <div className="flex">
                      <div className="overflow-x-auto w-[80%] border rounded-lg">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Họ và tên</th>
                              <th>Số điện thoại</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tenantData.data.length == 0 ? (
                              <tr>
                                <td>k co du lieu</td>
                              </tr>
                            ) : (
                              tenantData.data.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.tenant.name}</td>
                                  <td>{item.tenant.phone_number}</td>
                                  <td>{item.tenant.email}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="w-[20%] flex items-center justify-center">
                        <button
                          className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-point font-semibold tracking-widest rounded-md hover:bg-blue-700 duration-300 hover:gap-2 hover:translate-x-3"
                          onClick={handleSendEmail}
                        >
                          Gửi mail
                          <HiOutlineMail size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </td>
      </tr>
    </>
  );
};

export default Item;
