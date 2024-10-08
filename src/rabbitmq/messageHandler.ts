import { CourseController } from "../controller/courseController";
import { CourseRepository } from "../repository/course.repository";
import { CourseService } from "../services/course.service";
import rabbitClient from "./client";

const courseRepository = new CourseRepository();
const service = new CourseService(courseRepository);
const controller = new CourseController(service);

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log("The operation in course is", operation, data);

    switch (operation) {
      case "create-course":
        response = await controller.createCourse.bind(controller)(data);
        break;

      case "get-courses":
        response = await controller.getCourses.bind(controller)(data);
        break;

      case "update-course":
        response = await controller.updateCourse.bind(controller)(data);
        break;

      case "delete-course":
        response = await controller.deleteCourse.bind(controller)(data);
        break;

      case "get-course-wop":
        response = await controller.getCourseWop.bind(controller)(data);
        break;

      case "get-all-courses":
        response = await controller.getAllCourses.bind(controller)();
        break;

      case "get-trending-courses":
        response = await controller.getTrendingCourses.bind(controller)();
        break;

      case "update-purchase-count":
        response = await controller.updatePurchaseCount.bind(controller)(data);
        break;

      case "get-course-content":
        response = await controller.getCourseContent.bind(controller)(data);
        break;

      case "add-question":
        response = await controller.addQuestion.bind(controller)(data);
        break;

      case "add-answer":
        response = await controller.addAnswer.bind(controller)(data);
        break;

      case "add-review":
        response = await controller.addReview.bind(controller)(data);
        break;

      case "edit-review":
        response = await controller.editReview.bind(controller)(data);
        break;

      case "search-courses":
        response = await controller.searchCourses.bind(controller)(data);
        break;

      case "get-user-courses":
        response = await controller.getUserCourses.bind(controller)(data);
        break;

      case "course-analytics":
        response = await controller.getCourseAnalytics.bind(controller)(data);
        break;

      case "block-course":
        response = await controller.blockCourse.bind(controller)(data.id);
        break;

      case "un-block-course":
        response = await controller.unBlockCourse.bind(controller)(data.id);
        break;

      default:
        response = "Request-key notfound";
        break;
    }

    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
