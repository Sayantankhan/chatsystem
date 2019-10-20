import React  from 'react';

export const OnlineChatMember = (props) =>{

    var users = props.userList;

    return(
        <div className="col-md-2 col-xl-3 px-0">
            <h6 className="font-weight-bold mb-3 text-center text-lg-left">Active Member</h6>
            <div className="white z-depth-1 px-2 pt-3 pb-0 members-panel-1 scrollbar-light-blue">
                <ul className="list-unstyled friend-list">
                    {users.map(function(user){
                        return (
                            <li className="lighten-3 p-1">
                                <a href="#" className="d-flex justify-content-between" >
                                <div className="text-small">
                                    <strong>{user.name}</strong>
                                </div>
                                <div className="chat-footer">
                                    <p className="text-smaller text-muted mb-0">Just now</p>
                                    {/* <span className="badge badge-danger float-right">1</span> */}
                                </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}