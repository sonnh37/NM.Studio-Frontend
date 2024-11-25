"use client"
import Footer from "@/components/client/layouts/footer";
import Map from "@/components/client/layouts/map";
import Contact from "@/components/client/sections/home/contact";
import React from "react";
import BreadcrumbClient from "@/components/client/layouts/navbar/breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import dynamic from "next/dynamic";
import {IoCameraOutline} from "react-icons/io5";
import {BsTelephone} from "react-icons/bs";
import {SiZalo} from "react-icons/si";
import {LiaFacebookMessenger} from "react-icons/lia";

// Dynamically load SideHeader without SSR
const SiteHeader = dynamic(() => import('@/components/client/layouts/navbar/site-header'), {
    ssr: false
});

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.chat.isOpen);

    return (
        <>
            <div className="">
                <SiteHeader user={null}/>
                <BreadcrumbClient/>
                {children}
                <Map/>
                <Contact/>
                <Footer/>
            </div>
            {/* Popup Chat Component */
            }
            {
                isOpen && (
                    <div className="fixed w-[60px] bottom-[40px] right-[24px] z-[99999] hide">
                        <div
                            className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
                            <a href="#register-popup" className="btn-gallery" target="_blank">
                                <IoCameraOutline className="text-[#FFF] text-[40px]"/>
                            </a>
                        </div>
                        <div
                            className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
                            <a href="tel:0935538855" className="btn-gallery" target="_blank">
                                <BsTelephone className="text-[#FFF] text-[30px]"/>
                            </a>
                        </div>
                        <div
                            className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
                            <a href="https://zalo.me/0935538855" className="btn-gallery" target="_blank">
                                <SiZalo className="text-[#FFF] text-[40px]"/>
                            </a>
                        </div>
                        <div
                            className="bg-neutral-700 rounded-[50px] text-[30px] my-[5px] size-[50px] flex items-center justify-center">
                            <a href="https://m.me/tonyweddingphoto" className="btn-gallery" target="_blank">
                                <LiaFacebookMessenger className="text-[#FFF] text-[40px]"/>
                            </a>
                        </div>
                    </div>
                    // <div
                    //     className="fixed bottom-8 right-8 bg-white p-6 rounded-lg shadow-lg z-[9999] flex flex-col items-center space-y-4 transition-all transform"
                    //     style={{
                    //         animation: 'slideUp 0.5s ease-in-out',
                    //     }}
                    // >
                    //     <div className="flex flex-col justify-center text-center space-x-4">
                    //         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    //             <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    //                 IG
                    //             </div>
                    //         </a>
                    //
                    //         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    //             <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    //                 FB
                    //             </div>
                    //         </a>
                    //
                    //         <a href="tel:+1234567890">
                    //             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                    //                 ☎️
                    //             </div>
                    //         </a>
                    //
                    //         <a href="/contact">
                    //             <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                    //                 ✉️
                    //             </div>
                    //         </a>
                    //     </div>
                    // </div>
                )
            }
        </>

    )
        ;
}
