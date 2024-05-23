import React, {useState} from 'react'
import {useAuth } from "@clerk/clerk-react"


const ModalOut = (props) => {
  const {setOpenModalOut, setOpenModal, idRentDetail, setRefreshOut, refreshOut} = props
  const [dateOut, setDateOut] = useState('')
  const [loading, setLoading] = useState(false)
  console.log("date", dateOut)
  const { getToken } = useAuth()


  const handleOut =async () => {
    console.log(idRentDetail)
    setLoading(true)
    await fetch(`${import.meta.env.VITE_OUT}`,{
          method: "PUT",
          body: JSON.stringify({
            id: idRentDetail,
            end_date: dateOut,
          }),
          headers:{
            "content-type": "Application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_TEMPLATE_USER,
          })}`
        }
      }
    )
      .then(() => setOpenModalOut(false))
      .then(() => setOpenModal(false))
      .then(() => setRefreshOut(!refreshOut))
    setLoading(false)
  }
  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 px-2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#1e1e1e6f]"
      >
        <div className="relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full max-w-[40%] max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl text-primary font-semibold">Cho ra</h3>
              <button
                onClick={() => setOpenModalOut(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <div className="mb-6">
                  <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Ngày kết thúc</label>
                  <input onChange={(e) => setDateOut(e.target.value)}  type="date" id="large-input" className="block w-[50%] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <button onClick={handleOut} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">{loading ? 'Đang cho ra...' : 'Cho ra'}</button>
    
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalOut