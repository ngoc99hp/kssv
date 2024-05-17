import { LiaEditSolid } from "react-icons/lia";
import Select from "react-select";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = ({ data, roleData }) => {
  const [mutating, setMutating] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [roleId, setRoleId] = useState(
    data.user_roles
      ? {
          value: data.user_role?.role.id,
          label: data.user_role?.role.description,
        }
      : null
  );

  const mutation = useMutation({
    mutationFn: async (roleid) => {
      return await axios({
        url: import.meta.env.VITE_INSERT_USER_ROLE,
        method: "post",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_SUPER_ADMIN,
          })}`,
        },
        data: {
          objects: {
            clerk_user_id: data.clerk_user_id,
            role_id: roleid
          }
        },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      setMutating(false);
      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
      toast.success("Cập nhật quyền người dùng thành công!");
      const modalCheckbox = document.getElementById(`modal_fix_${data.id}`);
      if (modalCheckbox) {
        modalCheckbox.checked = false;
      }
    },
    onError: () => {
      setMutating(false);
      toast.error("Cập nhật quyền người dùng không thành công!");
    },
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMutating(true);
    console.log(roleId.value)
      mutation.mutate(roleId.value);
  }, [roleId]);

  // console.log(roleData)
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
              <h3 className="self-center">Cập nhật quyền của người dùng {data.name}</h3>
              <Select
              placeholder="Quyền"
              className="text-black text-sm my-5"
              classNames={{
                control: () => "!rounded-[5px]",
                input: () => "!pr-2.5 !pb-2.5 !pt-4 !m-0",
                valueContainer: () => "!p-[0_8px]",
                menu: () => "!z-[11]",
              }}
              options={roleData}
              value={roleId}
              onChange={setRoleId}
            />

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

const Item = ({ data, index, roleData }) => {
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>{data.user_name}</td>
        <td>
          {data?.user_role === null ? (
            "Chưa có quyền"
          ) : (
            <>{data.user_role?.role.description}</>
          )}
        </td>
        <td>
          <>
            <label
              htmlFor={`modal_fix_${data.id}`}
              className="btn btn-sm btn-ghost w-fit items-center tooltip flex justify-center"
              data-tip="Chỉnh sửa"
            >
              <LiaEditSolid size={20} />
            </label>
            <Edit data={data} roleData={roleData}/>
          </>
        </td>
      </tr>
    </>
  );
};

export default Item;
