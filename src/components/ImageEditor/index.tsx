import { DEFAULT_OPTIONS } from "@/utils/constants";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Slider from "./RangeSlider";
import SidebarItem from "./SidebarItem";

type ImageEditorProps = {
  url: string;
  file: File;
  fileMode: string;
  downloadFlag: boolean;
  setDownload: (value: boolean) => void;
};

type Option = {
  name: string;
  property: string;
  value: number;
  unit: string;
  range: {
    min: number;
    max: number;
  };
};

type ImageProperties = {
  width: number;
  height: number;
};

export default function ImageEditor({
  url,
  file,
  fileMode,
  downloadFlag,
  setDownload,
}: ImageEditorProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>(DEFAULT_OPTIONS);
  const [filename, setFileName] = useState<string>("");
  const [imgProperties, setImaProperties] = useState<ImageProperties>({
    width: 0,
    height: 0,
  });
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const selectedOption = options[selectedOptionIndex];

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: Number(target.value) };
      });
    });
  };

  const resetImage = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  const getImageStyle = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  };

  const setImageToCanvas = () => {
    fileMode === "url" ? urlImageToCanvas() : loadedImageToCanvas();
  };

  useEffect(setImageToCanvas, [url, file, fileMode]);

  const loadedImageToCanvas = () => {
    const canvas = canvasEl.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let img = new Image();
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
      "load",
      () => {
        if (typeof reader.result === "string") {
          img.src = reader.result;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            setImaProperties({ width: img.width, height: img.height });
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute("data-caman-id");
          };
        }
      },
      false
    );
  };

  const urlImageToCanvas = () => {
    const canvas = canvasEl.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let img = new Image();
    setFileName(Math.floor(Math.random() * 10000000).toString());
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      setImaProperties({ width: img.width, height: img.height });
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.removeAttribute("data-caman-id");
    };
  };

  const download = () => {
    const canvas = canvasEl.current;
    if (!canvas) return;
    const downloadCanvas = document.createElement("canvas");
    const ctx = downloadCanvas.getContext("2d");
    if (!ctx) return;
    downloadCanvas.width = imgProperties.width;
    downloadCanvas.height = imgProperties.height;
    const filterToBeApplied = getComputedStyle(canvas).filter;
    ctx.filter = filterToBeApplied;
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    let fNameWithoutExt = "";
    const fNameArry = filename.split(".");
    let fileExt = "jpeg";
    if (fileMode === "url") {
      fNameWithoutExt = filename;
    } else {
      fNameWithoutExt = filename.slice(0, -fileExt.length - 1);
      fileExt = fNameArry[fNameArry.length - 1];
    }
    const fNameWithExt = `${fNameWithoutExt}-edited.${fileExt}`;
    link.download = fNameWithExt;
    link.href =
      fileExt === "png"
        ? downloadCanvas.toDataURL("image/png", 0.97)
        : downloadCanvas.toDataURL("image/jpeg", 0.97);
    link.dispatchEvent(new MouseEvent("click"));
    setDownload(false);
  };

  useEffect(() => {
    if (downloadFlag) {
      download();
    }
    return () => {
      setDownload(false);
    };
  }, [downloadFlag]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="row-span-2">
        <canvas
          id="canvas"
          className="max-w-[840px] min-w-[600px] w-full min-h-[600px] max-h-[700px] h-full object-scale-down self-center"
          ref={canvasEl}
          style={getImageStyle()}
        />
        <div className="flex items-center">
          <p>{selectedOption.name}: </p> &nbsp;
          <Slider
            min={selectedOption.range.min}
            max={selectedOption.range.max}
            value={selectedOption.value}
            handleChange={handleSliderChange}
          />
        </div>
      </div>

      <div className="row-span-2 flex flex-col border-l border-blue-200">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              value={[option.value.toString(), option.unit]}
              handleClick={() => setSelectedOptionIndex(index)}
              active={index === selectedOptionIndex}
            />
          );
        })}
        <button
          className="mt-10 border border-blue-300 px-3 py-1.5 w-max mx-auto rounded uppercase"
          onClick={resetImage}
          title="reset filters"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
