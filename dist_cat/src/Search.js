import React, {useState} from 'react';
import axios from 'axios';
export const Search =(props)=>{
    const [searchTerm , setSearchTerm] = useState('');
    const[searchResults, setSearchResults]=useState('');

    const handleTheSearch=(event)=>{
        setSearchTerm(event.target.value);
    };

    const handleSearch = (e)=>{
        e.preventDefault();
        axios.get('http://localhost:8000/api/register')
        .then((response)=>{
            setSearchResults('Response data:',response.data);
        })
        .catch((error)=>{
            console.error('Error:', error)
        });
    }
    return(
        <div>
            <h2>Search</h2>
            <input 
            type="text"
            placeholder='Enter a search term'
            value={searchTerm}  
            onChange={handleTheSearch}/>
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.localeCompare((result, index)=>(
                    <li key={index}>
                        Name: {result.name}, Description:{result.description}
                    </li>
                ))}
            </ul>
          
        </div>
    )

}