import { Course } from "../model/course.entities";

export interface ICourseRepository {
  createCourse(data: Course): Promise<object | null>;
  getCourses(instructorId: string): Promise<Course[] | null>;
  updateCourse(id: string, data: Course): Promise<object | null>;
  deleteCourse(courseId: string): Promise<object | null>;
  getCourseWop(courseId: string): Promise<Course | null>;
  getAllCourses(): Promise<Course[] | null>;
  getTrendingCourses(): Promise<Course[] | null>;
  updatePurchaseCount(courseId: string): Promise<Object | null>;
  getCourseContent(courseId: string): Promise<Course | null>;
  addQuestion(data: any): Promise<Object | null>;
  addAnswer(data: any): Promise<Object | null>;
  addReview(data: any): Promise<Object | null>;
  searchCourse(searchTerm: string): Promise<Course[] | null>;
  getUserCourses(userId: string[]): Promise<Course[] | null>;
  getCourseAnalytics(data: any): Promise<Object[] | null>;
  blockCourse(courseId: string): Promise<object | null>;
  unBlockCourse(courseId: string): Promise<object | null>;
}
