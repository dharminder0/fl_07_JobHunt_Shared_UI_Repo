import { Image, UploadFile } from "@mui/icons-material";
import React, { useState } from "react";

const FileUploadBox = ({ title = "", fileSize = "", iconType=""  }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
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
          htmlFor="file-upload"
          className="w-full p-3 text-center border border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-3">
              {iconType == 'image' && <Image color="primary" fontSize="small" /> } 
              {iconType == 'file' && <UploadFile color="primary" fontSize="small" /> }
            </div>

            {/* Upload Text */}
            <p className="text-blue-500 text-base">Click to {title}</p>
            {fileSize && <p className="mt-1 text-info text-gray-400">
              SVG, PNG, JPG or GIF (max. {fileSize})
            </p>}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {/* File Name Preview */}
      {file && (
        <p className={`mt-3 text-base text-gray-700 ${iconType == 'image' ? 'text-center' : ''}`}>
          Selected File: {file.name}
        </p>
      )}
    </div>
  );
};

export default FileUploadBox;
