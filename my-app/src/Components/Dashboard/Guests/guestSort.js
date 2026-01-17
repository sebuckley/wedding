import '../Dashboard.css';

export default function GuestSort(props){

    const setGuestSortedBy = props.setGuestSortedBy;
    const setGuestSorted = props.setGuestSorted;
    const guestSorted = props.guestSorted;
    const guestSortedBy = props.guestSortedBy;
    const listType = props.listType;
    const settings = props.settings;
    const setSettings = props.setSettings;

    const onChange = (e) => {

        e.preventDefault();
        const itemName = e.target.className;
        const itemValue = e.target.value;

        const newSettings = { ...settings };
        
        if(itemName === "guestSortedBy"){

            setGuestSortedBy(itemValue);
            newSettings["guestList"].sort.guestSortedBy = itemValue;
            
        }else{

            setGuestSorted(itemValue);
            newSettings["guestList"].sort.guestSorted = itemValue;
            
        }

        setSettings(newSettings);
        sessionStorage.setItem("settings", JSON.stringify(newSettings));

    }

    return (

        <div className="sortOptions"> 

            <div className="col-2">

                <select name="guestSortedBy" className="guestSortedBy" onChange={ onChange } value={ guestSortedBy } >

                    <option value="First name">First name</option>
                    <option value="surname">Surname</option>
                    { listType === "Primary guests" ? <option value="maxGuests">Max Guests</option> : "" }
                    { listType === "Primary guests" ? <option value="rsvp">RSVP Status</option> : "" }

                </select>

            </div>

            <div className="col-2">

                <select name="guestSorted" className="guestSorted" onChange={ onChange } value={ guestSorted }>

                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                    
                </select>

            </div>

        </div>

    )

}