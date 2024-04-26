// ElectricityRates.jsx

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

const ElectricityRates = () => {
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

  // console.log(role.data);

  const preData = useQuery({
    queryKey: ["GET_PREDATA"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_ELECTRICITY_RATES,
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
  // console.log(preData.data)

  // useEffect(() => {
  //   let callApi = async () => {
  //     return await axios({
  //       url: import.meta.env.VITE_GET_ELECTRICITY_RATES,
  //       method: "get",
  //       headers: {
  //         "content-type": "Application/json",
  //         authorization: `Bearer ${await getToken({
  //           template: import.meta.env.VITE_TEMPLATE_SUPER_ADMIN,
  //         })}`,
  //       },
  //     }).then((res) => setPreData(res.data.result));
  //   };
  //   callApi();
  // }, []);

  if (
    role.isFetching ||
    role.isLoading ||
    preData.isFetching ||
    preData.isLoading
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

  return <Content preData={preData.data} />;
  // return 1;
};

export default ElectricityRates;
