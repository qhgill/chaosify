"use client";
import { useState } from "react";
import Settings from "@/components/settings";
import Title from "@/components/title";
import ImageBox from "@/components/imagebox";
import Footer from "@/components/footer";

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
      <Title />
      <div className="font-body flex w-10/12 flex-col items-center justify-center lg:flex-row">
        <Settings
          image={image}
          chaosifiedImage={chaosifiedImage}
          grain={grain}
          brightness={brightness}
          contrast={contrast}
          quality={quality}
          sharpness={sharpness}
          saturation={saturation}
          setGrain={setGrain}
          setBrightness={setBrightness}
          setContrast={setContrast}
          setQuality={setQuality}
          setSharpness={setSharpness}
          setSaturation={setSaturation}
          handleUpload={handleUpload}
          handleDownload={handleDownload}
          handleChaosify={handleChaosify}
        />
        <ImageBox
          status={status}
          chaosifiedImage={chaosifiedImage}
          image={image}
        />
      </div>
      <Footer />
    </div>
  );
}
