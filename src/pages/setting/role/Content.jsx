import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonTable from "../../../components/SkeletonTable";
import Item from "./Item";

export default function Content() {
  const { getToken } = useAuth();
  const data = useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => {
      return await axios({
        url: import.meta.env.VITE_GET_USERS,
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

  const roleData = useQuery({
    queryKey: ["GET_ROLES"],
    queryFn: async () => {
      const response = await axios({
        url: import.meta.env.VITE_GET_ROLES,
        method: "get",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_SUPER_ADMIN,
          })}`,
        },
      });
      const originalData = response.data.result;
      const modifiedData = originalData.map((item) => ({
        value: item.id,
        label: item.description
      }));

      return modifiedData;
    },
  });

  // console.log(data.data);

  // console.log(roleData.data)

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Họ và tên</th>
              <th>Tên tài khoản</th>
              <th>Quyền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {data.isFetching || data.isLoading ? (
              <SkeletonTable m={4} n={5} />
            ) : data?.data?.length === 0 ? (
              <>
                <tr>
                  <th colSpan={5}>Không có dữ liệu</th>
                </tr>
              </>
            ) : data ? (
              data?.data?.map((item, index) => (
                <Item key={index} data={item} index={index} roleData={roleData.data}/>
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
