import React, { useState } from 'react';

// Each style now includes a description and guest attire guidance
export const weddingStyles = {
  Traditional: [
    { 
      value: 'Traditional', 
      description: 'A classic wedding with timeless traditions and formalities. Attire: Formal suits and elegant dresses are expected.' 
    },
    { 
      value: 'Formal', 
      description: 'A sophisticated event with elegant attire and a structured schedule. Attire: Tuxedos and floor-length gowns are recommended.' 
    },
    { 
      value: 'Black Tie', 
      description: 'We invite you all to indulge in your most gorgeous, show-stopping attire. We want our guests to feel as comfortable and fabulous as possible in something they really love. Attire: Black tie (tuxedos, formal evening gowns).' 
    },
    { 
      value: 'Religious Ceremony', 
      description: 'A ceremony rooted in religious traditions and customs. Attire: Modest, respectful clothing appropriate for the religious setting.' 
    },
    { 
      value: 'Ballroom', 
      description: 'A grand celebration in a luxurious ballroom setting. Attire: Formal or black tie.' 
    }
  ],
  Modern: [
    { value: 'Minimalist', description: 'Clean lines, simple décor, and a focus on elegance through simplicity. Attire: Modern, chic, and understated.' },
    { value: 'Urban/City Chic', description: 'A stylish celebration in a modern city venue. Attire: Trendy cocktail attire or sleek suits.' },
    { value: 'Art Deco', description: 'Glamorous 1920s-inspired style with geometric patterns and metallics. Attire: Vintage-inspired formalwear, flapper dresses, and sharp suits.' },
    { value: 'Contemporary', description: 'Current trends and innovative details for a fresh look. Attire: Fashion-forward, semi-formal.' },
    { value: 'Industrial', description: 'Raw, urban spaces with exposed brick, metal, and modern touches. Attire: Smart casual or modern formal.' }
  ],
  Romantic: [
    { value: 'Fairy Tale', description: 'A magical, storybook-inspired celebration. Attire: Formal, whimsical, or pastel-colored dresses and suits.' },
    { value: 'Garden Party', description: 'An outdoor event surrounded by lush gardens and florals. Attire: Light, floral dresses and summer suits.' },
    { value: 'Whimsical', description: 'Playful, imaginative details for a dreamy atmosphere. Attire: Fun, colorful, or unique formalwear.' },
    { value: 'Soft & Dreamy', description: 'Pastel colors, soft textures, and ethereal décor. Attire: Light, airy dresses and soft-toned suits.' },
    { value: 'Vintage Romance', description: 'Old-world charm with antique details and romantic touches. Attire: Vintage-inspired formalwear.' }
  ],
  Rustic: [
    { value: 'Barn Wedding', description: 'A cozy, countryside celebration in a barn setting. Attire: Semi-formal, sundresses, and dress shirts (heels not required).' },
    { value: 'Country', description: 'Down-to-earth style with rural charm and comfort. Attire: Smart casual, boots and hats optional.' },
    { value: 'Boho Rustic', description: 'A blend of bohemian and rustic elements for a relaxed vibe. Attire: Boho dresses, relaxed suits, and natural fabrics.' },
    { value: 'Woodland/Forest', description: 'Nature-inspired with forest backdrops and organic décor. Attire: Earthy tones, comfortable shoes.' },
    { value: 'Farmhouse', description: 'Homey, welcoming style with farmhouse details. Attire: Casual or semi-formal.' }
  ],
  Bohemian: [
    { value: 'Free-Spirited', description: 'Carefree, eclectic style with vibrant colors and patterns. Attire: Flowy, boho dresses and relaxed suits.' },
    { value: 'Eclectic', description: 'A mix of styles, textures, and influences for a unique look. Attire: Expressive, colorful, and creative.' },
    { value: 'Earthy', description: 'Natural materials and earthy tones for a grounded feel. Attire: Natural fabrics, earth-toned outfits.' },
    { value: 'Outdoor Boho', description: 'Bohemian style set in the great outdoors. Attire: Comfortable, boho-chic.' },
    { value: 'Festival-Inspired', description: 'Fun, music-festival vibes with relaxed seating and décor. Attire: Festival wear, comfortable and colorful.' }
  ],
  'Beach & Coastal': [
    { value: 'Beachfront', description: 'A wedding right on the sand with ocean views. Attire: Light, breathable fabrics, sandals or barefoot.' },
    { value: 'Tropical', description: 'Lush greenery, bright florals, and island vibes. Attire: Tropical prints, linen, and summer dresses.' },
    { value: 'Nautical', description: 'Maritime details and a blue-and-white color palette. Attire: Nautical-inspired, smart casual.' },
    { value: 'Coastal Chic', description: 'Elegant beach style with soft colors and breezy décor. Attire: Semi-formal, light colors.' }
  ],
  Glamorous: [
    { value: 'Luxury', description: 'Opulent details, high-end décor, and lavish touches. Attire: Black tie or formal eveningwear.' },
    { value: 'Hollywood Glam', description: 'Red carpet style with dramatic flair and sparkle. Attire: Glamorous gowns and tuxedos.' },
    { value: 'Gold & Glitz', description: 'Shimmering gold accents and glamorous décor. Attire: Sparkling, formal attire.' },
    { value: 'Crystal Accents', description: 'Sparkling crystals for a dazzling effect. Attire: Elegant, shimmering outfits.' }
  ],
  'Cultural & Themed': [
    { value: 'Cultural Fusion', description: 'Blending traditions from multiple cultures. Attire: Traditional dress from your culture or formalwear.' },
    { value: 'Destination Wedding', description: 'A celebration in a unique or faraway location. Attire: As specified by the couple, often semi-formal or themed.' },
    { value: 'Vintage Era (20s/50s/etc.)', description: 'Inspired by a specific historical period. Attire: Vintage clothing from the era or formalwear.' },
    { value: 'Fantasy or Fandom Inspired', description: 'Themes from favorite books, movies, or games. Attire: Themed costumes or formalwear.' },
    { value: 'Traditional Ethnic (e.g., Indian, Chinese, Nigerian)', description: 'Honoring specific cultural wedding customs. Attire: Traditional ethnic dress or formalwear.' }
  ],
  'Casual & Fun': [
    { value: 'Backyard Wedding', description: 'A relaxed celebration at home or in a private garden. Attire: Casual or smart casual.' },
    { value: 'Elopement', description: 'An intimate ceremony with just the couple or a few guests. Attire: As comfortable as you wish.' },
    { value: 'Brunch Wedding', description: 'A daytime event with breakfast or brunch fare. Attire: Daytime semi-formal or dressy casual.' },
    { value: 'Pop-Up Wedding', description: 'A spontaneous, small-scale celebration. Attire: As specified by the couple.' },
    { value: 'DIY', description: 'Handmade details and personal touches throughout. Attire: Casual or semi-formal.' }
  ],
  Seasonal: [
    { value: 'Spring Garden', description: 'Fresh blooms and pastel colors for a springtime feel. Attire: Light, floral dresses and suits.' },
    { value: 'Summer Tropical', description: 'Bright, sunny style with tropical accents. Attire: Summer dresses, linen suits.' },
    { value: 'Autumn Harvest', description: 'Warm colors and rustic décor for fall. Attire: Warm tones, semi-formal.' },
    { value: 'Winter Wonderland', description: 'Sparkling whites and silvers for a magical winter event. Attire: Formal, with warm layers.' }
  ]
};

export const religiousCeremonyTypes = [
  { value: 'Christian', description: 'A ceremony following Christian traditions, which may include readings from the Bible, hymns, and prayers.' },
  { value: 'Jewish', description: 'A ceremony rooted in Jewish customs, such as the signing of the Ketubah, chuppah, and breaking of the glass.' },
  { value: 'Muslim', description: 'A ceremony based on Islamic traditions, often including the Nikah contract and Quranic readings.' },
  { value: 'Hindu', description: 'A vibrant ceremony with rituals such as the Saptapadi, fire offerings, and blessings from elders.' },
  { value: 'Buddhist', description: 'A peaceful ceremony with chanting, offerings, and blessings for the couple’s future.' },
  { value: 'Sikh', description: 'A ceremony held in a Gurdwara, featuring prayers, hymns, and the Anand Karaj.' },
  { value: 'Interfaith', description: 'A ceremony blending elements from multiple faiths, honoring both traditions.' },
  { value: 'Other', description: 'A ceremony based on other religious or spiritual traditions, or customized to the couple’s beliefs.' }
];

export default function WeddingStyleDropdown(props) {

  const handleChange = props.handleChange;
  const weddingStyleSelected = props.weddingStyle || '';
  const religousTypeSelected = props.religiousType || '';
  const weddingStyleDescription = props.weddingStyleDescription || '';
  const getColor = props.getColor;
  const styleEmpty = props.styleEmpty;
  const initialEmptyCheck = props.initialEmptyCheck;

   // Find the description for the selected style
  const getSelectedDescription = (item) => {

    for (const styles of Object.values(weddingStyles)) {

      const found = styles.find(styleObj => styleObj.value === item);
      if (found) return found.description;

    }

    return '';

  };

  // Find the description for the submitted religious type value
  const getSelectedDescriptionReligeon = (value) => {

      const found = religiousCeremonyTypes.find(type => type.value === value);
      return found ? found.description : '';

  };


  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(weddingStyleSelected || '');
  const [religiousType, setReligiousType] = useState(religousTypeSelected ||'');
  const [description, setDescription] = useState(getSelectedDescription(selectedStyle));

  if(description !== weddingStyleDescription && weddingStyleDescription !== "" ){

    setDescription(weddingStyleDescription);

  }

  const onStyleChange = (e) => {

    const selected = e.target.value;
    const category = e.target.options[e.target.selectedIndex].parentNode.label;
        
    setSelectedCategory(category);
    setSelectedStyle(selected);
    const description = getSelectedDescription(selected);
    setDescription(description);

    if (selected !== 'Religious Ceremony') {

      setReligiousType('');
      handleChange([{ target: { name: 'weddingStyleCategory', value: category, className: 'style weddingDetails' } }, 
                    { target: { name: 'weddingStyle', value: selected, className: 'style weddingDetails' } }, 
                    { target: { name: 'styleDescription', value: description, className: 'description weddingDetails' } },
                    { target: { name: 'religiousType', value: 'Humanist', className: 'style weddingDetails' } }]);

    }else{

      handleChange([{ target: { name: 'weddingStyleCategory', value: category, className: 'style weddingDetails' } }, 
                    { target: { name: 'weddingStyle', value: selected, className: 'style weddingDetails' } }, 
                    { target: { name: 'styleDescription', value: description, className: 'description weddingDetails' } },
                    { target: { name: 'religiousType', value: '', className: 'style weddingDetails' } }]);
                    
    }

  };

  const onReligiousChange = (e) => {

    const selected = e.target.value;
    setReligiousType(selected);
    const description = getSelectedDescriptionReligeon(selected);
    onDescriptionChange({ target: { name: 'styleDescription', value: description, className: "description weddingDetails" } },true)
    handleChange([e,{ target: { name: 'styleDescription', value: description, className: "description weddingDetails" } }]);

  };

  const onDescriptionChange = (e, updated=false) => {

    setDescription(e.target.value);

    if(!updated){

      handleChange(e);

    }

  }

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



        <div className="col-12">

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
                    {styles.map((styleObj) => (
                      <option key={styleObj.value} value={styleObj.value}>
                        {styleObj.value}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          
        </div>

        {selectedStyle === 'Religious Ceremony' && (

         
            <div className=' col-12'>
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
                    <option key={type.value} value={type.value}>
                      {type.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          

        )}


       

      </div>

       {/* Show description for the selected style */}
          {selectedStyle && getSelectedDescription(selectedStyle) && (

            <div className="row">
                
              <div className="col-12">

                <div className="style-description" style={{marginTop: '0.5em', color: '#555'}}>
                  <label>Style description:</label>
                  <textarea name="styleDescription" className="description weddingDetails" onInput={ onDescriptionChange } style={{width: "calc(100% - 25px)"}} value={ description }></textarea>
                </div>

              </div>

            </div>

          )}
    </>


  );
}
