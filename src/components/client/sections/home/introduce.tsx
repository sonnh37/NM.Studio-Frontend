"use client";
import {motion} from "framer-motion";
import Image from "next/image";

const steps = [
    {
        title: "BƯỚC 1",
        description:
            "Đăng ký dịch vụ chụp ảnh cưới bằng cách điền thông tin vào form bên dưới.",
        imageSrc:
            "https://tonywedding.vn/wp-content/uploads/2024/01/Combo-tiet-kiem.png", // Update with actual image paths
        altText: "Bước 1",
    },
    {
        title: "BƯỚC 2",
        description:
            "Đến trực tiếp studio để xem sản phẩm, chọn ngày chụp, ký hợp đồng và chọn ngày thử trang phục.",
        imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/Korean.png",
        altText: "Bước 2",
    },
    {
        title: "BƯỚC 3",
        description:
            "Trang điểm & chụp ảnh cưới, quay video cưới và chọn ảnh sau khi chụp.",
        imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/PT.png",
        altText: "Bước 3",
    },
    {
        title: "BƯỚC 4",
        description:
            "Nhận file ảnh đã chỉnh sửa & duyệt in album để nhận sản phẩm cuối cùng.",
        imageSrc: "https://tonywedding.vn/wp-content/uploads/2024/01/NCSG.png",
        altText: "Bước 4",
    },
];

export default function Introduce() {
    return (
        <div
            className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center backdrop-blur-sm">
            <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center dark:bg-black bg-white opacity-50"></div>
            <div className="container mx-auto py-10 z-10 ">

                <h2 className="text-center text-4xl relative z-20 tracking-wide uppercase text-neutral-700 py-8">
                    CHỤP ẢNH CƯỚI TẠI NHUMY STUDIO NHƯ THẾ NÀO?
                </h2>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-4 text-center">
                    {steps.map((step, index) => (
                        <div
                            className="flex flex-col items-center justify-between space-y-10 h-full"
                            key={index}
                        >
                            <div>
                                <p className="text-xl text-neutral-700 mb-4">{step.title}</p>
                                <p className="text-neutral-500 dark:text-neutral-200">{step.description}</p>
                            </div>
                            <div className="overflow-hidden rounded-full">
                                {" "}
                                {/* Thay đổi kích thước nếu cần */}
                                <motion.div
                                    className="flex items-center justify-center w-full h-full"
                                    whileHover={{scale: 1.1}} // Tạo hiệu ứng zoom
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Image
                                        src={step.imageSrc}
                                        alt={step.altText}
                                        width={250}
                                        height={250}
                                        className="rounded-full"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// import React, { useEffect, useState } from "react";
// import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
// import { Service } from "@/types/service";
// import axios from "axios";
// import { ContentState, convertFromRaw, EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// export interface CardToMapService {
//   category: string,
//   title: string,
//   src: string,
//   content: React.JSX.Element,
//   description: string,
// }

// export function Features() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [cards_, setCards] = useState<CardToMapService[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://localhost:7192/service-management/services');
//         const services: Service[] = response.data.results;

//         setServices(services);

//         const cardToMapServices = services.map(service => {
//           let contentState;

//           try {
//             // Attempt to parse description as JSON
//             contentState = service.description
//               ? convertFromRaw(JSON.parse(service.description))
//               : ContentState.createFromText('');
//           } catch (error) {
//             // Fallback to plain text if description is not valid JSON
//             contentState = ContentState.createFromText(service.description || '');
//           }

//           // Create editor state for each service
//           const editorState = EditorState.createWithContent(contentState);

//           return {
//             category: service.type || '',
//             title: service.title || '',
//             src: service.src || '',
//             content: (
//               <div>
//                 <Editor
//                   editorState={editorState}
//                   readOnly={true}
//                   toolbarHidden
//                 />
//               </div>
//             ),
//             description: service.description || ''
//           } as CardToMapService;
//         });

//         setCards(cardToMapServices);

//       } catch (error) {
//         console.error('Failed to fetch services:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   const cards = cards_.map((card, index) => (
//     <Card key={card.src} card={card} index={index} />
//   ));

//   return (
//     <div className="w-full h-full">
//       <h2 className="container pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
//         Hãy đến với các dịch vụ của chúng tôi.
//       </h2>
//       <Carousel items={cards} />
//     </div>
//   );
// }
