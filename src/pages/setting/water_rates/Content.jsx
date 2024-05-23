// Content.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Add from "./Add";
import Item from "./Item";

const Skeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <tr key={i}>
          {[...Array(4)].map((_,ii) => (
            <td key={ii}>
              <>
                <div className="skeleton h-5 w-full"></div>
              </>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default function Content({preWaterData}) {

    const { getToken } = useAuth();
  const data = useQuery({
    queryKey: ["GET_WATER_RATES"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_WATER_RATES,
        method: "get",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_SUPER_ADMIN,
          })}`,
        },
      });
    },
    initialData: () => ({data: preWaterData}),
  });


  return (
    <div className="flex flex-col items-center h-[762px]">
    <Add />
    <div className="w-2/3 overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Đơn giá ( đồng / tháng )</th>
            <th>Hiệu lực từ</th>
            <th>Đến</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.isFetching || data.isLoading ? (
            <Skeleton />
          ) : data?.data?.data?.length === 0 ? (
            <p>Không có kết quả!</p>
          ) : data ? (
            data?.data?.data.result.map((item,index) => (
              <Item key={index} data={item} index={index} />
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}
