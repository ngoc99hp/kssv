import React, {useState} from 'react'
import ModalOut from './modalOut'

const ModalDetail = (props) => {
  const {setOpenModal, refreshOut, setRefreshOut, room} = props
  const [openModalOut, setOpenModalOut] = useState(false)
  const [idRentDetail, setIdRentDetail] = useState()
  
console.log("rom", room)
  const handleClickOut = (id) => {
    setOpenModalOut(true)
    setIdRentDetail(id)
  }
  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 px-2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#1e1e1e6f]"
      >
        <div className="relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full xl:max-w-[80%] max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl text-primary font-semibold">Danh sách sinh viên</h3>
              <button
                onClick={() => setOpenModal(false)}
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
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className='grid grid-cols-12'>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              STT
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-2">
                              Họ và tên
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-2">
                              Ngày bắt đầu
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-2">
                              Ngày kết thúc
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Số điện
                          </th>
                          <th scope="col" className="px-5 py-3 col-span-1">
                              Số nước
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Đã nộp
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-2">
                             
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {room?.rent_details?.map((i, ind) => (
                        <tr className="odd:bg-white even:bg-gray-50 border-b grid grid-cols-12" key={ind}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap col-span-1">
                              {ind + 1}                      
                            </th>
                            <td className="px-6 py-4 col-span-2">
                              {i.tenant.name}
                            </td>
                            <td className="px-6 py-4 col-span-2">
                              {i.start_date}
                            </td>
                            <td className="px-6 py-4 col-span-2">
                              {i.end_date}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.initial_electricity}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.initial_water}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.advance_payment}
                            </td>
                            <td className="px-6 py-4 col-span-2 flex items-center justify-center">
                              <button onClick={() => handleClickOut(i.id)} className='text-red-500'>Cho ra</button>
                            </td>
                        </tr>     
                    ))}
                    
                  </tbody>
              </table>
    
            </div>
          </div>
        </div>
      </div>
      {openModalOut && <ModalOut setOpenModalOut={setOpenModalOut} setOpenModal={setOpenModal} idRentDetail={idRentDetail} refreshOut={refreshOut} setRefreshOut={setRefreshOut}/>}
    </div>
  )
}

export default ModalDetail