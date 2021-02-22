import displayKlarnaPrice from './snippets';

/* eslint-disable no-else-return */
export default function template3x2(products, showTags, showBrand, showKlarna) {
  function productCell(p, tags, klarna) {
    return `<table width="200" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
          <td valign="top">
            ${p.imageLink}
              <img alt="${p.productName}" border="0" height="200" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="200"/>
            </a>
          </td>
        </tr>
        <tr>
        ${showKlarna ? `
          <td style="line-height:25px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">` : `
          <td style="line-height:25px;padding-bottom:70px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">`}
            ${p.textLink}
            ${(showTags && tags) && `
              <p style="font-size:16px;color:#C0143C;line-height:20px;margin-bottom:10px;margin-top:0px;">
                <b>${tags}</b>
              </p>`}
              <span style="letter-spacing:0.01em; color:#000000;">
                ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${(p.salePrice) ? `<s>${p.price}</s> <span style="color:red">${p.salePrice}</span>` : p.price} ${p.valuePrice || ''}
              </span>
              ${showKlarna ? `
              <span style="letter-spacing:0.01em; color:gray;"><br/>Or pay in 4 interest-free payments of $${klarna}</span>` : ''}
            </a>
          </td>
        </tr>
        ${showKlarna ? `
        <tr>
          <td style="padding-bottom:70px;">
            <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=8fb824b4-e467-4831-b531-1e37d63881fd" width="76" height="30" border="0" style="display:block;" alt="Klarna">
          </td>
        </tr>` : ''}
      </table>`;
  }

  return `<!-- grid gen -->
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${products.map((p, index) => {
    const tags = p.tags.join('&nbsp;· ');
    const klarna = displayKlarnaPrice(p.price);
    if (index % 3 === 0) {
      return `
  <tr>
    <td valign="top" style="padding-left:30px;">
      ${productCell(p, tags, klarna)}
    </td>`;
    } else if (index % 3 === 1) {
      return `
    <td valign="top" style="padding:0 20px;">
      ${productCell(p, tags, klarna)}
    </td>`;
    } else {
      return `
    <td valign="top" style="padding-right:30px;">
      ${productCell(p, tags, klarna)}
    </td>
  </tr>`;
    }
  }).join('')}
  </table>`;
}
