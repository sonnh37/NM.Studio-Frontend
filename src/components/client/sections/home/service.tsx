import ErrorPage from "@/app/(client)/error/page";
import { Const } from "@/lib/const";
import { convertJsonToPlainText } from "@/lib/utils";
import { serviceService } from "@/services/service-service";
import { ServiceGetAllQuery } from "@/types/queries/service-query";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Studio {
  title: string;
  src: string;
  href: string;
}
export function Service() {
    const router = useRouter();
  const query: ServiceGetAllQuery = {
    isNotNullSlug: true,
    isDeleted: [false],
    isPagination: true,
    pageSize: 6,
    pageNumber: 1,
  };
  const { data: services = [], error } = useQuery({
    queryKey: ["fetchServices", query],
    queryFn: async () => {
      const response = await serviceService.fetchAll(query);
      return response.data?.results;
    },
  });

  if (error) {
    console.log("Error fetching:", error);
    return <ErrorPage />;
  }

  return (
    <div className="py-20 bg-neutral-100">
      <div className="flex flex-row items-center justify-center  relative w-full">
        <div className="container mx-auto w-full relative overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut"
            }}
            className="div"
          >
            <p className="text-4xl text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
              Dịch vụ
            </p>
            {/* <p className="text-start sp text-base md:text-md font-[100] text-neutral-700 dark:text-neutral-200 mt-2">
              THÀNH LẬP VÀO NĂM 2017, TONY WEDDING ĐÃ PHỤC VỤ HƠN 30.000 CẶP ĐÔI
              VÀ TRỞ THÀNH THƯƠNG HIỆU HÀNG ĐẦU VỀ CHỤP ẢNH CƯỚI TPHCM VÀ CÁC
              TỈNH LÂN CẬN VỚI 10 CHI NHÁNH. TONY WEDDING LUÔN TỰ HÀO MANG ĐẾN
              CHO BẠN SỰ TIN TƯỞNG BẰNG TRẢI NGHIỆM DỊCH VỤ CƯỚI TỐT NHẤT VỚI
              CHI PHÍ ĐÁM CƯỚI VỪA PHẢI.
            </p> */}
          </motion.div>
          <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {services.map((ser) => (
              <div className="relative bg-white rounded-xl hover:shadow-lg">
                <div className="overflow-hidden rounded-xl">
                  <motion.div
                    className=""
                    whileHover={{ scale: 1.1 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Link href={"/services/"+ser.slug}>
                      <Image
                        className="aspect-square w-full bg-gray-200 rounded-xl object-cover lg:aspect-auto size-1/2"
                        alt={""}
                        src={ser.src ? ser.src : "/image-notfound.jpg"}
                        width={9999}
                        height={9999}
                      />
                    </Link>
                  </motion.div>
                </div>
                <div className="m-4 flex flex-col gap-1 justify-between">
                  <p className="text-lg font-medium w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                    <Link href={"/services/"+ser.slug}>
                    {ser.name}
                    </Link>
                  </p>
                  <hr className="border-t border-neutral-300 my-1" />{" "}
                  <p className="text-sm line-clamp-2 w-full text-start relative z-20 bg-clip-text text-transparent bg-neutral-600 py-0">
                  {ser.description
                        ? convertJsonToPlainText(ser.description)
                        : "N/A"}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
          {/* <div className="flex pt-5 justify-center">
            <button
              onClick={() => router.push(Const.SERVICE)}
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            >
              Xem thêm
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
