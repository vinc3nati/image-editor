type SliderProps = {
  min: number;
  max: number;
  value: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Slider({ min, max, value, handleChange }: SliderProps) {
  return (
    <div className="w-full pt-2">
      <input
        type="range"
        className="w-full"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
