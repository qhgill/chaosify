"use client";
import Image from "next/image";
import { useState } from "react";



export default function Home() {
  const [image, setImage] = useState("");

  const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setImage(url);
  };
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <p className="text-2xl font-bold">upload image</p>
      <input type="file" accept="image/*" onChange={handleUpload} className="border-3 bg-gray-200 rounded-xl p-3 cursor-pointer border-red-600"/>
      {image && <Image src={image} alt="image" className="p-10 border-2 m-10 rounded-xl border-black object-contain size-150" width={300} height={300}/>}
    </div>
  );
}
