import TextInput from "./../../components/textInput";
import { useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";
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
export default function Edit({ rawData, gender, tenant }) {
  const [selected, setSelected] = useState({
    gender: {
      value: gender.find((item) => item.id === rawData.gender_id).id,
      label: gender.find((item) => item.id === rawData.gender_id).name,
    },
    tenant: {
      value: tenant.find((item) => item.id === rawData.tenants_type_id).id,
      label: tenant.find((item) => item.id === rawData.tenants_type_id).name,
    },
  });
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
  return (
    <div>
      <dialog id={`edit_${rawData.code}`} className="modal">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="bg-cover bg-center flex justify-center items-center">
            <div className=" mx-auto  max-w-2xl space-y-6  p-6 rounded-lg bg-white bg-opacity-80">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold ">Chính sửa tài khoản</h1>
                <p className="text-gray-500 dark:text-gray-500">
                  Hệ thống kiểm soát vào ra
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Mã người thuê <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Họ, tên đệm<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Tên<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Email<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Số điện thoại<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Địa chỉ<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        Số căn cước công dân
                        <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={<span>Đơn vị công tác</span>}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                </div>
                <div className="flex justify-center items-center  gap-5">
                  <button className=" bg-transparent text-green-500 border border-green-500 hover:text-black hover:bg-green-500 hover:border-black py-2 px-4 rounded">
                    Cập nhật
                  </button>
                  <button className=" bg-transparent text-gray-500 border border-gray-400 hover:text-black hover:bg-red-500 hover:border-black py-2 px-4 rounded">
                    Buộc dừng
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
