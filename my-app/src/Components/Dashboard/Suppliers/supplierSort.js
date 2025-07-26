import '../Dashboard.css';
import { splitByCapitalNums } from '../../Wigits/dataFunctions';

export default function SupplierSort(props){

    const setSupplierFilter2 = props.setSupplierFilter2;
    const supplierFilter2 = props.supplierFilter2;
    const setSupplierSorted = props.setSupplierSorted;
    const supplierSorted = props.supplierSorted;
    const supplierSortedBy = props.supplierSortedBy;
    const listType = props.listType;
    const taskList = props.taskList;

    const onChange = (e) => {

        e.preventDefault();
        let itemName = e.target.className;
        const itemValue = e.target.value;
        
        if(itemName === "supplierSortedBy"){

            itemName = itemValue.split(" ").join("");

            setSupplierFilter2(itemValue);

        }else{

            setSupplierSorted(itemValue);

        }

    }

    return (

        <div className="sortOptions"> 

            <div className="col-2">

                <select name="supplierSortedBy" className="supplierSortedBy" onChange={ onChange } value={ supplierFilter2 } >

                        <option key={-1} value={"All"}>All types</option>
                     {taskList.list.map((s, i) => (
                        <option key={i} value={s.taskName}>{splitByCapitalNums(s.taskName)}</option>
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