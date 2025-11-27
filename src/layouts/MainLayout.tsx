import { Outlet } from "react-router-dom";
import useIsChromeExtension from "../hooks/useIsChromeExtension";
import { getBrowserDimensions } from "../utils/environment";


export default function MainLayout() {
  const isChromeExtension = useIsChromeExtension()
  return (
    <div className={`${isChromeExtension ? 'rounded-2xl overflow-hidden' : ''} ${getBrowserDimensions(isChromeExtension)} flex flex-col items-center justify-center bg-[#171717] min-h-screen`}>
        <Outlet />
    </div>
  )
}
