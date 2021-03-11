/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
import React from 'react';
import Birb from './Birb';
import Modal from './Modal';
import template1up from '../../../templates/template1up';
import template1upnew from '../../../templates/template1up-new';
import template2x4 from '../../../templates/template2x4';
import template2x4new from '../../../templates/template2x4-new';
import template3x2new from '../../../templates/template3x2-new';
import templatec2x4 from '../../../templates/templateC2x4';
import templatec3x1 from '../../../templates/templateC3x1';
import templatebirb from '../../../templates/template-birb';
import BroadcastBIRB from '../../../templates/templates-broadcast-BIRB';

const badges = [
  {
    name: 'None',
    value: '',
  },
  {
    name: 'Clean',
    value: 'pb=2020-03-sephora-clean-2019&',
  },
  {
    name: 'Allure',
    value: 'pb=2020-03-allure-best-2018&',
  },
  {
    name: 'Value',
    value: 'pb=2020-03-sephora-value-2019&',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: '',
      countryType: 'us',
      gridType: 'twobyfournew',
      showTags: true,
      showBrand: true,
      products: [],
      activeTab: 'codeview',
      certonaTag: '',
      showKlarna: false,
      templateType: 'broadcast',
      birbBrand: [],
      birbProduct: [],
      birbLinks: [],
      birbOnlineOnly: [],
      birbPoints: [],
      birbSkus: [],
      birbProducts: [],
      birbType: 'availablenow',
      modalStyle: 'none',
      modalMessage: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBirbInputChange = this.handleBirbInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.skuToLinkMap = {};
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleBirbFormSubmit = this.handleBirbFormSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.checkBadge = this.checkBadge.bind(this);
  }

  // sending get request to proxy
  getData(sku, skuToLinkMap) {
    const country = this.state.countryType;
    return fetch(`/skus/${sku}?country=${country}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 'ESOCKETTIMEDOUT') {
          this.setState({ modalStyle: 'block', modalMessage: '500 server error. Please try again later.' });
        }
        let price;
        if (data.listPrice.split('.')[1] !== '00') {
          price = data.listPrice;
        } else {
          price = data.listPrice.split('.')[0];
        }
        const tags = [];
        if (data.isNew) {
          tags.push('NEW');
        }
        if (data.isSephoraExclusive) {
          tags.push('ONLY<span>&nbsp;</span>AT<span>&nbsp;</span>SEPHORA');
        }
        if (data.isLimitedEdition) {
          tags.push('LIMITED<span>&nbsp;</span>EDITION');
        }
        if (data.isOnlineOnly) {
          tags.push('ONLINE<span>&nbsp;</span>ONLY');
        }
        const item = {
          skuId: data.skuId,
          brandName: data.primaryProduct.brand.displayName.toUpperCase(),
          productName: data.primaryProduct.displayName.replace(/[®™©]/g, ''),
          tags,
          price,
          valuePrice: data.valuePrice ? `${data.valuePrice.split('.')[1][0] === '0' && data.valuePrice.split('.')[1][1] === '0' ? data.valuePrice.split('.')[0] : data.valuePrice.split(' ')[0]} value)` : '',
          rating: data.primaryProduct.rating,
          imageLink: skuToLinkMap[data.skuId],
          textLink: skuToLinkMap[data.skuId].replace('>', ' style="text-decoration:none;color:#000000;">'),
          badge: badges[0],
          salePrice: data.salePrice ? `${data.salePrice.split('.')[1] === '00' ? data.salePrice.split('.')[0] : data.salePrice}` : '',
          image: data.skuImages.image450,
        };
        return item;
      })
      .catch(() => {
        const item = {
          skuId: sku,
          brandName: 'PLACEHOLDER BRAND NAME',
          productName: 'Placeholder product name',
          tags: ['PLACEHOLDER TAG'],
          price: '$00',
          valuePrice: '',
          rating: 0,
          imageLink: skuToLinkMap[sku],
          textLink: skuToLinkMap[sku].replace('>', ' style="text-decoration:none;color:#000000;">'),
          badge: badges[0],
          salePrice: '',
        };
        return item;
      });
  }

  setBadge(productIdx, badge) {
    
    const { products } = this.state;
    const productImage = products[productIdx].image;
    const newBadge = this.checkBadge(badge, productImage);
    const newProduct = {...products[productIdx], badge: {name: badge.name, value: newBadge}};
    const newProducts = [...products];
    newProducts[productIdx] = newProduct;
    this.setState({products:newProducts});
  }

  checkBadge (badge, productImage) {
    if (badge.name === 'Allure') {
      let imageURL = productImage.split('?')[1] === undefined ? '': productImage.split('?')[1].concat('&');
      imageURL = imageURL.includes('clean') ? '' : imageURL;
      if (imageURL === ''){
        this.setState({modalStyle:"block", modalMessage: 'no allure badge available in Sephora database by default. Adding Allure 2018 badge.'})
        return('pb=2020-03-allure-best-2018&');
      } else {
        return (imageURL);
      }
    } else {
      return (badge.value);
    }
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.target.value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { textareaValue } = this.state;
    // get ids from links
    const skus = this.parseSkus(textareaValue);
    // get data based on ids
    const promises = skus.map((sku) => this.getData(sku, this.skuToLinkMap));
    // update state with data
    Promise.all(promises)
      .then((data) => {
        this.setState({
          products: data,
        });
      });

    document.location = '#step2';
  }

  handleInputChange(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleBirbInputChange(event) {
    const { name, value } = event.target;
    // create products array
    const newProducts = [];
    this.setState({
      [name]: value.split('\n'),
      birbProducts: newProducts,
    });
  }

  handleBirbFormSubmit(event) {
    event.preventDefault();
    this.buildProductArray();
  }

  buildProductArray() {
    const {
      birbBrand, birbProduct, birbLinks, birbOnlineOnly, birbPoints, birbSkus,
    } = this.state;
    const newProducts = [];
    for (let i = 0; i < birbBrand.length; i += 1) {
      const item = {
        brandName: birbBrand[i] || 'Placeholder Brand Name',
        productName: birbProduct[i] || 'Placeholder Product Name',
        imageLink: birbLinks[i] || '<a href="#">',
        textLink: (birbLinks[i] || '<a href="#">').replace('>', ' style="text-decoration:none;color:#000000;">'),
        pointValue: (birbPoints[i] || '100').toUpperCase().replace('PT', ''),
        onlineOnly: birbOnlineOnly[i] || 0,
        skuId: birbSkus[i] || '',
      };
      newProducts.push(item);
    }
    this.setState({
      birbProducts: newProducts,
    });
  }

  // getting the sku number from the url
  parseSkus(links) {
    this.skuToLinkMap = {};
    const lines = links.split('\n');
    const skus = lines.map((line, index) => {
      const match = line.match(/skuId=([0-9]+)/);
      if (match == null) return null;
      this.skuToLinkMap[match[1]] = lines[index];
      return match[1];
    });
    return skus;
  }

  closeModal() {
    this.setState({ modalStyle: 'none' });
  }

  render() {
    const {
      countryType, products, textareaValue, gridType, showTags, templateType,
      showBrand, activeTab, certonaTag, showKlarna, birbProducts, birbOnlineOnly,
      birbBrand, birbProduct, birbLinks, birbPoints, birbSkus, birbType,
    } = this.state;
    let productsHtml = '';
    if (products.length > 0 && gridType === 'oneup') {
      productsHtml = template1up(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'oneupnew') {
      productsHtml = template1upnew(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'twobyfour') {
      productsHtml = template2x4(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'twobyfournew') {
      productsHtml = template2x4new(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'threebytwonew') {
      productsHtml = template3x2new(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (gridType === 'ctwobyfour') {
      productsHtml = templatec2x4(certonaTag).replace(/\n\s+\n/g, '\n');
    } else if (gridType === 'cthreebyone') {
      productsHtml = templatec3x1(certonaTag).replace(/\n\s+\n/g, '\n');
    } else if (birbProducts.length > 0 && templateType === 'birb') {
      productsHtml = templatebirb(birbProducts, birbType).replace(/\n\s+\n/g, '\n');
    }
    return (
      <div>
        <header>
          <div className="topline" />
          <div className="logo">
            <img src="/images/logo.svg" alt="Sephora logo" width="200" height="auto" />
            {/* <img src="https://sephora.i.lithium.com/t5/image/serverpage/avatar-name/default-avatar/avatar-theme/sephora/avatar-collection/sephora/avatar-display-size/profile/version/2?xdesc=1.0" width="30" height="auto" alt="avatar" /> */}
            <h1>Email Grid Generator</h1>
          </div>
          <div className="topline" />
        </header>
        <article className="fixed">
          <BroadcastBIRB
            templateType={this.state.templateType}
            handleInputChange={this.handleInputChange}
          />
          { templateType === 'birb'
            ? (
              <Birb
                {...({
                  birbBrand,
                  birbProduct,
                  birbLinks,
                  birbPoints,
                  birbOnlineOnly,
                  birbSkus,
                  birbType,
                })}
                handleBirbInputChange={this.handleBirbInputChange}
                handleBirbFormSubmit={this.handleBirbFormSubmit}
                handleInputChange={this.handleInputChange}
              />
            )
            : (
              <div>
                <h2>Step 1: Generate your data</h2>
                <form onSubmit={this.handleFormSubmit}>
                  <div>
                    <label htmlFor="links">
                      <br />
                      Paste your links here, one each line:
                      {' '}
                      <br />
                      <br />
                      <textarea rows="25" cols="100" id="links" name="textareaValue" value={textareaValue} onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <br />
                  <div className="form-row" id="country">
                    <label htmlFor="country-us">
                      US
                      {' '}
                      <input type="radio" id="country-us" name="countryType" value="us" onChange={this.handleInputChange} checked={countryType === 'us'} />
                    </label>
                    <label htmlFor="country-ca">
                      Canada
                      {' '}
                      <input type="radio" id="country-ca" name="countryType" value="ca" onChange={this.handleInputChange} checked={countryType === 'ca'} />
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
                    <input type="radio" id="oneup" name="gridType" value="oneup" onChange={this.handleInputChange} checked={gridType === 'oneup'} />
                  </label>
                  <label htmlFor="oneupnew">
                    1up
                    {' '}
                    <span className="newtag">NEW</span>
                    {' '}
                    grid
                    {' '}
                    <input type="radio" id="oneupnew" name="gridType" value="oneupnew" onChange={this.handleInputChange} checked={gridType === 'oneupnew'} />
                  </label>
                  <label htmlFor="twobyfour">
                    2x4 grid
                    {' '}
                    <input type="radio" id="twobyfour" name="gridType" value="twobyfour" onChange={this.handleInputChange} checked={gridType === 'twobyfour'} />
                  </label>
                  <label htmlFor="twobyfournew">
                    2x4
                    {' '}
                    <span className="newtag">NEW</span>
                    {' '}
                    grid
                    {' '}
                    <input type="radio" id="twobyfournew" name="gridType" value="twobyfournew" onChange={this.handleInputChange} checked={gridType === 'twobyfournew'} />
                  </label>
                  <label htmlFor="threebytwonew">
                    3x2
                    {' '}
                    <span className="newtag">NEW</span>
                    {' '}
                    grid
                    {' '}
                    <input type="radio" id="threebytwonew" name="gridType" value="threebytwonew" onChange={this.handleInputChange} checked={gridType === 'threebytwonew'} />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="ctwobyfour">
                    Certona 2x4 grid
                    {' '}
                    <input type="radio" id="ctwobyfour" name="gridType" value="ctwobyfour" onChange={this.handleInputChange} checked={gridType === 'ctwobyfour'} />
                  </label>
                  <label htmlFor="cthreebyone">
                    Certona 3x1 grid
                    {' '}
                    <input type="radio" id="cthreebyone" name="gridType" value="cthreebyone" onChange={this.handleInputChange} checked={gridType === 'cthreebyone'} />
                  </label>
                </div>
                {gridType === 'ctwobyfour' || gridType === 'cthreebyone'
                  ? (
                    <div id="tagname">
                      <label htmlFor="certonatag">
                        Tag name:
                        {' '}
                        <input type="text" id="certonatag" name="certonaTag" value={certonaTag} onChange={this.handleInputChange} />
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
                          <input type="checkbox" id="showTags" name="showTags" checked={showTags} onChange={this.handleInputChange} />
                        </label>
                        <label htmlFor="showBrand">
                          Include Brand Name
                          {' '}
                          <input type="checkbox" id="showBrand" name="showBrand" checked={showBrand} onChange={this.handleInputChange} />
                        </label>
                        <label htmlFor="showKlarna">
                          Include Klarna Price
                          {' '}
                          <input type="checkbox" id="showKlarna" name="showKlarna" checked={showKlarna} onChange={this.handleInputChange} />
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
                                          <input type="radio" id={id} name={name} checked={product.badge.name === badge.name} onChange={() => this.setBadge(index, badge)} />
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
                <br />
              </div>
            )}
          <h2>Step 3: Get your code</h2>
          <div id="codewindow">
            <div className="form-row tab">
              <button type="button" value="codeview" onClick={this.handleTabClick}>Generated Code</button>
              <button type="button" value="preview" onClick={this.handleTabClick}>Preview</button>
            </div>
            {activeTab === 'codeview'
              && <textarea id="codeview" rows="25" cols="100" value={productsHtml} readOnly />}
            {activeTab === 'preview'
              // eslint-disable-next-line react/no-danger
              && <div id="preview" dangerouslySetInnerHTML={{ __html: productsHtml }} />}
          </div>

          <div id="examples">
            <h3>Example links</h3>
            <textarea
              id="links"
              name="links"
              rows="25"
              cols="100"
              defaultValue={`<a href="[@trackurl LinkID='' LinkName='milksunshinetint' LinkTag='pl-p1' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P410176?skuId=2414258&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='ilialipmask' LinkTag='pl-p2' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P467765?skuId=2410561&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='kosassmoothingpowder' LinkTag='pl-p3' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P468685?skuId=2414373&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='sceyeshadowpalette' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P461516?skuId=2353027&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='biteupswingmascara' LinkTag='pl-p5' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P467605?skuId=2414456&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='saiesupergelhighlighter' LinkTag='pl-p6' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P468206?skuId=2414027&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='ctminilipsticklipliner' LinkTag='pl-p6' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458268?skuId=2339620&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='pmgdivinerosepalette' LinkTag='pl-p7' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458276?skuId=2351542&$deep_link=true[/@trackurl]" target="_blank">`}
            />
          </div>
          <Modal modalStyle={this.state.modalStyle} closeModal={this.closeModal} modalMessage={this.state.modalMessage} />
        </article>
      </div>
    );
  }
}

export default App;
