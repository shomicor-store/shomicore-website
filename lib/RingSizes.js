// Complete chart map matching your conversion chart image
export const ringChartMatrix = [
  { mm: "14.0 mm", us: "3",    uk: "F",       fr: "44",   de: "14" },
  { mm: "14.4 mm", us: "3½",   uk: "G",       fr: "45¼",  de: "14½" },
  { mm: "14.8 mm", us: "4",    uk: "H½",      fr: "46½",  de: "15" },
  { mm: "15.2 mm", us: "4½",   uk: "I½",      fr: "47¾",  de: "15½" },
  { mm: "15.6 mm", us: "5",    uk: "J½",      fr: "49",   de: "15¾" },
  { mm: "16.0 mm", us: "5½",   uk: "L",       fr: "50¾",  de: "16" },
  { mm: "16.5 mm", us: "6",    uk: "M",       fr: "51½",  de: "16½" },
  { mm: "16.9 mm", us: "6½",   uk: "N",       fr: "52¾",  de: "17" },
  { mm: "17.3 mm", us: "7",    uk: "O",       fr: "54",   de: "17¼" },
  { mm: "17.7 mm", us: "7½",   uk: "P",       fr: "55¼",  de: "17¾" },
  { mm: "18.2 mm", us: "8",    uk: "Q",       fr: "56¾",  de: "18" },
  { mm: "18.6 mm", us: "8½",   uk: "Q½",      fr: "58",   de: "18½" },
  { mm: "19.0 mm", us: "9",    uk: "R½",      fr: "59¼",  de: "19" },
  { mm: "19.4 mm", us: "9½",   uk: "S½",      fr: "60¾",  de: "19½" },
  { mm: "19.8 mm", us: "10",   uk: "T½",      fr: "61¾",  de: "20" },
  { mm: "20.2 mm", us: "10½",  uk: "U½",      fr: "62¾",  de: "20¼" },
  { mm: "20.6 mm", us: "11",   uk: "V½",      fr: "64¼",  de: "20¾" },
  { mm: "21.0 mm", us: "11½",  uk: "W½",      fr: "66",   de: "21" },
  { mm: "21.4 mm", us: "12",   uk: "Y",       fr: "67¼",  de: "21¼" },
  { mm: "21.8 mm", us: "12½",  uk: "Z",       fr: "68",   de: "21¾" },
  { mm: "22.2 mm", us: "13",   uk: "Z + 1",   fr: "69",   de: "22" },
  { mm: "22.6 mm", us: "13½",  uk: "Z + 1.5", fr: "71",   de: "22.6" }
];

export function getRingConversions(usSize) {
  return ringChartMatrix.find(row => row.us === usSize) || null;
}

export function getAllRingSizes() {
  return ringChartMatrix.map(row => row.us);
}
