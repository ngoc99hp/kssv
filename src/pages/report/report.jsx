import React, {useState, useEffect} from 'react'
import {useAuth } from "@clerk/clerk-react"
import ExportExcel from '../../components/ExportExcel'


const Report = () => {
  const today = new Date();
  const { getToken } = useAuth()


  const [data, setData] = useState([])
  console.log(data)
 
  useEffect(() => {
    const callApi = async () => {
      await fetch(
        `${import.meta.env.VITE_GET_TENANT_ACTIVE}`,
        {
          method: "POST",
          body: JSON.stringify({
            date: today
          }),
          headers:{
            "content-type": "Application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_TEMPLATE_USER,
            })}`
          }
        }
      )
        .then((res) => res.json())
        .then((res) => { setData(res.result) });
    };
    callApi()
  }, [])

  return (
    <div>
        <ExportExcel data={data}/>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className='grid grid-cols-12'>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              STT
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-2">
                              Họ và tên
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Số CCCD
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              SĐT
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Khu
                          </th>
                          <th scope="col" className="px-5 py-3 col-span-1">
                              Số phòng
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Ngày bắt đầu thuê
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Ngày kết thúc thuê
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Số tiền tạm thu
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Số điện khi bắt đầu
                          </th>
                          <th scope="col" className="px-6 py-3 col-span-1">
                              Số nước khi bắt đầu
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {data.map((i, ind) => (
                        <tr className="odd:bg-white even:bg-gray-50 border-b grid grid-cols-12" key={ind}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap col-span-1">
                              {ind + 1}                      
                            </th>
                            <td className="px-6 py-4 col-span-2">
                              {i.tenant.name}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.tenant.cccd}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.tenant.phone_number}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.category_room.category_area.name}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.category_room.name}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.start_date}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.end_date}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.advance_payment}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.initial_electricity}
                            </td>
                            <td className="px-6 py-4 col-span-1">
                              {i.initial_water}
                            </td>
                           
                        </tr>     
                    ))}                   
                  </tbody>
              </table>   
    </div>
  )
}

export default Report