import React, { useState } from 'react';

const Assignment = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [role, setRole] = useState("student"); // "student" or "teacher"
  const [uploadedPdf, setUploadedPdf] = useState(null);
  const [marks, setMarks] = useState("");
  const [newAssignment, setNewAssignment] = useState({
    subject: "",
    questionPdf: null,
    dueDateTime: "",
    cutoffDateTime: "",
  });

  const subjects = ["OOPS", "C", "DS", "DBMS"];

  const assignments = {
    OOPS: [
      {
        subject: "OOPS Assignment 1",
        createdDate: "01-Dec-2024",
        dueDateTime: "10/12/2024 20:00:00",
        cutoffDateTime: "10-Dec-2024 - 08:00:00 PM",
        status: "Pending",
        questionPdf: null,
        studentAnswerPdf: null,
        marks: null,
      },
    ],
    // ... similar data for other subjects
  };

  const handleFileUpload = (event) => {
    setUploadedPdf(event.target.files[0]);
  };

  const handleSubmitAnswer = (assignmentIndex) => {
    const assignment = assignments[selectedSubject][assignmentIndex];
    assignment.studentAnswerPdf = uploadedPdf;
    assignment.status = "Submitted";
    setUploadedPdf(null); // Reset uploaded file after submission
  };

  const handleMarkUpload = (assignmentIndex) => {
    const assignment = assignments[selectedSubject][assignmentIndex];
    assignment.marks = marks;
    setMarks(""); // Reset marks after upload
  };

  const handleAddAssignment = () => {
    const newAssignmentData = {
      ...newAssignment,
      createdDate: new Date().toLocaleDateString(),
      status: "Pending",
    };
    if (newAssignmentData.subject && newAssignmentData.questionPdf) {
      // Add the new assignment to the subject
      assignments[newAssignmentData.subject].push(newAssignmentData);
      setNewAssignment({
        subject: "",
        questionPdf: null,
        dueDateTime: "",
        cutoffDateTime: "",
      });
    } else {
      alert("Please fill all fields before adding an assignment.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">
          Session: <span className="font-bold">July-Dec 2024-2025</span>
        </h1>
        {/* Role Dropdown */}
        <div className="relative">
          <label htmlFor="role" className="mr-2 font-medium">
            Select Role:
          </label>
          <select
            id="role"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {/* Subject Dropdown */}
        <div className="relative">
          <label htmlFor="subject" className="mr-2 font-medium">
            Select Subject:
          </label>
          <select
            id="subject"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teacher Interface */}
      {role === "teacher" && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Assignment</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="newAssignmentSubject" className="mb-2">Subject:</label>
              <select
                id="newAssignmentSubject"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
              >
                <option value="" disabled>
                  -- Select Subject --
                </option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="newAssignmentPdf" className="mb-2">Assignment Question (PDF):</label>
              <input
                type="file"
                id="newAssignmentPdf"
                accept=".pdf"
                onChange={(e) => setNewAssignment({ ...newAssignment, questionPdf: e.target.files[0] })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="dueDateTime" className="mb-2">Due Date and Time:</label>
              <input
                type="datetime-local"
                id="dueDateTime"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAssignment.dueDateTime}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDateTime: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cutoffDateTime" className="mb-2">Cut-Off Date and Time:</label>
              <input
                type="datetime-local"
                id="cutoffDateTime"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newAssignment.cutoffDateTime}
                onChange={(e) => setNewAssignment({ ...newAssignment, cutoffDateTime: e.target.value })}
              />
            </div>
            <button
              onClick={handleAddAssignment}
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
            >
              Add Assignment
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <table className="min-w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4 text-left">Action</th>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Created Date</th>
              <th className="py-2 px-4 text-left">Due Date Time</th>
              <th className="py-2 px-4 text-left">Cut-Off Date Time</th>
              <th className="py-2 px-4 text-left">Status</th>
              {role === "teacher" && <th className="py-2 px-4 text-left">Marks</th>}
              {role === "student" && <th className="py-2 px-4 text-left">Upload Assignment</th>}
            </tr>
          </thead>
          <tbody>
            {/* Display assignments for selected subject */}
            {selectedSubject && assignments[selectedSubject] ? (
              assignments[selectedSubject].map((assignment, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                  <td className="py-2 px-4">{assignment.subject}</td>
                  <td className="py-2 px-4">{assignment.createdDate}</td>
                  <td className="py-2 px-4">{assignment.dueDateTime}</td>
                  <td className="py-2 px-4">{assignment.cutoffDateTime}</td>
                  <td
                    className={`py-2 px-4 font-bold ${assignment.status === "Pending" ? "text-green-500" : "text-red-500"}`}
                  >
                    {assignment.status}
                  </td>
                  {role === "teacher" && (
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        placeholder="Enter Marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                      />
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => handleMarkUpload(index)}
                      >
                        Upload Marks
                      </button>
                    </td>
                  )}
                  {role === "student" && (
                    <td className="py-2 px-4">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                      />
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => handleSubmitAnswer(index)}
                      >
                        Submit Assignment
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 px-4 text-center text-gray-500 font-medium"
                >
                  Please select a subject to view assignments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
