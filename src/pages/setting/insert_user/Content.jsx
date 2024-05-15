import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Content() {
  const [mutating, setMutating] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [insertData, setInsertData] = useState({
    name: "",
    user_name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsertData({
      ...insertData,
      [name]: value,
    });
  };

  console.log(insertData);

  const mutation = useMutation({
    mutationFn: async (objects) => {
      return await axios({
        url: import.meta.env.VITE_INSERT_USER,
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
      //   queryClient.invalidateQueries({ queryKey: [""] });
      setInsertData({
        name: "",
        user_name: "",
        email: "",
        password: "",
      });
      toast.success("Thêm mới người dùng thành công!");
    },
    onError: () => {
      setMutating(false);
      toast.error("Thêm mới người dùng không thành công!");
    },
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await axios({
        url: "/src/api/create-user",
        method: "post",
        data: {
          userName: insertData.user_name,
          password: insertData.password,
          email: insertData.email,
        },
      });
      if (res.status === 200) {
        let objects = {
          name: insertData.name,
          user_name: insertData.user_name,
          clerk_user_id: res.data.id,
        };

        setMutating(true);
        mutation.mutate(objects);
      } else {
        setMutating(false);
      }
    },
    [insertData]
  );

  return (
    <div className="flex h-full py-2 justify-center w-full">
      <form className="w-1/3" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Tạo tài khoản
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Họ và tên người sử dụng
                </label>
                <input
                  placeholder="Nguyễn Văn An"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="name"
                  name="name"
                  type="text"
                  value={insertData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  placeholder="annv@hpu.edu.vn"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="email"
                  name="email"
                  type="text"
                  value={insertData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Tên tài khoản
                </label>
                <input
                  placeholder="annv"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={insertData.user_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Mật khẩu
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  type="password"
                  value={insertData.password}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    type="checkbox"
                    aria-describedby="terms"
                    id="terms"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 text-gray-300">
                    I accept the
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */}

              <button
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
              >
                {mutating ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  "Tạo tài khoản"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
