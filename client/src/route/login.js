import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
            <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign In</h5>
                        <form className="form-signin">
                        <div className="form-label-group">
                            <input type="email" id="inputEmail" className="form-control" placeholder="Name" onChange = {(event) => setName(event.target.value)} required autoFocus />
                        </div>
                        <br />
                        <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control" placeholder="RoomId" onChange = {(event) => setRoom(event.target.value)} required />
                        </div>
                        <br />
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember RoomId</label>
                        </div>
                        <Link to={`/chat?name=${name}&room=${room}`}>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                        </Link>
                        </form>
                    </div>
                    </div>
            </div>
            </div>
        </div>
    );
}
export default Login;