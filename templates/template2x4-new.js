import displayKlarnaPrice from './snippets';

/* eslint-disable no-else-return */
export default function template2x4(products, showTags, showBrand, showKlarna) {
  return `<!-- grid gen -->
  <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td style="padding-top: 50px;">
        <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${products.map((p, index) => {
    const tags = p.tags.join('&nbsp;· ');
    const klarna = displayKlarnaPrice(p.price);
    if (index % 2 === 0) {
      return `
        <tr>
          <td valign="top" align="center">
            <table width="280" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td valign="top">
                  ${p.imageLink}
                    <img alt="${p.productName}" border="0" height="280" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="280"/>
                  </a>
                </td>
              </tr>
              <tr>
              ${showKlarna ? `
                <td style="line-height:25px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">` : `
                <td style="line-height:25px;padding-bottom:70px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">`}
                  ${p.textLink}
                  ${(showTags && tags) && `
                    <p style="font-size:16px;color:#C0143C;line-height:20px;margin-bottom:10px;margin-top:0px;"><b>${tags}</b></p>
                    `}
                    <span style="letter-spacing:0.01em; color:#000000;">
                    ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${(p.salePrice) ? `<s>${p.price}</s> <span style="color:red">${p.salePrice}</span>` : p.price} ${p.valuePrice || ''}
                  </span>
                  ${showKlarna ? `
                  <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span>
                  ` : ''}
                  </a>
                </td>
              </tr>
              ${showKlarna ? `
              <tr>
                <td style="padding-bottom:70px;">
                  <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=b3a569f1-ea8d-43e6-a583-58ce3044fb98" width="280" height="30" border="0" style="display:block;" alt="Klarna">
                </td>
              </tr>` : ''}
            </table>
          </td>`;
    } else {
      return `
          <td valign="top" align="center">
            <table width="280" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td valign="top">
                  ${p.imageLink}
                    <img alt="${p.productName}" border="0" height="280" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="280"/>
                  </a>
                </td>
              </tr>
              <tr>
              ${showKlarna ? `
                <td style="line-height:25px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">` : `
                <td style="line-height:25px;padding-bottom:70px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">`}
                  ${p.textLink}
                  ${(showTags && tags) && `
                    <p style="font-size:16px;color:#C0143C;line-height:20px;margin-bottom:10px;margin-top:0px;"><b>${tags}</b></p>
                    `}
                    <span style="letter-spacing:0.01em; color:#000000;">
                    ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${(p.salePrice) ? `<s>${p.price}</s> <span style="color:red">${p.salePrice}</span>` : p.price} ${p.valuePrice || ''}
                    </span>
                    ${showKlarna ? `
                    <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span>
                    ` : ''}
                  </a>
                </td>
              </tr>
              ${showKlarna ? `
              <tr>
                <td style="padding-bottom:70px;">
                  <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=b3a569f1-ea8d-43e6-a583-58ce3044fb98" width="280" height="30" border="0" style="display:block;" alt="Klarna">
                </td>
              </tr>` : ''}
            </table>
          </td>
        </tr>`;
    }
  }).join('')}
        </table>
      </td>
    </tr>
  </table>`;
}
