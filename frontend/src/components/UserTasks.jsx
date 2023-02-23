import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { getUserTasks, updateTaskStatus } from '../features/task/taskSlice'
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

const UserDashboard = () => {

  const [status, setStatus] = useState()
  const [id, setId] = useState()
  const [isDisabled, setIsDisabled] = useState()
const dispatch = useDispatch()
const [open, setOpen] = React.useState(false);
const handleClose = () => setOpen(false);
const handleOpen = () => setOpen(true);

  const { task } = useSelector(state => state.task)
  useEffect(() => {
      dispatch(getUserTasks())
  }, [])


useEffect(() => {
  
  setInterval(() => {
    // dispatch(getExpiredOnes())
  }, 60000)
}, [])

const taskUpdater = (task) => {
  handleOpen()
  setIsDisabled(task.isDisabled)
     task.status == "completed" ? setStatus("pending") : setStatus("completed")
  setId(task._id)
  }  
 
  
  return (
    <div className='p-9 flex flex-col justify-center items-center'>
      <button className='p-2 w-[6rem] bg-white outline-red-900 text-red-800 hover:text-white hover:bg-red-700 mb-8' onClick={() => dispatch(logout())}>Log Out</button>
      {task.length < 1 ? "You Have No Tasks To Display" :
        <>
          <table className="mx-auto table-auto w-9/12 text-purple-700 bg-white">
          <thead className='bg-purple-900 text-white font-normal h-[3rem]'>
            <tr>
              <th className='text-2xl'>Task</th>
              <th className='text-2xl'>Deadline</th>
              <th className='text-2xl'>Status</th>
              <th className='text-2xl'>Expire status</th>

            </tr>
          </thead>
          <tbody className='space-y-4 !px-10'>
      {task?.map((tas) => {
        return (
            <tr className=' border !h-[3rem]' key={tas?._id}>
              <td> {tas?.task}</td>
            <td> {tas?.deadline}</td>
            <td onClick={() => taskUpdater(tas)} className={`  ${ !tas.isDisabled ?  (tas.status == "pending" ? 'text-yellow-600 bg-white hover:bg-yellow-500 hover:text-white' : "text-green-600 bg-white hover:bg-green-700 hover:text-white") : 'bg-gray-600 text-white '}`}> {tas?.status} </td>
              <td className={` ${tas.isExpired == true ? 'text-red-500 hover:bg-red-700 hover:text-white bg-white' : "text-purple-600 bg-white hover:bg-purple-700 hover:text-white"}`}> {tas?.isExpired ? "Expired" : "Not Expired"} </td>
            </tr>
 
 )      })}      
 </tbody>
</table>
        </>
          
         }
    
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
        <Box sx={style}>
          {isDisabled ?
            
            <h3 className='font-normal text-2xl'>
            Since You are Disabled! You Can NoAt Make Any Changes.
          </h3>
            : <>
    <Typography id="modal-modal-title" variant="h6" component="h2">
       Are You Sure You Want To Update This Task
    </Typography>
    <Button onClick={() => dispatch(updateTaskStatus({id, status}), handleClose())} variant="outlined" className='mt-6'>Save Changes</Button>
            </>}           
  </Box>
        </Modal>
    </div>
  )
}

export default UserDashboard