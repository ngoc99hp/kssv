import React, {useEffect, useState} from 'react'
import {useAuth } from "@clerk/clerk-react"
import ModalDetail from '../../components/modalDetail'
import ModalInsert from '../../components/modalInsert'


const SelectRoom = () => {
  const [loading, setLoading] =useState(false)
  const [data, setData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalInsert, setOpenModalInsert] = useState(false)
  const [room, setRoom] = useState({})
  const [roomId, setRoomId] = useState(1)
  const [refreshOut, setRefreshOut] = useState(false)
  const { getToken } = useAuth()
  const today = new Date();

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      await fetch(
        `${import.meta.env.VITE_GET_SELECT_ROOM}`,
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
        .then((res) => {
          setData(res.category_areas
          );
        });
    setLoading(false)
    };
    callApi()
  }, [refreshOut])

  const handleClick = (room) => {
    setOpenModal(true)
    setRoom(room)
  }

  const handleClickInsert = (id) => {
    setOpenModalInsert(true)
    setRoomId(id)
  }

  console.log(data)
  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading && <p>Loading...</p>}
          {data?.map(i => (
            <div key={i.id}>
            <p className='mb-2'>{i.name}</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr className='grid grid-cols-5'>
                        <th scope="col" className="px-6 py-3 col-span-1">
                            Khu nhà
                        </th>
                        <th scope="col" className="px-6 py-3 col-span-1">
                            Tên phòng
                        </th>
                        <th scope="col" className="px-6 py-3 col-span-1">
                            Số người đang ở
                        </th>
                        <th scope="col" className="px-6 py-3 col-span-1">
                            Dành cho
                        </th>
                        <th scope="col" className="px-6 py-3 col-span-1">
                           
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {i.category_rooms.map(room => (
                      <tr className="odd:bg-white even:bg-gray-50 border-b grid grid-cols-5" key={room.id}>
                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap col-span-1">
                              B
                          </td>
                          <td className="px-6 py-4 col-span-1">
                            <p className='cursor-pointer' onClick={() => handleClick(room)}>
                              {room.name}
                            </p>
                          </td>
                          <td className="px-6 py-4 col-span-1">
                              {room.rent_details_aggregate.aggregate.count}/{room.max_tenant}
                          </td>
                          <td className="px-6 py-4 col-span-1">
                              {room.allow_female ? 'Nữ' : 'Nam'}
                          </td>
                          <td className="px-6 py-4 col-span-1">
                            <button onClick={() => handleClickInsert(room.id)}>Thêm</button>
                          </td>
                         
                      </tr>     
                      ))}
                </tbody>
            </table>
            </div>
          ))}
        </div>

          { openModal && <ModalDetail setOpenModal={setOpenModal} room={room} refreshOut={refreshOut} setRefreshOut={setRefreshOut}/>}
          { openModalInsert && <ModalInsert setOpenModalInsert={setOpenModalInsert} roomId={roomId} refreshOut={refreshOut} setRefreshOut={setRefreshOut}/>}
        
    </div>
  )
}

export default SelectRoom