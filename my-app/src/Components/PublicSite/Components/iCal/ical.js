import ICalendarLink from "react-icalendar-link";

export default function HandleDownload(props){

  const event = {
    title: "My Title",
    description: "My Description",
    startTime: "2018-10-07T10:30:00+10:00",
    endTime: "2018-10-07T12:00:00+10:00",
    location: "10 Carlotta St, Artarmon NSW 2064, Australia",
    attendees: [
      "Hello World <hello@world.com>",
      "Hey <hey@test.com>",
    ]
  }

  return (

    <ICalendarLink event={event}>
      Add to Calendar
    </ICalendarLink>

  );

}
