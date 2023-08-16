import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        let regobj = { username: userName, password, email, first_name: firstName, last_name: lastName };
        console.log(regobj);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', regobj);
            console.log('Registration successful:', response.data);

            // Optionally, you can redirect the user to the login page or show a success message.
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error);
            // Handle registration error, such as displaying an error message to the user.
        }
    }


    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={userName} onChange={e => setUserName(e.target.value)} className="form-control" />
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>First Name <span className="errmsg">*</span></label>
                                        <input value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control" />
                                    </div>

                                </div>
                                <div className="col-lg-6">

                                    <div className="form-group">
                                        <label>Last Name <span className="errmsg">*</span></label>
                                        <input value={lastName} onChange={e => setLastName(e.target.value)} className="form-control" />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
}

export default Register;