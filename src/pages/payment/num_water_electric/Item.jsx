import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiSaveLine } from "react-icons/ri";

export default function Item({ data, index }) {
  // console.log("dữ liệu", data);
  const queryClient = useQueryClient();

  const [mutating, setMutating] = useState(false);
  // const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const [endElectricity, setEndElectricity] = useState("");
  const [endWater, setEndWater] = useState("");

  const mutation = useMutation({
    mutationFn: async (object) => {
      return await axios({
        url: import.meta.env.VITE_INSERT_MONTH_BILL,
        method: "post",
        headers: {
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`,
        },
        data: { object },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      setMutating(false);
      queryClient.invalidateQueries({ queryKey: ["GET_NUM_MONTH"] });
      toast.success("Thêm mới số điện nước thành công!");
    },
    onError: () => {
      setMutating(false);
      toast.error("Thêm mới số điện nước không thành công!");
    },
  });
  const handleClick = () => {
    let insertData = {
      room_id: data.id,
      month: data.month,
      start_date: data.start_date,
      end_date: data.end_date,
      end_electricity: Number(endElectricity),
      end_water: (endWater),
    };
    // console.log("insertData: ", insertData);
    setMutating(true);
    mutation.mutate(insertData);
  };

  // const handleClick = useCallback(
  //   async () => {
  //     const newData = {
  //       room_id: data.id,
  //       month: data.month,
  //       start_date: data.start_date,
  //       end_date: data.end_date,
  //       end_electricity: endElectricity,
  //       end_water: endWater,
  //     };
  //     setInsertData(newData);
  //     console.log("insertData: ", insertData);
  //     setMutating(true);
  //     mutation.mutate(insertData);
  //   },
  //   [insertData]
  // );

  return (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.name}</td>
        <td>
          <input
            className="input input-xs input-bordered w-full max-w-xs"
            type="number"
            value={endElectricity}
            placeholder="Số điện"
            onChange={(e) => setEndElectricity(e.target.value)}
          />
        </td>
        <td>
          <input
            className="input input-xs input-bordered w-full max-w-xs"
            type="number"
            value={endWater}
            placeholder="Số nước"
            onChange={(e) => setEndWater(e.target.value)}
          />
        </td>
        <td>
          <button
            className="hover:bg-gray-200 text-gray-900 font-bold py-1 px-2 gap-1 border rounded-md flex items-center"
            onClick={() => handleClick()}
          >
            <RiSaveLine /> Lưu
          </button>
        </td>
      </tr>
    </>
  );
}
