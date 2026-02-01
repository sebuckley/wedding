
export const data = [
    
    "Wedding Venue",
    "Wedding Reception Venue",
    "Caterers",
    "Invitations",
    "Photographer",
    "Videographer",
    "DJ",
    "Wedding Band",
    "Flowers",
    "Wedding Night Accomodation",
    "Wedding Cake",
    "Transport - Her",
    "Transport - Him",
    "Transport - Family",
    "Wedding Dress",
    "Suits",
    "Hair & Make up",
    "Honeymoon",
    "Wedding Rings",
    "Decorations",
    "Hen Do",
    "Stag Do",
    "Officiant",
    "Vows",
    "Music",
    "Table Decorations",
    "Lighting",
    "Signage",
    "Invitations",
    "HashTags",
    "Insurance",
    "Engagement Party",
    "Thank You Notes",
    "Seating Plan",
    "Place Cards",
    "Favours",
    "Write Toasts/Speeches",
    "Games/Entertainment",
    "Wedding Planner/Coordinator",     
    "Marriage License/Legal Documents",   
    "Bridal Party Gifts",                   
    "Welcome Bags",
    "Guest Itinerary",       
    "Rehearsal Dinner",                     
    "Ceremony Programs",                    
    "Emergency Kit",
    "Day-Of Supplies",     
    "Guest Book or Alternative",            
    "Vendor Tips & Gratuity Envelopes",    
    "Registry",                            
    "Backup Plan for Weather",              
    "Post-Wedding Brunch",                  
    "Kids' Activities",
    "Childcare",         
    "Permits (Venue, Music, etc.)",        
    "Live Stream Setup",                    
    "Dress/Suit Alterations",               
    "Plan Day Timeline",         
 


];

export const roles = [

    ["Best Man",5,true],
    ["Usher",7,true], 
    ["Groomsmen",6,true],
    ["Maid of Honour",3,true], 
    ["Bridesmaid",4,true], 
    ["Mother of the Bride",11,true], 
    ["Father of the Bride",12,true],
    ["Mother of the Groom",13,true],
    ["Father of the Groom",14,true],
    ["Flower Girl",8,true], 
    ["Page Boy",9,true],
    ["Ring Bearer",10,true], 
    ["Bride",1,false], 
    ["Groom",2,false]

];


export const weddingTasks = [
  // ===== 12–18 MONTHS =====
  {
    id: "wedding-planner",
    label: "Wedding Planner/Coordinator",
    description: "Hire a professional to help manage timelines, vendors, budgets, and logistics throughout the planning process and on the wedding day.",
    group: "Core Planning",
    phase: "12–18 Months",
    order: 1,
    dueOffset: { monthsBefore: 18 },
    dependencies: [],
  },
  {
    id: "wedding-venue",
    label: "Wedding Venue",
    description:"Choose and book the location where the ceremony will take place, considering capacity, style, availability, and budget.",
    group: "Venues",
    phase: "12–18 Months",
    order: 2,
    dueOffset: { monthsBefore: 18 },
    dependencies: [],
  },
  {
    id: "reception-venue",
    label: "Wedding Reception Venue",
    description:
      "Secure the venue for the reception, ensuring it aligns with guest count, catering requirements, and overall wedding style.",
    group: "Venues",
    phase: "12–18 Months",
    order: 3,
    dueOffset: { monthsBefore: 18 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "insurance",
    label: "Insurance",
    description:
      "Purchase wedding insurance to protect against unexpected cancellations, vendor issues, or liability concerns.",
    group: "Core Planning",
    phase: "12–18 Months",
    order: 4,
    dueOffset: { monthsBefore: 18 },
    dependencies: [],
  },
  {
    id: "officiant",
    label: "Officiant",
    description:
      "Select and book the person who will legally and ceremonially conduct your wedding ceremony.",
    group: "Ceremony",
    phase: "12–18 Months",
    order: 5,
    dueOffset: { monthsBefore: 15 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "photographer",
    label: "Photographer",
    description:
      "Hire a photographer to capture key moments before, during, and after the wedding day.",
    group: "Media",
    phase: "12–18 Months",
    order: 6,
    dueOffset: { monthsBefore: 15 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "videographer",
    label: "Videographer",
    description:
      "Book a videographer to professionally record the ceremony and celebrations.",
    group: "Media",
    phase: "12–18 Months",
    order: 7,
    dueOffset: { monthsBefore: 15 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "livestream",
    label: "Live Stream Setup",
    description:
      "Arrange equipment and services to live stream the ceremony for guests who cannot attend in person.",
    group: "Media",
    phase: "12–18 Months",
    order: 8,
    dueOffset: { monthsBefore: 12 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "caterers",
    label: "Caterers",
    description:
      "Select a catering service to provide food and beverages for the reception, including tastings and menu planning.",
    group: "Food & Drink",
    phase: "12–18 Months",
    order: 9,
    dueOffset: { monthsBefore: 12 },
    dependencies: ["reception-venue"],
  },

  // ===== 9–12 MONTHS =====
  {
    id: "marriage-license",
    label: "Marriage License/Legal Documents",
    description:
      "Research and prepare all required legal paperwork needed to be officially married.",
    group: "Ceremony",
    phase: "9–12 Months",
    order: 10,
    dueOffset: { monthsBefore: 9 },
    dependencies: ["officiant"],
  },
  {
    id: "dress",
    label: "Wedding Dress",
    description:
      "Choose and order the wedding dress, allowing time for production, delivery, and fittings.",
    group: "Attire",
    phase: "9–12 Months",
    order: 11,
    dueOffset: { monthsBefore: 12 },
    dependencies: [],
  },
  {
    id: "suits",
    label: "Suits",
    description:
      "Select suits or formalwear for the groom and wedding party, including rentals or custom tailoring.",
    group: "Attire",
    phase: "9–12 Months",
    order: 12,
    dueOffset: { monthsBefore: 9 },
    dependencies: [],
  },
  {
    id: "engagement-party",
    label: "Engagement Party",
    description:
      "Plan and host a celebration to announce and celebrate the engagement with friends and family.",
    group: "Events",
    phase: "9–12 Months",
    order: 13,
    dueOffset: { monthsBefore: 12 },
    dependencies: [],
  },

  // ===== 6–9 MONTHS =====
  {
    id: "alterations",
    label: "Dress/Suit Alterations",
    description:
      "Schedule fittings and alterations to ensure all attire fits perfectly for the wedding day.",
    group: "Attire",
    phase: "6–9 Months",
    order: 14,
    dueOffset: { monthsBefore: 4 },
    dependencies: ["dress", "suits"],
  },
  {
    id: "hair-makeup",
    label: "Hair & Make up",
    description:
      "Book hair and makeup artists and arrange trials to finalize your wedding-day look.",
    group: "Beauty",
    phase: "6–9 Months",
    order: 15,
    dueOffset: { monthsBefore: 9 },
    dependencies: [],
  },
  {
    id: "rings",
    label: "Wedding Rings",
    description:
      "Choose and purchase wedding rings, allowing time for resizing or engraving if needed.",
    group: "Attire",
    phase: "6–9 Months",
    order: 16,
    dueOffset: { monthsBefore: 6 },
    dependencies: [],
  },
  {
    id: "dj",
    label: "DJ",
    description:
      "Hire a DJ to provide music and manage sound for the reception and key moments.",
    group: "Entertainment",
    phase: "6–9 Months",
    order: 17,
    dueOffset: { monthsBefore: 6 },
    dependencies: ["reception-venue"],
  },
  {
    id: "band",
    label: "Wedding Band",
    description:
      "Book a live band to perform during the ceremony, cocktail hour, or reception.",
    group: "Entertainment",
    phase: "6–9 Months",
    order: 18,
    dueOffset: { monthsBefore: 6 },
    dependencies: ["reception-venue"],
  },
  {
    id: "flowers",
    label: "Flowers",
    description:
      "Select a florist and design floral arrangements for the ceremony, reception, and wedding party.",
    group: "Decor",
    phase: "6–9 Months",
    order: 19,
    dueOffset: { monthsBefore: 4 },
    dependencies: ["reception-venue"],
  },
  {
    id: "decorations",
    label: "Decorations",
    description:
      "Plan and source decorative elements that match your wedding theme and venue style.",
    group: "Decor",
    phase: "6–9 Months",
    order: 20,
    dueOffset: { monthsBefore: 4 },
    dependencies: ["reception-venue"],
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    description:
      "Research, book, and plan travel and accommodations for your post-wedding honeymoon.",
    group: "Post-Wedding",
    phase: "6–9 Months",
    order: 21,
    dueOffset: { monthsBefore: 9 },
    dependencies: [],
  },
  {
    id: "hen-do",
    label: "Hen Do",
    description:
      "Organize the pre-wedding celebration for the bride and her friends.",
    group: "Events",
    phase: "6–9 Months",
    order: 22,
    dueOffset: { monthsBefore: 6 },
    dependencies: [],
  },
  {
    id: "stag-do",
    label: "Stag Do",
    description:
      "Plan the pre-wedding celebration for the groom and his friends.",
    group: "Events",
    phase: "6–9 Months",
    order: 23,
    dueOffset: { monthsBefore: 6 },
    dependencies: [],
  },
  {
    id: "rehearsal-dinner",
    label: "Rehearsal Dinner",
    description:
      "Arrange a dinner for close family and the wedding party following the ceremony rehearsal.",
    group: "Events",
    phase: "6–9 Months",
    order: 24,
    dueOffset: { monthsBefore: 6 },
    dependencies: ["reception-venue"],
  },

  // ===== 3–6 MONTHS =====
  {
    id: "music",
    label: "Music",
    description:
      "Finalize playlists and song choices for the ceremony, reception, and special moments.",
    group: "Entertainment",
    phase: "3–6 Months",
    order: 25,
    dueOffset: { monthsBefore: 4 },
    dependencies: ["dj", "band"],
  },
  {
    id: "table-decor",
    label: "Table Decorations",
    description:
      "Design and confirm table centerpieces, linens, and place settings.",
    group: "Decor",
    phase: "3–6 Months",
    order: 26,
    dueOffset: { monthsBefore: 3 },
    dependencies: ["decorations"],
  },
  {
    id: "lighting",
    label: "Lighting",
    description:
      "Plan and arrange lighting to enhance ambience at the ceremony and reception.",
    group: "Decor",
    phase: "3–6 Months",
    order: 27,
    dueOffset: { monthsBefore: 4 },
    dependencies: ["reception-venue"],
  },
  {
    id: "signage",
    label: "Signage",
    description:
      "Create signs for directions, seating, schedules, or personalized messages.",
    group: "Decor",
    phase: "3–6 Months",
    order: 28,
    dueOffset: { monthsBefore: 3 },
    dependencies: ["decorations"],
  },
  {
    id: "registry",
    label: "Registry",
    description:
      "Set up a gift registry and share it with guests through your wedding website or invitations.",
    group: "Post-Wedding",
    phase: "3–6 Months",
    order: 29,
    dueOffset: { monthsBefore: 4 },
    dependencies: [],
  },

  // ===== 1–3 MONTHS =====
  {
    id: "invitations",
    label: "Invitations",
    description:
      "Design, print, and send wedding invitations with all essential details.",
    group: "Stationery",
    phase: "1–3 Months",
    order: 30,
    dueOffset: { monthsBefore: 3 },
    dependencies: [],
  },
  {
    id: "hashtags",
    label: "HashTags",
    description:
      "Create a custom wedding hashtag for guests to use when sharing photos on social media.",
    group: "Stationery",
    phase: "1–3 Months",
    order: 31,
    dueOffset: { monthsBefore: 2 },
    dependencies: [],
  },
  {
    id: "seating-plan",
    label: "Seating Plan",
    description:
      "Assign guest seating for the reception and finalize table arrangements.",
    group: "Stationery",
    phase: "1–3 Months",
    order: 32,
    dueOffset: { weeksBefore: 3 },
    dependencies: ["invitations"],
  },
  {
    id: "place-cards",
    label: "Place Cards",
    description:
      "Create and print place cards to guide guests to their assigned seats.",
    group: "Stationery",
    phase: "1–3 Months",
    order: 33,
    dueOffset: { weeksBefore: 2 },
    dependencies: ["seating-plan"],
  },
  {
    id: "favours",
    label: "Favours",
    description:
      "Choose and prepare small gifts to thank guests for attending your wedding.",
    group: "Stationery",
    phase: "1–3 Months",
    order: 34,
    dueOffset: { weeksBefore: 4 },
    dependencies: [],
  },
  {
    id: "ceremony-programs",
    label: "Ceremony Programs",
    description:
      "Design and print programs outlining the ceremony order and participants.",
    group: "Ceremony",
    phase: "1–3 Months",
    order: 35,
    dueOffset: { weeksBefore: 4 },
    dependencies: ["officiant"],
  },
  {
    id: "gifts",
    label: "Bridal Party Gifts",
    description:
      "Select thank-you gifts for bridesmaids, groomsmen, and other key participants.",
    group: "Post-Wedding",
    phase: "1–3 Months",
    order: 36,
    dueOffset: { weeksBefore: 4 },
    dependencies: [],
  },
  {
    id: "thank-you",
    label: "Thank You Notes",
    description:
      "Prepare and organize thank-you notes for gifts and attendance.",
    group: "Post-Wedding",
    phase: "1–3 Months",
    order: 37,
    dueOffset: { weeksBefore: 2 },
    dependencies: ["registry"],
  },

  // ===== FINAL MONTH =====
  {
    id: "transport-her",
    label: "Transport - Her",
    description:
      "Arrange transportation for the bride on the wedding day.",
    group: "Transport",
    phase: "Final Month",
    order: 38,
    dueOffset: { weeksBefore: 4 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "transport-him",
    label: "Transport - Him",
    description:
      "Arrange transportation for the groom on the wedding day.",
    group: "Transport",
    phase: "Final Month",
    order: 39,
    dueOffset: { weeksBefore: 4 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "transport-family",
    label: "Transport - Family",
    description:
      "Coordinate transportation for close family members and the wedding party.",
    group: "Transport",
    phase: "Final Month",
    order: 40,
    dueOffset: { weeksBefore: 4 },
    dependencies: ["wedding-venue"],
  },
  {
    id: "accommodation",
    label: "Wedding Night Accommodation",
    description:
      "Book accommodation for the couple on the wedding night.",
    group: "Accommodation",
    phase: "Final Month",
    order: 41,
    dueOffset: { weeksBefore: 4 },
    dependencies: [],
  },
  {
    id: "emergency-kit",
    label: "Emergency Kit",
    description:
      "Prepare a kit with essentials like medications, sewing supplies, and beauty touch-up items.",
    group: "Logistics",
    phase: "Final Month",
    order: 42,
    dueOffset: { weeksBefore: 2 },
    dependencies: [],
  },
  {
    id: "day-of",
    label: "Day-Of Supplies",
    description:
      "Gather all items needed on the wedding day, including schedules, contacts, and personal essentials.",
    group: "Logistics",
    phase: "Final Month",
    order: 43,
    dueOffset: { weeksBefore: 1 },
    dependencies: ["emergency-kit"],
  },
  {
    id: "vendor-tips",
    label: "Vendor Tips & Gratuity Envelopes",
    description:
      "Prepare tips and labeled envelopes for vendors and service staff.",
    group: "Logistics",
    phase: "Final Month",
    order: 44,
    dueOffset: { weeksBefore: 1 },
    dependencies: [],
  },

  // ===== WEDDING WEEK =====
  {
    id: "vows",
    label: "Vows",
    description:
      "Write and finalize personal vows for the ceremony.",
    group: "Ceremony",
    phase: "Wedding Week",
    order: 45,
    dueOffset: { weeksBefore: 1 },
    dependencies: [],
  },
  {
    id: "backup-weather",
    label: "Backup Plan for Weather",
    description:
      "Confirm contingency plans in case of bad weather, especially for outdoor events.",
    group: "Logistics",
    phase: "Wedding Week",
    order: 46,
    dueOffset: { weeksBefore: 1 },
    dependencies: ["reception-venue"],
  },
];


export const phaseOrder = {
  "12–18 Months": 1,
  "9–12 Months": 2,
  "6–9 Months": 3,
  "3–6 Months": 4,
  "1–3 Months": 5,
  "Final Month": 6,
  "Wedding Week": 7,
  "Wedding Day": 8,
  "Post-Wedding": 9,
};



export default {
    data, roles, phaseOrder,
}