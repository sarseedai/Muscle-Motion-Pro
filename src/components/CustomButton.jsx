const CustomButton = ({ label, onClick, className, noRounded, buttonIcon }) => {
    return (
      <div>
        <button
          onClick={onClick}
          className={` w-full cursor-pointer  text-white py-2 flex items-center justify-center gap-3 bg-blue-700 ${
            noRounded ? "rounded-none" : "rounded-md"
          } font-semibold hover:opacity-75 active:scale-95 transition-transform duration-150 ${className}`}
        >
          {buttonIcon}
          {label}
        </button>
      </div>
    );
  };
  
  export default CustomButton;