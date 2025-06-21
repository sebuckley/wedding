const bridalParty = {

    bride: {

        fName: "Charlotte", 
        lName: "Myers",
        pName: "Charlie",
        gender: "Female",
        email: "c-myers@hotmail.co.uk",
        ringSize: "k",
        dressSize: "",
        braSize: "",
        shoeSize: "",
        chestSize: "",
        waistSize: "",

    },
    groom: {

        fName: "Stephen", 
        lName: "Buckley",
        pName: "",
        gender: "Male",
        email: "sebuckley@hotmail.com",
        ringSize: "g",
        dressSize: "",
        braSize: "",
        shoeSize: "",
        chestSize: "",
        waistSize: "",
        
    }

}

const weddingDateTime = "2026/04/28 11:00";

const weddingVenue = {

    date: weddingDateTime,
    venue: "Rutland Hall Hotel",
    venueAddress: "Nr Oakham, Rutland LE15 8AB",
    venueWebAddress: "https://rutlandhall.co.uk/",
    venueGoogleMaps: "https://www.google.co.uk/maps/search/rutland+hall+hotel/@52.6725692,-0.6668642,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDQxNi4xIKXMDSoASAFQAw%3D%3D8",
    latitude: "52.67319375862528",
    longitude: "-0.6644072701150777",
    dressCode: "Black tie; We invite you all to indulge in your most gorgeous, show-stopping attire. We want our guests to feel as comfortable and fabulous as possible in something they really love."

    
}

let venueInfo;

if(weddingVenue ===""){

    venueInfo = "the venue TBC";

}else{

    venueInfo = weddingVenue.venue + ", " + weddingVenue.venueAddress + "\\n\\nDress Code: \\n\\n" + weddingVenue.dressCode + "\\n\\n" + weddingVenue.venueWebAddress + " \\n " + weddingVenue.venueGoogleMaps;
    
}

const wedding = {

   

    name: "Wedding of " + bridalParty.groom.fName +  " & " + bridalParty.bride.fName,
    description: "The wedding of " + bridalParty.groom.fName +  " and " + bridalParty.bride.fName + " at " + venueInfo,
    date: weddingDateTime,
    dateEnd: "2026/04/28 23:59",
    rsvpDate: "2026/02/01 20:00",
    receptionDate: "2025/06/01 17:00",
    receptionName: "Wedding Reception of " + bridalParty.groom.fName +  " & " + bridalParty.bride.fName,
    receptionDescription: "Wedding reception of  " + bridalParty.groom.fName +  " and  "+ bridalParty.bride.fName + "  at the venue",
    maxGuests: 1,
    email: "sebuckley@hotmail.com",
    faqSubject: "Additional Question",
    
}

const dt1 = new Date(wedding.date);
const dt2 = new Date(wedding.reception);
// const dt3 = new Date(wedding.dateEnd);

// const diffMsDay = (dt3 - dt1); 
// const diffHrsDay = Math.floor((diffMsDay % 86400000) / 3600000); // hours
// const diffMinsDay = Math.round(((diffMsDay % 86400000) % 3600000) / 60000); //minutes

const latitude = parseFloat(weddingVenue.latitude);
const longitude = parseFloat(weddingVenue.longitude);

const weddingDayInvite = {

    startTime: wedding.date,
    endTime: wedding.dateEnd,
    title: wedding.name,
    description: wedding.description,
    location: weddingVenue.venueAddress,
    url: weddingVenue.venueWebAddress,
    geo: { lat: latitude, lon: longitude },
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: bridalParty.bride.fName + " " + bridalParty.bride.lName, email: bridalParty.bride.email },
    // attendees: [
    //     { name: bridalParty.groom.fName + " " + bridalParty.groom.lName, email: bridalParty.groom.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },

    // ]

}

const diffMsEvening = (dt2 - dt1); 
const diffHrsEvening = Math.floor((diffMsEvening % 86400000) / 3600000); // hours
const diffMinsEvening = Math.round(((diffMsEvening % 86400000) % 3600000) / 60000); //minutes

const weddingReceptionInvite = {

    start: wedding.reception,
    duration: { hours: diffHrsEvening, minutes: diffMinsEvening },
    title: wedding.receptionName,
    description: wedding.receptionDescription,
    location: weddingVenue.venueAddress,
    url: weddingVenue.venueWebAddress,
    geo: { lat: latitude, lon: longitude},
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: bridalParty.bride.fName + " " + bridalParty.bride.lName, email: bridalParty.bride.email },
    attendees: [
        { name: bridalParty.groom.fName + " " + bridalParty.groom.lName, email: bridalParty.groom.email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },

    ]

}

const faq = {

    1: {question: "Where should I stay?", answer:"You can book a room in our hotel or there are several close by including xxxx and xxxx"},
    2: {question: "What time should I arrive?", answer:"You should arrive at 12:00pm"},
    3: {question: "Is parking available at the venue?", answer:"Yes there is room for vehicles to be parked."},
    4: {question: "What is appropriate to bring as a gift?", answer:"We are asking for travel vouchers towards our honeymoon"},
    5: {question: "Are children invited?", answer:"Only if stated on your invite."},
    6: {question: "Is there an open bar?", answer:"No the bar will be a pay per drink.  You will get drinks to toast and with you meal as champagne, red and white wine."},
    7: {question: "Can I take photo's or record videos during the ceremony?", answer:"yes please feel free to take pictures and record the ceremony.  The only thing we ask is that you don't post on social media on the day."},
    8: {question: "Will reception dinner be plated of buffet?", answer:"It will be a plated dinner."},

}

export { bridalParty, wedding, weddingVenue, faq, weddingDayInvite, weddingReceptionInvite };