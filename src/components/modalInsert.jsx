import React, {useEffect, useState} from 'react'
import {useAuth } from "@clerk/clerk-react"


const ModalInsert = (props) => {
  const {setOpenModalInsert, refreshOut, setRefreshOut, roomId} = props
  const [listTenants, setListTenants] = useState([])
  const [cccd, setCccd] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [initialElectricity, setInitialElectricity] = useState('')
  const [initialWater, setInitialWater] = useState('')
  const [advancePayment, setAdvancePayment] = useState('')
  const [checked, setChecked] = useState(false)
  
console.log(checked)
  const { getToken } = useAuth()


  useEffect(() => {
    const callApi = async () => {
      await fetch(
        `${import.meta.env.VITE_GET_LIST_TENANTS}`,
        {
          method: "GET",
          headers:{
            "content-type": "Application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_TEMPLATE_USER,
            })}`
          }
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setListTenants(res);
        });
    };
    callApi()
  }, [])

  let tenant = []
  tenant = listTenants?.tenants?.filter(tenant => tenant.cccd === cccd)
  const handleInsert =async () => {
    await fetch(`${import.meta.env.VITE_INSERT_TENANT}`,{
        method: "POST",
        body: JSON.stringify({
          objects: {
            tenant_id: tenant[0].id,
            room_id: roomId,
            start_date: startDate,
            end_date: endDate,
            initial_electricity: +initialElectricity,
            initial_water: +initialWater,
            advance_payment: +advancePayment,
            status: checked
          }
        }),
        headers:{
          "content-type": "Application/json",
          authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_TEMPLATE_USER,
          })}`
        }
      }
    )
    .then(() => setOpenModalInsert(false))
    .then(() => setRefreshOut(!refreshOut))
  }
  console.log("tenant", tenant)
  console.log(listTenants)
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
              <h3 className="text-xl text-primary font-semibold">Thêm mới</h3>
              <button
                onClick={() => setOpenModalInsert(false)}
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
            <div className="p-4 md:p-5 ">
                            
                <form className="max-w-md mx-auto grid grid-cols-2 gap-x-5">
                  <div className="relative z-0 w-full mb-5 group">
                      <input
                        value={cccd}
                        onChange={(e) => setCccd(e.target.value)}
                        type="text" name="floating_email" id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" required />
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CCCD</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Ngày bắt đầu</label>
                    <input onChange={(e) => setStartDate(e.target.value)}  type="date" id="large-input" className="block w-full p- text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>
                  </div>
                 
                  <div className="relative z-0 w-full mb-5 group">
                      <input
                        value={initialElectricity}
                        onChange={(e) => setInitialElectricity(e.target.value)}
                        type="text" name="floating_email" id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" required />
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900">Ngày kết thúc</label>
                    <input onChange={(e) => setEndDate(e.target.value)}  type="date" id="large-input" className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                      <input
                        value={initialWater}
                        onChange={(e) => setInitialWater(e.target.value)}
                        type="text" name="floating_email" id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" required />
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số nước</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                      <input
                        value={advancePayment}
                        onChange={(e) => setAdvancePayment(e.target.value)}
                        type="text" name="floating_email" id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" required />
                      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tạm thu</label>
                  </div>
                  <div class="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" checked = {checked} onChange={(e) => setChecked(e.target.checked)}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 ">Đã thanh toán</label>
                  </div>
                </form>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className='grid grid-cols-5'>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              CCCD
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Tên
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Ngày sinh
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              SDT
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                            Email
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {tenant?.map(i => (
                      <tr className="odd:bg-white even:bg-gray-50 border-b grid grid-cols-5" key={i.cccd}>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap col-span-1">
                            {i.cccd}
                        </td>
                        <td className="px-6 py-4 col-span-1">
                          {i.name}
                        </td>
                        <td className="px-6 py-4 col-span-1">
                          {i.date_of_birth}
                        </td>
                        <td className="px-6 py-4 col-span-1">
                          {i.phone_number}                            
                        </td>
                        <td className="px-6 py-4 col-span-1">
                          {i.email}
                        </td>      
                      </tr>         
                    ))}
                </tbody>
                </table>
            <button onClick={handleInsert} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalInsert