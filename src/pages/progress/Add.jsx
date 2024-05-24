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
export default function Add({ gender, tenant }) {
  const [selected, setSelected] = useState({ gender: null, tenant: null });
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
    mutationFn: () =>
      axios({
        url: "/api/ncheck",
        method: "post",
        data: {
          ma: data.ma,
          ho_dem: data.ho_dem,
          ten: data.ten,
          email: data.email,
          sdt: data.sdt,
          dia_chi: data.dia_chi,
          cccd: data.cccd,
          dvct: data.dvct,
          gender: selected.gender,
          tenant: selected.tenant,
          type: "I",
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
            <div className=" mx-auto  max-w-2xl space-y-6  p-6 rounded-lg bg-white bg-opacity-80">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold ">Đăng ký nội trú</h1>
                <p className="text-gray-500 dark:text-gray-500">
                  Hệ thống kiểm soát vào ra
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    value={data.ma}
                    label={
                      <span>
                        Mã <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ma"}
                    isRequire={true}
                    action={"ma"}
                  />
                  <TextInput
                    value={data.ho_dem}
                    label={
                      <span>
                        Họ, tên đệm<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ho_dem"}
                    isRequire={true}
                    action={"ho_dem"}
                  />
                  <TextInput
                    value={data.ten}
                    label={
                      <span>
                        Tên<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"ten"}
                    isRequire={true}
                    action={"ten"}
                  />
                  <TextInput
                    value={data.email}
                    label={
                      <span>
                        Email<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"email"}
                    isRequire={true}
                    action={"email"}
                  />
                  <TextInput
                    value={data.sdt}
                    label={
                      <span>
                        Số điện thoại<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"sdt"}
                    isRequire={true}
                    action={"sdt"}
                  />
                  <TextInput
                    value={data.dia_chi}
                    label={
                      <span>
                        Địa chỉ<span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"dia_chi"}
                    isRequire={true}
                    action={"dia_chi"}
                  />
                  <TextInput
                    value={data.cccd}
                    label={
                      <span>
                        Số căn cước công dân
                        <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"cccd"}
                    isRequire={true}
                    action={"cccd"}
                  />
                  <TextInput
                    value={data.dvct}
                    label={<span>Đơn vị công tác</span>}
                    dispatch={dispatchData}
                    id={"dvct"}
                    isRequire={true}
                    action={"dvct"}
                  />
                  <Select
                    placeholder="Giới tính"
                    className="text-black text-sm my-5"
                    classNames={{
                      control: () => "!rounded-[5px]",
                      input: () => "!pr-2.5 !pb-2.5 !pt-4 !m-0",
                      valueContainer: () => "!p-[0_8px]",
                      menu: () => "!z-[11]",
                    }}
                    options={gender.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    value={selected.gender}
                    onChange={(e) =>
                      setSelected((pre) => ({ ...pre, gender: e }))
                    }
                  />
                  <Select
                    placeholder="Quyền"
                    className="text-black text-sm my-5"
                    classNames={{
                      control: () => "!rounded-[5px]",
                      input: () => "!pr-2.5 !pb-2.5 !pt-4 !m-0",
                      valueContainer: () => "!p-[0_8px]",
                      menu: () => "!z-[11]",
                    }}
                    options={tenant.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    value={selected.tenant}
                    onChange={(e) =>
                      setSelected((pre) => ({ ...pre, tenant: e }))
                    }
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
