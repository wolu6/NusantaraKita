import React, { useMemo, useState } from "react";
import { TbCopy, TbCopyCheck, TbCopyCheckFilled } from "react-icons/tb";
import { Button } from "./button";

interface CodeProps {
  content: string;
  showCopyButton?: boolean;
}

const Code: React.FC<CodeProps> = ({ content, showCopyButton = false }) => {
  const [copyButtonIcon, setCopyButtonIcon] = useState<"COPY" | "COPIED" | "FAILED">("COPY");

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

  return (
    <div className="relative bg-[#4A4A4A] p-4 rounded-md shadow-md">
      {showCopyButton && (
        <Button onClick={handleCopy} className="absolute top-2.5 right-2.5 cursor-pointer" aria-label="Copy code to clipboard">
          {renderCopyButtonIcon}
        </Button>
      )}
      <pre className="overflow-x-auto text-gray-200 text-sm font-mono whitespace-pre-wrap break-all">
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default Code;
