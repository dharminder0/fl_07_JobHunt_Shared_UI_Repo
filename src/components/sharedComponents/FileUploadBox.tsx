import { Image as ImageIcon, UploadFile } from "@mui/icons-material";
import React, { useState } from "react";

interface FileUploadBoxProps {
  title?: string;
  fileSize?: string;
  iconType?: "image" | "file";
  file?: { fileName: string; fileData: string }[]; // Accepts externally controlled file format
  outputFormat?: "png" | "jpeg" | "webp" | null; // Image conversion format
  onUpload?: (file: { fileName: string; fileData: string }[]) => void;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  title = "",
  fileSize = "",
  iconType = "file",
  file = [],
  outputFormat = null,
  onUpload,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Converts image to specified format
  const convertImageFormat = (file: File, format: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL(`image/${format}`)); // Convert to the specified format
          } else {
            reject("Canvas context not supported.");
          }
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Handles file selection and conversion (if needed)
  const handleFileChange = async (file: File) => {
    if (!file) return;
    let fileData = "";
    let fileName = file.name;

    if (iconType === "image" && outputFormat) {
      try {
        fileData = await convertImageFormat(file, outputFormat);
        fileName = fileName.replace(/\.[^.]+$/, `.${outputFormat}`); // Update file extension
      } catch (error) {
        console.error("Error converting image:", error);
      }
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject("Error reading file.");
      });
    }

    // ✅ Remove "data:image/png;base64," part
    const base64Data = fileData.split(",")[1] || fileData;

    setPreview(iconType === "image" ? fileData : null); // Show full preview
    onUpload && onUpload([{ fileName, fileData: base64Data }]); // Return pure Base64 to parent
  };

  // Handles file input change
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  // Handles drag-and-drop upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div
        className="flex items-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <label
          htmlFor={`file-upload-${title}`}
          className="w-full p-3 text-center border border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-3">
              {iconType === "image" ? (
                <ImageIcon color="primary" fontSize="small" />
              ) : (
                <UploadFile color="primary" fontSize="small" />
              )}
            </div>

            {/* Upload Text */}
            <p className="text-blue-500 text-base">Click to {title}</p>
            {fileSize && (
              <p className="mt-1 text-gray-400 text-base">
                {iconType === "image"
                  ? `SVG, PNG, JPG or GIF (max. ${fileSize})`
                  : `Any document file (max. ${fileSize})`}
              </p>
            )}
          </div>
          <input
            id={`file-upload-${title}`}
            type="file"
            accept={iconType === "image" ? "image/*" : "*"}
            className="hidden"
            onChange={onFileInputChange}
          />
        </label>
      </div>

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-3 h-[40px] object-cover rounded-md mx-auto"
        />
      )}

      {/* File Name Preview */}
      {file?.length > 0 && (
        <p className="mt-3 text-base text-gray-700 text-center">
          Selected File: {file[0]?.fileName}
        </p>
      )}
    </div>
  );
};

export default FileUploadBox;
