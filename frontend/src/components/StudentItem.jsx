// src/components/StudentItem.jsx
import React from "react";

const StudentItem = ({ student, onEdit, onDelete }) => (
  <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{student.name}</h3>
        <p className="text-gray-600">
          Age: {student.age} | Grade: {student.grade}
        </p>
        <p className="text-gray-600">Email: {student.email}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(student)} className="text-blue-500 hover:text-blue-700">
          Edit
        </button>
        <button onClick={() => onDelete(student._id)} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default StudentItem;
