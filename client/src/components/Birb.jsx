/* eslint-disable react/prop-types */
import React from 'react';

function Birb(props) {
  const {
    birbBrand, birbProduct, birbLinks,
    birbPoints, birbSkus, handleInputChange,
    handleBirbFormSubmit,
  } = props;
  return (
    <div>
      <h2>Step 2: Paste your information</h2>
      <form className="birb" onSubmit={handleBirbFormSubmit}>
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </label>
        </div>
        <input type="submit" value="Submit" id="submit" />
      </form>
    </div>
  );
}

export default Birb;
