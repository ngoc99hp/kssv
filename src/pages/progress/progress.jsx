import { FiEdit3 } from "react-icons/fi";
import Add from "./Add";
export default function Progerss() {
  return (
    <div className="bg-cover bg-center ">
      <Add />
      <div className="flex justify-center items-center">
        <div className=" mx-auto  max-w-3xl space-y-6  p-6 rounded-lg ">
          <div className="flex justify-center items-center font-semibold text-2xl">
            DANH SÁCH TÀI KHOẢN
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Mã sinh viên</th>
                  <th>Họ tên đệm</th>
                  <th>Tên</th>
                  <th>Email</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>hoainam@gmail.com</td>
                  <td className="lg:tooltip" data-tip="Sửa">
                    <FiEdit3 />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
