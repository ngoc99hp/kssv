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
export default function AddDonVi() {
  const [data, dispatchData] = useReducer(Reducer, {
    ten: "",
    mo_ta: "",
  });
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("AddDonVi").showModal()}
      >
        Thêm mới đơn vị
      </button>
      <dialog id="AddDonVi" className="modal">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold ">Thêm đơn vị mới</h1>
            </div>
            <TextInput
              value={data.mo_ta}
              label={
                <span>
                  Nhập tên đơn vị <span className="text-red-600"> *</span>
                </span>
              }
              dispatch={dispatchData}
              id={"mo_ta"}
              isRequire={true}
              action={"mo_ta"}
            />
            <div className="flex justify-center items-center mt-3">
              <button className=" bg-transparent text-green-500 border border-green-500 hover:text-black hover:bg-green-500 hover:border-black py-2 px-4 rounded">
               Thêm mới
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
