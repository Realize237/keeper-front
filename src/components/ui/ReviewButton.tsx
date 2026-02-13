import { useState } from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { ReviewDialog } from '../dialog/ReviewDialog';

export function ReviewButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-br from-[#990800] to-[#C41E14] hover:from-[#C41E14] hover:to-[#FF6B5B] text-white rounded-full shadow-xl hover:shadow-2xl shadow-red-900/30 flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 z-40 group"
        title="Give Feedback"
      >
        <FaRegMessage className="w-6 h-6 group-hover:scale-110 transition-transform" />

        <span className="absolute inset-0 rounded-full bg-[#990800] animate-ping opacity-20"></span>
      </button>

      <ReviewDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
