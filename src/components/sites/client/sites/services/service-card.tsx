import { convertHtmlToPlainText } from "@/lib/utils";
import { Service } from "@/types/entities/service";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="relative bg-white pb-10 rounded-none hover:shadow-lg">
      <div className="overflow-hidden rounded-none">
        <a href={`/services/${service.slug}`}>
          <img
            className="aspect-square h-[300px] w-full bg-gray-200 rounded-none object-cover lg:aspect-auto"
            alt={service.name ?? ""}
            src={service.thumbnail?.mediaUrl ? service.thumbnail.mediaUrl : "/image-notfound.png"}
          />
        </a>
      </div>
      <div className="m-4 flex flex-col gap-1 justify-between">
        <p className="text-lg font-medium w-full text-start">
          <a href={`/services/${service.slug}`}>{service.name}</a>
        </p>
        <hr className="border-t border-neutral-300 my-1" />
        <p className="text-sm line-clamp-2 w-full text-start">
          {service.description
            ? convertHtmlToPlainText(service.description)
            : "N/A"}
        </p>
      </div>
    </div>
  );
};
