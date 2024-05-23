import { FiEdit3 } from "react-icons/fi";
import TextInput from "../../components/textInput";
import { MdBlockFlipped } from "react-icons/md";
import Add from "./Add";
import Edit from "./Edit";
import { useEffect, useState } from "react";
export default function Progerss() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      await fetch(`${import.meta.env.VITE_DANHMUCDOITUONGTHUE}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body:JSON.stringify({masv:'1912101003'})
      })
        .then((response) => response.json())
        .then((res) => setData(res.result));
    };
    callApi();
    console.log("data", data);
  }, []);
  return (
    <div className="bg-cover bg-center">
      <div className="flex justify-between">
        {" "}
        <Add />
        {/* <AddDonVi /> */}
      </div>

      <div className="flex justify-center items-center">
        <div className=" mx-auto  max-w-3xl space-y-6  p-6 rounded-lg ">
          <div className="flex justify-center items-center font-semibold text-2xl">
            DANH MỤC ĐỐI TƯỢNG THUÊ
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên đối tượng</th>
                  <th>Mô tả</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index} > 
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>
                      {item.description}
                    </td>

                    <td className="lg:tooltip" data-tip="Sửa">
                      <FiEdit3
                        onClick={() =>
                          document.getElementById("edit").showModal()
                        }
                      />
                    </td>
                    {/* <td className="lg:tooltip" data-tip="Dừng tài khoản" ><MdBlockFlipped  className="text-red-500" /></td>
                  <td><Edit/></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
