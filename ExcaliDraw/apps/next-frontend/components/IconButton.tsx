import { ReactNode } from "react";

export function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <button
      className={`m-2 rounded-full p-2 border bg-gray-800 text-white hover:bg-gray-600 transition 
      ${activated ? "text-red-500" : "text-gray-400"}`}
      onClick={onClick}
      aria-pressed={activated}
    >
      {icon}
    </button>
  );
}
