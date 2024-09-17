import { Course } from "../model/course.entities";

export interface ICourseService {
  createCourse(data: Course): any;
  getCourses(instructorId: string): Promise<Course[] | null>;
  updateCourse(data: Course): Promise<Object | null>;
  deleteCourse(courseId: string): Promise<object | null>;
  getCourseWop(courseId: string): Promise<Course | null>;
  getAllCourses(): Promise<Course[] | null>;
  getTrendingCourses(): Promise<Course[] | null>;
  updatePurchaseCount(courseId: string): unknown;
  getCourseContent(courseId: string): Promise<Course | null>;
  addQuestion(data: any): unknown;
  addAnswer(data: any): unknown;
  addReview(data: any): unknown;
  searchCourses(searchTerm: string): Promise<Course[] | null>;
  getUserCourses(userId: string[]): Promise<Course[] | null>;
  getCourseAnalytics(data: any): unknown;
  blockCourse(courseId: string): Promise<object | null>;
  unBlockCourse(courseId: string): Promise<object | null>;
}
