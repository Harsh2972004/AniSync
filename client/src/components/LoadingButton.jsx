const LoadingButton = ({ isLoading, text }) => {
  return (
    <div className="relative w-full">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full font-semibold bg-btn_pink text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-btn_pink transition-colors mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {text}
      </button>
      {isLoading && (
        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white animate-loading-bar" />
      )}
    </div>
  );
};

export default LoadingButton;
