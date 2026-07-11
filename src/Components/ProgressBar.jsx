const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full my-2 bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
