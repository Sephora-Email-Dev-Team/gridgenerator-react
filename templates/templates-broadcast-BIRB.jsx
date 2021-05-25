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
        <input type="radio" id="broadcast" name="templateType" value="broadcast" onChange={handleInputChange} checked={templateType === 'broadcast'} />
        {' '}
        Broadcast templates
      </label>
      <label htmlFor="birb">
        <input type="radio" id="birb" name="templateType" value="birb" onChange={handleInputChange} checked={templateType === 'birb'} />
        {' '}
        BIRB templates
      </label>
    </div>
  );
}

export default BroadcastBIRB;
