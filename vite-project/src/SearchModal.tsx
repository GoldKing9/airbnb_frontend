import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <StyledModal>
            <p>이것은 임시 모달입니다.</p>
            <button onClick={onClose}>닫기</button>
        </StyledModal>
    );
};

export default Modal;
