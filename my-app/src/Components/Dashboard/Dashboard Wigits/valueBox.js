import './valueBox.css';

export default function ValueBox(props){

    return(

        <a href={ props.href +"?" + props.title } className="dashLink">

            <div className="dashboardBox">

                <div className="title">{ props.title }</div>

                <div className="value"><div>{ props.value }</div></div>

            </div>

        </a>

    );


}