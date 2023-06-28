import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const madalRoot = document.getElementById('modal_root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscape);
  });

  const onEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">{children}</div>
    </div>,
    madalRoot
  );
};
