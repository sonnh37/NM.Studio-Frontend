import {motion, Variants} from "framer-motion";

const BarLoader = () => {
    return (
        <div className="grid place-content-center px-4 py-24">
            <Loader/>
        </div>
    );
};

const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 0,
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 0.5,
            ease: "circIn",
        },
    },
} as Variants;

const Loader = () => {
    return (
        <motion.div
            transition={{
                staggerChildren: 0.1,
            }}
            initial="initial"
            animate="animate"
            className="flex gap-1"
        >
            <motion.div variants={variants} className="h-12 w-1 bg-black dark:bg-white"/>
            <motion.div variants={variants} className="h-12 w-1 bg-black dark:bg-white"/>
            <motion.div variants={variants} className="h-12 w-1 bg-black dark:bg-white"/>
            <motion.div variants={variants} className="h-12 w-1 bg-black dark:bg-white"/>
            <motion.div variants={variants} className="h-12 w-1 bg-black dark:bg-white"/>
        </motion.div>
    );
};

export default BarLoader;