import { motion } from "motion/react";
import Image from "next/image";
import { VscLoading } from "react-icons/vsc";

interface ImageBoxProps {
  status: "" | "uploading" | "chaosifying";
  image: string;
  chaosifiedImage: string;
}

const ImageBox = ({ status, image, chaosifiedImage }: ImageBoxProps) => {
  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.4,
      }}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative flex aspect-square w-10/12 items-center justify-center rounded-xl border-3 border-white bg-white/20 md:w-2/5"
    >
      {status && (
        <motion.div
          transition={{
            duration: 0.4,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute z-10 flex h-full w-full flex-col items-center justify-center bg-white/20"
        >
          <motion.div
            whileInView={{ rotate: 360 }}
            transition={{ repeat: Infinity }}
          >
            <VscLoading className="text-2xl" />
          </motion.div>
          <p className="font-title text-center text-2xl text-white">
            {status === "uploading" && "Uploading image..."}
            {status === "chaosifying" && "Chaosifying..."}
          </p>
        </motion.div>
      )}
      {!image && !status && (
        <div className="flex aspect-square items-center justify-center rounded-xl">
          <p>Upload an Image</p>
        </div>
      )}
      {image && !chaosifiedImage && (
        <motion.div
          transition={{
            duration: 0.4,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image
            src={image}
            alt="image"
            className="aspect-square h-full w-full rounded-lg object-contain"
            fill
          />
        </motion.div>
      )}
      {chaosifiedImage && (
        <motion.div
          transition={{
            duration: 0.4,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image
            src={chaosifiedImage}
            alt="chaosified image"
            className="aspect-square h-full w-full rounded-lg object-contain"
            fill
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageBox;
