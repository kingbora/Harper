import PageController, { withController } from "@cus/business/dist/controller";

export class IndexController extends PageController {
  markIt() {
    console.log(123);
  }
}

export default withController(IndexController);
