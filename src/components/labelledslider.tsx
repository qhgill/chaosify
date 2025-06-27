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
      <p className="mb-2 text-xl">
        {label}: {value}
      </p>
      <div className="grid w-full grid-cols-6 items-center justify-center">
        <p className="text-center">{minimum}</p>
        <Slider
          defaultValue={[defaultVal]}
          min={minimum}
          max={maximum}
          step={step}
          className="col-span-4 cursor-pointer"
          onValueChange={(val) => setValue(val)}
        />
        <p className="text-center">{maximum}</p>
      </div>
    </div>
  );
};

export default LabelledSlider;
