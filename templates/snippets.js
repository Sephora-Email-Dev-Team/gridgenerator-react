// Divide price by 4 and format for display.
// Input is a string like "$24".
// if price rounded show it ($22) else always show 2 digits ($22.25 or $22.50)
//  4 => "$4"
//  1.5 => "$1.50"
export default function displayKlarnaPrice(p) {
  const price = parseFloat(p.slice(1), 10);
  return price % 4 === 0 ? price / 4 : (price / 4).toFixed(2);
}
