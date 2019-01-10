import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';

export default function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
}