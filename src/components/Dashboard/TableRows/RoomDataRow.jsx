import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import UpdateRoomModal from '../../Modal/UpdateRoomModal'

const RoomDataRow = ({ room, refetch,handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false) 
    //for delete modal
    const closeModal=()=>{
        setIsOpen(false)
    }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={room?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
        onClick={() => setIsOpen(true)}
        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal isOpen={isOpen} closeModal={closeModal} handleDelete={handleDelete} id={room?._id}></DeleteModal>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={()=>setIsEditModalOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </button>
        {/* Update Modal */}
        <UpdateRoomModal refetch={refetch} room={room} isOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen}></UpdateRoomModal>
      </td>
    </tr>
  )
}

RoomDataRow.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
  handleDelete:PropTypes.func,
}

export default RoomDataRow