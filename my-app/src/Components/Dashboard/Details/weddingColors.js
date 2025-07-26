import React, { useState } from 'react';
import { generateAccents , hslToHex, hexToHSL, getContrastTextColor, getColorNameFromHex } from '../../Wigits/colors';
import ColorPalettePreview from "./colorPallettePreview";

// Original wedding color data
const weddingColors = {

  Spring: [
    {
      name: "Blush Pink",
      hex: "#FADADD",
      accents: [
        { name: "Gold", hex: "#D4AF37" },
        { name: "Ivory", hex: "#FFFFF0" }
      ]
    },
    {
      name: "Lavender",
      hex: "#CBAACB",
      accents: [
        { name: "Sage Green", hex: "#B2AC88" },
        { name: "Silver", hex: "#C0C0C0" }
      ]
    },
    {
      name: "Mint Green",
      hex: "#98FF98",
      accents: [
        { name: "Peach", hex: "#FFDAB9" },
        { name: "White", hex: "#FFFFFF" }
      ]
    }
  ],
  Summer: [
    {
      name: "Peach",
      hex: "#FFDAB9",
      accents: [
        { name: "Coral", hex: "#FF7F50" },
        { name: "Aqua", hex: "#00FFFF" }
      ]
    },
    {
      name: "Dusty Blue",
      hex: "#A8C3D1",
      accents: [
        { name: "Cream", hex: "#FFFDD0" },
        { name: "Rose Gold", hex: "#B76E79" }
      ]
    },
    {
      name: "Sunflower Yellow",
      hex: "#FFD300",
      accents: [
        { name: "Navy Blue", hex: "#2C3E50" },
        { name: "White", hex: "#FFFFFF" }
      ]
    }
  ],
  Autumn: [
    {
      name: "Terracotta",
      hex: "#E2725B",
      accents: [
        { name: "Cream", hex: "#FFFDD0" },
        { name: "Olive Green", hex: "#808000" }
      ]
    },
    {
      name: "Burgundy",
      hex: "#800020",
      accents: [
        { name: "Blush Pink", hex: "#FADADD" },
        { name: "Champagne", hex: "#F7E7CE" }
      ]
    },
    {
      name: "Burnt Orange",
      hex: "#CC5500",
      accents: [
        { name: "Brown", hex: "#8B4513" },
        { name: "Gold", hex: "#D4AF37" }
      ]
    }
  ],
  Winter: [
    {
      name: "Emerald Green",
      hex: "#046307",
      accents: [
        { name: "Gold", hex: "#D4AF37" },
        { name: "White", hex: "#FFFFFF" }
      ]
    },
    {
      name: "Navy Blue",
      hex: "#2C3E50",
      accents: [
        { name: "Silver", hex: "#C0C0C0" },
        { name: "Ice Blue", hex: "#AFDBF5" }
      ]
    },
    {
      name: "Plum",
      hex: "#8E4585",
      accents: [
        { name: "Champagne", hex: "#F7E7CE" },
        { name: "Ivory", hex: "#FFFFF0" }
      ]
    }
  ]

};

const WeddingColorSelector = (props) => {

  const mainColor = props.mainColor;
  const accentColor = props.accentColor;
  const getColor = props.getColor;
  const handleChange = props.handleChange;
  let mainSelect;
  let customSelect;
  let custom;

  if(mainColor === "custom"){

     mainSelect = "";
     customSelect = mainColor;
     custom = true;

  }else{

    mainSelect = mainColor;
    customSelect = "";
    custom = false;

  }

  const [selectedColor, setSelectedColor] = useState(mainColor);
  const [useCustomColor, setUseCustomColor] = useState(custom);
  const [customColorHex, setCustomColorHex] = useState(customSelect);

  const allColors = Object.entries(weddingColors).flatMap(([season, colors]) =>

    colors.map(color => ({ ...color, season }))

  );

  console.log(selectedColor)

  const selectedColorObj = allColors.find(c => c.hex === selectedColor);

  console.log(selectedColorObj);


  return (

    <div>
      <h2>Wedding Color Selector</h2>

        <div className='row'>
            <div className='inputGroup col-12'>
                <i className="fa-solid fa-palette icon"></i>
                <select
                    value={selectedColor}
                    className='guestType weddingDetails'
                    name="mainColor"
                    style={ getColor(selectedColor) }
                    onChange={(e) => {

                        setSelectedColor(e.target.value);

                        if(e.target.value === "custom"){

                            setUseCustomColor(true);

                        }else{

                            handleChange(e);
                            setUseCustomColor(false);

                        }
                        
                    }}

                >
                    <option value="">Select Main Color</option>

                    
                    
                    {
                    
                        allColors.map(color => (

                            <option key={color.name} value={color.hex}>

                                {color.name}

                            </option>

                        ))

                    }

                    <option key="custom" value="custom">

                        {"Custom"}

                    </option>

                </select>

            </div>
        </div>


      {useCustomColor && (

        <>

        <div className='row'>

            <div className='inputGroup col-12 flexColorSelect'>

                    <div>Choose Custom Color:</div>
                    <div>
                        <input
                        type="color"
                        className="inputColor weddingDetails"
                        name="mainColor"
                        value={customColorHex}
                        onChange={(e) => setCustomColorHex(e.target.value)}
                        />
                   
                    </div>

            </div>

        </div>
                    

            <div className='row'>

                <div className='inputGroup col-12'>
                    
                    { customColorHex !== "#ffffff" && customColorHex !== "#000000" ?  <h3>Main Color</h3> : "" }
        
                    { customColorHex !== "#ffffff" && customColorHex !== "#000000" ?  <div className="colorChart" style={{ backgroundColor: customColorHex, padding: '10px', color: getContrastTextColor(customColorHex), fontWeight: "bold" }}>{ getColorNameFromHex(customColorHex) }</div> : "" }

                    { customColorHex !== "#ffffff" && customColorHex !== "#000000" ? <h4>Suggested Accent Colors:</h4> : "" }

                    { customColorHex !== "#ffffff" && customColorHex !== "#000000" ? <ColorPalettePreview hex={ customColorHex } /> : "" }

                

                </div>

            </div>

            </>

        )}

        {!useCustomColor && selectedColorObj && (

            <div className='row'>
                <div className='inputGroup col-12'>

                    <h3>Main Color</h3>

                    <div className="colorChart" style={{ backgroundColor: selectedColorObj.hex, padding: '10px', color: getContrastTextColor(selectedColorObj.hex), fontWeight: "bold" }}>
                        {selectedColorObj.name}
                    </div>
                    
                    <ColorPalettePreview hex={ selectedColorObj.hex } />
                
                </div>
            </div>

      )}

    </div>

  );
};

export default WeddingColorSelector;