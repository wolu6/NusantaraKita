import React, { useEffect, useMemo, useRef, useState } from "react";
import { TbCopy, TbCopyCheck, TbCopyCheckFilled } from "react-icons/tb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Button } from "./button";

interface CodeProps {
  content: string;
  showCopyButton?: boolean;
}

const Code: React.FC<CodeProps> = ({ content, showCopyButton = false }) => {
  const [copyButtonIcon, setCopyButtonIcon] = useState<"COPY" | "COPIED" | "FAILED">("COPY");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyButtonIcon("COPIED");
      setTimeout(() => setCopyButtonIcon("COPY"), 2000);
    } catch (err) {
      console.error("Failed to copy content: ", err);
      setCopyButtonIcon("FAILED");
      setTimeout(() => setCopyButtonIcon("COPY"), 2000);
    }
  };

  const renderCopyButtonIcon = useMemo(() => {
    switch (copyButtonIcon) {
      case "COPY":
        return <TbCopy />;
      case "COPIED":
        return <TbCopyCheck />;
      case "FAILED":
        return <TbCopyCheckFilled />;
      default:
        return <TbCopy />;
    }
  }, [copyButtonIcon]);

  useEffect(() => {
    const preEl = preRef.current;
    if (preEl && preEl.scrollHeight > 300) {
      setShowExpandButton(true);
    }
  }, [content]);

  return (
    <div className="relative bg-[#4A4A4A] p-4 rounded-md shadow-md">
      {showCopyButton && (
        <Button onClick={handleCopy} className="absolute top-2.5 right-2.5 cursor-pointer" aria-label="Copy code to clipboard">
          {renderCopyButtonIcon}
        </Button>
      )}

      <pre
        ref={preRef}
        className={`overflow-x-auto no-scrollbar text-gray-200 text-sm font-mono whitespace-pre transition-all duration-300 ${
          isExpanded ? "max-h-none" : "max-h-[300px] overflow-y-auto"
        }`}
      >
        <code>{content}</code>
      </pre>

      {showExpandButton && (
        <div className="flex justify-center mt-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer"
            aria-label={isExpanded ? "Tutup" : "Lihat Selengkapnya"}
          >
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Code;
