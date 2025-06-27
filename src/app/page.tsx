"use client";
import Image from "next/image";
import { useState } from "react";
import Sliders from "@/components/sliders";
import { motion } from "motion/react";

export default function Home() {
  const [image, setImage] = useState("");
  const [chaosifiedImage, setChaosifiedImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [grain, setGrain] = useState([100]);
  const [contrast, setContrast] = useState([2]);
  const [brightness, setBrightness] = useState([0.5]);
  const [sharpness, setSharpness] = useState([0.1]);
  const [saturation, setSaturation] = useState([0.9]);
  const [quality, setQuality] = useState([8]);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setFile(file);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setImage(url);
    setChaosifiedImage("");
  };

  const handleChaosify = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `/api/chaosify?contrast=${contrast}&sharpness=${sharpness}&brightness=${brightness}&saturation=${saturation}&quality=${quality}&noise=${grain}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setChaosifiedImage(url);
  };

  const handleDownload = async () => {
    if (!chaosifiedImage) return;
    const link = document.createElement("a");
    link.href = chaosifiedImage;
    link.download = "chaosified.jpg";
    link.click();
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <motion.div
        transition={{
          duration: 0.4,
        }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-title my-10 text-8xl"
      >
        CHAOSIFY
      </motion.div>
      <div className="font-body flex w-10/12 flex-col items-center justify-center md:flex-row">
        <motion.div
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex w-1/2 flex-col items-center"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="m- cursor-pointer rounded-xl border-3 border-white bg-white/20 p-3 transition-colors duration-400 ease-out hover:bg-white/40"
          />
          {image && (
            <motion.div
              transition={{
                duration: 0.4,
              }}
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: "auto" }}
              viewport={{ once: true }}
              className="flex w-full flex-col items-center"
            >
              <Sliders
                grain={grain}
                setGrain={setGrain}
                brightness={brightness}
                setBrightness={setBrightness}
                sharpness={sharpness}
                setSharpness={setSharpness}
                contrast={contrast}
                setContrast={setContrast}
                saturation={saturation}
                setSaturation={setSaturation}
                quality={quality}
                setQuality={setQuality}
              />
              {image && !chaosifiedImage && (
                <motion.div
                  transition={{
                    duration: 0.4,
                  }}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={handleChaosify}
                    className="m-2 cursor-pointer rounded-2xl border-3 border-white bg-white/20 p-2 text-xl transition-colors duration-400 ease-out hover:border-red-500 hover:bg-black hover:text-red-500"
                  >
                    CHAOSIFY
                  </button>
                </motion.div>
              )}
              {chaosifiedImage && (
                <motion.div
                  transition={{
                    duration: 0.4,
                  }}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={handleDownload}
                    className="m-2 cursor-pointer rounded-2xl border-3 border-white bg-white/20 p-2 text-xl transition-colors duration-400 ease-out hover:border-green-300 hover:bg-white/40 hover:text-green-300"
                  >
                    DOWNLOAD
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative flex aspect-square w-2/5 items-center justify-center rounded-xl border-3 border-white bg-white/20"
        >
          {!image && (
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
      </div>
    </div>
  );
}
