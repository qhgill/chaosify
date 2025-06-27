import LabelledSlider from "@/components/labelledslider";
import { Dispatch, SetStateAction } from "react";
interface SlidersProps {
  grain: number[];
  setGrain: Dispatch<SetStateAction<number[]>>;
  brightness: number[];
  setBrightness: Dispatch<SetStateAction<number[]>>;
  sharpness: number[];
  setSharpness: Dispatch<SetStateAction<number[]>>;
  contrast: number[];
  setContrast: Dispatch<SetStateAction<number[]>>;
  saturation: number[];
  setSaturation: Dispatch<SetStateAction<number[]>>;
  quality: number[];
  setQuality: Dispatch<SetStateAction<number[]>>;
}

const Sliders = ({
  grain,
  setGrain,
  brightness,
  setBrightness,
  sharpness,
  setSharpness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  quality,
  setQuality,
}: SlidersProps) => {
  return (
    <div className="my-8 flex w-full flex-col items-center justify-center gap-5">
      <LabelledSlider
        label="Grain"
        minimum={0}
        maximum={200}
        defaultVal={100}
        step={10}
        value={grain}
        setValue={setGrain}
      />
      <LabelledSlider
        label="Brightness"
        minimum={0.1}
        maximum={1.0}
        defaultVal={0.5}
        step={0.1}
        value={brightness}
        setValue={setBrightness}
      />
      <LabelledSlider
        label="Sharpness"
        minimum={0.1}
        maximum={1.0}
        defaultVal={0.1}
        step={0.1}
        value={sharpness}
        setValue={setSharpness}
      />
      <LabelledSlider
        label="Contrast"
        minimum={0.1}
        maximum={3.0}
        defaultVal={2.0}
        step={0.1}
        value={contrast}
        setValue={setContrast}
      />
      <LabelledSlider
        label="Saturation"
        minimum={0.1}
        maximum={1.5}
        defaultVal={0.9}
        step={0.1}
        value={saturation}
        setValue={setSaturation}
      />
      <LabelledSlider
        label="Compression Quality"
        minimum={1}
        maximum={100}
        defaultVal={8}
        step={1}
        value={quality}
        setValue={setQuality}
      />
    </div>
  );
};

export default Sliders;
