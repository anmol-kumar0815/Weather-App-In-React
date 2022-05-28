import React from 'react';
import './style/searchBarContainer.css';

export default function SearchBarContainer(props){
    return(
        <div className='search-container'>
            <input id='search-box' onChange={(e)=>{props.updateCity(e.target.value)}} placeholder="Search By City Name" type="text" />
        </div>
    );
}