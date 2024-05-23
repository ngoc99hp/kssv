import { FiEdit3 } from "react-icons/fi";
import TextInput from "../../components/textInput";
import { MdBlockFlipped } from "react-icons/md";
import Add from "./Add";
import Edit from "./Edit";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
export default function Progerss() {
  const [data, setData] = useState([]);
  const datakhunha = useQuery({
    queryKey: ["get_datakhunha"],
    queryFn: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_DANHMUCKHUNHA}`, {
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
    // initialData: () => ({ data: data }),
  });
  // useEffect(() => {
  //   const callApi = async () => {
  //     await fetch(`${import.meta.env.VITE_DANHMUCKHUNHA}`, {
  //       method: "GET",
  //       // body:JSON.stringify({masv:'1912101003'})
  //     })
  //       .then((response) => response.json())
  //       .then((res) => setData(res.result));
  //   };
  //   callApi();
  // }, []);
  console.log("data", datakhunha.data);
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
            DANH MỤC KHU NHÀ
          </div>
          {datakhunha.isFetching || datakhunha.isLoading ? (
            <>Loading ...</>
          ) : // <SkeletonTable m={4} n={3} />
          datakhunha?.data?.length === 0 ? (
            <>
              <tr>
                <th colSpan={16}>Không có dữ liệu</th>
              </tr>
            </>
          ) : datakhunha ? (
            
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên tòa nhà</th>
                      <th>Mô tả</th>
                      <th>Tống số phòng</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {datakhunha?.data?.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.total_room}</td>
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
