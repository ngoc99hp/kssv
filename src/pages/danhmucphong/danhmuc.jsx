import { FiEdit3 } from "react-icons/fi";
import TextInput from "../../components/textInput";
import { MdBlockFlipped } from "react-icons/md";
import Add from "./Add";
import Edit from "./Edit";
import { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
export default function Progerss() {
  const [data, setData] = useState([]);
  const { getToken } = useAuth();
  useEffect(() => {
    const callApi = async () => {
      await fetch(`${import.meta.env.VITE_DANHMUCKHUNHA}`, {
        method: "GET",
        // body:JSON.stringify({masv:'1912101003'})
      })
        .then((response) => response.json())
        .then((res) => setData(res.result));
    };
    callApi();
  }, []);
  console.log("data", data);
  return (
    <div className="bg-cover bg-center">
      <div className="flex justify-between">
        {" "}
        <Add />
        {/* <AddDonVi /> */}
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full ">
          <div className="flex justify-center items-center font-semibold text-2xl">
            DANH MỤC PHÒNG
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                <th>ID</th>
                  <th>Tên phòng</th>
                  <th>Thuộc khu</th>
                  <th>Tổng số người tối đa</th>
    
                  <th>GIá tiền (VND)</th>
                </tr>
              </thead>
              <tbody>
                {/* {data?.category_rooms.map((item, index) => (
                  <tr key={index} > 
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>
                      {item.description}
                    </td>
                    <td>
                      {item.total_room}
                    </td>
                    <td className="lg:tooltip" data-tip="Sửa">
                      <FiEdit3
                        onClick={() =>
                          document.getElementById("edit").showModal()
                        }
                      />
                    </td> */}
                {/* <td className="lg:tooltip" data-tip="Dừng tài khoản" ><MdBlockFlipped  className="text-red-500" /></td>
                  <td><Edit/></td> */}
                {/* </tr> */}
                {/* ))} */}
                {data.map((building) =>
                  building.category_rooms.map((room) => (
                    <tr key={room.code}>
                      <th>{room.id}</th>
                      <td>{room.name}</td>
                      <td>{building.name}</td>
                      <td>{room.max_tenant}</td>
                      <td>{room.room_price.toLocaleString('vi-VN')}</td>
                      <td className="lg:tooltip" data-tip="Sửa">
                      {/* <FiEdit3
                        onClick={() =>
                          document.getElementById("edit").showModal()
                        }
                      /> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
       </div>
      </div>
    </div>
  );
}
