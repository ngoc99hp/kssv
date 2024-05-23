import TextInput from "../../components/textInput";
import { useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
function Reducer(state, action) {
  switch (action.type) {
    case "ma": {
      return {
        ...state,
        ma: action.payload.value,
      };
    }

    case "ho_dem": {
      return {
        ...state,
        ho_dem: action.payload.value,
      };
    }

    case "ten": {
      return {
        ...state,
        ten: action.payload.value,
      };
    }

    case "email": {
      return {
        ...state,
        email: action.payload.value,
      };
    }

    case "sdt": {
      return {
        ...state,
        sdt: action.payload.value,
      };
    }

    case "dia_chi": {
      return {
        ...state,
        dia_chi: action.payload.value,
      };
    }

    case "cccd": {
      return {
        ...state,
        cccd: action.payload.value,
      };
    }

    case "dvct": {
      return {
        ...state,
        dvct: action.payload.value,
      };
    }

    case "reset": {
      return {
        ma: "",
        ho_dem: "",
        ten: "",
        email: "",
        sdt: "",
        dia_chi: "",
        cccd: "",
        dvct: "",
      };
    }
  }
}
export default function Add() {
  const [data, dispatchData] = useReducer(Reducer, {
    ma: "",
    ho_dem: "",
    ten: "",
    email: "",
    sdt: "",
    dia_chi: "",
    cccd: "",
    dvct: "",
  });

  const mutation = useMutation({
    mutationFn: () => axios({ url: "/api/ncheck", method: "post", data }),
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
                <h1 className="text-3xl font-bold ">
                   Thêm mới Danh mục khu nhà
                </h1>
              </div>
              <div className="space-y-4">
                <div className="gap">
                  <TextInput
                    value={data.ma}
                    label={
                      <span>
                        Tên tòa nhà <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ma"}
                    isRequire={true}
                    action={"ma"}
                  />
                  <TextInput
                    value={data.ma}
                    label={
                      <span>
                        Mô tả <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ma"}
                    isRequire={true}
                    action={"ma"}
                  />
                  <TextInput
                    value={data.ma}
                    label={
                      <span>
                       Tổng số phòng <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ma"}
                    isRequire={true}
                    action={"ma"}
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
