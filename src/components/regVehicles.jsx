import React, { Component } from 'react';
import { getRegVehicles } from '../services/fakeRegVehicleService';
import {getVehicles} from '../services/fakeVehicleService';
import Pagination from './common/pagination';
import {Paginate } from '../util/paginate';
import ListGroup from './common/listGroup';
import RegVehicleTable from './regVehicleTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class RegVehicles extends Component {
    state = { 
        vehicles : [{ _id : "",name : "All Vehicles"},...getVehicles()],
        regVehicles : getRegVehicles(),
        currentPage : 1,
        pageSize : 4,
        searchQuary:"",
        selectedVehicle: null,
        sortColoum : {path: "owner", order : "asc"}

     }
    
     handleVehicleSelect= vehicle =>{
        this.setState({activeVehicle : vehicle, searchQuary:"", currentPage : 1});
     };

     handleSearch= query => {
    this.setState({searchQuary: query, activeVehicle :null, currentPage:1})
     };

     
     handleDelete = (movie) =>{
        const regVehicles = this.state.regVehicles.filter(m => m._id !== movie._id);
        this.setState({regVehicles : regVehicles});
     };


     handelPageChange =page=>{
     this.setState({currentPage : page})  ;
     };

     handleSort=sortColoum=>{
     this.setState({sortColoum})
     };

    

     getPagedData = () =>{
        const {
            pageSize , 
            currentPage, 
            activeVehicle, 
            sortColoum, 
            searchQuary,
            regVehicles : allVehicles } = this.state;

        let filtered = allVehicles;
        if(searchQuary)
        filtered= allVehicles.filter(m=> 
            m.vehicleNumber.toLowerCase().startsWith(searchQuary.toLowerCase()))
        else if(activeVehicle && activeVehicle._id){
            filtered = allVehicles.filter(m => m.vehicle._id===activeVehicle._id);

        }

        const sorted= _.orderBy(filtered, [sortColoum.path],[sortColoum.order]);

        const regVehicles = Paginate(sorted,pageSize,currentPage);

        return {data : regVehicles , totalCount :filtered.length };
     };

   
    render() { 
        const count = this.state.regVehicles.length;

        const {pageSize , currentPage, sortColoum } = this.state;

        if(count === 0) return <p>there are no Vehicles in this database</p>;
       
        
        const {data : regVehicles, totalCount} = this.getPagedData();
    
        return(
            
        <div>
    
        <div className='row'>
       
        <div className="col-3">

            <ListGroup 
             items={this.state.vehicles}
             activeVehicle={this.state.activeVehicle}
             onItemSelect={this.handleVehicleSelect}
            />
        </div>
        <div className="col"> 
        <Link className="btn btn-primary" to="/regVehicles/new">New Registration</Link>
            <p> Showing {totalCount} Registered Vehicle in the database</p>
            <SearchBox value={this.searchQuary} onChange={this.handleSearch}/>
            <RegVehicleTable
             regVehicles={regVehicles}
             sortColoum={sortColoum}
             onDelete={this.handleDelete}
             onSort={this.handleSort}
             />
            <Pagination 
            numberOfItems={totalCount} 
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange = {this.handelPageChange}
            />
       </div>
       </div>
            </div>
        );
        }

}
 
export default RegVehicles;