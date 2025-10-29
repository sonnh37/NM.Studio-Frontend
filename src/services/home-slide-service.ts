import { Const } from "@/lib/constants/const";
import { HomeSlide } from "@/types/entities/home-slide";
import { BaseService } from "./base/base-service";

class HomeSlideService extends BaseService<HomeSlide> {
  constructor() {
    super(`${Const.HOME_SLIDES}`);
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
