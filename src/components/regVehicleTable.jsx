import React, { Component } from 'react';
import Table from './common/table';
import { Link } from 'react-router-dom';

class RegVehicleTable extends Component {
    coloums = [
       { path : 'owner' ,lable : 'Owner Name', content : rvehicle => 
       <Link to={`/regVehicles/${rvehicle._id}`} >{rvehicle.owner}</Link>},
       { path : 'vehicle.name' ,lable : 'Vehicle'},
       { path : 'vehicleNumber' ,lable : 'Vehicle Number'},
       { path : 'makersClass' ,lable : 'Comapany'},
       { path : 'vehicleClass' ,lable : 'vehicle Type'},
       { path : 'fuelUsed.name' ,lable : 'Fuel Type'},
       { path : 'EngineCC',lable : 'EngineCC'},
    
       { key : 'delete', content : rvehicle => 
        <button 
        onClick={()=>this.props.onDelete(rvehicle)} className="btn btn-danger">Delete
        </button>}
    ]
    render() { 
        const {regVehicles ,onSort , sortColoum} = this.props;
        return (  
         <Table data={regVehicles} coloums={this.coloums} onSort={onSort} sortColoum={sortColoum} />
        )
    }
}
 
 
export default RegVehicleTable;