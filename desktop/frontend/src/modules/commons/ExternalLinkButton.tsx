import React from 'react';
import { Button } from 'primereact/button';

function ExternalLinkButton(props) {
  const handleButtonClick = () => {
    window.open(props.href, '_blank');
  };

  return (
    <Button
      icon="pi pi-external-link"
      placeholder="Top"
      tooltip="Link to Get"
      tooltipOptions={{ position: 'top' }}
      onClick={handleButtonClick}
    />
  );
}

export {ExternalLinkButton};