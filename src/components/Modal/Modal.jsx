import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import icons from '../../assets/icons/icons.svg';
import s from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={s.modal_overlay} onClick={onClose}>
      <div className={s.modal_content} onClick={e => e.stopPropagation()}>
        <button className={s.modal_close} onClick={onClose}>
          <svg className={s.modal_close_icon}>
            <use xlinkHref={`${icons}#${'icon-close'}`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
