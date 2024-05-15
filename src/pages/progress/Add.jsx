import TextInput from "./../../components/textInput";
import { useReducer } from "react";
function Reducer(state, action) {
  switch (action.type) {
    case "ten": {
      return {
        ...state,
        ten: action.payload.value,
      };
    }
    case "mo_ta": {
      return {
        ...state,
        mo_ta: action.payload.value,
      };
    }
    case "reset": {
      return {
        ten: "",
        mo_ta: "",
      };
    }
  }
}
export default function Add() {
  const [data, dispatchData] = useReducer(Reducer, {
    ten: "",
    mo_ta: "",
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
            <div className=" mx-auto  max-w-2xl space-y-6  p-6 rounded-lg bg-white bg-opacity-80">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold ">Đăng ký tài khoản</h1>
                <p className="text-gray-500 dark:text-gray-500">
                  Hệ thống kiểm soát vào ra
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <TextInput
                    value={data.mo_ta}
                    label={
                      <span>
                        employeeCode <span className="text-red-600"> *</span>
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
                        firstName<span className="text-red-600"> *</span>
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
                        lastName<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"email"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"primaryTelephone"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"address1"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"address2"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"city"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"country"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"stateProvinceRegion"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"zipOrPostalCode"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"barCode"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"rfid"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"systemId"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                  <TextInput
                    value={data.mo_ta}
                    label={"designationName"}
                    dispatch={dispatchData}
                    id={"mo_ta"}
                    isRequire={true}
                    action={"mo_ta"}
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button className=" bg-transparent text-green-500 border border-green-500 hover:text-black hover:bg-green-500 hover:border-black py-2 px-4 rounded">
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
