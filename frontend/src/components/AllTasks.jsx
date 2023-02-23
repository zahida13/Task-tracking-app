import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, updateTaskStatus } from '../features/task/taskSlice'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
  

const AdminDashboard = () => {
const dispatch = useDispatch()
    const { task } = useSelector(state => state.task)

  useEffect(() => {
    dispatch(getTasks())
    
    setInterval(() => {
      // dispatch(getExpiredOnes())
    }, 60000)
  }, [])
  
  
  return (
      <div className='p-9 '>
          
      
          <table className="mx-auto table-auto w-9/12 text-purple-900 bg-white">
          <thead className='bg-purple-900  h-[3rem] text-white' >
            <tr>
              <th className='text-2xl font-normal'>Task</th>
              <th className='text-2xl font-normal'>Deadline</th>
            <th className='text-2xl font-normal'>Status</th>
            <th className='text-2xl font-normal'>Expired Task</th>
            <th className='text-2xl font-normal'>User</th>

            
            </tr>
          </thead>
          <tbody className='space-y-4 !px-10'>
      {task?.map((tas) => {
        return (
            <tr className=' border !h-[3rem]' key={tas?._id}>
              <td> {tas?.task}</td>
              <td> { tas?.deadline}</td>
            <td   className={` ${tas.status == "pending" ? 'text-yellow-600 bg-white hover:bg-yellow-500 hover:text-white' : "text-green-600 bg-white hover:bg-green-700 hover:text-white"}`}> {tas?.status} </td>
            <td className={` ${tas.isExpired == true ? 'text-red-500 hover:bg-red-700 hover:text-white bg-white' : "text-purple-600 bg-white hover:bg-purple-700 hover:text-white"}`}> {tas?.isExpired ? "Expired" : "Not Expired"} </td>
            <td> { tas?.userId?.email}</td>

            </tr>
 
 )      })}      
 </tbody>
      </table>
      

      
    </div>
  )
}

export default AdminDashboard