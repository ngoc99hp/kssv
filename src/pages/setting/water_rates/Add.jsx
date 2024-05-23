// Add.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Add() {
  const [mutating, setMutating] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [insertData, setInsertData] = useState({
    rate: "",
    start_date: "",
    end_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsertData({
      ...insertData,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: async (objects) => {
      return await axios({
        url: import.meta.env.VITE_INSERT_WATER_RATE,
        method: "post",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_SUPER_ADMIN,
          })}`,
        },
        data: { objects },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      setMutating(false);
      queryClient.invalidateQueries({ queryKey: ["GET_WATER_RATES"] });
      setInsertData({
        rate: "",
        start_date: "",
        end_date: "",
      });
      toast.success("Thêm mới đơn giá điện thành công!");
    },
    onError: () => {
      setMutating(false);
      toast.error("Thêm mới đơn giá điện không thành công!");
    },
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      console.log("Insert Data:", insertData);
      setMutating(true);
      mutation.mutate(insertData);
    },
    [insertData]
  );

  return (
    <div className="flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-base font-medium text-gray-700"
                htmlFor="rate"
              >
                Đơn giá
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  type="number"
                  placeholder="eq: 1000"
                  name="rate"
                  id="rate"
                  value={insertData.rate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-base font-medium text-gray-700">
                Thời gian áp dụng
              </label>
              <div className="mt-1 flex justify-between gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm	">Từ</p>
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={insertData.start_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm	">Đến</p>
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={insertData.end_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex">
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                // onClick={(e) => {
                //   e.preventDefault();
                //   handleSubmit();
                // }}
              >
                {mutating ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Thêm mới"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
