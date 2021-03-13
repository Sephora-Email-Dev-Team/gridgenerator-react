/* eslint-disable react/prop-types */
import React from 'react';

function Broadcast(props) {
  const {
    handleFormSubmit, handleInputChange, textareaValue,
    countryType, gridType, showTags, showBrand, showKlarna,
    products, badges, setBadge, certonaTag,
  } = props;
  return (
    <div>
      <h2>Step 1: Generate your data</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="links">
            <br />
            Paste your links here, one each line:
            {' '}
            <br />
            <br />
            <textarea rows="25" cols="100" id="links" name="textareaValue" value={textareaValue} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <div className="form-row" id="country">
          <label htmlFor="country-us">
            US
            {' '}
            <input type="radio" id="country-us" name="countryType" value="us" onChange={handleInputChange} checked={countryType === 'us'} />
          </label>
          <label htmlFor="country-ca">
            Canada
            {' '}
            <input type="radio" id="country-ca" name="countryType" value="ca" onChange={handleInputChange} checked={countryType === 'ca'} />
          </label>
        </div>
        <input type="submit" value="Submit" id="submit" />
      </form>
      <br />
      <br />
      <h2 id="step2">Step 2: Choose your preferences</h2>
      <br />
      <div id="typeofgrid">
        <h3>Type of the grid</h3>
        <label htmlFor="oneup">
          1up grid
          {' '}
          <input type="radio" id="oneup" name="gridType" value="oneup" onChange={handleInputChange} checked={gridType === 'oneup'} />
        </label>
        <label htmlFor="oneupnew">
          1up
          {' '}
          <span className="newtag">NEW</span>
          {' '}
          grid
          {' '}
          <input type="radio" id="oneupnew" name="gridType" value="oneupnew" onChange={handleInputChange} checked={gridType === 'oneupnew'} />
        </label>
        <label htmlFor="twobyfour">
          2x4 grid
          {' '}
          <input type="radio" id="twobyfour" name="gridType" value="twobyfour" onChange={handleInputChange} checked={gridType === 'twobyfour'} />
        </label>
        <label htmlFor="twobyfournew">
          2x4
          {' '}
          <span className="newtag">NEW</span>
          {' '}
          grid
          {' '}
          <input type="radio" id="twobyfournew" name="gridType" value="twobyfournew" onChange={handleInputChange} checked={gridType === 'twobyfournew'} />
        </label>
        <label htmlFor="threebytwonew">
          3x2
          {' '}
          <span className="newtag">NEW</span>
          {' '}
          grid
          {' '}
          <input type="radio" id="threebytwonew" name="gridType" value="threebytwonew" onChange={handleInputChange} checked={gridType === 'threebytwonew'} />
        </label>
        <br />
        <br />
        <label htmlFor="ctwobyfour">
          Certona 2x4 grid
          {' '}
          <input type="radio" id="ctwobyfour" name="gridType" value="ctwobyfour" onChange={handleInputChange} checked={gridType === 'ctwobyfour'} />
        </label>
        <label htmlFor="cthreebyone">
          Certona 3x1 grid
          {' '}
          <input type="radio" id="cthreebyone" name="gridType" value="cthreebyone" onChange={handleInputChange} checked={gridType === 'cthreebyone'} />
        </label>
      </div>
      {gridType === 'ctwobyfour' || gridType === 'cthreebyone'
        ? (
          <div id="tagname">
            <label htmlFor="certonatag">
              Tag name:
              {' '}
              <input type="text" id="certonatag" name="certonaTag" value={certonaTag} onChange={handleInputChange} />
            </label>
          </div>
        )
        : (
          <div>
            <div id="checkboxes">
              <h3>Info</h3>
              <label htmlFor="showTags">
                Show Tags
                {' '}
                <input type="checkbox" id="showTags" name="showTags" checked={showTags} onChange={handleInputChange} />
              </label>
              <label htmlFor="showBrand">
                Include Brand Name
                {' '}
                <input type="checkbox" id="showBrand" name="showBrand" checked={showBrand} onChange={handleInputChange} />
              </label>
              <label htmlFor="showKlarna">
                Include Klarna Price
                {' '}
                <input type="checkbox" id="showKlarna" name="showKlarna" checked={showKlarna} onChange={handleInputChange} />
              </label>
            </div>
            <div id="badges">
              <h3>Badges</h3>
              <ul>
                {products.map((product, index) => {
                  const name = `product${index}badge`;
                  return (
                    <React.Fragment key={product.skuId}>
                      <li key={product.skuId}>{product.brandName}</li>
                      <ul>
                        {badges.map((badge, badgeIdx) => {
                          const id = `product${index}badge${badgeIdx}`;
                          return (
                            <li key={product.skuId + badge.name}>
                              <label htmlFor={id}>
                                <input type="radio" id={id} name={name} checked={product.badge.name === badge.name} onChange={() => setBadge(index, badge)} />
                                {' '}
                                {badge.name}
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}

export default Broadcast;
