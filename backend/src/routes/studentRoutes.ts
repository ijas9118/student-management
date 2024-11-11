import { Router } from "express";
import {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = Router();

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
