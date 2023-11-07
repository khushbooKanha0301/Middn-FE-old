import {
  BsFileEarmarkArrowDown,
  BsFiletypeDoc,
  BsFiletypePdf,
  BsFillImageFill,
} from "react-icons/bs";
import { ImVideoCamera } from "react-icons/im";
import { MdAudiotrack } from "react-icons/md";

export const RenderIcon = (fileName) => {
  let ext = fileName.split(".").pop();
  if (ext === "jpg" || ext === "png" || ext === "gif" || ext === "jpg") {
    return (
      <span className="imageicon">
        <BsFillImageFill style={{ fontSize: "20px" }} />
      </span>
    );
  } else if (ext === "pdf") {
    return (
      <span className="imageicon">
        <BsFiletypePdf style={{ fontSize: "20px" }} />
      </span>
    );
  } else if (
    ext === "doc" ||
    ext === "docx" ||
    ext === "dot" ||
    ext === "docm" ||
    ext === "doc" ||
    ext === "odt"
  ) {
    return (
      <span className="imageicon">
        <BsFiletypeDoc style={{ fontSize: "20px" }} />
      </span>
    );
  } else if (ext === "mp3") {
    return (
      <span className="imageicon">
        <MdAudiotrack style={{ fontSize: "20px" }} />
      </span>
    );
  } else if (ext === "mp4") {
    return (
      <span className="imageicon">
        <ImVideoCamera style={{ fontSize: "20px" }} />
      </span>
    );
  } else {
    return (
      <span className="imageicon">
        <BsFileEarmarkArrowDown style={{ fontSize: "20px" }} />
      </span>
    );
  }
};

export const formateSize = (selectedFile) => {
  const fileSizeInBytes = selectedFile;
  const fileSizeInKB = fileSizeInBytes / 1024;
  const fileSizeInGB = fileSizeInKB / 1024 / 1024;
  let fileSize = fileSizeInBytes + " bytes";
  if (fileSizeInGB >= 1) {
    fileSize = fileSizeInGB.toFixed(2) + " GB";
  } else if (fileSizeInKB >= 1) {
    fileSize = fileSizeInKB.toFixed(2) + " KB";
  }
  return fileSize;
};
