import { SUPPORTED_FILE } from "@/utils/constants";
import { useState } from "react";
import ImageEditor from "../ImageEditor";
import Heading from "./Heading";
import SelectImage from "./SelectImage";

export default function Index() {
  const [imageAvailable, setImageAvailable] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileMode, setFileMode] = useState("url");
  const [download, setDownload] = useState(false);

  const getImage = (urlReceived: string) => {
    const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    if (regex.test(urlReceived)) {
      setUrl(urlReceived);
      setImageAvailable(true);
    } else alert("Invalid Url");
  };
  const setImageFromDevice = (fileReceive: File) => {
    if (fileReceive && SUPPORTED_FILE.includes(fileReceive.type)) {
      setFile(fileReceive);
    } else if (!fileReceive) {
      setFile(null);
      return;
    } else if (!SUPPORTED_FILE.includes(fileReceive.type)) {
      alert("Invalid image type only supports png and jpg");
      setFile(null);
      return;
    }
    setImageAvailable(true);
  };
  const setFileSelectedMode = (mode: string) => {
    setFileMode(mode);
  };

  const clickHome = () => {
    setImageAvailable(false);
    url && setUrl("");
    file && setFile(null);
  };

  const downloadImage = (flag: boolean) => {
    setDownload(flag);
  };

  return (
    <div className="flex flex-col pt-6 items-center">
      <Heading
        click={clickHome}
        imageAvailable={imageAvailable}
        setDownload={downloadImage}
      />
      {!imageAvailable ? (
        <SelectImage
          getImage={getImage}
          setFile={setImageFromDevice}
          setFileMode={setFileSelectedMode}
        />
      ) : (
        <ImageEditor
          url={url}
          file={file}
          fileMode={fileMode}
          downloadFlag={download}
          setDownload={downloadImage}
        />
      )}
    </div>
  );
}
