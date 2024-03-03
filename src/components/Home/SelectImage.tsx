import { ChangeEvent, useRef, useState } from "react";

interface SelectImageProps {
  getImage: (url: string) => void;
  setFile: (file: File) => void;
  setFileMode: (mode: string) => void;
}

export default function SelectImage({
  getImage,
  setFile,
  setFileMode,
}: SelectImageProps) {
  const [url, setUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const getImageFromWeb = (): void => {
    getImage(url);
    setFileMode("url");
  };

  const fileSelect = (): void => {
    if (
      fileRef.current &&
      fileRef.current.files &&
      fileRef.current.files.length > 0
    ) {
      setFile(fileRef.current.files[0]);
      setFileMode("device");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg">
            Get image using link{" "}
            <span role="img" aria-label="link">
              🔗
            </span>
          </h3>
          <input
            type="text"
            placeholder="Image URL"
            className="px-3 py-2 outline-none border border-blue-200 rounded w-full"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <button
            type="submit"
            className="bg-blue-300 px-2 py-1.5 rounded uppercase"
            onClick={getImageFromWeb}
          >
            Get Image
          </button>
        </div>
        <br />
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg">
            Get image from device{" "}
            <span role="img" aria-label="phone">
              📱/💻
            </span>
          </h3>
          <input
            type="file"
            placeholder="Select Image"
            ref={fileRef}
            accept="image/x-png,image/jpeg"
            className="p-2 bg-blue-300 rounded text-center"
            id="upload-file"
            onChange={fileSelect}
          />
        </div>
      </div>
    </div>
  );
}
