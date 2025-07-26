import { doc } from "firebase/firestore";
import React, { useState } from "react";

const countrySizePreferences = {
    // Americas
    "United States": { system: "US", region: "Americas", icon: "us" },
    Canada: { system: "US", region: "Americas", icon: "ca" },
    Mexico: { system: "US", region: "Americas", icon: "mx" },
    Brazil: { system: "EU", region: "Americas", icon: "br" },
    Argentina: { system: "EU", region: "Americas", icon: "ar" },
    Chile: { system: "EU", region: "Americas", icon: "cl" },
    Colombia: { system: "EU", region: "Americas", icon: "co" },
    Peru: { system: "EU", region: "Americas", icon: "pe" },
    Venezuela: { system: "EU", region: "Americas", icon: "ve" },
    "Costa Rica": { system: "US", region: "Americas", icon: "cr" },
    "El Salvador": { system: "US", region: "Americas", icon: "sv" },
    Guatemala: { system: "US", region: "Americas", icon: "gt" },
    Honduras: { system: "US", region: "Americas", icon: "hn" },
    Nicaragua: { system: "US", region: "Americas", icon: "ni" },
    Panama: { system: "US", region: "Americas", icon: "pa" },
    "Puerto Rico": { system: "US", region: "Americas", icon: "pr" },
    "Dominican Republic": { system: "US", region: "Americas", icon: "do" },
    "Trinidad and Tobago": { system: "US", region: "Americas", icon: "tt" },
    "Jamaica": { system: "US", region: "Americas", icon: "jm" },
    "Bahamas": { system: "US", region: "Americas", icon: "bs" },
    "Barbados": { system: "US", region: "Americas", icon: "bb" },
    "Uruguay": { system: "EU", region: "Americas", icon: "uy" },
    "Paraguay": { system: "EU", region: "Americas", icon: "py" },
    "Bolivia": { system: "EU", region: "Americas", icon: "bo" },
    Ecuador: { system: "EU", region: "Americas", icon: "ec" },

    // Africa
    "South Africa": { system: "UK", region: "Africa", icon: "za" },
    Nigeria: { system: "UK", region: "Africa", icon: "ng" },
    Egypt: { system: "EU", region: "Africa", icon: "eg" },
    Ethiopia: { system: "EU", region: "Africa", icon: "et" },
    Kenya: { system: "UK", region: "Africa", icon: "ke" },
    Ghana: { system: "UK", region: "Africa", icon: "gh" },
    Morocco: { system: "EU", region: "Africa", icon: "ma" },
    Algeria: { system: "EU", region: "Africa", icon: "dz" },
    Tunisia: { system: "EU", region: "Africa", icon: "tn" },
    Tanzania: { system: "UK", region: "Africa", icon: "tz" },
    Uganda: { system: "UK", region: "Africa", icon: "ug" },
    Sudan: { system: "EU", region: "Africa", icon: "sd" },
    Angola: { system: "EU", region: "Africa", icon: "ao" },
    Mozambique: { system: "EU", region: "Africa", icon: "mz" },
    Senegal: { system: "EU", region: "Africa", icon: "sn" },
    "Ivory Coast": { system: "EU", region: "Africa", icon: "ci" },
    Cameroon: { system: "EU", region: "Africa", icon: "cm" },
    Zimbabwe: { system: "UK", region: "Africa", icon: "zw" },

    // Europe
    "United Kingdom": { system: "UK", region: "Europe", icon: "gb" },
    Ireland: { system: "UK", region: "Europe", icon: "ie" },
    France: { system: "EU", region: "Europe", icon: "fr" },
    Germany: { system: "EU", region: "Europe", icon: "de" },
    Italy: { system: "EU", region: "Europe", icon: "it" },
    Spain: { system: "EU", region: "Europe", icon: "es" },
    Netherlands: { system: "EU", region: "Europe", icon: "nl" },
    Belgium: { system: "EU", region: "Europe", icon: "be" },
    Sweden: { system: "EU", region: "Europe", icon: "se" },
    Norway: { system: "EU", region: "Europe", icon: "no" },
    Denmark: { system: "EU", region: "Europe", icon: "dk" },
    Finland: { system: "EU", region: "Europe", icon: "fi" },
    Austria: { system: "EU", region: "Europe", icon: "at" },
    Portugal: { system: "EU", region: "Europe", icon: "pt" },
    Greece: { system: "EU", region: "Europe", icon: "gr" },
    Poland: { system: "EU", region: "Europe", icon: "pl" },
    Hungary: { system: "EU", region: "Europe", icon: "hu" },
    Czechia: { system: "EU", region: "Europe", icon: "cz" },
    Slovakia: { system: "EU", region: "Europe", icon: "sk" },
    Russia: { system: "EU", region: "Europe", icon: "ru" },
    Ukraine: { system: "EU", region: "Europe", icon: "ua" },
    Turkey: { system: "EU", region: "Europe", icon: "tr" },
    Switzerland: { system: "EU", region: "Europe", icon: "ch" },
    Romania: { system: "EU", region: "Europe", icon: "ro" },
    Bulgaria: { system: "EU", region: "Europe", icon: "bg" },
    Croatia: { system: "EU", region: "Europe", icon: "hr" },
    Serbia: { system: "EU", region: "Europe", icon: "rs" },
    Slovenia: { system: "EU", region: "Europe", icon: "si" },
    Estonia: { system: "EU", region: "Europe", icon: "ee" },
    Latvia: { system: "EU", region: "Europe", icon: "lv" },
    Lithuania: { system: "EU", region: "Europe", icon: "lt" },
    Luxembourg: { system: "EU", region: "Europe", icon: "lu" },

    // Asia
    Japan: { system: "JP", region: "Asia", icon: "jp" },
    China: { system: "CN", region: "Asia", icon: "cn" },
    "South Korea": { system: "KR", region: "Asia", icon: "kr" },
    India: { system: "UK", region: "Asia", icon: "in" },
    Pakistan: { system: "UK", region: "Asia", icon: "pk" },
    Bangladesh: { system: "UK", region: "Asia", icon: "bd" },
    Thailand: { system: "JP", region: "Asia", icon: "th" },
    Vietnam: { system: "JP", region: "Asia", icon: "vn" },
    Malaysia: { system: "EU", region: "Asia", icon: "my" },
    Indonesia: { system: "EU", region: "Asia", icon: "id" },
    Philippines: { system: "US", region: "Asia", icon: "ph" },
    Singapore: { system: "US", region: "Asia", icon: "sg" },
    "Saudi Arabia": { system: "EU", region: "Asia", icon: "sa" },
    UAE: { system: "EU", region: "Asia", icon: "ae" },
    Israel: { system: "EU", region: "Asia", icon: "il" },
    "Hong Kong": { system: "CN", region: "Asia", icon: "hk" },
    "Taiwan": { system: "CN", region: "Asia", icon: "tw" },
    "Sri Lanka": { system: "UK", region: "Asia", icon: "lk" },
    Nepal: { system: "UK", region: "Asia", icon: "np" },
    "Kazakhstan": { system: "EU", region: "Asia", icon: "kz" },
    "Uzbekistan": { system: "EU", region: "Asia", icon: "uz" },
    "Kuwait": { system: "EU", region: "Asia", icon: "kw" },
    "Qatar": { system: "EU", region: "Asia", icon: "qa" },
    "Oman": { system: "EU", region: "Asia", icon: "om" },
    "Jordan": { system: "EU", region: "Asia", icon: "jo" },
    "Lebanon": { system: "EU", region: "Asia", icon: "lb" },

    // Oceania
    Australia: { system: "AU", region: "Oceania", icon: "au" },
    "New Zealand": { system: "AU", region: "Oceania", icon: "nz" },
    Fiji: { system: "AU", region: "Oceania", icon: "fj" },
    "Papua New Guinea": { system: "AU", region: "Oceania", icon: "pg" },
    Samoa: { system: "AU", region: "Oceania", icon: "ws" },
    Tonga: { system: "AU", region: "Oceania", icon: "to" },
    Vanuatu: { system: "AU", region: "Oceania", icon: "vu" },
    "Solomon Islands": { system: "AU", region: "Oceania", icon: "sb" },
    "New Caledonia": { system: "AU", region: "Oceania", icon: "nc" },
};

function Flag({ countryCode = "ph", size = "28x21", alt = "Philippines Flag" }) {
  const src = `https://flagcdn.com/${size}/${countryCode.toLowerCase()}.png`;

  return (
    <img
      src={src}
      alt={alt}
      className="icon"
      width={size.split('x')[0]}
      height={size.split('x')[1]}
      style={{ borderRadius: 4 }}
    />
  );
}



const sizeCodes = {
  US: [
    "US 2",
    "US 4",
    "US 6",
    "US 8",
    "US 10",
    "US 12",
    "US 14",
    "US 16",
    "US 18",
    "US 20",
  ],
  UK: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18", "UK 20"],
  EU: [
    "EU 32",
    "EU 34",
    "EU 36",
    "EU 38",
    "EU 40",
    "EU 42",
    "EU 44",
    "EU 46",
  ],
  AU: ["AU 6", "AU 8", "AU 10", "AU 12", "AU 14", "AU 16", "AU 18", "AU 20"],
  JP: ["JP 5", "JP 7", "JP 9", "JP 11", "JP 13", "JP 15"],
  CN: ["CN 155", "CN 160", "CN 165", "CN 170", "CN 175"],
  KR: ["KR 44", "KR 55", "KR 66", "KR 77", "KR 88"],
};

const sizeSystems = ["UK", "US", "EU", "AU", "JP", "CN", "KR"];

    const SizePreferenceList = (props) => {

    const countrySelection = props.country || "";
    const sizeSystemSelection = props.sizeSystem || "";

    const [selectedCountry, setSelectedCountry] = useState(countrySelection);
    const [selectedCountryName, setSelectedCountryName] = useState(countrySelection);
    const [selectedSystem, setSelectedSystem] = useState(sizeSystemSelection); // Default to UK if not provided
    const [state, setState] = useState(0);
    const getColor = props.getColor;
    const handleChange = props.handleChange;

    // Sort countries but keep their original values as option values
    const sortedCountries = Object.keys(countrySizePreferences).sort();

    const handleCountryChange = (e) => {

        handleChange(e);
        let sizeSystem = countrySizePreferences[e.target.options[e.target.selectedIndex].text]?.system || "UK"; // Default to UK if not found
        setSelectedSystem(sizeSystem); // Set the selected system in state
        // Set the selected country name
        setSelectedCountryName(e.target.options[e.target.selectedIndex].text); // Get the text of the selected option
        setSelectedCountry(e.target.value); // Set country to selected option's text

        setState(state + 1); // Trigger re-render

        // Ensure handleChange is called for sizeSystem when country changes
        handleChange({ target: { value: sizeSystem, name: "sizeSystem", className: "weddingDetails" } });

    };

    const handleSystemChange = (e) => {
        
        handleChange(e);
        // Set the selected size system
        setSelectedSystem(e.target.value);
        
    };

    const codes = selectedSystem ? sizeCodes[selectedSystem] || [] : [];

    return (

       <>
            <h2 className="text-2xl font-bold mb-4">
                Country & Clothing Sizing System
            </h2>
            <div className="row">
                <div className="inputGroup col-12">

                    <label className="block mb-2 font-semibold">Select Country:</label>
                    <div>
                        { selectedCountryName !== "" ? <Flag countryCode={countrySizePreferences[selectedCountryName].icon} alt={ selectedCountryName + " flag" }/> : <i className="fa-solid fa-earth icon"></i> } 
                        <select
                            className="border px-3 py-2 rounded w-full guestType weddingDetails"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            style={getColor(selectedCountry)}
                            name="country"
                        >

                            <option value="" hidden className="noOption">please select country... (required)</option>
                            {sortedCountries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedCountry && (

                <div className="row">
                    <div className="inputGroup col-12">
                        <label className="block mb-2 font-semibold">
                            Select Clothing Size System:
                        </label>
                        <div>
                            <i className="fa-solid fa-shirt icon"></i>
                            <select
                                id="sizeSystem"
                                className="border px-3 py-2 rounded w-full guestType weddingDetails"
                                value={selectedSystem}
                                onChange={handleSystemChange}
                                style={getColor(selectedSystem)}
                                name="sizeSystem"
                            >
                                <option value="" hidden className="noOption">please select size system... (required)</option>
                                {sizeSystems.map((system) => (
                                    <option key={system} value={system}>
                                        {system}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            
         )}

        
        </>

      
       
    );

};

export default SizePreferenceList;
