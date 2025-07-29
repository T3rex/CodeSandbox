import { FaReact, FaJs, FaHtml5, FaFileCode } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { SiCsswizardry, SiTypescript } from "react-icons/si";
import { TbFileTypeTsx } from "react-icons/tb";
import { IoLogoMarkdown } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";

export const setFileIcon = (type) => {
  const iconMap = {
    jsx: FaReact,
    js: FaJs,
    json: BsFiletypeJson,
    txt: FiFileText,
    html: FaHtml5,
    css: SiCsswizardry,
    ts: SiTypescript,
    tsx: TbFileTypeTsx,
    md: IoLogoMarkdown,
    gitignore: FaGitAlt,
  };

  const IconComponent = iconMap[type] || FaFileCode;
  return <IconComponent size={20} />;
};
