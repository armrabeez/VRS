import React from 'react';
const ListGroup = props => {
    const {items, textPropety, valuePropety , onItemSelect ,activeVehicle } = props;
    return ( 
        <ul className="list-group">
            {items.map(item =><li
                key={item[valuePropety]} 
                onClick={()=> onItemSelect(item) }
                style={{cursor :"pointer"}}
                className={ item === activeVehicle ? "list-group-item active" : "list-group-item"} >

            {item[textPropety]}</li>)}
            
        </ul>
     );
}
ListGroup.defaultProps = {
    textPropety : "name",
    valuePropety : "_id"


}
 
export default ListGroup;