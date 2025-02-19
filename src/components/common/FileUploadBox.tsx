import { Image, UploadFile } from "@mui/icons-material";
import React from "react";

interface FileUploadBoxProps {
  title?: string;
  fileSize?: string;
  iconType?: "image" | "file";
  file?: File | null;
  onUpload?: (file: File | null) => void;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  title = "",
  fileSize = "",
  iconType = "image",
  file,
  onUpload,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      onUpload && onUpload(selectedFile); // Update parent component
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      onUpload && onUpload(selectedFile); // Update parent component
    }
  };

  return (
    <div>
      <div
        className="flex items-center"
        onDragOver={handleDragOver}
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
                <Image color="primary" fontSize="small" />
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
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* File Name Preview */}
      {file && (
        <p className="mt-3 text-base text-gray-700 text-center">
          Selected File: {file.name}
        </p>
      )}
    </div>
  );
};

export default FileUploadBox;
