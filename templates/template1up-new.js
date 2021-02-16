import displayKlarnaPrice from './snippets';

export default function template1up(products, showTags, showBrand, showKlarna) {
  return `<!-- grid gen -->
  <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td style="padding-top: 50px;">
        <table width="500" border="0" cellspacing="0" cellpadding="0" align="center">
  ${products.map((p) => {
    const tags = p.tags.join('&nbsp;· ');
    const klarna = displayKlarnaPrice(p.price);
    return `
          <!-- next pick -->
          <tr>
            <td align="center">
              ${p.imageLink}
                <img alt="${p.productName}" border="0" height="450" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="450">
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="line-height:25px;padding-bottom:10px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:16px;">
            ${p.textLink}
                ${(showTags && tags) ? `
                <span style="color:#C0143C;letter-spacing:0.01em;line-height:25px;"><b>${tags}</b></span>
                ` : ''}
              </a>
            </td>
          </tr>
          <tr>
          ${showKlarna ? `
            <td align="center" style="line-height:25px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">` : `
            <td align="center" style="line-height:25px;padding-bottom:25px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">`}
              ${p.textLink}
                <span style="letter-spacing:0.01em; color:#000000;">
                ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${(p.salePrice) ? `<s>${p.price}</s> <span style="color:red">${p.salePrice}</span>` : p.price} ${p.valuePrice || ''}
                </span>
                ${showKlarna ? `
                <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span><br />
                ` : ''}
              </a>
            </td>
          </tr>
          ${showKlarna ? `
          <tr>
            <td align="center" style="padding-bottom:25px;">
              <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=8fb824b4-e467-4831-b531-1e37d63881fd" width="76" height="30" border="0" style="display:block;" alt="Klarna">
            </td>
          </tr>` : ''}
          `;
  }).join('')}
        </table>
      </td>
    </tr>
  </table>
  `;
}
