import './valueBox.css';
import { Link } from 'react-router-dom';

export default function ValueBox(props){

    return(

        <Link to={ props.href +"?" + props.title } className="dashLink">

            <div className="dashboardBox">

                <div className="title">{ props.title }</div>

                <div className="value"><div>{ props.value }</div></div>

            </div>

        </Link>

    );


}