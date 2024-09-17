import { ICourseRepository } from "../interfaces/iCourse.Repository";
import { Course } from "../model/course.entities";
import CourseModel from "../model/schemas/course.schema";
import mongoose from "mongoose";

export class CourseRepository implements ICourseRepository {
  async createCourse(data: Course): Promise<object | null> {
    try {
      const course = await CourseModel.create(data);
      return course;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }
  async getCourses(instructorId: string): Promise<Course[] | null> {
    try {
      const courses = await CourseModel.find({ instructorId: instructorId });
      return courses;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async updateCourse(id: string, data: Course): Promise<object | null> {
    try {
      const course = await CourseModel.findByIdAndUpdate(id, data);
      return { success: true };
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async deleteCourse(courseId: string): Promise<object | null> {
    try {
      const response = await CourseModel.findByIdAndDelete(courseId);
      return { success: true };
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async getCourseWop(courseId: string): Promise<Course | null> {
    try {
      const response = await CourseModel.findById(courseId).select(
        "-courseData.videoUrl -courseData.links"
      );
      return response;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async getAllCourses(): Promise<Course[] | null> {
    try {
      const response = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.links"
      );
      return response;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async getTrendingCourses(): Promise<any[] | null> {
    try {
      const response = await CourseModel.find()
        .sort({ purchased: -1 })
        .limit(6)
        .select("thumbnail purchased name description price");
      return response;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async updatePurchaseCount(courseId: string): Promise<Object | null> {
    try {
      const response = await CourseModel.findByIdAndUpdate(courseId, {
        $inc: { purchased: 1 },
      });
      return { success: true };
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async getCourseContent(courseId: string): Promise<Course | null> {
    try {
      const response = await CourseModel.findById(courseId);
      return response;
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async addQuestion(data: any): Promise<Object | null> {
    try {
      const course = await CourseModel.findById(data.courseId);
      const courseContent = course?.courseContentData?.find((item) =>
        item._id.equals(data.contentId)
      );
      courseContent?.questions.push(data.questionList);
      await course?.save();
      return { success: true };
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async addAnswer(data: any): Promise<Object | null> {
    try {
      const course = await CourseModel.findById(data.courseId);
      const courseContent = course?.courseContentData?.find((item) =>
        item._id.equals(data.contentId)
      );
      const question = courseContent?.questions.find((item: any) =>
        item._id.equals(data.questionId)
      );
      question.questionReplies.push(data.answerList);
      await course?.save();
      return { success: true };
    } catch (e: any) {
      console.log(e);
      throw new Error("DB Error");
    }
  }

  async addReview(data: any): Promise<Object | null> {
    try {
      const course = await CourseModel.findById(data.courseId);
      data.reviewList.user = { ...data.reviewList.user, _id: data.userId };
      course?.reviews?.push(data.reviewList);
      let avg = 0;
      course?.reviews?.forEach((rev: any) => {
        avg += rev.rating;
      });
      if (course && course.reviews) {
        course.ratings = avg / course.reviews.length;
      }
      await course?.save();
      return { success: true };
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async searchCourse(searchTerm: string): Promise<Course[] | null> {
    try {
      const courses = await CourseModel.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { tags: { $regex: searchTerm, $options: "i" } },
        ],
      }).select("name thumbnail description");
      return courses;
    } catch (e: any) {
      throw new Error("db error");
    }
  }

  async getUserCourses(courseIds: string[]): Promise<Course[] | null> {
    try {
      const courseObjectIds = courseIds
        .map((id: any) => {
          try {
            return new mongoose.Types.ObjectId(id.courseId);
          } catch (error) {
            console.error(`Invalid ObjectId: ${id.courseId}`);
            return null;
          }
        })
        .filter((id) => id !== null);

      const response = await CourseModel.find({
        _id: { $in: courseObjectIds },
      }).select("-courseData.videoUrl -courseData.links");
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("DB Error");
    }
  }

  async getCourseAnalytics(instructorId: any): Promise<Object[] | null> {
    try {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const matchStage: any = {
        $match: {
          createdAt: { $gte: twelveMonthsAgo },
        },
      };
      if (instructorId !== "admin") {
        matchStage.$match.instructorId = instructorId;
      }

      const response = await CourseModel.aggregate([
        matchStage,
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
      ]);

      return response || [];
    } catch (e: any) {
      throw new Error("DB Error");
    }
  }

  async blockCourse(courseId: string): Promise<object | null> {
    try {
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { isBlocked: true },
        { new: true }
      );
      return course;
    } catch (e: any) {
      throw new Error("DB error while blocking course");
    }
  }

  async unBlockCourse(courseId: string): Promise<object | null> {
    try {
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { isBlocked: false },
        { new: true }
      );
      return course;
    } catch (e: any) {
      throw new Error("DB error while unblocking course");
    }
  }
}
