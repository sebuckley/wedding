import './loading.css';
import Header from '../../../Wigits/Header/header';

export default function Loading(props){

    const bridalParty = props.bridalParty;
    const user = props.user;

    const checkDetails = (detail, value) => {

        let text;

        if(typeof value === "undefined"){

            text = detail;

        }else{

            text = value;

        }

        return text;


    }

    return (

        <div>

            { user === null ? <Header fName={  checkDetails("Person 1", bridalParty.first.fName) } sName={ checkDetails("Person 2", bridalParty.second.fName) } displayPublic={ true }/>:  <Header fName={ checkDetails("Person 1", bridalParty.first.fName) } sName={ checkDetails("Person 2", bridalParty.second.fName) } displayPublic={ false }/>}

            <div className="loading-wrapper">

                <div className="loader"></div>
                <div>Loading...</div>

            </div>

        </div>



    )

}