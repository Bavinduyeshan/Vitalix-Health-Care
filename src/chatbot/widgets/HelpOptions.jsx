import React from "react";

const HelpOptions = (props) => {
  const options = [
    { text: "Book Appointment", handler: props.actionProvider.handleAppointment, id: 1 },
    { text: "View Profile", handler: props.actionProvider.handleProfile, id: 2 },
    { text: "Register", handler: props.actionProvider.handleRegister, id: 3 },
    { text: "Login", handler: props.actionProvider.handleLogin, id: 4 },
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

export default HelpOptions;