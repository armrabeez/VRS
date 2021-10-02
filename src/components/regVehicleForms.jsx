import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getRegVehicle, saveVehicle } from '../services/fakeRegVehicleService';
import {getVehicles} from '../services/fakeVehicleService';
import {getFuelType} from '../services/fakeFuelTypeService';


class RegVehicleForm extends Form {
    state ={
        data : {owner: "",
        vehicleId: "",
        fuelId: "" ,
        vehicleNumber: "", 
        makersClass:"",
        vehicleClass:"",
        EngineCC:""},
        fuelUsed:[],
        vehicles:[],
        errors:{},
        pattern:/^[0-9A-Z][0-9A-Z][0-9A-Z\s-ශ්‍රී][A-Z0-9\s-‍ශ්‍රී][0-9A-Z\s-][0-9\s-]+[0-9]$/
    };

    schema ={
            
        _id:Joi.string(),
        owner: Joi.string()
        .required()
        .label('Owner'),
        vehicleId: Joi.string()
        .required()
        .label('Vehicle'),
        vehicleNumber: Joi.string().regex(this.state.pattern, 'VALID INPUT') 
        .required()
        .label("Vehicle Number"),
        makersClass:Joi.string()
        .required()
        .label("Company Name"),
        vehicleClass: Joi.string()
        .required()
        .label('Vehicle Type'),
        fuelId: Joi.string()
        .required()
        .label('Fuel Type'),
        EngineCC: Joi.number()
        .required()
        .min(100)
        .max(10000)
        .label('EngineCC')
    };
    componentDidMount(){
        const vehicles = getVehicles();
        this.setState({vehicles})
        
        const fuelUsed = getFuelType();
        this.setState({fuelUsed})

        const rvehicleId = this.props.match.params.id;
        if(rvehicleId ==="new") return;

        const rvehicle = getRegVehicle(rvehicleId);
        if(!rvehicle) return this.props.history.replace("/notFound");

        this.setState({data:this.maptoViewModel(rvehicle)})
    };
    maptoViewModel(rvehicle){
        return{
            _id:rvehicle._id,
            owner:rvehicle.owner,
            vehicleId:rvehicle.vehicle._id,
            vehicleNumber:rvehicle.vehicleNumber,
            makersClass:rvehicle.makersClass,
            vehicleClass:rvehicle.vehicleClass,
            fuelId:rvehicle.fuelUsed._id,
            EngineCC:rvehicle.EngineCC
        };
    }
   
    doSubmit=()=>{
        saveVehicle(this.state.data);
        this.props.history.push("/regVehicles");

    };
    render() { 
        
        return ( 
            <div>
                <h1>Registration</h1>
                <form  onSubmit={this.handleSubmit}>
                    {this.renderInput("owner", "Owner", "text")}
                    {this.renderSelect("vehicleId", "Vehicle", this.state.vehicles)}
                    {this.renderInput("vehicleNumber", "Vehicle Number", 'text')}
                    {this.renderInput("makersClass", "Company Name", 'text')}
                    {this.renderInput("vehicleClass", "Vehicle Type", 'text')}
                    {this.renderSelect("fuelId", "Fuel Type", this.state.fuelUsed)}
                    {this.renderInput("EngineCC", "EngineCC", 'number')}
                    {this.renderButton("Save")}
                </form>
                
            </div>
         );
    }
}
 
export default RegVehicleForm;