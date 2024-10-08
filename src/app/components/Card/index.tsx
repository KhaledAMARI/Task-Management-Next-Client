"use client";
import React, {
  FC,
  MouseEventHandler,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardProps } from "./interface";
import { useTaskStore } from "@/app/store";
import { getTasks } from "@/app/services/tasks";
import { useTaskStoreProps } from "@/app/store/interface";
import { useRouter } from "next/navigation";
import { SUCCESS_DELETE_TOAST_DATA } from "@/app/constants";

const Card: FC<CardProps> = ({ id, title, description, status }) => {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const cardContainer = useRef<HTMLDivElement>(null);
  const { setTasks, setToastData } = useTaskStore(
    (state: useTaskStoreProps) => state
  );
  const router = useRouter();

  useEffect(() => {
    const cardContainerElement = cardContainer?.current;
    if (cardContainerElement) {
      cardContainerElement.addEventListener("mouseover", (e: MouseEvent) => {
        setIsCardHovered(true);
      });
      cardContainerElement.addEventListener("mouseleave", (e: MouseEvent) => {
        setIsCardHovered(false);
      });
    }
    return () => {
      if (cardContainerElement) {
        cardContainerElement.removeEventListener(
          "mouseover",
          (e: MouseEvent) => {
            setIsCardHovered(true);
          }
        );
        cardContainerElement.removeEventListener(
          "mouseleave",
          (e: MouseEvent) => {
            setIsCardHovered(false);
          }
        );
      }
    };
  }, []);

  const handleDeletion: MouseEventHandler = async (e) => {
    e.stopPropagation();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_API_URI}/tasks/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const toastData = SUCCESS_DELETE_TOAST_DATA;
      getTasks()
        .then((response) => setTasks(response))
        .catch((error) => console.log("🚀 ~ useEffect ~ error:", error));
      setToastData(toastData);
    }
  };

  const handleCardClick: UIEventHandler = async (e) => {
    e.stopPropagation();
    router.push(`/edit-task/${id}`);
  };
  return (
    <div
      ref={cardContainer}
      onClick={handleCardClick}
      className="w-3/4 border rounded-md bg-white h-auto m-3 flex-col items-between p-2 text-black hover:cursor-pointer relative"
    >
      <div className="relative flex justify-between">
        <div
          onClick={(e) => console.log("second")}
          className="flex gap-1 mb-3 text-ellipsis overflow-hidden"
        >
          <span>{id}</span> - <h2 className="line-clamp-3">{title}</h2>
        </div>
        {isCardHovered && (
          <button onClick={handleDeletion}>
            <DeleteIcon className="absolute top-0 right-2 text-red-600" />
          </button>
        )}
      </div>
      <div>
        <div className="overflow-hidden max-h-18 text-ellipsis p-4">
          <p className="line-clamp-3">{description}</p>
        </div>
        <div className="flex justify-end p-2">
          <span
            style={{
              background:
                status.toLowerCase() === "pending"
                  ? "#FFF455"
                  : status.toLowerCase() === "in-progress"
                  ? "#36C2CE"
                  : "#C3FF93",
            }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
