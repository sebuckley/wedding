const weddingClothingSizes = {
  "type": "object",
  "title": "WeddingClothingSizes",
  "properties": {
    "fullName": {
      "type": "string",
      "description": "Full name of the participant"
    },
    "role": {
      "type": "string",
      "description": "Role in the wedding (e.g., Bride, Groom, Groomsman, etc.)"
    },
    "gender": {
      "type": "string",
      "enum": ["Male", "Female", "Non-binary", "Unisex", "Custom"],
      "description": "Gender identity of the participant"
    },
    "formalwear": {
      "type": "object",
      "properties": {
        "jacketSize": {
          "type": "object",
          "description": "Jacket size by region",
          "measurementType": "inches",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "properties": {
            "US": {
              "type": "string",
              "measurementType": "US suit size (inches)",
              "enum": ["34S", "36S", "38S", "40S", "42S", "44S", "36R", "38R", "40R", "42R", "44R", "46R", "38L", "40L", "42L", "44L", "46L"]
            },
            "UK": {
              "type": "string",
              "measurementType": "UK suit size (inches)",
              "enum": ["34S", "36S", "38S", "40S", "42S", "44S", "36R", "38R", "40R", "42R", "44R", "46R", "38L", "40L", "42L", "44L", "46L"]
            },
            "EU": {
              "type": "string",
              "measurementType": "EU suit size (cm)",
              "enum": ["44", "46", "48", "50", "52", "54", "56", "58", "60"]
            },
            "AU": {
              "type": "string",
              "measurementType": "AU suit size (cm)",
              "enum": ["88", "92", "96", "100", "104", "108", "112", "116", "120"]
            },
            "JP": {
              "type": "string",
              "measurementType": "JP suit size",
              "enum": ["S", "M", "L", "LL", "3L"]
            },
            "CN": {
              "type": "string",
              "measurementType": "CN suit size",
              "enum": ["165/84A", "170/88A", "175/92A", "180/96A", "185/100A"]
            },
            "KR": {
              "type": "string",
              "measurementType": "KR suit size",
              "enum": ["90", "95", "100", "105", "110"]
            }
          }
        },
        "dressSize": {
          "type": "object",
          "description": "Dress size by region",
          "measurementType": "dress size",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "properties": {
            "US": {
              "type": "string",
              "measurementType": "US dress size (numeric)",
              "enum": ["US 2", "US 4", "US 6", "US 8", "US 10", "US 12", "US 14", "US 16", "US 18", "US 20"]
            },
            "UK": {
              "type": "string",
              "measurementType": "UK dress size (numeric)",
              "enum": ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14", "UK 16", "UK 18", "UK 20"]
            },
            "EU": {
              "type": "string",
              "measurementType": "EU dress size (numeric)",
              "enum": ["EU 32", "EU 34", "EU 36", "EU 38", "EU 40", "EU 42", "EU 44", "EU 46"]
            },
            "AU": {
              "type": "string",
              "measurementType": "AU dress size (numeric)",
              "enum": ["AU 6", "AU 8", "AU 10", "AU 12", "AU 14", "AU 16", "AU 18", "AU 20"]
            },
            "JP": {
              "type": "string",
              "measurementType": "JP dress size",
              "enum": ["JP 5", "JP 7", "JP 9", "JP 11", "JP 13", "JP 15"]
            },
            "CN": {
              "type": "string",
              "measurementType": "CN dress size",
              "enum": ["CN 155", "CN 160", "CN 165", "CN 170", "CN 175"]
            },
            "KR": {
              "type": "string",
              "measurementType": "KR dress size",
              "enum": ["KR 44", "KR 55", "KR 66", "KR 77", "KR 88"]
            }
          }
        },
        "shirtNeck": {
          "type": "string",
          "description": "e.g., 15.5\"",
          "measurementType": "inches",
          "enum": ["14", "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18"],
          "genderFilter": ["Male", "Non-binary", "Unisex"]
        },
        "shirtSleeve": {
          "type": "string",
          "description": "e.g., 32\"",
          "measurementType": "inches",
          "enum": ["30", "32", "33", "34", "35", "36", "37"],
          "genderFilter": ["Male", "Non-binary", "Unisex"]
        },
        "waist": {
          "type": "string",
          "description": "Pant waist in inches",
          "measurementType": "inches",
          "enum": ["28", "30", "32", "34", "36", "38", "40", "42", "44"],
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "inseam": {
          "type": "string",
          "description": "Pant length",
          "measurementType": "inches",
          "enum": ["28", "30", "32", "34", "36"],
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "bust": {
          "type": "string",
          "description": "For dresses, in inches",
          "measurementType": "inches",
          "enum": ["32", "34", "36", "38", "40", "42", "44"],
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "hips": {
          "type": "string",
          "description": "For dresses, in inches",
          "measurementType": "inches",
          "enum": ["34", "36", "38", "40", "42", "44", "46"],
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "height": {
          "type": "string",
          "description": "e.g., 5'8\" or cm",
          "measurementType": "inches or cm",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "fitPreference": {
          "type": "string",
          "enum": [
            "Slim",
            "Regular",
            "Relaxed",
            "Custom"
          ],
          "description": "Fit preference",
          "measurementType": "fit",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "genderType": {
          "type": "string",
          "description": "Gender identity associated with this clothing section",
          "enum": [
            "Male",
            "Female",
            "Non-binary",
            "Unisex",
            "Custom"
          ]
        }
      }
    },
    "footwear": {
      "type": "object",
      "properties": {
        "shoeSize": {
          "type": "object",
          "description": "Shoe size by region",
          "measurementType": "shoe size",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"],
          "properties": {
            "US": {
              "type": "string",
              "measurementType": "US shoe size (numeric)",
              "enum": ["US 5", "US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]
            },
            "UK": {
              "type": "string",
              "measurementType": "UK shoe size (numeric)",
              "enum": ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"]
            },
            "EU": {
              "type": "string",
              "measurementType": "EU shoe size (numeric)",
              "enum": ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"]
            },
            "AU": {
              "type": "string",
              "measurementType": "AU shoe size (numeric)",
              "enum": ["AU 4", "AU 5", "AU 6", "AU 7", "AU 8", "AU 9", "AU 10", "AU 11", "AU 12"]
            },
            "JP": {
              "type": "string",
              "measurementType": "JP shoe size (cm)",
              "enum": ["JP 22", "JP 23", "JP 24", "JP 25", "JP 26", "JP 27", "JP 28"]
            },
            "CN": {
              "type": "string",
              "measurementType": "CN shoe size",
              "enum": ["CN 34", "CN 35", "CN 36", "CN 37", "CN 38", "CN 39", "CN 40", "CN 41", "CN 42"]
            },
            "KR": {
              "type": "string",
              "measurementType": "KR shoe size (mm)",
              "enum": ["KR 220", "KR 230", "KR 240", "KR 250", "KR 260", "KR 270"]
            }
          }
        },
        "shoeWidth": {
          "type": "string",
          "enum": [
            "Narrow",
            "Regular",
            "Wide"
          ],
          "measurementType": "width",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "heelHeight": {
          "type": "string",
          "description": "For women, if specified",
          "measurementType": "cm",
          "enum": ["0cm", "2cm", "4cm", "6cm", "8cm", "10cm+"],
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "sockSize": {
          "type": "string",
          "description": "Optional",
          "measurementType": "size",
          "enum": ["S", "M", "L", "XL"],
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "genderType": {
          "type": "string",
          "description": "Gender identity associated with this clothing section",
          "enum": [
            "Male",
            "Female",
            "Non-binary",
            "Unisex",
            "Custom"
          ]
        }
      }
    },
    "undergarments": {
      "type": "object",
      "properties": {
        "braBandSize": {
          "type": "object",
          "description": "Bra band size by region",
          "measurementType": "band size",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "properties": {
            "US": {
              "type": "string",
              "measurementType": "inches",
              "enum": ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"]
            },
            "UK": {
              "type": "string",
              "measurementType": "inches",
              "enum": ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"]
            },
            "EU": {
              "type": "string",
              "measurementType": "cm",
              "enum": ["60", "65", "70", "75", "80", "85", "90", "95", "100", "105", "110", "115", "120"]
            }
          }
        },
        "braCupSize": {
          "type": "string",
          "description": "Bra cup size",
          "measurementType": "cup size",
          "enum": ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J", "JJ", "K", "KK", "L", "M"],
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "shapewearSize": {
          "type": "string",
          "enum": ["XS", "S", "M", "L", "XL", "XXL"],
          "measurementType": "size",
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "genderType": {
          "type": "string",
          "description": "Gender identity associated with this clothing section",
          "enum": [
            "Male",
            "Female",
            "Non-binary",
            "Unisex",
            "Custom"
          ]
        }
      }
    },
    "accessories": {
      "type": "object",
      "properties": {
        "hatSize": {
          "type": "string",
          "enum": ["S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "beltSize": {
          "type": "string",
          "enum": ["28", "30", "32", "34", "36", "38", "40", "42", "44"],
          "measurementType": "inches",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "gloveSize": {
          "type": "string",
          "enum": ["XS", "S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"]
        },
        "ringSize": {
          "type": "object",
          "description": "Ring size by region",
          "measurementType": "ring size",
          "genderFilter": ["Male", "Female", "Non-binary", "Unisex"],
          "properties": {
            "US": {
              "type": "string",
              "measurementType": "US ring size (numeric)",
              "enum": ["US 4", "US 4.5", "US 5", "US 5.5", "US 6", "US 6.5", "US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 11.5", "US 12", "US 12.5", "US 13"]
            },
            "UK": {
              "type": "string",
              "measurementType": "UK ring size (letter)",
              "enum": ["UK F", "UK G", "UK H", "UK I", "UK J", "UK K", "UK L", "UK M", "UK N", "UK O", "UK P", "UK Q", "UK R", "UK S", "UK T", "UK U", "UK V", "UK W", "UK X", "UK Y", "UK Z"]
            },
            "EU": {
              "type": "string",
              "measurementType": "EU ring size (mm)",
              "enum": ["EU 44", "EU 46", "EU 48", "EU 50", "EU 52", "EU 54", "EU 56", "EU 58", "EU 60", "EU 62", "EU 64", "EU 66", "EU 68", "EU 70"]
            }
          }
        },
        "headCircumference": {
          "type": "string",
          "description": "For veils/turbans",
          "measurementType": "cm",
          "enum": ["52cm", "54cm", "56cm", "58cm", "60cm"],
          "genderFilter": ["Female", "Non-binary", "Unisex"]
        },
        "genderType": {
          "type": "string",
          "description": "Gender identity associated with this clothing section",
          "enum": [
            "Male",
            "Female",
            "Non-binary",
            "Unisex",
            "Custom"
          ]
        }
      }
    },
     "culturalAttire": {
      
      "type": "object",
      "properties": {
        "religion": {
          "type": "string",
          "enum": [
            "Christian",
            "Jewish",
            "Muslim",
            "Hindu",
            "Buddhist",
            "Sikh",
            "Interfaith",
            "Other"
          ],
          "description": "Associated religion for filtering cultural attire"
        },
        "sariLength": {
          "type": "string",
          "enum": ["5yd", "6yd", "9yd"],
          "measurementType": "yards",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Hindu"]
        },
        "lehengaWaist": {
          "type": "string",
          "enum": ["28", "30", "32", "34", "36", "38", "40"],
          "measurementType": "inches",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Hindu"]
        },
        "sherwaniChest": {
          "type": "string",
          "enum": ["36", "38", "40", "42", "44", "46"],
          "measurementType": "inches",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Hindu", "Muslim"]
        },
        "kiltWaist": {
          "type": "string",
          "enum": ["28", "30", "32", "34", "36", "38", "40", "42"],
          "measurementType": "inches",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Christian", "Other"]
        },
        "kiltLength": {
          "type": "string",
          "enum": ["22", "24", "26", "28", "30"],
          "measurementType": "inches",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Christian", "Other"]
        },
        "thobeLength": {
          "type": "string",
          "enum": ["52", "54", "56", "58", "60"],
          "measurementType": "inches",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Muslim"]
        },
        "kimonoSize": {
          "type": "string",
          "enum": ["S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Buddhist", "Other"]
        },
        "hanbokSize": {
          "type": "string",
          "enum": ["S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Buddhist", "Other"]
        },
        "chutThaiSize": {
          "type": "string",
          "enum": ["S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Buddhist"]
        },
        "turbanSize": {
          "type": "string",
          "enum": ["Standard", "Custom"],
          "measurementType": "fit",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Sikh"]
        },
        "dupattaLength": {
          "type": "string",
          "enum": ["2m", "2.5m", "3m"],
          "measurementType": "meters",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Sikh", "Hindu"]
        },
        "headwrapPreference": {
          "type": "string",
          "enum": ["One-size", "Fitted"],
          "measurementType": "fit",
          "genderFilter": ["Female", "Non-binary", "Unisex"],
          "religionFilter": ["Jewish", "Muslim", "Christian", "Other"]
        },
        "yarmulkeSize": {
          "type": "string",
          "enum": ["S", "M", "L", "XL"],
          "measurementType": "size",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Jewish"]
        },
        "tallitSize": {
          "type": "string",
          "enum": ["Standard", "Tall", "Wide"],
          "measurementType": "fit",
          "genderFilter": ["Male", "Non-binary", "Unisex"],
          "religionFilter": ["Jewish"]
        },
        "genderType": {
          "type": "string",
          "description": "Gender identity associated with this clothing section",
          "enum": ["Male", "Female", "Non-binary", "Unisex", "Custom"]
        },
        "religiousType": {
          "type": "string",
          "description": "Religious identity associated with this clothing section",
          "enum": ['Christian','Jewish','Muslim','Hindu','Buddhist','Sikh','Interfaith','Other']
        }
      }
    },
    "notes": {
      "type": "string",
      "description": "Any special tailoring instructions or notes"
    }
  },
  "required": [
    "fullName",
    "role"
  ]
}

export { weddingClothingSizes }