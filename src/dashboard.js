import React from 'react'
const DashBoard = (props) => {
    function LogOut() {
        localStorage.setItem('token','');
        props.history.push("/");
    }
    const editProfile = () => {
        props.history.push("/users");
    }
    return(
        <>
        <h1>Welcome to DashBoard</h1>
            <button className="buttonlogout" onClick={LogOut}>Log-Out</button>
            <button className="buttonlogout" onClick={editProfile}>Edit Profile</button>
            </>
    );
}
export default DashBoard;