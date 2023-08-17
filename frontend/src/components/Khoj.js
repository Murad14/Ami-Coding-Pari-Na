import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Khoj = () => {
    const [inputValues, setInputValues] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Debug: Check if the token is present when the component mounts
        const storedToken = localStorage.getItem("token");
        console.log("Token on mount:", storedToken); // Check if token is retrieved correctly on mount

        // Redirect to login if token is not present
        if (!storedToken) {
            navigate("/login"); // Redirect to your login page
        }
    }, [navigate]);

    const handleSearch = async () => {
        if (inputValues && searchValue) {
            try {
                const token = localStorage.getItem("token");
                console.log("Token in handleSearch:", token);

                if (!token) {
                    throw new Error("Token not found");
                }

                const inputList = inputValues.split(",").map((val) => parseInt(val));
                const searchNum = parseInt(searchValue);

                inputList.sort((a, b) => b - a);

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/search/",
                    {
                        input_values: inputList.join(","),
                        search_value: searchNum,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Search response:", response.data);
                setSearchResult(response.data.result);
            } catch (error) {
                console.error("Search failed:", error.response ? error.response.data : error);
                setSearchResult(null);
            }
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h2>Khoj the Search</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Input Values (comma separated integers)</label>
                            <input
                                value={inputValues}
                                onChange={(e) => setInputValues(e.target.value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Search Value (one integer)</label>
                            <input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                type="number"
                                className="form-control"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Khoj
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <h4>Search Results:</h4>
                {searchResult !== null ? (
                    <p>Result: {searchResult ? "True" : "False"}</p>
                ) : (
                    <p>No search performed yet</p>
                )}
            </div>
        </div>
    );
};

export default Khoj;
