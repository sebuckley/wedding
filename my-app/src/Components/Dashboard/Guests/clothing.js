import React, { useState } from "react";
import { weddingClothingSizes } from "../../App/wedding_clothing_sizes_schema_with_gender";
import { splitByCapitalNums, toProperCase } from "../../Wigits/dataFunctions";
import { saveGuestListItem } from "../../Wigits/dataFunctions-guestList";

const WeddingClothingForm = (props) => {

  const sizeSystem = props.sizeSystem || "UK"; // Default to UK if not provided
  const gender = props.gender;
  const getColor = props.getColor;
  const religiousType = props.religiousType || 'Humanist';
  const role = props.role ? props.role.toLowerCase() : "";
  const guestList = props.guestList;
  const index = props.index;
  const checkEmpty = props.checkEmpty; // Fallback to a no-op if not provided
  let object;

  if(guestList === null || index === null) {

    object = {};

  }else{

    object = guestList.list[index].clothing || {};

  }

  // Initialize formData with existing values or empty object
  const [formData, setFormData] = useState(object);


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

    // Save the updated guest list item
    saveGuestListItem(guestList, index, "clothing", newObject);
    
   
  };

  return (

    <form id="clothingForm">
      <h2 style={{width: "100%"}}>Wedding Clothing Sizes</h2>

      {Object.entries(filteredSections).map(([section, fields]) => {

        if (section === "culturalAttire" && religiousType === "Humanist" ) return null;
        
        return(
          
          <fieldset key={section}>
            <legend>{section}</legend>

            {Object.entries(fields).map(([field, config]) => {

              if (field === "genderType" || field === "religion") return null;

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

            })}

          </fieldset>

        )})
      }

    </form>

  );
};

export default WeddingClothingForm;