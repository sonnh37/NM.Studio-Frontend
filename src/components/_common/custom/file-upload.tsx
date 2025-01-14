import {cn} from "@/lib/utils";
import React, {useRef, useState} from "react";
import {motion} from "framer-motion";
import {IconUpload} from "@tabler/icons-react";
import {useDropzone} from "react-dropzone";
import {Button} from "../../ui/button";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({
                               onChange,
                           }: {
    onChange?: (file: File | null) => void; // Update onChange to handle single file
}) => {
    const [file, setFile] = useState<File | null>(null); // State for one file
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFile: File[]) => {

        if (newFile.length > 0 && newFile[0].type.startsWith("image/")) {

            setFile(newFile[0]); // Set the first file
            onChange && onChange(newFile[0]); // Call the callback with the selected file
        } else {
            console.log("Please upload a valid image file.");
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFile(null); // Remove the file
        onChange && onChange(null); // Call onChange with null to notify the parent component
    };

    const {getRootProps, isDragActive} = useDropzone({
        multiple: false,
        accept: {
            "image/jpeg": [], // Cho phép file JPEG
            "image/png": [], // Cho phép file PNG
            "image/webp": [], // Cho phép file WebP
            "image/bmp": [], // Cho phép file BMP
            "image/tiff": [], // Cho phép file TIFF
        },
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                whileHover="animate"
                className="p-10 group/file block rounded-lg w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                        Upload file
                    </p>
                    <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                        Drag or drop your files here or click to upload
                    </p>
                    <div className="relative w-full mt-10 max-w-xl mx-auto">
                        {file && ( // Show the file preview if there's a selected file
                            <motion.div
                                key={file.name}
                                layoutId="file-upload"
                                className={cn(
                                    "relative overflow-hidden  bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                    "shadow-sm"
                                )}
                            >
                                <div className="flex justify-between w-full items-center gap-4">
                                    <motion.p
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        layout
                                        className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                    >
                                        {file.name}
                                    </motion.p>
                                    <motion.p
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        layout
                                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                    >
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </motion.p>
                                </div>

                                <div
                                    className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                    <motion.p
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        layout
                                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                    >
                                        {file.type}
                                    </motion.p>

                                    <motion.p
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        layout
                                    >
                                        modified {new Date(file.lastModified).toLocaleDateString()}
                                    </motion.p>
                                </div>

                                <div
                                    className="pointer-events-auto absolute inset-0 z-10 flex items-center justify-center gap-1 bg-white/50 opacity-0 hover:opacity-100 dark:bg-black/50">
                                    <Button onClick={() => handleRemoveFile()}>X</Button>
                                </div>
                            </motion.div>
                        )}
                        {!file && (
                            <motion.div
                                layoutId="file-upload"
                                variants={mainVariant}

                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    "relative cursor-pointer group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                                )}
                                onClick={handleClick}
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        className="text-neutral-600 flex flex-col items-center"
                                    >
                                        Drop it
                                        <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400"/>
                                    </motion.p>
                                ) : (
                                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300"/>
                                )}
                            </motion.div>
                        )}

                        {!file && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div
            className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({length: rows}).map((_, row) =>
                Array.from({length: columns}).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                                index % 2 === 0
                                    ? "bg-gray-50 dark:bg-neutral-950"
                                    : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                            }`}
                        />
                    );
                })
            )}
        </div>
    );
}
