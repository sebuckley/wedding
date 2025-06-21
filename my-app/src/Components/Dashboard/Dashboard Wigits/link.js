import './link.css';

export default function Link(props){

    return(

        <a href={ props.href } className="linkStyle">

            <div className="linkTitle"><div>{ props.title }</div></div>

        </a>

    );


}