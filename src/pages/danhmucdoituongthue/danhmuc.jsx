import { FiEdit3 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
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

  const datadoituongthue = useQuery({
    queryKey: ["get_datadoituongthue"],
    queryFn: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DANHMUCDOITUONGTHUE}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        return res.result;
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        throw error;
      }
    },
    initialData: () => ({ data: data }),
  });
  return (
    <div className="bg-cover bg-center">
      <div className="flex justify-between">
        {" "}
        <Add />
        {/* <AddDonVi /> */}
      </div>

      <div className="flex justify-center items-center">
        <div className=" w-full">
          <div className="flex justify-center items-center font-semibold text-2xl">
            DANH MỤC ĐỐI TƯỢNG THUÊ
          </div>
          {datadoituongthue.isFetching || datadoituongthue.isLoading ? (
            <>Loading ...</>
          ) : // <SkeletonTable m={4} n={3} />
          datadoituongthue?.data?.length === 0 ? (
            <>
              <tr>
                <th colSpan={16}>Không có dữ liệu</th>
              </tr>
            </>
          ) : datadoituongthue ? (
            
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
                {datadoituongthue?.data?.map((item, index) => (
                  <tr key={index} > 
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>
                      {item.description}
                    </td>

                    {/* <td className="lg:tooltip" data-tip="Sửa">
                      <FiEdit3
                        onClick={() =>
                          document.getElementById("edit").showModal()
                        }
                      />
                    </td> */}
                    {/* <td className="lg:tooltip" data-tip="Dừng tài khoản" ><MdBlockFlipped  className="text-red-500" /></td>
                  <td><Edit/></td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            <></>
          )}
          
        </div>
      </div>
    </div>
  );
}
