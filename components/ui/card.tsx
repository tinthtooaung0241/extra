import React from "react";

interface CardProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children, className }: CardProps) => {
  return (
    <div
      className={`flex max-w-60 flex-col gap-y-4 rounded-md border border-gray-200 bg-white px-4 py-3 shadow hover:bg-gray-100 ${className}`}
    >
      <h5 className="text-md font-medium sm:text-lg">{title}</h5>
      {children}
    </div>
  );
};

export default Card;
