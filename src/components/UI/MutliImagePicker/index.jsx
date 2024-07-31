import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const MultiImagePicker = ({ className = "", onChange, maxImages = 5, ...props }) => {
  const [previews, setPreviews] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newPreviews = [];

    acceptedFiles.forEach((file) => {
      if (previews.length + newPreviews.length < maxImages) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push({ file, preview: reader.result });
          if (newPreviews.length === acceptedFiles.length || previews.length + newPreviews.length === maxImages) {
            setPreviews((prev) => {
              const updated = [...prev, ...newPreviews];
              if (onChange) {
                onChange(updated.map(item => item.file));
              }
              return updated;
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [previews, maxImages, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const removeImage = (index) => {
    setPreviews((prev) => {
      const newPreviews = prev.filter((_, i) => i !== index);
      if (onChange) {
        onChange(newPreviews.map(item => item.file));
      }
      return newPreviews;
    });
  };

  return (
    <div className={classNames(className, "w-full")}>
      <div className="w-full">
        <div className="flex flex-wrap gap-2">
          {previews.map((item, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={item.preview}
                alt={`Selected ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <IoMdClose />
              </button>
            </div>
          ))}
          {previews.length < maxImages && (
            <div
              {...getRootProps()}
              className={classNames(
                "w-24 h-24 rounded-md border-[1px] border-dashed border-adminBlue flex flex-col justify-center items-center cursor-pointer",
                { "bg-gray-100": isDragActive }
              )}
            >
              <input {...getInputProps()} {...props} />
              <CiImageOn className="text-adminBlue text-3xl" />
              <p className="text-adminBlue text-xs text-center mt-1">
                {isDragActive ? "Отпустите файлы" : "Добавить изображение"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MultiImagePicker.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  maxImages: PropTypes.number,
};

export default MultiImagePicker;