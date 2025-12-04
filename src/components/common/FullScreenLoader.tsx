const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm flex flex-col justify-center items-center z-9999">
      <div className="loader"></div>
    </div>
  );
};

export default FullScreenLoader;
