const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-background backdrop-blur-sm flex flex-col justify-center items-center z-9999">
      <div className="loader"></div>
    </div>
  );
};

export default FullScreenLoader;
