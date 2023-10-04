import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
import ReactDOM from 'react-dom';


function AlertJsx({ 
  message,
  onClose,
  type = 'error' 
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
        {message}
      </AlertMy>
    ) : null,
    document.getElementById('root') 
  );
}

export default AlertJsx;


const AlertMy = styled(Alert)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1005;
`
