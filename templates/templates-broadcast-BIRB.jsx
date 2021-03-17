/* eslint-disable react/prop-types */
import React from 'react';

function BroadcastBIRB(props) {
  const {
    handleInputChange,
    templateType,
  } = props;
  return (
    <div className="form-row">
      <label htmlFor="broadcast">
        Broadcast templates
        {' '}
        <input type="radio" id="broadcast" name="templateType" value="broadcast" onChange={handleInputChange} checked={templateType === 'broadcast'} />
      </label>
      <label htmlFor="birb">
        BIRB templates
        {' '}
        <input type="radio" id="birb" name="templateType" value="birb" onChange={handleInputChange} checked={templateType === 'birb'} />
      </label>
    </div>
  );
}

export default BroadcastBIRB;
