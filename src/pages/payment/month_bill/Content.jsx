import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from "./Item";
import SkeletonTable from "../../../components/SkeletonTable";


export default function Content() {
  const { getToken } = useAuth();
  // Lấy ngày hôm nay
  const today = new Date();
  // Mặc định tháng, ngày bắt đầu và ngày kết thúc
  const [selectedMonth, setSelectedMonth] = useState(
    today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2)
  );
  const [startDate, setStartDate] = useState(selectedMonth + "-01");
  const [endDate, setEndDate] = useState(
    `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
      "0" + new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    ).slice(-2)}`
  );

  const [month, setMonth] = useState(selectedMonth + "-01");

  // Hàm xử lý khi thay đổi tháng
  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    const endOfMonth = new Date(newMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0); // Set to the last day of the month
    setEndDate(endOfMonth.toISOString().slice(0, 10));
    setMonth(newMonth + "-01");
    setStartDate(newMonth + "-01");
  };
  const preData = useQuery({
    queryKey: ["GET_ROOMS_MONTH_BILLS"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_ROOMS_MONTH_BILLS,
        method: "post",
        data: {
          month: month,
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

  const handleSubmit = () => {
    preData.refetch();
  };

  // console.log(preData.data);
  return (
    <div className="flex flex-col h-[762px] py-2">
      <div className="flex flex-col w-full border rounded-lg p-5">
        <div className="grid grid-cols-3 w-full gap-x-8 gap-y-4">
          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Chọn tháng:
            </label>
            <input
              type="month"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Chọn ngày bắt đầu:
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={selectedMonth + "-01"}
              max={endDate}
            />
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Chọn ngày kết thúc:
            </label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={endDate}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Xác nhận
          </button>
        </div>
      </div>
      <div className="overflow-y-auto mt-10 border rounded-lg m-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Phòng</th>
              <th>Tháng</th>
              <th>Giá phòng</th>
              {/* <th>Số nước tháng trước</th>
              <th>Số nước tháng này</th>
              <th>Số điện tháng trước</th>
              <th>Số điện tháng này</th>
              <th>Đơn giá nước</th>
              <th>Đơn giá điện</th> */}
              <th>Tiền nước</th>
              <th>Tiền điện</th>
              <th>Tổng tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {preData.isFetching || preData.isLoading ? (
              <SkeletonTable m={4} n={7} />
            ) : preData?.data?.length === 0 ? (
              <>
                <tr>
                  <th colSpan={16}>Không có dữ liệu</th>
                </tr>
              </>
            ) : preData ? (
              preData?.data?.map((item, index) => (
                <Item key={index} data={item} index={index}/>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
