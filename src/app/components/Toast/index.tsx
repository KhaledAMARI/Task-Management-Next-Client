"use client";

import React, { FC, UIEventHandler, useEffect, useRef } from "react";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { ToastProps } from "./interface";
import { useTaskStore } from "@/app/store";
import { useTaskStoreProps } from "@/app/store/interface";
import { INITIAL_TOAST_DATA } from "@/app/constants";

const Toast: FC<ToastProps> = ({ severity, message }) => {
  const setToastData = useTaskStore(
    (state: useTaskStoreProps) => state.setToastData
  );
  const toastElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toast = toastElement.current;
    if (toast) {
      toast.classList.add("slide-in");
    }
    const timerId = setTimeout(() => {
      if (toast) {
        toast.classList.remove("slide-in");
        toast.classList.remove("slide-out");
      }
    }, 3000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const closeToast: UIEventHandler = (e) => {
    e.stopPropagation();
    const toastData = INITIAL_TOAST_DATA;
    setToastData(toastData);
  };

  return (
    <div
      id="toast"
      ref={toastElement}
      className="absolute top-11 right-2 flex items-center w-max max-w-xs p-4 mb-4 text-gray-500bg-white rounded-lg shadow"
      role="alert"
    >
      <div
        className={`
                inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg
                ${
                  severity === "success"
                    ? "text-green-500 bg-green-100"
                    : severity === "error"
                    ? "text-red-500 bg-red-100"
                    : severity === "infos"
                    ? "text-blue-500 bg-blue-100"
                    : ""
                }
            `}
      >
        {severity === "success" ? (
          <CheckCircleIcon />
        ) : severity === "error" ? (
          <WarningAmberIcon />
        ) : severity === "infos" ? (
          <InfoIcon />
        ) : null}
      </div>
      <div className="ms-3 text-sm font-normal mr-2 text-black">{message}</div>
      <button
        type="button"
        onClick={closeToast}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <CloseIcon className="text-gray-500" />
      </button>
    </div>
  );
};

export default Toast;
