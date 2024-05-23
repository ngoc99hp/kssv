import { FiEdit3 } from "react-icons/fi";
import TextInput from "./../../components/textInput";
import { MdBlockFlipped } from "react-icons/md";
import Add from "./Add";
import Edit from "./Edit";
<<<<<<< HEAD
export default function Progerss() {
=======
import AddDonVi from "./AddDonVi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Progress() {
  const catalog = useQuery({
    queryKey: ["CATALOG_NCHECK"],
    queryFn: () =>
      axios({ url: import.meta.env.VITE_CATALOG_NCHECK, method: "get" }).then(
        (res) => res.data
      ),
  });

  const listTenant = useQuery({
    queryKey: ["SEARCH_NCHECK"],
    queryFn: () =>
      axios({ url: import.meta.env.VITE_SEARCH_NCHECK, method: "get" }).then(
        (res) => res.data
      ),
  });

  if (catalog.isFetching || listTenant.isFetching) return <p>Loading.....</p>;

  console.log(listTenant.data);
>>>>>>> 0ad391ba1a414e4643d44da79b8e024c6e181250
  return (
    <div className="bg-cover bg-center">
      <div className="w-full flex justify-center items-center">
        <TextInput
          className={"!w-[70%] self-center mb-[10px]"}
          label={"Tìm kiếm người thuê"}
          action={""}
        />
      </div>
      <div className="flex justify-between">
        {" "}
        <Add gender={catalog.data.gender} tenant={catalog.data.tenant} />
        {/* <AddDonVi /> */}
      </div>

      <div className="flex justify-center items-center">
        <div className=" mx-auto  max-w-3xl space-y-6  p-6 rounded-lg ">
          <div className="flex justify-center items-center font-semibold text-2xl">
            DANH SÁCH TÀI KHOẢN
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã </th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <th>1</th>
                  <td>191210003</td>
                  <td>Nguyễn Quốc </td>
                  <td>Thụ</td>
                  <td>thunq@hpu.edu.vn</td>

                  <td className="lg:tooltip" data-tip="Sửa">
                    <FiEdit3
                      onClick={() =>
                        document.getElementById("edit").showModal()
                      }
                    />
                  </td>
                  <td className="lg:tooltip" data-tip="Dừng tài khoản">
                    <MdBlockFlipped className="text-red-500" />
                  </td>
                  <td>
                    <Edit />
                  </td>
                </tr> */}
                {listTenant.data.result.map((item, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>

                    <td className="lg:tooltip" data-tip="Sửa">
                      <FiEdit3
                        onClick={() =>
                          document
                            .getElementById(`edit_${item.code}`)
                            .showModal()
                        }
                      />
                    </td>
                    <td className="lg:tooltip" data-tip="Dừng tài khoản">
                      <MdBlockFlipped className="text-red-500" />
                    </td>
                    <td>
                      <Edit
                        rawData={item}
                        gender={catalog.data.gender}
                        tenant={catalog.data.tenant}
                      />
                    </td>
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
