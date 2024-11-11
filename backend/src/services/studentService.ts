import { Student } from "../models/studentModel";
import { StudentDTO } from "../interfaces/studentInterface";

export class StudentService {
  public async createStudent(studentData: StudentDTO): Promise<StudentDTO> {
    const student = new Student(studentData);
    return student.save();
  }

  public async getStudentById(studentId: string): Promise<StudentDTO | null> {
    return Student.findById(studentId).exec();
  }

  public async getAllStudents(): Promise<StudentDTO[]> {
    return Student.find().exec();
  }

  public async updateStudent(studentId: string, studentData: StudentDTO): Promise<StudentDTO | null> {
    return Student.findByIdAndUpdate(studentId, studentData, { new: true }).exec();
  }

  public async deleteStudent(studentId: string): Promise<StudentDTO | null> {
    return Student.findByIdAndDelete(studentId).exec();
  }
}
