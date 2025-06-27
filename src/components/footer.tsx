"use client";
import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="absolute bottom-0 mt-5 flex w-full flex-col items-center justify-center bg-black p-4">
      <motion.div
        transition={{
          duration: 0.4,
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 0.9 }}
      >
        <Link href="https://github.com/qhgill/chaosify" target="_blank">
          <FaGithub className="text-4xl text-white transition-colors duration-400 ease-out hover:text-red-600" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Footer;
