import TextInput from "../../components/textInput";
import { useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";
function Reducer(state, action) {
  switch (action.type) {
    case "ten": {
      return {
        ...state,
        ten: action.payload.value,
      };
    }

    case "tong_so_nguoi": {
      return {
        ...state,
        tong_so_nguoi: action.payload.value,
      };
    }
    case "gia_tien": {
      return {
        ...state,
        gia_tien: action.payload.value,
      };
    }

    case "reset": {
      return {
        ten: "",
        tong_so_nguoi: "",
        gia_tien: "",
      };
    }
  }
}
export default function Add({ area }) {
  // console.log(area)
  const [selected, setSelected] = useState(null);
  const [data, dispatchData] = useReducer(Reducer, {
    ten: "",
    tong_so_nguoi: "",
    gia_tien: "",
  });

  console.log(import.meta.env.VITE_INSERT_ROOM);

  const mutation = useMutation({
    mutationFn: () =>
      axios({
        url: import.meta.env.VITE_INSERT_ROOM,
        method: "post",
        data: {
          objects: {
            code: data.ten,
            name: data.ten,
            room_price: data.gia_tien,
            area_id: selected.value,
            max_tenant: data.tong_so_nguoi,
          },
        },
      }),
    onSuccess: () => {
      console.log(1);
    },
    onError: () => {
      console.log(2);
    },
  });

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Thêm mới
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="bg-cover bg-center flex justify-center items-center">
            <div className="    space-y-6  p-6 rounded-lg bg-white bg-opacity-80">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold ">Thêm mới Danh mục phòng</h1>
              </div>
              <div className="space-y-4">
                <div className="gap">
                  <TextInput
                    value={data.ten}
                    label={
                      <span>
                        Tên phòng <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ten"}
                    isRequire={true}
                    action={"ten"}
                  />
                  <Select
                    placeholder="Thuộc khu"
                    className="text-black text-sm my-5"
                    classNames={{
                      control: () => "!rounded-[5px]",
                      input: () => "!pr-2.5 !pb-2.5 !pt-4 !m-0",
                      valueContainer: () => "!p-[0_8px]",
                      menu: () => "!z-[11]",
                    }}
                    options={area.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    value={selected}
                    onChange={(e) => setSelected(e)}
                  />
                  <TextInput
                    value={data.tong_so_nguoi}
                    label={
                      <span>
                        Tổng số người tối đa{" "}
                        <span className="text-red-600"> *</span>
                      </span>
                    }
                    type={"number"}
                    dispatch={dispatchData}
                    id={"tong_so_nguoi"}
                    isRequire={true}
                    action={"tong_so_nguoi"}
                  />
                  <TextInput
                    value={data.gia_tien}
                    label={
                      <span>
                        Giá tiền(VND) <span className="text-red-600"> *</span>
                      </span>
                    }
                    type={"number"}
                    dispatch={dispatchData}
                    id={"gia_tien"}
                    isRequire={true}
                    action={"gia_tien"}
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    onClick={() => mutation.mutate()}
                    className=" bg-transparent text-green-500 border border-green-500 hover:text-black hover:bg-green-500 hover:border-black py-2 px-4 rounded"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
