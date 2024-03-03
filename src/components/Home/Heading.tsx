interface HeadingProps {
  click: (value: boolean) => void;
  imageAvailable: boolean;
  setDownload: (value: boolean) => void;
}

export default function Heading({
  click,
  imageAvailable,
  setDownload,
}: HeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="font-bold text-2xl" onClick={() => click(false)}>
        Image{" "}
        <span role="img" aria-label="city_sunset">
          🏞️
        </span>{" "}
        Editor
      </h2>
      {imageAvailable ? (
        <button
          className="bg-blue-300 px-3 py-2 rounded uppercase"
          onClick={() => setDownload(true)}
          aria-label="download"
        >
          Download 🔽
        </button>
      ) : (
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      )}
    </div>
  );
}
