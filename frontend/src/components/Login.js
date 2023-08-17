import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {

    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [showWarning, setShowWarning] = useState(false); // State to control showing the warning

    const navigate = useNavigate();  // Initialize the navigate function

    const ProceedLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                    username: username,
                    password: password
                });
                const token = response.data.token;
                localStorage.setItem("token", token); // Set token in localStorage
                console.log('Login successful:', response.data);

                // Redirect to Khoj.js route upon successful login
                navigate('/khoj');
            } catch (error) {
                console.error('Login failed:', error.response ? error.response.data : error);

            }
        } else {
            setShowWarning(true); // Display the warning
        }
    };

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
        }
        if (password === '' || password === null) {
            result = false;
        }
        return result;
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label> User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => updateUsername(e.target.value)} type="text" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label> Password <span className="errmsg">*</span></label>
                                <input value={password} onChange={e => updatePassword(e.target.value)} type="password" className="form-control" />
                            </div>

                        </div>
                        <div className="card-footer">
                            {showWarning && <div className="text-danger mb-2">Please enter a valid username and password.</div>}
                            <button type="submit" className="btn btn-primary">Login</button>
                            <span>&nbsp;&nbsp;</span>
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;