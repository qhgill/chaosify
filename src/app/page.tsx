"use client";
import Image from "next/image";
import { useState } from "react";
import Sliders from "@/components/sliders";
import { motion } from "motion/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [status, setStatus] = useState<"" | "uploading" | "chaosifying">("");
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setStatus("uploading");
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
    setStatus("");
  };

  const handleChaosify = async () => {
    if (!file) return;
    setStatus("chaosifying");
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
    setStatus("");
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
        className="font-title my-10 text-4xl md:text-8xl"
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
          className="flex w-10/12 flex-col items-center md:w-1/2"
        >
          <div className="flex flex-row justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="m-3 w-full cursor-pointer rounded-xl border-3 border-white bg-white/20 p-3 transition-colors duration-400 ease-out hover:bg-white/40 md:w-auto"
            />
            <Popover>
              <PopoverTrigger className="font-title m-3 aspect-square cursor-pointer rounded-xl border-3 border-white bg-white/20 px-3 text-2xl transition-colors duration-400 ease-out hover:bg-white/40">
                ?
              </PopoverTrigger>
              <PopoverContent className="font-body rounded-xl border-3 border-white bg-neutral-800 text-white">
                Click the upload image button to add an image from your device
                to the website. adjust the settings using the sliders shown
                after uploading your image. press &quot;chaosify&quot; and wait
                for the website to process your image. Once processed, press
                &quot;download&quot; to download the image onto your device.
              </PopoverContent>
            </Popover>
          </div>

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
          className="relative flex aspect-square w-10/12 items-center justify-center rounded-xl border-3 border-white bg-white/20 md:w-2/5"
        >
          {status && (
            <motion.div
              transition={{
                duration: 0.4,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute z-10 flex h-full w-full items-center justify-center bg-white/20"
            >
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
      </div>
    </div>
  );
}
