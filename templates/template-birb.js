export default function templatebirb(products, type) {
  function productCell(p) {
    return `
        <td style="padding: 0 30px 70px 20px; text-align: center; vertical-align: top;">
          ${p.imageLink}
            <img style="display: block;" src="http://www.sephora.com/productimages/sku/s${p.skuId}-main-Lhero.jpg" alt="${p.productName}" width="300" height="300" border="0" />
          </a><br/>
          ${p.textLink}
            <span style="font-family: Helvetica Neue, Helvetica, sans-serif; font-size: 26px; line-height: 40px;color: #000000;"><b>${p.brandName}</b></span><br/>
            <span style="font-family: Helvetica, sans-serif; font-size: 26px; line-height: 30px;color: #000000;">${p.productName}</span><br/>
            <span style="font-family: Helvetica, sans-serif; font-size: 26px; line-height: 40px; color: #797979;">${p.pointValue} points</span>
          </a>
        </td>`;
  }

  const mainImage = (type === 'comingsoon')
    ? `
  <tr>
    <td align="center" style="padding:40px 0 50px;border-top:1px solid #000000;">
      <a href="[@trackurl LinkID='424d650fc70d46a3877ea9b172351e36' LinkName='comingsoon' LinkTag='he-ptrwd' Tracked='ON' Encode='OFF' AppendSuffix='ON' Render='ON' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank" style="text-decoration:none;color:#000000;">
        <p style="margin:0;padding:0;font-family:Georgia;font-size:48px;color:#000000;">Coming Soon</p>
      </a>
    </td>
  </tr>`
    : `
  <tr>
    <td>
      <a href="[@trackurl LinkID='' LinkName='available Now' LinkTag='txt' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='0f51c4c0-b8e1-4d28-a4c3-4beab3aa8ea5' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank">
        <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/03022021v3-BIRB-750pt-email-dedicated-sneakpeek1-Dr-Barbara-Strum-en-us_02.jpg" width="700" height="36" alt="Available Now"/>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding:40px 0 50px;">
      <a href="[@trackurl LinkID='' LinkName='available Now' LinkTag='txt' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='0f51c4c0-b8e1-4d28-a4c3-4beab3aa8ea5' LinkType='REDIRECT']https://www.sephora.com/rewards?$deep_link=true[/@trackurl]"  target="_blank" style="text-decoration:none;color:#000000;">
        <p style="margin:0;padding:0;font-family:Georgia;font-size:48px;color:#000000;">Available Now</p>
      </a>
    </td>
  </tr>`;

  return `<!-- grid gen -->
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${mainImage}
${products.map((p, index) => {
    if (index % 2 === 0) {
      return `<!-- next row -->
  <tr>
    <td>
      <table>
        <tr>
          ${productCell(p)}
        `;
    }
    return `
          ${productCell(p)}
        </tr>
      </table>
    </td>
  </tr>`;
  }).join('')}
</table>
`;
}
