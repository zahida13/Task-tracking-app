import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
const Navbar = () => {
   const dispatch = useDispatch()
    return (
    <div className='flex justify-center items-center my-5'>
            
      <div className='flex justify-around items-center space-x-4 text-2xl !font-normal bg-purple-900 text-white p-3 rounded w-1/2'>
                <Link to={"/"} className='hover:underline'>Tasks</Link>
          <Link to="/users" className='hover:underline'>Users</Link>
          <Link to="/add" className='hover:underline'>Add New User</Link>
          <Link className='hover:underline  ' to="/" onClick={() => dispatch(logout())}> Log Out</Link>
    </div>
    </div>
  )
}

export default Navbar