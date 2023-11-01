import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import ReactDOM from 'react-dom';


function AlertJsx({
  message,
  onClose,
  type = 'error',
  htmlElem = 'root'
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    visible ? (
      <AlertMy severity={type} >
        <span>{message}</span>
      </AlertMy>
    ) : null,
    document.getElementById(htmlElem)
  );
}

export default AlertJsx;


const AlertMy = styled(Alert)`
  position: absolute;
  /* bottom: 0;
  right: 0; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1005;
  min-width: 300px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 21px;
    font-weight: 500;
  }
`
