import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";

const Edit = ({ data }) => {
  const [mutating, setMutating] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [updateData, setUpdateData] = useState({
    end_water: data.end_water,
    end_electricity: data.end_electricity,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: async (changes) => {
      return await axios({
        url: import.meta.env.VITE_UPDATE_MONTH_BILL,
        method: "put",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
        data: {
          id: data.id,
          changes: changes,
        },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      setMutating(false);
      queryClient.invalidateQueries({ queryKey: ["GET_NUM_MONTH"] });
      setUpdateData({
        end_water: "",
        end_electricity: "",
      });
      toast.success("Chỉnh sửa chỉ số điện, nước thành công!");
      const modalCheckbox = document.getElementById(`modal_fix_${data.id}`);
      if (modalCheckbox) {
        modalCheckbox.checked = false;
      }
    },
    onError: () => {
      setMutating(false);
      toast.error("Chỉnh sửa chỉ số điện, nước không thành công!");
    },
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Update Data:", updateData);
      setMutating(true);
      mutation.mutate(updateData);
    },
    [updateData]
  );

  return (
    <>
      <input
        type="checkbox"
        id={`modal_fix_${data.id}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div
          className="modal-box flex flex-col gap-3 max-w-full w-1/3"
          style={{ overflowY: "unset" }}
        >
          <label
            htmlFor={`modal_fix_${data.id}`}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cursor-pointer"
          >
            ✕
          </label>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[20px] mt-[20px] "
              style={{ overflowY: "unset" }}
            >
              <h3 className="self-center">Chỉnh sửa chỉ số điện, nước</h3>

              <div>
                <label
                  className="block text-base font-medium text-gray-700"
                  htmlFor="end_water"
                >
                  Số nước
                </label>
                <div className="mt-1">
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    type="number"
                    name="end_water"
                    id="end_water"
                    value={updateData.end_water}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-base font-medium text-gray-700"
                  htmlFor="end_electricity"
                >
                  Số nước
                </label>
                <div className="mt-1">
                  <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    type="number"
                    name="end_electricity"
                    id="end_electricity"
                    value={updateData.end_electricity}
                    onChange={handleInputChange}
                  />
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
                    "Cập nhật"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default function NumMonth({ data, index }) {
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{data.category_room?.name}</td>
        <td>{data?.end_water}</td>
        <td>{data?.end_electricity}</td>
        <td>
        <>
          <label
            htmlFor={`modal_fix_${data.id}`}
            className="btn btn-sm btn-ghost w-fit items-center tooltip flex justify-center"
            data-tip="Chỉnh sửa"
          >
            <FaRegEdit size={20} />
          </label>
          <>
            <Edit data={data} />
          </>
        </>
        </td>
      </tr>
    </>
  );
}
