import Toggle from 'react-toggle';
import './faqsSet.css'
import { saveBridalPartyItem } from "../../Wigits/dataFunctions-bridalParty";

export default function FAQSet(props) {

    const faqsSet = props.bridalParty.faqsSet;
    const setFaqState = props.setFaqState;
    const faqState = props.faqState;
    const bridalParty = props.bridalParty;

    console.log(bridalParty);

    const handleChange = () => {

        if(faqState === true){
  
            saveBridalPartyItem(bridalParty, "faqsSet", false);
            setFaqState(false);

        }else{

            saveBridalPartyItem(bridalParty, "faqsSet", true);
            setFaqState(true);

        }
        
    }

    return (

    <label>
        <div>        
            <Toggle
            defaultChecked={ faqState }
            onChange={ handleChange } />
        </div>
        <div>
        <span>Turn FAQ's on webpage</span>
        </div>
    </label>

    )


}