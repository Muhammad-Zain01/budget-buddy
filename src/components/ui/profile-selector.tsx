"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, User } from "lucide-react";
import { isValidURL } from "@/lib/utils";
import { deleteProfile } from "@/lib/services/upload";

interface AvatarSelectorProps {
  value: File | null;
  onChange: (file: File | null) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const ProfileSelector: React.FC<AvatarSelectorProps> = ({
  value,
  onChange,
  acceptedFileTypes = ["image/*"],
  maxFileSize = 2 * 1024 * 1024, // 2MB default
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {}
    ),
    maxSize: maxFileSize,
    multiple: false,
  });

  const generateURL = () => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    } else if (typeof value === "string") {
      if (isValidURL(value)) {
        return value;
      }
      return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${value}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    }
  };

  const handleDelete = async () => {
    if (typeof value === "string" && !isValidURL(value)) {
      try {
        await deleteProfile(value);
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  const removeAvatar = async () => {
    onChange(null);
    await handleDelete();
  };
  console.log(value);
  return (
    <div className="w-full relative">
      <div
        {...getRootProps()}
        className={`border-2   border-dashed rounded-full w-32 h-32 cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center h-full">
          {value ? (
            <>
              {/* eslint-disable-next-line */}
              <img
                src={generateURL()}
                alt="User avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </>
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
      </div>
      {value && (
        <span
          onClick={removeAvatar}
          className="absolute z-100 top-0 left-[130px] -mt-2 -mr-2 hover:bg-gray-100 rounded-full p-1 cursor-pointer text-red-400 transition-colors dark:hover:bg-gray-700"
        >
          <X className="w-4 h-4" />
        </span>
      )}
    </div>
  );
};

export default ProfileSelector;
