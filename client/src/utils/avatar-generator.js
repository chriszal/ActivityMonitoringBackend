export function generateAvatar(name, size = 64, textColor = '#fff') {
  const words = name.split(' ');
  const initials = words[0].charAt(0).toUpperCase();
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  
  // set background color based on name length
  let backgroundColor = '';
  if (words[0].length === 1) {
    backgroundColor = '#FFD700'; // gold
  } else if (words[0].length === 2) {
    backgroundColor = '#F8961E'; // orange
  } else if (words[0].length === 3) {
    backgroundColor = '#F9C74F'; // yellow
  } else if (words[0].length === 4) {
    backgroundColor = '#90BE6D'; // green
  } else if (words[0].length === 5) {
    backgroundColor = '#43AA8B'; // teal
  } else if (words[0].length === 6) {
    backgroundColor = '#577590'; // blue-gray
  } else if (words[0].length === 7) {
    backgroundColor = '#2A9D8F'; // seafoam
  } else if (words[0].length === 8) {
    backgroundColor = '#8A5E58'; // burgundy
  } else if (words[0].length === 9) {
    backgroundColor = '#FFC0CB'; // pink
  } else if (words[0].length === 10) {
    backgroundColor = '#9370DB'; // purple
  } else if (words[0].length === 11) {
    backgroundColor = '#F94144'; // red
  } else if (words[0].length === 12) {
    backgroundColor = '#00BFFF'; // sky blue
  } else if (words[0].length === 13) {
    backgroundColor = '#FFA07A'; // salmon
  } else {
    backgroundColor = '#4D4D4D'; // gray
  }
  
  // draw background color
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, size, size);
  
  // set font family
  const fontFamily = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
  context.font = `normal ${size / 2}px ${fontFamily}`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillStyle = textColor;
  context.fillText(initials, size / 2, size / 2);
  return canvas.toDataURL();
}
