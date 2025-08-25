import React, { useState } from 'react';

const weddingStyles = {
  Traditional: [
    'Traditional',
    'Formal',
    'Black Tie',
    'Religious Ceremony',
    'Ballroom'
  ],
  Modern: [
    'Minimalist',
    'Urban/City Chic',
    'Art Deco',
    'Contemporary',
    'Industrial'
  ],
  Romantic: [
    'Fairy Tale',
    'Garden Party',
    'Whimsical',
    'Soft & Dreamy',
    'Vintage Romance'
  ],
  Rustic: [
    'Barn Wedding',
    'Country',
    'Boho Rustic',
    'Woodland/Forest',
    'Farmhouse'
  ],
  Bohemian: [
    'Free-Spirited',
    'Eclectic',
    'Earthy',
    'Outdoor Boho',
    'Festival-Inspired'
  ],
  'Beach & Coastal': [
    'Beachfront',
    'Tropical',
    'Nautical',
    'Coastal Chic'
  ],
  Glamorous: [
    'Luxury',
    'Hollywood Glam',
    'Gold & Glitz',
    'Crystal Accents'
  ],
  'Cultural & Themed': [
    'Cultural Fusion',
    'Destination Wedding',
    'Vintage Era (20s/50s/etc.)',
    'Fantasy or Fandom Inspired',
    'Traditional Ethnic (e.g., Indian, Chinese, Nigerian)'
  ],
  'Casual & Fun': [
    'Backyard Wedding',
    'Elopement',
    'Brunch Wedding',
    'Pop-Up Wedding',
    'DIY'
  ],
  Seasonal: [
    'Spring Garden',
    'Summer Tropical',
    'Autumn Harvest',
    'Winter Wonderland'
  ]
};

// List of religious ceremony types
const religiousCeremonyTypes = [
  'Christian',
  'Jewish',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Sikh',
  'Interfaith',
  'Other'
];

export default function WeddingStyleDropdown(props) {

  const handleChange = props.handleChange;
  const weddingStyleSelected = props.weddingStyle || '';
  const religousTypeSelected = props.religiousType || '';
  const getColor = props.getColor;
  const styleEmpty = props.styleEmpty;
  const initialEmptyCheck = props.initialEmptyCheck;

  // Local state to track religious ceremony type
  const [selectedStyle, setSelectedStyle] = useState(weddingStyleSelected || '');
  const [religiousType, setReligiousType] = useState(religousTypeSelected ||'');

  const onStyleChange = (e) => {
    const selected = e.target.value;
    setSelectedStyle(selected);
    handleChange(e); // still call parent handler
    if (selected !== 'Religious Ceremony') {
      setReligiousType('');
    }
  };

  const onReligiousChange = (e) => {
    setReligiousType(e.target.value);
    // Optionally call a prop handler if needed
    handleChange(e);

  };

   const getStyleStatus = () => {

        let object;

        if(typeof initialEmptyCheck === "undefined"){

            initialEmptyCheck = false;

        }

        if(initialEmptyCheck === false){

            object = "";

        }else{

            if(styleEmpty === 0){

                object = <span className="countryCompleted completed">[Completed]</span>;
            }else{

                object = <span className="countryCompleted outstanding">[{ styleEmpty } Outstanding]</span>;
            }
        }

        return object;

    }

  return (
    <>
      <h2>Wedding Style { getStyleStatus() }</h2>

      <div className="row">

        <div className="inputGroup col-12">

          <label htmlFor="wedding-style">Select Wedding Style:</label>

          <div className="wedding-style-dropdown">
            <i className="fa-solid fa-person-dress icon"></i>
            <select
              id="wedding-style"
              style={getColor(selectedStyle)}
              className="guestType style weddingDetails"
              name="weddingStyle"
              onChange={onStyleChange}
              defaultValue={selectedStyle}
            >
              <option value="" hidden className="noOption">
                please select wedding style... (required)
              </option>
              {Object.entries(weddingStyles).map(([category, styles]) => (
                <optgroup key={category} label={category}>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

          </div>
        </div>

        

        {selectedStyle === 'Religious Ceremony' && (
        

          <div className='row'>

            <div className='inputGroup col-12'>
                
                <label htmlFor="religious-type">Select Religious Ceremony Type:</label>
                <div>
                  <i className="fa-solid fa-church icon"></i>
                  <select
                    id="religious-type"
                    className="guestType style weddingDetails"
                    name="religiousType"
                    
                    value={religiousType}
                    onChange={onReligiousChange}
                    style={getColor(religiousType)}
                  >
                    <option value="" hidden>
                      please select a religious type...
                    </option>
                    {religiousCeremonyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

            </div>
          </div>

        )}

      </div>
    </>
  );
}
