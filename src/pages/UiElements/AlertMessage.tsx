import React from "react";

type AlertType = "success" | "warning" | "error";

interface AlertMessageProps {
  type: AlertType;
  title: string;
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, title, message }) => {
  const styles = {
    success: {
      border: "border-[#34D399]",
      bg: "bg-[#34D399] bg-opacity-[15%]",
      textTitle: "text-black dark:text-[#34D399]",
      textMessage: "text-body",
      iconBg: "bg-[#34D399]",
    },
    warning: {
      border: "border-warning",
      bg: "bg-warning bg-opacity-[15%]",
      textTitle: "text-[#9D5425]",
      textMessage: "text-[#D0915C]",
      iconBg: "bg-warning bg-opacity-30",
    },
    error: {
      border: "border-[#F87171]",
      bg: "bg-[#F87171] bg-opacity-[15%]",
      textTitle: "text-[#B45454]",
      textMessage: "text-[#CD5D5D]",
      iconBg: "bg-[#F87171]",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`flex w-full border-l-6 ${style.border} ${style.bg} px-7 py-4 shadow-md rounded-md mb-4`}
    >
      <div className={`mr-5 flex h-9 w-9 items-center justify-center rounded-lg ${style.iconBg}`}>
        {/* Puedes poner un ícono aquí según el tipo */}
        <span className="text-white font-bold">
          {type === "success" ? "✓" : type === "warning" ? "!" : "✕"}
        </span>
      </div>
      <div className="w-full">
        <h5 className={`mb-1 text-lg font-semibold ${style.textTitle}`}>{title}</h5>
        <p className={`leading-relaxed ${style.textMessage}`}>{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
