import { Request, Response } from "express";
import { Student } from "../models/studentModel";
import { StudentDTO } from "../interfaces/studentInterface";
import asyncHandler from "../utils/asyncHandler";

export const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const { name, age, grade, email }: StudentDTO = req.body;

  if (!name || !age || !grade || !email) {
    return res.status(400).json({ message: "All fields (name, age, grade, email) are required." });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (typeof age !== "number" || age <= 0 || age > 120) {
    return res
      .status(400)
      .json({ message: "Invalid age. Age should be a number between 1 and 120." });
  }

  const existingStudent = await Student.findOne({ email }).exec();
  if (existingStudent) {
    return res.status(400).json({ message: "A student with this email already exists." });
  }

  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    return res.status(201).json(savedStudent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create student", error: (error as Error).message });
  }
});

export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).exec();
    if (student) {
      return res.json(student);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve student", error: (error as Error).message });
  }
});

export const getAllStudents = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const students = await Student.find().exec();
    return res.json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve students", error: (error as Error).message });
  }
});

export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    if (updatedStudent) {
      return res.json(updatedStudent);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update student", error: (error as Error).message });
  }
});

export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id).exec();
    if (deletedStudent) {
      return res.json(deletedStudent);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete student", error: (error as Error).message });
  }
});
