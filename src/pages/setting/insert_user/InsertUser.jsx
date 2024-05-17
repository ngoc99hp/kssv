import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Content from "./Content";

export default function InsertUser() {
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

  if (role.isFetching || role.isLoading)
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );

  if (role.data?.role_id.toString() !== import.meta.env.VITE_ROLE_ADMIN) {
    return <>Tài khoản không có quyền thực hiện chức năng này</>;
  }

  return <Content/>;
}
