import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, disableUsers } from '../features/auth/authSlice'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTask } from '../features/task/taskSlice';
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
   
const AllUsers = () => {
    const dispatch = useDispatch()
const {users} = useSelector(state => state.auth)
    
    useEffect(() => {
    dispatch(getAllUsers())
    }, [])
  
    const [openTask, setOpenTask] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);
    const [enabled, setEnable] = useState()
    const [email, setEmail] = useState()
    const [task, setTask] = useState()
    const [deadline, setDeadline] = useState()
  const [userId, setUserId] = useState()
  const [status, setStatus] = useState()
  const [user, setUser] = useState()


    const onClick = (task) => {
        setEmail(task.email)
        setEnable(task.isDisabled)
        handleOpen()
  }

  const openTaskModal = (task) => {
    handleOpenTask()
    setUserId(task._id)
    setUser(task.name)
    setStatus("pending")

  }

  const onSubmit = () => {
    dispatch(createTask({ userId, status, deadline, task }))
  handleCloseTask()    
  }

    return (
    <div className='p-9 '>
    <table className="mx-auto table-auto w-9/12 text-purple-700 bg-white">
    <thead className='bg-purple-900 text-white h-[3rem]'>
      <tr>
        <th className='text-2xl font-normal'>Name</th>
        <th className='text-2xl font-normal'>Email</th>
              <th className='text-2xl font-normal'>Disabled</th>
        <th className='text-2xl font-normal'>Assign New Task</th>
              
      </tr>
    </thead>
    <tbody className='space-y-4 !px-10'>
{users?.map((tas) => {
  return (
      <tr className=' border !h-[3rem]' key={tas?._id}>
        <td> {tas?.name}</td>
        <td> { tas?.email}</td>
      <td onClick={() => onClick(tas)} className={`  py-1 ${tas?.isDisabled == true ? "text-gray-900 bg-white hover:bg-gray-600 hover:text-white" : "text-pink-800 bg-white hover:bg-pink-600 hover:text-white"} `}> {tas?.isDisabled == true ? "Disabled" : "Enabled"} </td>
      <td onClick={() => openTaskModal(tas)} className="cursor-pointer hover:text-white hover:bg-purple-500" > Assign New Task to {tas?.name  } </td>
      
      </tr>

)      })}      
</tbody>
</table>

        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
       Are You Sure You Want To { enabled ? "enable" : "disable" } {email}
    </Typography>
    <Button onClick={() => dispatch(disableUsers({email, enabled}))} variant="outlined" className='mt-6'>Save Changes</Button>
  </Box>
        </Modal>
        
        <Modal
          
        open={openTask}
        onClose={handleCloseTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form className="w-1/2 absolute md:translate-x-1/2 translate-y-1/3  top-1/5  left-1/4  md:w-1/4 bg-white p-8" onSubmit={onSubmit}>
  
  <div className="mb-2">
      <label
          for="email"
          className="block text-sm font-semibold text-gray-800"
      >
          Add New Task
      </label>
      <input
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
</div>
<div className="mb-2">
      <label
          for="date"
          className="block text-sm font-semibold text-gray-800"
      >
         Add Deadline
      </label>
              <input
                placeholder='YYYY-MM-DD'
          onChange={(e) => setDeadline(e.target.value)}
          type="date"
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
            </div>
            <div className="mb-2">
      <label
          for="date"
          className="block text-sm font-semibold text-gray-800"
      >
         Status
      </label>
      <input
               value={status}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
      <label
          for="date"
          className="block text-sm font-semibold text-gray-800"
      >
       User
      </label>
      <input
          value={user}
 
          type="text"
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
  </div>

    <div className="mt-6">
      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
      Add Task
      </button>
  </div>
</form> 

</Modal>

</div>


  )
}

export default AllUsers