import { Constants } from "@/lib/constants/constants";
import { HomeSlide } from "@/types/entities/home-slide";
import { BaseService } from "./base/base-service";

class HomeSlideService extends BaseService<HomeSlide> {
  constructor() {
    super(`${Constants.HOME_SLIDES}`);
  }
  // async deletePermanently(
  //   command: HomeSlideDeleteCommand
  // ): Promise<BusinessResult<null>> {
  //   const data = await this.getById(command.id);
  //   const filePath = data.data?.background;

  //   const response = await super.delete(command);
  //   if (response.status === 1 && filePath) {
  //     await this.deleteImage(filePath);
  //   }

  //   return response;
  // }
}

export const homeSlideService = new HomeSlideService();
