export default function templatebirb(products, type) {
  function productCell(p) {
    const imageSize = (type === '250points') ? '450' : '300';
    const pointValue = (type === '250points') ? '250' : `${p.pointValue}`;
    return `
            ${p.imageLink}
              <img style="display: block;" src="http://www.sephora.com/productimages/sku/s${p.skuId}-main-Lhero.jpg" alt="${p.productName}" width="${imageSize}" height="${imageSize}" border="0" />
            </a><br/>
            ${p.textLink}
              <span style="font-family: Helvetica Neue, Helvetica, sans-serif; font-size: 26px; line-height: 40px;color: #000000;"><b>${p.brandName}</b><br />
                <span style="line-height: 30px;color: #000000;">${p.productName}</span><br />
                ${(p.onlineOnly === '1') ? '<span style="color: #FF0000;">online only</span><br />' : ''}
                <span style="color: #797979;">${pointValue} points</span>
              </span>
            </a>`;
  }

  const mainImages = {
    comingsoon: `
    <tr>
      <td align="center" style="padding:40px 0 50px;border-top:1px solid #000000;">
        <a href="[@trackurl LinkID='424d650fc70d46a3877ea9b172351e36' LinkName='comingsoon' LinkTag='he-ptrwd' Tracked='ON' Encode='OFF' AppendSuffix='ON' Render='ON' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank" style="text-decoration:none;color:#000000;">
          <p style="margin:0;padding:0;font-family:Georgia;font-size:48px;color:#000000;">Coming Soon</p>
        </a>
      </td>
    </tr>`,
    availablenow: `
    <tr>
      <td align="center" >
        <a href="[@trackurl LinkID='' LinkName='Available Now' LinkTag='txt' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='0f51c4c0-b8e1-4d28-a4c3-4beab3aa8ea5' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank">
          <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/20210302-750-av-now-img-v2" width="700" height="36" alt="Available Now"/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:40px 0 50px;">
        <a href="[@trackurl LinkID='' LinkName='available Now' LinkTag='txt' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='0f51c4c0-b8e1-4d28-a4c3-4beab3aa8ea5' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank" style="text-decoration:none;color:#000000;">
          <p style="margin:0;padding:0;font-family:Georgia;font-size:48px;color:#000000;">Available Now</p>
        </a>
      </td>
    </tr>`,
    '100points': `
    <tr>
      <td>
        <a href="[@trackurl LinkID='' LinkName='birb' LinkTag='he-ptrwd' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank">
          <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/02052021-BIRB-pt-boutique-desktop-mobile-email-dedicated-en-us_03.jpg" width="700" height="212" alt="100 points"/>
        </a>
      </td>
    </tr>
    `,
    '250points': `
    <tr>
      <td style="padding:30px 0;border-top:1px solid #000000;">
        <a href="[@trackurl LinkID='' LinkName='250dotwhack' LinkTag='he-ptrwd' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank">
          <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images?id=aeebc289-5fd6-4e4a-aab8-520a21ba845b" width="700" height="186" alt="250 points"/>
        </a>
      </td>
    </tr>
    `,
  };

  const mainImage = mainImages[type];

  return `<!-- grid gen -->
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${mainImage}
${products.map((p, index) => {
    if (type === '250points') {
      return `<!-- next row -->
      <tr>
        <td style="padding: 0 125px 70px; text-align: center; vertical-align: top;">
          ${productCell(p)}
        </td>
      </tr>
      `;
    }
    if ((products.length % 2 === 1) && (index === products.length - 1)) {
      return `<!-- next row -->
    <tr>
      <td style="padding: 0 200px;">
        <table width="300" border="0" cellspacing="0" cellpadding="0" align="center">
          <tr>
            <td style="padding-bottom:70px; text-align: center; vertical-align: top;">
              ${productCell(p)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
    }
    if (index % 2 === 0) {
      return `<!-- next row -->
    <tr>
      <td>
        <table>
          <tr>
            <td style="padding: 0 20px 70px 30px; text-align: center; vertical-align: top;">
              ${productCell(p)}
            </td>
          `;
    }
    return `
            <td style="padding: 0 30px 70px 20px; text-align: center; vertical-align: top;">
              ${productCell(p)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }).join('')}
</table>
`;
}
