import { connectDB } from "./config/mongodb.config";
import RabbitMQClient from "./rabbitmq/client";

class App {
  constructor() {
    RabbitMQClient.initialize();
    connectDB();
  }
}

export default App;
