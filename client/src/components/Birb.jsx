/* eslint-disable react/prop-types */
import React from 'react';

function Birb(props) {
  const {
    birbBrand, birbProduct, birbLinks, birbOnlineOnly,
    birbPoints, birbSkus, handleInputChange,
    handleBirbFormSubmit, birbType, handleBirbInputChange,
  } = props;
  return (
    <div>
      <h2>Step 1: Paste your information</h2>
      <form onSubmit={handleBirbFormSubmit}>
        <div className="birb">
          <div className="brand-input">
            <label htmlFor="brandname">
              Brand names:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="brandname"
                name="birbBrand"
                value={birbBrand.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
          <div className="product-input">
            <label htmlFor="productname">
              Product names:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="productname"
                name="birbProduct"
                value={birbProduct.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
          <div className="sku-input">
            <label htmlFor="skuvalues">
              SKU ids:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="skuvalues"
                name="birbSkus"
                value={birbSkus.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
          <div className="point-input">
            <label htmlFor="points">
              Point values:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="points"
                name="birbPoints"
                value={birbPoints.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
          <div className="online-only-input">
            <label htmlFor="onlineonly">
              Online only:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="onlineonly"
                name="birbOnlineOnly"
                value={birbOnlineOnly.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
          <div className="link-input">
            <label htmlFor="links">
              Links:
              {' '}
              <br />
              <textarea
                wrap="off"
                id="links"
                name="birbLinks"
                value={birbLinks.join('\n')}
                onChange={handleBirbInputChange}
              />
            </label>
          </div>
        </div>
        <div className="form-row">
          <input type="submit" value="Submit" id="submit" />
        </div>
      </form>
      <h2>Step 2: Choose your preferences</h2>
      <br />
      <div id="typeofbirb">
        <h3>Type of the header</h3>
        <label htmlFor="availablenow">
          Available Now
          {' '}
          <input type="radio" id="availablenow" name="birbType" value="availablenow" onChange={handleInputChange} checked={birbType === 'availablenow'} />
        </label>
        <label htmlFor="comingsoon">
          Coming Soon
          {' '}
          <input type="radio" id="comingsoon" name="birbType" value="comingsoon" onChange={handleInputChange} checked={birbType === 'comingsoon'} />
        </label>
        <label htmlFor="100points">
          100 points
          {' '}
          <input type="radio" id="100points" name="birbType" value="100points" onChange={handleInputChange} checked={birbType === '100points'} />
        </label>
        <label htmlFor="250points">
          250 points
          {' '}
          <input type="radio" id="250points" name="birbType" value="250points" onChange={handleInputChange} checked={birbType === '250points'} />
        </label>
      </div>
    </div>
  );
}

export default Birb;
