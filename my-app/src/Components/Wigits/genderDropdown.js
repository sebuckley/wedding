import React from "react";

export const genderIdentities = [
  {
    label: "Male",
    description: "A man or boy; traditionally assigned male at birth (AMAB).",
    dressPreference: "masculine"
  },
  {
    label: "Female",
    description: "A woman or girl; traditionally assigned female at birth (AFAB).",
    dressPreference: "feminine"
  },
  {
    label: "Non-Binary",
    description: "A gender identity that is not exclusively male or female.",
    dressPreference: "varies"
  },
  {
    label: "Genderqueer",
    description: "A broad term for gender identities that are not strictly male or female.",
    dressPreference: "varies"
  },
  {
    label: "Genderfluid",
    description: "A person whose gender identity changes over time or depending on the situation.",
    dressPreference: "varies"
  },
  {
    label: "Agender",
    description: "Someone who identifies as having no gender or being gender-neutral.",
    dressPreference: "neutral"
  },
  {
    label: "Bigender",
    description: "Identifying as two genders, either simultaneously or switching between them.",
    dressPreference: "varies"
  },
  {
    label: "Demiboy",
    description: "Someone who partially identifies as a boy/man, regardless of assigned sex.",
    dressPreference: "masculine-leaning"
  },
  {
    label: "Demigirl",
    description: "Someone who partially identifies as a girl/woman.",
    dressPreference: "feminine-leaning"
  },
  {
    label: "Androgynous",
    description: "A mix or blending of male and female characteristics or presentation.",
    dressPreference: "neutral"
  },
  {
    label: "Neutrois",
    description: "A neutral or null gender identity.",
    dressPreference: "neutral"
  },
  {
    label: "Maverique",
    description: "A non-binary identity that is completely independent of male or female.",
    dressPreference: "neutral"
  },
  {
    label: "Polygender",
    description: "Identifying as multiple genders simultaneously.",
    dressPreference: "varies"
  },
  {
    label: "Pangender",
    description: "Identifying as all genders simultaneously.",
    dressPreference: "varies"
  },
  {
    label: "Third Gender",
    description: "A recognized gender outside the binary, found in some cultures.",
    dressPreference: "varies"
  },
  {
    label: "Two-Spirit",
    description: "A sacred identity in Indigenous North American cultures that combines gender, sexual, and spiritual identity.",
    dressPreference: "varies"
  },
  {
    label: "Aliagender",
    description: "A non-binary gender that does not fit within traditional understandings of male or female.",
    dressPreference: "neutral"
  },
  {
    label: "Intergender",
    description: "A gender identity that exists between male and female.",
    dressPreference: "neutral"
  },
  {
    label: "Transgender (Trans)",
    description: "A person whose gender identity differs from the sex assigned at birth.",
    dressPreference: "aligned with gender identity (varies)"
  },
  {
    label: "Cisgender (Cis)",
    description: "A person whose gender identity aligns with the sex assigned at birth.",
    dressPreference: "aligned with birth sex (masculine or feminine)"
  },
  {
    label: "Questioning",
    description: "Someone who is exploring or unsure about their gender identity.",
    dressPreference: "varies"
  },
  {
    label: "Hijra",
    description: "A traditional third gender in South Asia.",
    dressPreference: "feminine"
  },
  {
    label: "Fa'afafine",
    description: "A gender identity in Samoa, typically biologically male individuals who take on feminine roles.",
    dressPreference: "feminine"
  },
  {
    label: "Waria",
    description: "A traditional third gender identity in Indonesia.",
    dressPreference: "feminine"
  },
  {
    label: "Bakla",
    description: "A gender identity in the Philippines typically describing a feminine-presenting AMAB person.",
    dressPreference: "feminine"
  },
  {
    label: "Kathoei",
    description: "A gender identity in Thailand that often refers to trans women or effeminate gay men.",
    dressPreference: "feminine"
  }
];

const GenderDropdownWithDress = (props) => {

    const getColor = props.getColor;
    const onChange = props.onChange;
    const gender = props.value;

  return (

    <div className="w-full">
   
      <select
        id="gender"
        name="gender"
        style={ getColor(gender) }
        value={gender}
        onChange={onChange}
        className="guestType"
      >
        <option value="" hidden className="noOption">please select gender... (required)</option>
        {genderIdentities.map((gender) => (
          <option key={gender.label} value={gender.label}>
            {gender.label}
          </option>
        ))}
      </select>
    </div>

  );
};

export default GenderDropdownWithDress;
