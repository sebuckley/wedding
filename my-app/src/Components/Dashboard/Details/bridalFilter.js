import '../Dashboard.css';

export default function BridalFilter(props){

    const setWeddingFilter = props.setWeddingFilter;
    const filterName = props.filterName;

    const onClick = (e) => {

        e.preventDefault();
        setWeddingFilter(e.target.innerText);

        const filterButtons = document.getElementsByClassName('weddingfilterButton');

        for(let i = 0; i < filterButtons.length; i++){

            filterButtons[i].className = "weddingfilterButton";

        }

        e.target.className = "weddingfilterButton activeWeddingFB";

    }

    const getActive = (button, name) =>{

        let text;

        if(button === name){

            text = "weddingfilterButton activeWeddingFB";

        }else{

            text = "weddingfilterButton";

        }

        return text;

    }

    return (

        <div className="filterButtons"> 

            <button className={ getActive("Wedding Plans", filterName) } onClick={ onClick }>Wedding Plans</button>
            <button className={ getActive("Partner 1", filterName) } onClick={ onClick }>Partner 1</button>
            <button className={ getActive("Partner 2", filterName) } onClick={ onClick }>Partner 2</button>
            <button className={ getActive("FAQs", filterName) } onClick={ onClick }>FAQs</button>
            

        </div>

    )

}