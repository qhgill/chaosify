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
    <div className="flex w-full flex-col items-center justify-center">
      <p className="font-title my-10 text-8xl">CHAOSIFY</p>
      <div className="flex w-10/12 flex-row items-center justify-center">
        <div className="flex w-1/2 flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="m-3 cursor-pointer rounded-xl border-3 border-black bg-gray-200 p-3"
          />
          {image && (
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

        <div className="flex size-170 items-center justify-center">
          {!image && (
            <div className="flex aspect-square size-150 items-center justify-center rounded-xl border-2 border-black">
              <p>upload an image!</p>
            </div>
          )}
          {image && !chaosifiedImage && (
            <Image
              src={image}
              alt="image"
              className="aspect-square size-150 rounded-xl border-2 border-black object-contain"
              width={300}
              height={300}
            />
          )}
          {chaosifiedImage && (
            <Image
              src={chaosifiedImage}
              alt="chaosified image"
              className="aspect-square size-150 rounded-xl border-2 border-black object-contain"
              width={300}
              height={300}
            />
          )}
        </div>
      </div>
    </div>
  );
}
