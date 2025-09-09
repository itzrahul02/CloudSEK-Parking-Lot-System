export  const getLabel = (row, col) => {
    let label = "";
    while (row > 0) {
      row--;
      label = String.fromCharCode(65 + (row % 26)) + label;
      row = Math.floor(row / 26);
    }
    return label + col;
  };
  
  export const getSlot = (label) => {
  if (!label || label.length < 2) return null;

  const rowLetter = label[0].toUpperCase();
  const row = rowLetter.charCodeAt(0) - 64; // 'A' -> 1, 'B' -> 2, etc.
  const col = parseInt(label.slice(1), 10);

  if (isNaN(row) || isNaN(col)) return null;

  return { row, col };
};