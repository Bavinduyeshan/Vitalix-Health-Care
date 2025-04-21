import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterOptions = (props) => {
  const navigate = useNavigate();
  const options = [
    {
      text: "Yes, take me to register",
      handler: () => navigate("/register"),
      id: 1,
    },
    { text: "Not now", handler: props.actionProvider.greet, id: 2 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={option.handler}
          className="bg-blue-500 text-white font-medium px-3 py-1 rounded-full hover:bg-blue-600 transition-all duration-300"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default RegisterOptions;