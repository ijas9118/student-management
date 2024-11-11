// src/components/StudentList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import StudentItem from "./StudentItem";
import StudentForm from "./StudentForm";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await api.get("/");
    setStudents(response.data);
  };

  const handleSave = async (studentData) => {
    if (selectedStudent) {
      await api.put(`/${selectedStudent._id}`, studentData);
      setSelectedStudent(null);
    } else {
      await api.post("/", studentData);
    }
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await api.delete(`/${id}`);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleCancel = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Management</h1>
      <StudentForm onSave={handleSave} selectedStudent={selectedStudent} onCancel={handleCancel} />
      <div>
        {students.map((student) => (
          <StudentItem key={student._id} student={student} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
