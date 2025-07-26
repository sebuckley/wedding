// Convert hex to HSL
function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  return { h, s, l };

}

// Generate accent colors
function generateAccents(hex) {
  const { h, s, l } = hexToHSL(hex);
  return [
    { name: "Complementary", hex: hslToHex((h + 180) % 360, s, l) },
    { name: "Analogous", hex: hslToHex((h + 30) % 360, s, l) },
    { name: "Triadic", hex: hslToHex((h + 120) % 360, s, l) }
  ];
}

function getContrastTextColor(hexColor, options = {}) {

  const { fontSize = "14px", fontWeight = "normal", returnRatio = false } = options;

  const r = parseInt(hexColor.substr(1, 2), 16) / 255;
  const g = parseInt(hexColor.substr(3, 2), 16) / 255;
  const b = parseInt(hexColor.substr(5, 2), 16) / 255;

  const [R, G, B] = [r, g, b].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const whiteContrast = (1.05) / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;

  const ptSize = convertToPt(fontSize);
  const isBold = fontWeight.toLowerCase() === "bold";
  const isLargeText = ptSize >= 18 || (ptSize >= 14 && isBold);
  const threshold = isLargeText ? 3.0 : 4.5;

  const [hue, sat, light] = hexToHsl(hexColor);

  // Heuristic overrides
  const isWarmHue = hue >= 0 && hue <= 60; // red to yellow
  const isCoolHue = hue >= 280 || hue <= 40; // pinks, purples, reds
  const isBright = luminance > 0.6;
  const isDark = luminance < 0.2;
  const isSaturated = sat > 70;

  // Override for saturated cool colors (e.g. #ff0080)
  if (isCoolHue && isSaturated && !isBright) {
    return returnRatio ? { color: "#FFFFFF", contrast: whiteContrast } : "#FFFFFF";
  }

  // Override for bright yellows (e.g. #fff700)
  if (isWarmHue && isBright && sat > 60) {
    return returnRatio ? { color: "#000000", contrast: blackContrast } : "#000000";
  }

  // WCAG logic
  let chosenColor = "#000000";
  if (whiteContrast >= threshold && whiteContrast > blackContrast) {
    chosenColor = "#FFFFFF";
  } else if (blackContrast >= threshold) {
    chosenColor = "#000000";
  } else {
    chosenColor = whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
  }

  return returnRatio
    ? { color: chosenColor, contrast: chosenColor === "#FFFFFF" ? whiteContrast : blackContrast }
    : chosenColor;

}

function convertToPt(fontSize) {
  if (typeof fontSize === "number") return fontSize;

  const match = fontSize.match(/^([\d.]+)(px|em|rem|pt)$/);
  if (!match) return 12; // default fallback

  const value = parseFloat(match[1]);
  const unit = match[2];

  switch (unit) {
    case "px": return value * 0.75; // 1pt = 1.333px
    case "em":
    case "rem": return value * 12; // assuming base font size = 16px = 12pt
    case "pt": return value;
    default: return 12;
  }
}

// Get color name
function getColorNameFromHex(hex) {

  const namedColors = {
  "#5D8AA8": "Air Force Blue",
  "#F7E7CE": "Champagne",
  "#B2BEB5": "Cadet Gray",
  "#007BA7": "Cerulean",
  "#D8D8D8": "Cloud Gray",
  "#2A52BE": "Cobalt Blue",
  "#6CA0DC": "Cornflower Blue",
  "#FBCEB1": "Apricot",
  "#B76E79": "Rose Gold",
  "#1E4D2B": "Brunswick Green",
  "#800020": "Burgundy",
  "#82CFFD": "Baby Blue",
  "#A9A9A9": "Dark Gray",
  "#8B0000": "Dark Red",
  "#8FBC8F": "Dark Sea Green",
  "#2F4F4F": "Dark Slate Gray",
  "#483D8B": "Dark Slate Blue",
  "#00CED1": "Dark Turquoise",
  "#9400D3": "Dark Violet",
  "#D3D3D3": "Light Gray",
  "#D8BFD8": "Thistle",
  "#D891EF": "Bright Lilac",
  "#A52A2A": "Brown",
  "#C04000": "Mahogany",
  "#7FFF00": "Chartreuse",
  "#66CDAA": "Medium Aquamarine",
  "#0000CD": "Medium Blue",
  "#BA55D3": "Medium Orchid",
  "#9370DB": "Medium Purple",
  "#3CB371": "Medium Sea Green",
  "#7B68EE": "Medium Slate Blue",
  "#00FA9A": "Medium Spring Green",
  "#48D1CC": "Medium Turquoise",
  "#C71585": "Medium Violet Red",
  "#191970": "Midnight Blue",
  "#004953": "Midnight Green",
  "#F5FFFA": "Mint Cream",
  "#FFE4E1": "Blush Pink",
  "#FFE4B5": "Moccasin",
  "#B57EDC": "Lavender Mist",
  "#CBAACB": "Lavender",
  "#E6E6FA": "Lavender", // duplicate name, different hex
  "#FFF0F5": "Lavender Blush",
  "#C3B1E1": "Lavender Gray",
  "#7CFC00": "Lawn Green",
  "#FFFACD": "Lemon Chiffon",
  "#FDFF00": "Lemon Yellow",
  "#90EE90": "Light Green",
  "#FFB6C1": "Light Pink",
  "#FFA07A": "Light Salmon",
  "#FAFAD2": "Light Goldenrod Yellow",
  "#ADD8E6": "Light Blue",
  "#E0FFFF": "Light Cyan",
  "#87CEFA": "Light Sky Blue",
  "#778899": "Light Slate Gray",
  "#FFFFE0": "Light Yellow",
  "#20B2AA": "Light Sea Green",
  "#F08080": "Light Coral",
  "#B0C4DE": "Dusty Blue",
  "#B0E0E6": "Powder Blue",
  "#A020F0": "Violet",
  "#DB7093": "Pale Violet Red",
  "#AFEEEE": "Pale Turquoise",
  "#98FB98": "Pale Green",
  "#EEE8AA": "Pale Goldenrod",
  "#C9C0BB": "Pale Silver",
  "#FFEFD5": "Papaya Whip",
  "#FFDAB9": "Peach",
  "#CD853F": "Peru",
  "#EAEAEA": "Pearl",
  "#FDF5E6": "Old Lace",
  "#000000": "Black",
  "#000080": "Navy",
  "#0000FF": "Blue",
  "#1C1CF0": "True Blue",
  "#4F86F7": "Blueberry",
  "#8A2BE2": "Blue Violet",
  "#9932CC": "Dark Orchid",
  "#4682B4": "Steel Blue",
  "#4169E1": "Royal Blue",
  "#6A0DAD": "Royal Purple",
  "#8E4585": "Twilight Lavender",
  "#B284BE": "African Violet",
  "#C8A2C8": "Lilac",
  "#B76BA3": "Mulberry",
  "#DA70D6": "Orchid",
  "#DDA0DD": "Plum",
  "#E97451": "Terracotta",
  "#E30B5D": "Raspberry",
  "#F88379": "Coral Pink",
  "#CD5C5C": "Indian Red",
  "#DC143C": "Crimson",
  "#F0E68C": "Khaki",
  "#D2B48C": "Tan",
  "#B22222": "Firebrick",
  "#DAA520": "Goldenrod",
  "#B8860B": "Dark Goldenrod",
  "#FF4500": "Orange Red",
  "#FFA500": "Orange",
  "#F4A460": "Sandy Brown",
  "#DEB887": "Burlywood",
  "#A0522D": "Sienna",
  "#8B4513": "Saddle Brown",
  "#F5DEB3": "Wheat",
  "#F5F5DC": "Beige",
  "#FA8072": "Salmon",
  "#FF69B4": "Hot Pink",
  "#FF1493": "Deep Pink",
  "#00BFFF": "Deep Sky Blue",
  "#1E90FF": "Dodger Blue",
  "#1560BD": "Denim Blue",
  "#87CEEB": "Sky Blue",
  "#00FF00": "Lime",
  "#32CD32": "Lime Green",
  "#ADFF2F": "Green Yellow",
  "#7CFC00": "Lawn Green", // already present
  "#228B22": "Forest Green",
  "#2E8B57": "Sea Green",
  "#8FBC8F": "Dark Sea Green", // already present
  "#93C572": "Pistachio",
  "#00FF7F": "Spring Green",
  "#008000": "Green",
  "#008080": "Teal",
  "#00FFFF": "Cyan",
  "#E5E4E2": "Platinum",
  "#BFC1C2": "Ash Gray",
  "#C5C5C5": "Silver Chalice",
  "#C0C0C0": "Silver",
  "#DCDCDC": "Gainsboro",
  "#F8F8FF": "Ghost White",
  "#FFFAF0": "Floral White",
  "#FFFFF0": "Ivory",
  "#F0FFF0": "Honeydew",
  "#FFF5EE": "Seashell",
  "#FFFAFA": "Snow",
  "#F5F5F5": "White Smoke",
  "#FFFFFF": "White",
  "#9ACD32": "Yellow Green",
  "#FFFF00": "Yellow",
  "#FFD700": "Sunflower Yellow",
  "#0ABAB5": "Tiffany Blue",
  "#6B8E23": "Olive Drab",
  "#808000": "Olive",
  "#800000": "Maroon",
  "#808080": "Gray",
  "#696969": "Dim Gray",
  "#708090": "Slate Gray",
  "#4B0082": "Indigo",
  "#A2C2E2": "Pale Blue",
  "#73C2FB": "Maya Blue",
  "#0F52BA": "Sapphire Blue",
  "#003366": "Oxford Blue",
  "#BF00FF": "Electric Purple",
  "#ff99ff": "Bright Pink",
  "#b8deff": "Light Blue",
  "#D1B6A8": "Clam Shell",
  "#B0B6D7":"Perano",
  "#A8D1CA":"Sinbad",
  "#D1A8C4":"Maverick",
  "#C4D1A8":"Pale Leaf",
  "#d1a8af":"Pale Chestnut",
  "#D1CAA8":"Parchment",
  "#5500FF":"Electric Indigo",
  "#008060":"Tropical Rain Forest",
  "#046236":"Fun Green",
  "#306204": "Verdun Green",
  "#360462": "Christalle",
  "#2B2B4F": "Lucky Point",
  "#4F2B3D": "Barossa",
  "#4F2B2B": "Espresso",
  "#4F3D2B": "Deep Bronze",
  "#3D4F2B": "Mallard",
  "#4F4F2B": "Waiouru",
  "#2C3E50": "Maddison",
  "#8D4460": "Cadillac",
  "#858D44": "Wasabi",
  "#608D44": "Dingley",
  "#448D4C": "Killarney",
  "#448D71": "Viridian",
  "#44858D": "Paradiso",
  "#71448D": "Affair",
  "#8E4585": "Plum",
  "#FADBEE": "Pig Pink",
  "#FAE7DB": "Chardon",
  "#DEFADB": "Tara",
  "#DBFAE7": "Cosmic Latte",
  "#DBEEFA": "Pattens Blue",
  "#AACBBA": "Nebula",
  "#AACBAA": "Zanah",
  "#9999FF": "Portage",
  "#CC99FF": "Mauve",
  "#FF99CC": "Carnation Pink",
  "#FF9999": "Mona Lisa",
  "#CCFF99": "Reef",
  "#B8FFD9": "Magic Mint",
  "#B8DEFF": "Pale Cornflower Blue",
  "#5a87e2": "Cornflower Blue",
  "#E25A87": "Dark Pink",
  "#802000": "Falu Red",
  "#800060": "Eggplant",
  "#CCBB00": "Bird Flower",
  "#00CC55": "Malachite",
  "#0077CC": "Navy Blue",
  "#CC0011": "Venetian Red",
  "#5500CC": "Purple Heart",
  "#CC5500": "Burnt Orange",
  "#620430": "Tyrian Purple",
  "#2C3E50": "Navy Blue"


};

  const hexToRgb = hex => {

    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    return [r, g, b];

  };

const distance = (rgb1, rgb2) =>
    Math.sqrt(
        Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );

  const inputRgb = hexToRgb(hex);
  let closestColor = null;
  let minDistance = Infinity;

  for (const [namedHex, name] of Object.entries(namedColors)) {
    const namedRgb = hexToRgb(namedHex);
    const d = distance(inputRgb, namedRgb);
    if (d < minDistance) {
      minDistance = d;
      closestColor = name;
    }
  }

  return closestColor || "Unknown";

}

// Convert HSL to hex
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

//hsl to hex
function hslToHex(h, s, l) {

  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = v => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

//get color suggestions
function getDesignColorSuggestions(hex) {

  const [h, s, l] = hexToHsl(hex);

  return {

    base: hex,
    complementary: hslToHex((h + 180) % 360, s, l),
    analogous: [
      hslToHex((h + 30) % 360, s, l),
      hslToHex((h - 30 + 360) % 360, s, l)
    ],
    triadic: [
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l)
    ],
    splitComplementary: [
      hslToHex((h + 150) % 360, s, l),
      hslToHex((h - 150 + 360) % 360, s, l)
    ]
  };
  
}



export { generateAccents , hslToHex, hexToHSL, getContrastTextColor, getColorNameFromHex, getDesignColorSuggestions }