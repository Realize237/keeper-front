import { useState } from "react";

const useIsChromeExtension = () => {
  const [isChromeExtension] = useState(() => {
    // chrome.runtime only exists when running inside an extension
    return typeof chrome !== "undefined" && !!chrome?.runtime?.id;
  });

  return isChromeExtension;
};

export default useIsChromeExtension;
