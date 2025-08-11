import React, { useState } from "react";
import { splitByCapitalNums, toProperCase } from "../../Wigits/dataFunctions";
import { saveGuestListItem } from "../../Wigits/dataFunctions-guestList";
import { saveBridalPartyClothing } from "../../Wigits/dataFunctions-bridalParty";

const WeddingClothingForm = (props) => {

  const [display, setDisplay] = useState("none");
  const sizeSystem = props.sizeSystem || "UK"; // Default to UK if not provided
  const gender = props.gender;
  const getColor = props.getColor;
  const religiousType = props.religiousType || 'Humanist';
  const role = props.role ? props.role.toLowerCase() : "";
  const guestList = props.guestList;
  const index = parseInt(props.index);
  const checkEmpty = props.checkEmpty; // Fallback to a no-op if not provided
  const bridalParty = props.bridalParty;
  const selection = props.selection;
 
  const disableItem = props.disableItem;

  const location = props.location || "guests";
  const weddingClothingSizes = props.weddingClothingSizes;

  let object;
  let name = props.name;

  if(guestList === null || index === null) {

    object = {};

  }else{

    if(location === "bridalParty"){

      object = guestList.clothing || {};

    }else{

      object = guestList.list[index].clothing || {};

    }

  }

  // Initialize formData with existing values or empty object
  const [formData, setFormData] = useState(object);
  let filteredFieldsNum = 0;


  // Utility to extract fields by gender match
  const getFilteredFields = () => {

    const filtered = {};
    const list = weddingClothingSizes.properties;

    Object.entries(list).forEach(([sectionKey, sectionValue]) => {

      if (sectionValue.type === "object" && sectionValue.properties) {
        // Filter fields within the section by genderFilter
        const filteredFields = {};
        Object.entries(sectionValue.properties).forEach(([fieldKey, fieldValue]) => {
          // Hide ringSize unless role is bride or groom
          if (
            (fieldKey === "ringSize" && !(role === "bride" || role === "groom")) ||
            fieldKey === "genderType" ||
            (!fieldValue.genderFilter || fieldValue.genderFilter.includes(gender))
          ) {
            // Only add ringSize if bride or groom, otherwise skip
            if (fieldKey === "ringSize" && !(role === "bride" || role === "groom")) {
              return;
            }
            filteredFields[fieldKey] = fieldValue;
          }
        });
        // Only add section if it has at least one field (other than genderType)
        if (Object.keys(filteredFields).some(f => f !== "genderType")) {
          filtered[sectionKey] = filteredFields;
          filteredFieldsNum += 1;
        }
      }
    });

    return filtered;

  };

  const filteredSections = getFilteredFields();

  const handleChange = (e, section, field) => {

    const value = e.target.value; // Use target directly if it's a string

    checkEmpty(e.target);

    const newObject = { ...formData };

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Update the local newObject similar to setFormData structure
    newObject[section] = {
      ...newObject[section],
      [field]: value,
    };

    if(location === "bridalParty"){

      saveBridalPartyClothing(bridalParty, selection, "clothing", newObject);

    }else{

      // Save the updated guest list item
      saveGuestListItem(guestList, index, "clothing", newObject);

    }

    


    
   
  };

  const displayClothing = () => {

    const getIcon = document.getElementById("addClothingIcon");

    if(display === ""){

        setDisplay("none");
        getIcon.className = "fa fa-circle-plus iconHeader2";

    }else{

        setDisplay("");
        getIcon.className = "fa fa-circle-minus iconHeader2";

    }


  }

  return (

    <>

    <h2 onClick={ displayClothing } style={{width: "100%"}}><i onClick={ displayClothing } id="addClothingIcon" className="fa fa-circle-plus iconHeader2"></i>{ disableItem ? "Your wedding clothing sizes" : name + " wedding clothing sizes"}</h2>

    <form id="clothingForm" style={{ display: display }}>

      { filteredFieldsNum === 1 ? <p style={{width:"100%"}}>Please ensure that role and gender are set for clothing to be set.</p> : "" }

      {Object.entries(filteredSections).map(([section, fields]) => {

        if (section === "culturalAttire" && religiousType === "Humanist" ) return null;
        
        return(
          
          <fieldset key={section} style={{ display: display}}>

            <legend>{section}</legend>

            {Object.entries(fields).map(([field, config]) => {

              if (field === "genderType" || field === "religion" || field === "religiousType") return null;

              // If this field is region-based (has properties for size systems)
              if (config.properties && ["US", "UK", "EU", "AU", "JP", "CN", "KR"].some(sys => config.properties[sys])) {

                const sysConfig = config.properties[sizeSystem];
            
                if (!sysConfig) return null; // If no config for current sizeSystem, skip

                return (

                  <div key={field} style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
                    <label htmlFor={`${section}_${field}`} className="labelText">
                      {toProperCase(splitByCapitalNums(field))} { (config.measurementType ? ` (${config.measurementType})` : "")}
                    </label>

                    <select
                      id={`${section}_${field}`}
                      className="guestClothing"
                      style={getColor(formData[section]?.[field] || "")}
                      value={formData[section]?.[field] || ""}
                      onChange={(event) => handleChange(event, section, field)}
                    >
                    
                      <option value="" hidden className="noOption">
                        please select {splitByCapitalNums(field).toLowerCase()}... (required)
                      </option>
                      {sysConfig.enum.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                  </div>

                );

              }

              let renderField

              if(section === "culturalAttire" && religiousType !== "Humanist") {

                renderField = config.religionFilter.includes(religiousType);

              }else{

                renderField = true;

              }

              // If enum exists, render dropdown
              if (Array.isArray(config.enum) && renderField) {

                return (

                  <div key={field} style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
                    <label htmlFor={`${section}_${field}`} className="labelText">
                      {toProperCase(splitByCapitalNums(field))} { (config.measurementType ? ` (${config.measurementType})` : "")}
                    </label>
                    <select
                      id={`${section}_${field}`}
                      className="guestClothing"
                      style={getColor(formData[section]?.[field] || "")}
                      value={formData[section]?.[field] || ""}
                      onChange={(event) => handleChange(event, section, field)}
              
                    >
                      <option value="" hidden className="noOption">
                        please select {splitByCapitalNums(field).toLowerCase()}... (required)
                      </option>
                      {config.enum.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );

              }

              if(renderField === false) return null;

                // Default to text input
                const placeholder =
                  config.sizeSystem && config.sizeSystem[sizeSystem]
                    ? `Enter ${splitByCapitalNums(field).toLowerCase()} (${sizeSystem})`
                    : field + " " + (config.description || "");

                return (

                  <div key={field} style={{ width: "100%", marginBottom: "10px", marginTop: "10px" }}>
                    <label htmlFor={`${section}_${field}`} className="labelText">
                      {toProperCase(splitByCapitalNums(field))} { (config.measurementType ? ` (${config.measurementType})` : "")}
                    </label>
                    <input
                      type="text"
                      id={`${section}_${field}`}
                      className="inputBox3"
                      placeholder={placeholder}
                      value={formData[section]?.[field] || ""}
                      onChange={(event) => handleChange(event, section, field)}
                    />
                  </div>

                );

              }

            )}

          </fieldset>

        )})
      }

    </form>

    </>

  );
};

export default WeddingClothingForm;