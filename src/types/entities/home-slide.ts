import { BaseEntity } from "./base/base";
import { MediaBase } from "./media-base";

export interface HomeSlide extends BaseEntity {
  slideId: string;
  displayOrder: number;
  startDate?: string;
  endDate?: string;
  slide?: MediaBase;
}
