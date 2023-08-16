import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Khoj = () => {
    const [inputValues, setInputValues] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/search/?input=${inputValues}&search=${searchValue}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Search failed:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-lg-12">
                    <h2>Khoj Page</h2>
                    <button onClick={handleLogout} className="btn btn-danger mb-2">Logout</button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Search Form</h5>
                            <div className="form-group">
                                <label>Input Values (Comma Separated Integers)</label>
                                <input
                                    type="text"
                                    value={inputValues}
                                    onChange={(e) => setInputValues(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Search Value (Single Integer)</label>
                                <input
                                    type="number"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button onClick={handleSearch} className="btn btn-primary">Khoj</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <h4>Search Results</h4>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Khoj;
