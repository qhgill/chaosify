"use client";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center bg-black p-4 md:absolute md:bottom-0">
      <motion.div
        transition={{
          duration: 0.4,
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 0.9 }}
      >
        <Link href="https://github.com/qhgill/chaosify" target="_blank">
          <FaGithub className="text-2xl text-white transition-colors duration-400 ease-out hover:text-red-600 md:text-4xl" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Footer;
