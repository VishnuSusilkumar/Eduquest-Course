import { ICourseService } from "../interfaces/iCourse";
import { Course } from "../model/course.entities";

export class CourseController {
  constructor(private service: ICourseService) {}

  createCourse = async (data: Course) => {
    try {
      const response = await this.service.createCourse(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getCourses = async (instructorId: string) => {
    try {
      const response = this.service.getCourses(instructorId);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  updateCourse = async (data: Course) => {
    try {
      return this.service.updateCourse(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  deleteCourse = async (courseId: string) => {
    try {
      return this.service.deleteCourse(courseId);
    } catch (e: any) {
      console.log(e);
    }
  };

  getCourseWop = async (courseId: string) => {
    try {
      return this.service.getCourseWop(courseId);
    } catch (e: any) {
      console.log(e);
    }
  };

  getAllCourses = async () => {
    try {
      const response = await this.service.getAllCourses();
      console.log(response);

      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getTrendingCourses = async () => {
    try {
      return this.service.getTrendingCourses();
    } catch (e: any) {
      console.log(e);
    }
  };

  updatePurchaseCount = async (courseId: string) => {
    try {
      const response = this.service.updatePurchaseCount(courseId);
      return {
        message: "Course Enrolled Successfully",
        data: response,
        status: 200,
        success: true,
      };
    } catch (e: any) {
      console.log(e);
    }
  };

  getCourseContent = async (courseId: string) => {
    try {
      return this.service.getCourseContent(courseId);
    } catch (e: any) {
      console.log(e);
    }
  };

  addQuestion = async (data: any) => {
    try {
      return this.service.addQuestion(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  addAnswer = async (data: any) => {
    try {
      return this.service.addAnswer(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  addReview = async (data: any) => {
    try {
      return this.service.addReview(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  editReview = async (data: any) => {
    try {
      return this.service.editReview(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  searchCourses = async (searchTerm: string) => {
    try {
      return this.service.searchCourses(searchTerm);
    } catch (e: any) {
      console.log(e);
    }
  };

  getUserCourses = async (userIds: string[]) => {
    try {
      return this.service.getUserCourses(userIds);
    } catch (e: any) {
      console.log(e);
    }
  };

  getCourseAnalytics = async (instructorId: string) => {
    try {
      return this.service.getCourseAnalytics(instructorId);
    } catch (e: any) {
      console.log(e);
    }
  };

  async blockCourse(id: string) {
    try {
      const response = await this.service.blockCourse(id);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }

  async unBlockCourse(id: string) {
    try {
      const response = await this.service.unBlockCourse(id);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  }
}
