import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Content from "./Content";

const Skeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <tr key={i}>
          {[...Array(5)].map((_, ii) => (
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

const WaterRates = () => {
  const { getToken } = useAuth();

  const role = useQuery({
    queryKey: ["GET_ROLE"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_ROLE,
        method: "get",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
      }).then((res) => res.data.result[0]);
    },
  });

  const preWaterData = useQuery({
    queryKey: ["GET_WATER_PREDATA"],
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
      }).then((res) => res.data.result);
    },
  });

  if (
    role.isFetching ||
    role.isLoading ||
    preWaterData.isFetching ||
    preWaterData.isLoading
  ) {
    return (
      <div>
        <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form>
                <div className="skeleton h-10"></div>

                <div className="mt-6 flex justify-between gap-3">
                  <div className="skeleton h-10 w-1/3"></div>
                  <div className="skeleton h-10 w-1/3"></div>
                </div>

                <div className="skeleton h-10 mt-6"></div>
              </form>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <Skeleton />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (role.data?.role_id.toString() !== import.meta.env.VITE_ROLE_ADMIN) {
    return <>Tài khoản không có quyền thực hiện chức năng này</>;
  }



  return (
    <Content preWaterData={preWaterData.data}/>
  )
}

export default WaterRates
