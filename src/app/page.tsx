"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [chaosifiedImage, setChaosifiedImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
    const res = await fetch("/api/chaosify", {
      method: "POST",
      body: formData,
    });

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
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <p className="text-4xl font-bold">CHAOSIFY</p>
      <div className="flex flex-row w-full items-center justify-center">
        <div className="p-10 border-2 m-10 rounded-xl border-black size-170">
          {image && (
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt="image"
                className="rounded-xl object-contain size-150"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        <div className="p-10 border-2 m-10 rounded-xl border-black size-170">
          {chaosifiedImage && (
            <div className="flex items-center justify-center">
              <Image
                src={chaosifiedImage}
                alt="chaosified image"
                className="rounded-xl object-contain size-150"
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
        className="m-3 border-3 bg-gray-200 rounded-xl p-3 cursor-pointer border-red-600"
      />
      {!image && !chaosifiedImage && (
        <button
          disabled={true}
          className="border-1 border-black rounded-2xl p-2 cursor-not-allowed"
        >
          {" "}
          CHAOSIFY{" "}
        </button>
      )}
      {image && !chaosifiedImage && (
        <button
          onClick={handleChaosify}
          className="border-1 border-black rounded-2xl p-2 cursor-pointer"
        >
          {" "}
          CHAOSIFY
        </button>
      )}
      {chaosifiedImage && (
        <button
          onClick={handleDownload}
          className="border-1 border-black rounded-2xl p-2 cursor-pointer"
        >
          {" "}
          DOWNLOAD{" "}
        </button>
      )}
    </div>
  );
}
