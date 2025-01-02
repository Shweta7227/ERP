import { useState } from 'react'
import './App.css'
import './index.css'
import Assignment from './Components/Assignment/Assignment'
import TimeTable from './Components/TimeTable/TimeTable'
import Attendance from './Components/Attendance_student/Attendance'
import FeeStructure from './Components/FeeStructure/FeeStructure'
function App() {

  return (
    <div className='h-auto '>
     {/* <Assignment/> */}
     {/* <TimeTable/> */}
     <FeeStructure />

    </div>
  )
}

export default App
