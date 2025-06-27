import { Dispatch, SetStateAction } from "react";
import { Slider } from "@/components/ui/slider";

interface SliderProps {
  label: string;
  minimum: number;
  maximum: number;
  defaultVal: number;
  step: number;
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
}

const LabelledSlider = ({
  label,
  minimum,
  maximum,
  defaultVal,
  step,
  value,
  setValue,
}: SliderProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <p className="text-2xl">
        {" "}
        {label}: {value}{" "}
      </p>
      <div className="flex w-full flex-row justify-center gap-x-3">
        <p>{minimum}</p>
        <Slider
          defaultValue={[defaultVal]}
          min={minimum}
          max={maximum}
          step={step}
          className="w-1/2"
          onValueChange={(val) => setValue(val)}
        />
        <p>{maximum}</p>
      </div>
    </div>
  );
};

export default LabelledSlider;
