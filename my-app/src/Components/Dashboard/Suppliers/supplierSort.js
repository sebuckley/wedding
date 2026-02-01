import '../Dashboard.css';
import { splitByCapitalNums } from '../../Wigits/dataFunctions';

export default function SupplierSort(props){

    const setSupplierFilterTask = props.setSupplierFilterTask;
    const supplierFilterTask = props.supplierFilterTask;
    const setSupplierSorted = props.setSupplierSorted;
    const supplierSorted = props.supplierSorted;
    const supplierSortedBy = props.supplierSortedBy;
    const listType = props.listType;
    const taskList = props.taskList;
    const setStateChange = props.setStateChange;
    const stateChange = props.stateChange;
    const settings = props.settings;
    const setSettings = props.setSettings;

    const onChange = (e) => {

        e.preventDefault();
        let itemName = e.target.className;
        const itemValue = e.target.value;

        const copySettings = { ...settings };
        
        if(itemName === "supplierSortedBy"){

            setSupplierFilterTask(itemValue);
            copySettings["suppliers"].filter.type = itemValue;

        }else{

            setSupplierSorted(itemValue);
            copySettings["suppliers"].sort.supplierSorted = itemValue;

        }

        setSettings(copySettings);
        sessionStorage.setItem("settings", JSON.stringify(copySettings));

        setStateChange(stateChange + 1)

    }

    return (

        <div className="sortOptions"> 

            <div className="col-2">

                <select name="supplierSortedBy" className="supplierSortedBy" onChange={ onChange } value={ supplierFilterTask } >

                        <option key={-1} value={"All"}>All types</option>
                        {taskList.list.map((s, i) => (
                            <option key={i} value={s.taskID}>{s.taskName}</option>
                        ))}

                </select>

            </div>

            <div className="col-2">

                <select name="supplierSorted" className="supplierSorted" onChange={ onChange } value={ supplierSorted }>

                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                    
                </select>

            </div>

        </div>

    )

}