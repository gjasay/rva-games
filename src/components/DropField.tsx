import { useEffect, useRef } from "react";

interface DropFieldProps {
  onChange: (file: File) => void;
  hidden?: boolean;
}

export const DropField: React.FC<DropFieldProps> = ({ onChange, hidden = false }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      let counter = 0;
      const onDrop = (e: any) => {
        e.preventDefault();
        counter = 0;
        buttonRef.current!.classList.remove(
          "!border-orange-500",
          "!border-solid",
        );
        const file = e.dataTransfer.files?.[0];
        onChange(file);
      };

      const onDragOver = (e: any) => {
        e.preventDefault();
      };

      const onDragEnter = (e: any) => {
        e.preventDefault();
        counter += 1;
        buttonRef.current!.classList.add("!border-orange-500", "!border-solid");
      };

      const onDragLeave = (e: any) => {
        e.preventDefault();
        counter -= 1;
        if (counter === 0)
          buttonRef.current!.classList.remove(
            "!border-orange-500",
            "!border-solid",
          );
      };

      buttonRef.current!.addEventListener("dragover", onDragOver);
      buttonRef.current!.addEventListener("dragenter", onDragEnter);
      buttonRef.current!.addEventListener("dragleave", onDragLeave);
      buttonRef.current!.addEventListener("drop", onDrop);

      return () => {
        buttonRef.current!.removeEventListener("dragover", onDragOver);
        buttonRef.current!.removeEventListener("dragenter", onDragEnter);
        buttonRef.current!.removeEventListener("dragleave", onDragLeave);
        buttonRef.current!.removeEventListener("drop", onDrop);
      };
    }
    return () => {};
  }, [buttonRef.current]);

  const handleFileClick = () => {
    const inputField = document.createElement("input");
    inputField.type = "file";
    inputField.addEventListener("change", (e: any) => {
      onChange(e.target.files[0]);
    });
    inputField.click();
  };

  return (
    <button
      className={`border-green-500 border-2 border-dashed p-12 ${hidden ? "hidden" : ""}`}
      ref={buttonRef}
      onClick={handleFileClick}
    >
      Drop an image on me!
    </button>
  );
};
