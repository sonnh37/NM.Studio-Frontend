import { BaseEntity } from "./base/base";
import { ServiceBooking } from "@/types/entities/service-booking";

export interface Service extends BaseEntity {
  name?: string;
  slug?: string;
  description?: string;
  src?: string;
  price?: number;
  category?: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  imageUrl?: string;
  shortDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  termsAndConditions?: string;
  maxBookingsPerDay?: number;
  bookings: ServiceBooking[];
}
