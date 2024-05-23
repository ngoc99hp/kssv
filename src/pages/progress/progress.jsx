import { FiEdit3 } from "react-icons/fi";
import TextInput from "./../../components/textInput";
import { MdBlockFlipped } from "react-icons/md";
import Add from "./Add";
import Edit from "./Edit";
export default function Progerss() {
  return (
    <div className="bg-cover bg-center">
      <div className="w-full flex justify-center items-center">
        <TextInput
          className={"!w-[70%] self-center mb-[10px]"}
          label={"Tìm kiếm người thuê"}
          action={""}
        />
      </div>
      <div className="flex justify-between"> <Add />
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
                  <th>Họ tên đệm</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>191210003</td>
                  <td>Nguyễn Quốc </td>
                  <td>Thụ</td>
                  <td>thunq@hpu.edu.vn</td>
                  
                  <td className="lg:tooltip" data-tip="Sửa">
                    <FiEdit3 onClick={() => document.getElementById("edit").showModal()}/>
                  </td>
                  <td className="lg:tooltip" data-tip="Dừng tài khoản" ><MdBlockFlipped  className="text-red-500" /></td>
                  <td><Edit/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
