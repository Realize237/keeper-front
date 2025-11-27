export const isChromeExtension = () => {
  return typeof chrome !== "undefined" && !!chrome?.runtime?.id;
};

export const getBrowserDimensions =(isChromeExtension: boolean)=>{
  return isChromeExtension ? 'w-[375px] h-[720px] ' : ' w-full h-screen '
}