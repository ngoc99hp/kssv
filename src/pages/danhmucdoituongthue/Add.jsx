import TextInput from "./../../components/textInput";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";
function Reducer(state, action) {
  switch (action.type) {
    case "name": {
      return {
        ...state,
        name: action.payload.value,
      };
    }

    case "description": {
      return {
        ...state,
        description: action.payload.value,
      };
    }
    case "reset": {
      return {
        name: "",
        description: "",
      };
    }
  }
}
export default function Add() {
  const queryClient = useQueryClient();
  const [data, dispatchData] = useReducer(Reducer, {
    name: "",
    description: "",

  });

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_INSERT_DANHMUCDOITUONGTHUE}`, {
          method: "POST",
          body:JSON.stringify({
            objects:
              {
                name:data.name,
                description:data.description,
              }
            
          })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const res = await response.json();
        return res.result;
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
        throw error;
      }
    },
    onSuccess: () => {
      document.getElementById("add_danhmucdoituong").close();
      queryClient.invalidateQueries(["get_datadoituongthue"]);
      dispatchData({
        type: "reset", 
      });
      console.log("ok");
      toast.success("Tạo mới thành công!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      })
    },
    onError: () =>  {
      // console.log(2);
      toast.error("Tạo mới không thành công!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    },
  });

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("add_danhmucdoituong").showModal()}
      >
        Thêm mới
      </button>
      <dialog id="add_danhmucdoituong" className="modal">
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
                   Thêm mới Đối tượng thuê
                </h1>
              </div>
              <div className="space-y-4">
                <div className="gap">
                  <TextInput
                    value={data.name}
                    label={
                      <span>
                        Tên đối tượng <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"name"}
                    isRequire={true}
                    action={"name"}
                  />
                  <TextInput
                    value={data.description}
                    label={
                      <span>
                        Mô tả <span className="text-red-600"> *</span>
                      </span>
                    }
                    dispatch={dispatchData}
                    id={"description"}
                    isRequire={true}
                    action={"description"}
                  />
                  
                </div>
                <div className="flex justify-center items-center ">
                  <button
                    onClick={() => mutation.mutate()}
                    className=" bg-transparent text-green-500 border border-green-500 hover:text-black hover:bg-green-500 hover:border-black py-2 px-4 rounded"
                  >
                    Tạo mới
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
