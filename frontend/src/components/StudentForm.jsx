// src/components/StudentForm.jsx
import React, { useState, useEffect } from "react";

const StudentForm = ({ onSave, selectedStudent, onCancel }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setAge(selectedStudent.age);
      setGrade(selectedStudent.grade);
      setEmail(selectedStudent.email);
    } else {
      setName("");
      setAge("");
      setGrade("");
      setEmail("");
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, age, grade, email });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">{selectedStudent ? "Edit Student" : "Add Student"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save
        </button>
        {selectedStudent && (
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
