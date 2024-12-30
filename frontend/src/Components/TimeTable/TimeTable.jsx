import React, { useState } from 'react'

const TimeTable = () => {
    const timetableData = {
        BCA: {
            Semester1: "mca_sem1_timetable.jpeg",
            Semester2: null,
            Semester3: null,
            Semester4: null,
            Semester5: null,
            Semester6: null,
        },
        MCA: {
            Semester1: "mca_sem1_timetable.jpeg",
            Semester2: "mca_sem2_timetable.jpeg",
            Semester3: null,
            Semester4: null,
        },
    }
    const courses = ['BCA', 'MCA', 'BTECH', 'MTECH', 'MBA', 'BBA']
    const semesters = ['Semester1', 'Semester2', 'Semester3', 'Semester4', 'Semester5', 'Semester6', 'Semester7', 'Semester8']
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const [timetable, setTimetable] = useState(null);

    const handleSearch = () => {
        if (timetableData[course]?.[semester]) {
            setTimetable(timetableData[course][semester]);
        } else {
            setTimetable(null);
        }
    };
    return (
        <div className='container mx-auto  p-5 '>
            <div >
                <div>
                    <h1 className='text-2xl font-bold mb-6'>
                        University TimeTables</h1>
                </div>
                <div className='filters flex justify-center space-x-4 mb-6 bg-white'>
                    <select
                        className='border-2 bg-white border-gray-300 p-2 rounded-lg'
                        value={course}
                        onChange={(e) => setCourse(e.target.value)} >
                        <option value=" ">Select Course</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course}>{course}</option>
                        ))}
                    </select>
                    <select className='border-2 ml-9 bg-white border-gray-300 p-2 rounded-lg'
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)} >
                        <option value=" ">Select Semester</option>
                        {semesters.map((semester, index) => (
                            <option key={index} value={semester}>{semester}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
                <div>
                    {timetable ? (
                        <div>
                            <img
                                src={`/timetables/${timetable}`}
                                alt="Timetable"
                                className="mx-auto max-w-full border-dashed rounded-lg "
                            />
                            <p className="mt-2 text-green-600">Timetable found!</p>
                        </div>
                    ) : course && semester ? (
                        <p className="text-red-500">No timetable available for the selected course and semester.</p>
                    ) : (
                        <p className="text-gray-500">Please select a course and semester to view the timetable.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TimeTable