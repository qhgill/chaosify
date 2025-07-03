import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Sliders from "@/components/sliders";
interface SettingsProps {
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleChaosify: () => Promise<void>;
  handleDownload: () => Promise<void>;
  image: string;
  chaosifiedImage: string;
  grain: number[];
  brightness: number[];
  sharpness: number[];
  saturation: number[];
  contrast: number[];
  quality: number[];
  setGrain: Dispatch<SetStateAction<number[]>>;
  setBrightness: Dispatch<SetStateAction<number[]>>;
  setSharpness: Dispatch<SetStateAction<number[]>>;
  setSaturation: Dispatch<SetStateAction<number[]>>;
  setContrast: Dispatch<SetStateAction<number[]>>;
  setQuality: Dispatch<SetStateAction<number[]>>;
}

const Settings = ({
  handleUpload,
  handleChaosify,
  handleDownload,
  image,
  chaosifiedImage,
  grain,
  setGrain,
  brightness,
  setBrightness,
  sharpness,
  setSharpness,
  saturation,
  setSaturation,
  contrast,
  setContrast,
  quality,
  setQuality,
}: SettingsProps) => {
  return (
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
            Click the upload image button to add an image from your device to
            the website. adjust the settings using the sliders shown after
            uploading your image. press &quot;chaosify&quot; and wait for the
            website to process your image. Once processed, press
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
          <div className="flex flex-row items-center justify-center">
            {image && (
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
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Settings;
