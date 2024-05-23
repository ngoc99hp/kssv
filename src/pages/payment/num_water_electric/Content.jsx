import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from "./Item";
import SkeletonTable from "../../../components/SkeletonTable";
import NumMonth from "./NumMonth";

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

  // console.log("month", month);
  // console.log("start_date", startDate);
  // console.log("end_date", endDate);

  const preData = useQuery({
    queryKey: ["GET_ACTIVE_ROOMS"],
    queryFn: async () => {
      const response = await axios({
        url: import.meta.env.VITE_GET_ACTIVE_ROOMS,
        method: "post",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
        data: {
          date: month,
        },
      });

      const originalData = response.data.result;

      // Mapping data and adding properties
      const modifiedData = originalData.map((item) => ({
        ...item,
        month: month,
        start_date: startDate,
        end_date: endDate,
      }));

      return modifiedData;
    },
  });

  const monthNumData = useQuery({
    queryKey: ["GET_NUM_MONTH"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_NUM_ONE_MONTH,
        method: "post",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
        data: {
          month: month,
        },
      }).then((res) => res.data.result);
    }
  })

  console.log(monthNumData.data);

  const handleSubmit = () => {
    preData.refetch();
    monthNumData.refetch();
  };

  // console.log(data)

  return (
    <div className="flex h-full py-2">
      <div className="flex flex-col w-1/4 mx-5">
        <div className="flex flex-col w-full">
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
        <div className="overflow-y-auto mt-10 border p-3">
          <table className="table table-xs">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Phòng</th>
                <th>Số điện</th>
                <th>Số nước</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {monthNumData.isFetching || monthNumData.isLoading ? (
              <SkeletonTable m={4} n={5} />
            ) : monthNumData?.data?.length === 0 ? (
              <><tr>
              <th colSpan={5}>Không có dữ liệu</th>
            </tr></>
            ) : monthNumData ? (
              monthNumData?.data?.map((item, index) => (
                <NumMonth key={index} data={item} index={index} />
              ))
            ) : (
              <></>
            )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-3/4 mx-5 max-h-[750px] overflow-x-auto border">
        <table className="p-2 table table-xs table-pin-rows ">
          <thead>
            <tr>
              <th></th>
              <th>Phòng</th>
              <th>Số điện</th>
              <th>Số nước</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {preData.isFetching || preData.isLoading ? (
              <SkeletonTable m={4} n={5} />
            ) : preData?.data?.length === 0 ? (
              <p>Không có kết quả!</p>
            ) : preData ? (
              preData?.data?.map((item, index) => (
                <Item key={index} data={item} index={index} />
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
