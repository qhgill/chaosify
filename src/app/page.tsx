"use client";
import { useState } from "react";
import Settings from "@/components/settings";
import Title from "@/components/title";
import ImageBox from "@/components/imagebox";
import Footer from "@/components/footer";
import Compressor from "compressorjs";

export default function Home() {
  const [image, setImage] = useState("");
  const [chaosifiedImage, setChaosifiedImage] = useState("");
  const [file, setFile] = useState<File | Blob | null>(null);
  const [grain, setGrain] = useState([100]);
  const [contrast, setContrast] = useState([2]);
  const [brightness, setBrightness] = useState([0.5]);
  const [sharpness, setSharpness] = useState([0.1]);
  const [saturation, setSaturation] = useState([0.9]);
  const [quality, setQuality] = useState([8]);
  const [status, setStatus] = useState<
    "" | "uploading" | "chaosifying" | "uploaderror" | "chaosifyerror"
  >("");
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      setStatus("uploading");
      let file: Blob = e.target.files[0];

      new Compressor(file, {
        quality: 0.9,
        maxWidth: 2000,
        maxHeight: 2000,
        success(compressedImg) {
          file = compressedImg;
        },
      });
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
    } catch (error) {
      console.error("Uploading error: ", error);
      setStatus("uploaderror");
    }
  };

  const handleChaosify = async () => {
    if (!file) return;
    try {
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
    } catch (error) {
      console.error("Chaosify error: ", error);
      setStatus("chaosifyerror");
    }
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
