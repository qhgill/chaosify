"use client";
import Image from "next/image";
import { useState } from "react";
import Sliders from "@/components/sliders";

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
    <div className="flex w-screen flex-col items-center justify-center">
      <p className="text-4xl font-bold">CHAOSIFY</p>
      <div className="flex w-full flex-row items-center justify-center">
        <div className="m-10 size-170 rounded-xl border-2 border-black p-10">
          {image && (
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt="image"
                className="size-150 rounded-xl object-contain"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        <div className="m-10 size-170 rounded-xl border-2 border-black p-10">
          {chaosifiedImage && (
            <div className="flex items-center justify-center">
              <Image
                src={chaosifiedImage}
                alt="chaosified image"
                className="size-150 rounded-xl object-contain"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="m-3 cursor-pointer rounded-xl border-3 border-red-600 bg-gray-200 p-3"
      />
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
      {!image && !chaosifiedImage && (
        <button
          disabled={true}
          className="cursor-not-allowed rounded-2xl border-1 border-black p-2"
        >
          UPLOAD IMAGE FIRST
        </button>
      )}
      {image && !chaosifiedImage && (
        <button
          onClick={handleChaosify}
          className="cursor-pointer rounded-2xl border-1 border-black p-2"
        >
          CHAOSIFY
        </button>
      )}
      {chaosifiedImage && (
        <button
          onClick={handleDownload}
          className="cursor-pointer rounded-2xl border-1 border-black p-2"
        >
          DOWNLOAD
        </button>
      )}
    </div>
  );
}
