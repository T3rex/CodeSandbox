import { FaReact, FaJs, FaHtml5, FaFileCode } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { SiCsswizardry, SiTypescript } from "react-icons/si";
import { TbFileTypeTsx } from "react-icons/tb";
import { IoLogoMarkdown } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";

const iconMap = {
  jsx: <FaReact color="#61DAFB" size={20} />,
  react: <FaReact color="#61DAFB" size={30} />,
  js: <FaJs color="#f8e65dff" size={20} />,
  cjs: <FaJs color="#f8e65dff" size={20} />,
  mjs: <FaJs color="#f8e65dff" size={20} />,
  json: <BsFiletypeJson size={20} color="#F7DF1E" />,
  txt: <FiFileText size={20} color="#6C757D" />,
  html: <FaHtml5 size={20} color="#E34F26" />,
  css: (
    <SiCsswizardry
      size={20}
      color="#7e57c2"
      style={{
        backgroundColor: "white",
      }}
    />
  ),
  ts: <SiTypescript size={20} color="#007ACC" />,
  cts: <SiTypescript size={20} color="#007ACC" />,
  mts: <SiTypescript size={20} color="#007ACC" />,
  tsx: <TbFileTypeTsx size={20} color="#007ACC" />,
  md: <IoLogoMarkdown size={20} color="#000000" />,
  gitignore: <FaGitAlt size={22} color="#F05032" />,
};

export const getFileIcon = (type) => {
  return iconMap[type] || <FaFileCode size={20} color="#6C757D" />;
};
