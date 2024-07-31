import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const ImagePicker = ({ className = "", value, onChange, clearImage, ...props }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={classNames(className, "w-full")}>
      <div {...getRootProps()} className="w-full h-48 flex justify-center items-center cursor-pointer">
        <input
          {...getInputProps()}
          accept="image/*"
          className="hidden"
          id="image-picker"
        />
        {preview ? (
          <div className="relative w-full h-full rounded-md">
            <img
              src={preview}
              alt="Selected"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                clearImage();
                setPreview(null);
              }}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1"
            >
              <IoMdClose />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-picker"
            className="w-full h-full border-[1px] border-dashed border-adminBlue rounded-md flex flex-col justify-center items-center"
          >
            <CiImageOn className="text-adminBlue text-3xl" />
            <p className="text-adminBlue text-sm">
              Загрузите сюда изображение
            </p>
          </label>
        )}
      </div>
    </div>
  );
};

ImagePicker.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  clearImage: PropTypes.func.isRequired,
};

export default ImagePicker;
