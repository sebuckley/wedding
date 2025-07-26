import React from 'react';
import { getColorNameFromHex, getDesignColorSuggestions, getContrastTextColor} from '../../Wigits/colors';

const ColorSwatch = ({ label, color }) => (

  <div style={{
    backgroundColor: color,
    color: getContrastTextColor(color, { fontSize: "1em", fontWeight: "bolder" }),
    padding: '1rem',
    margin: '0.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    flex: '1 1 120px'

  }}>

    <strong>{label}</strong>
    <div>{color}</div>
  </div>

);

const getThisName = (c, i) => {

    const name = getColorNameFromHex(c);
    return name;

}


export default function ColorPalettePreview({ hex }) {

  const palette = getDesignColorSuggestions(hex);

  return (

    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Design Palette for {getColorNameFromHex(hex)}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ColorSwatch label={ getColorNameFromHex(palette.base) } color={palette.base} />
        <ColorSwatch label={ getColorNameFromHex(palette.complementary) } color={palette.complementary} />
        {palette.analogous.map((c, i) => (
          <ColorSwatch key={i} label={ getThisName(c, i) } color={c} />
        ))}
        {palette.triadic.map((c, i) => (
          <ColorSwatch key={i} label={getThisName(c, i)} color={c} />
        ))}
        {palette.splitComplementary.map((c, i) => (
          <ColorSwatch key={i} label={getThisName(c, i)} color={c} />
        ))}
      </div>
    </div>

  );
}