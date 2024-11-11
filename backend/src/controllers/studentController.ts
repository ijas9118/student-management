import { Request, Response } from "express";
import { StudentService } from "../services/studentService";
import asyncHandler from "../utils/asyncHandler";

const studentService = new StudentService();

export const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json(student);
});

export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.getStudentById(req.params.id);
  student ? res.json(student) : res.status(404).json({ message: "Student not found" });
});

export const getAllStudents = asyncHandler(async (_req: Request, res: Response) => {
  const students = await studentService.getAllStudents();
  res.json(students);
});

export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
  updatedStudent ? res.json(updatedStudent) : res.status(404).json({ message: "Student not found" });
});

export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const deletedStudent = await studentService.deleteStudent(req.params.id);
  deletedStudent ? res.json(deletedStudent) : res.status(404).json({ message: "Student not found" });
});
