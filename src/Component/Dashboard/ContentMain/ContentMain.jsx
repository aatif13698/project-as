import React from 'react'
import './ContentMain.css'
import { Outlet } from 'react-router-dom'

const ContentMain = ({children}) => {
  return (
    <div className='mainContent'>
        
        {children}

        <Outlet/>


      
    </div>
  )
}

export default ContentMain
