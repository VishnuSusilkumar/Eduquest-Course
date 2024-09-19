import { ICourseService } from "../interfaces/iCourse";
import { ICourseRepository } from "../interfaces/iCourse.Repository";
import { Course } from "../model/course.entities";

export class CourseService implements ICourseService {
  constructor(private repository: ICourseRepository) {}

  async createCourse(data: Course) {
    try {
      const response = await this.repository.createCourse(data);
      return response;
    } catch (e: any) {
      throw new Error("Failed to create course.");
    }
  }

  async getCourses(instructorId: string): Promise<Course[] | null> {
    try {
      const response = await this.repository.getCourses(instructorId);
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve courses.");
    }
  }

  async updateCourse(data: Course): Promise<Object | null> {
    try {
      const updateData = {
        ...data,
      };
      const response = await this.repository.updateCourse(
        data.courseId || "",
        updateData
      );
      return response;
    } catch (e: any) {
      throw new Error("Failed to update course.");
    }
  }

  async deleteCourse(courseId: string): Promise<object | null> {
    try {
      const response = await this.repository.deleteCourse(courseId);
      return response;
    } catch (e: any) {
      throw new Error("Failed to delete course.");
    }
  }

  async getCourseWop(courseId: string): Promise<Course | null> {
    try {
      const response = await this.repository.getCourseWop(courseId);
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve course without purchase.");
    }
  }

  async getAllCourses(): Promise<Course[] | null> {
    try {
      const response = await this.repository.getAllCourses();
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve all courses.");
    }
  }

  async getTrendingCourses(): Promise<any[] | null> {
    try {
      const response = await this.repository.getTrendingCourses();
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve trending courses.");
    }
  }

  async updatePurchaseCount(courseId: string): Promise<Object | null> {
    try {
      const response = await this.repository.updatePurchaseCount(courseId);
      return response;
    } catch (e: any) {
      throw new Error("Failed to update purchase count.");
    }
  }

  async getCourseContent(courseId: string): Promise<Course | null> {
    try {
      const response = await this.repository.getCourseWop(courseId);
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve course content.");
    }
  }

  async addQuestion(data: any): Promise<Object | null> {
    try {
      const response = await this.repository.addQuestion(data);
      return response;
    } catch (e: any) {
      throw new Error("Failed to add question.");
    }
  }

  async addAnswer(data: any): Promise<Object | null> {
    try {
      const response = await this.repository.addAnswer(data);
      return response;
    } catch (e: any) {
      throw new Error("Failed to add answer.");
    }
  }

  async addReview(data: any): Promise<Object | null> {
    try {
      const response = await this.repository.addReview(data);
      return response;
    } catch (e: any) {
      throw new Error("Failed to add review.");
    }
  }

  async editReview(data: any): Promise<Object | null> {
    try {
      const response = await this.repository.editReview(data);
      return response;
    } catch (e: any) {
      throw new Error("Failed to edit review.");
    }
  }

  async searchCourses(searchTerm: string): Promise<Course[] | null> {
    try {
      const response = await this.repository.searchCourse(searchTerm);
      return response;
    } catch (e: any) {
      throw new Error("Failed to search courses.");
    }
  }

  async getUserCourses(userIds: string[]): Promise<Course[] | null> {
    try {
      const response = await this.repository.getUserCourses(userIds);
      return response;
    } catch (e: any) {
      throw new Error("Failed to retrieve user courses.");
    }
  }

  async getCourseAnalytics(instructorId: string): Promise<Object[] | null> {
    const months: { month: string; value: string }[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push({
        month: date.toLocaleString("default", { month: "long" }),
        value: date.toISOString().slice(0, 7),
      });
    }

    const response = await this.repository.getCourseAnalytics(instructorId);
    const aggregatedData: Record<string, number> = {};
    if (response) {
      response.forEach(({ _id, count }: any) => {
        aggregatedData[_id] = count;
      });
    } else {
      return null;
    }

    const output: Object[] = months.map(({ month, value }) => ({
      month,
      count: aggregatedData[value] || 0,
    }));

    return output;
  }

  async blockCourse(courseId: string): Promise<object | null> {
    try {
      const response = await this.repository.blockCourse(courseId);
      if (!response) {
        return { success: false, message: "Course not found" };
      }
      return {
        success: true,
        message: "Course Blocked Successfully",
        status: 200,
        courseId,
      };
    } catch (e: any) {
      console.log(e);
      return {
        success: false,
        message: "An error occurred while blocking the course",
      };
    }
  }

  async unBlockCourse(courseId: string): Promise<object | null> {
    try {
      const response = await this.repository.unBlockCourse(courseId);
      if (!response) {
        return { success: false, message: "Course not found" };
      }
      return {
        success: true,
        message: "Course unBlocked Successfully",
        status: 200,
      };
    } catch (e: any) {
      console.log(e);
      return {
        success: false,
        message: "An error occurred while unblocking the course",
      };
    }
  }
}
