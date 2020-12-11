import React, {useEffect, useState} from 'react';
import {Input, Table, Popconfirm, Button, Tag, Space, Row, Col, message} from 'antd';
import axios from "axios";


const Users = (props) => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        age: "",
        gender: "",
        country:""
    });
    const [data, setData] = useState([]);
    const [dublicateList,setdublicateList] = useState([]);
    const {Search} = Input;
    useEffect(() => {
        listData()
    }, [])

    const listData = () => {
        axios.get(`http://localhost:8080/users`).then(response => setData(response.data || [])).catch(error => console.log(error));
    }
    // useEffect(() => {
    //     let list = [];
    //     if (axios.get('http://localhost:8080/users').then(response => response.data) !== null) {
    //         list = axios.get('http://localhost:8080/').then(response => response.data).catch( error => error )
    //     }
    //     setData(list);
    //     setdublicateList(list);
    // }, [])
    const handleChange = e => {
        let {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value});
    }
    const handleDelete = (id) => {
           const filterData = data.filter(index => index !== id);
            axios.delete(`http://localhost:8080/users/${id}`).then(response => {
            message.success(response.data.message)
            setData(filterData);
        });
    }
    const handleUpdate = (id) => {
        listData();
        props.history.push(`/editUserDetails/${id}`);
    }
    function LogOut() {
        localStorage.setItem('token','');
        props.history.push("/");
    }
    const handleDashboard = () => {
        props.history.push("/dashboard");
    }
    const handleSearch = () => {
        let userValues = userDetail;
        let row = dublicateList || [];
        if(userValues.firstName){
            row = row.filter(value => value.firstName.toLowerCase().includes(userValues.firstName.toLowerCase()))
        }
        if(userValues.lastName){
            row = row.filter(value => value.lastName.toLowerCase().includes(userValues.lastName.toLowerCase()))
        }
        if(userValues.email){
            row = row.filter(value => value.email.toLowerCase().includes(userValues.email.toLowerCase()))
        }
        if(userValues.phoneNo){
            row = row.filter(value => value.phoneNo.toLowerCase().includes(userValues.phoneNo.toLowerCase()))
        }
        if(userValues.age){
            row = row.filter(value => value.age.toString().toLowerCase().includes(userValues.age.toLowerCase()))
        }
        if(userValues.gender){
            row = row.filter(value => value.gender.toLowerCase().includes(userValues.gender.toLowerCase()))
        }

    //     let filterArray = [] ;
    //     let userValues = userDetail;
    //     const d = dublicateList.filter(record => {
    //         if(userValues.firstName){
    //             filterArray = record.firstName.toLowerCase().includes(userValues.firstName.toLowerCase());
    //         }
    //         if(userValues.lastName){
    //             filterArray = record.lastName.toLowerCase().includes(userValues.lastName.toLowerCase());
    //         }
    //         if(userValues.email){
    //             filterArray = record.email.toLowerCase().includes(userValues.email.toLowerCase());
    //         }
    //         if(userValues.phoneNo){
    //             filterArray = record.phoneNo.toLowerCase().includes(userValues.phoneNo.toLowerCase());
    //         }
    //         if(userValues.age){
    //             filterArray = record.age.toString().toLowerCase().includes(userValues.age.toLowerCase());
    //         }
    //         if(userValues.gender){
    //             filterArray = record.gender.toLowerCase() === userValues.gender.toLowerCase()
    //         }
    //         return filterArray;
    //     })
    // setData(d)
        setData(row);
    }
    const columns = [
        {
            title: 'First Name',
            key: 'firstName',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            key: 'lastName',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Phone No',
            key: 'phoneNo',
            dataIndex: 'phoneNo'
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: 'Age',
            key: 'age',
            dataIndex: 'age',
        },
        {
            title: 'Country',
            key: 'country',
            dataIndex: 'country',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (text, record) => (
                <div>
                    <Popconfirm title="Are you sure to Update？"  style={{ color: 'red' }} onConfirm={()=> {handleUpdate(record._id)}} >
                    <Button className="btn btn-outline-primary btn-mini"  >Edit</Button>
                    </Popconfirm>
                    &nbsp;&nbsp;
                    <Popconfirm title="Are you sure to Delete？"  style={{ color: 'red' }} onConfirm={()=> {handleDelete(record._id)}} >
                    <Button className="btn btn-outline-danger btn-mini"  >Delete</Button>
                    </Popconfirm>
                </div>
            )
        },
    ]

    return(
        <>
            <Button size={"large"} className="buttonlogout" onClick={handleDashboard}><b>Dashboard</b></Button>
            <Button size={"large"} className="buttonlogout" onClick={LogOut} ><b>Log-Out</b></Button>
            <Button size={"large"} className="buttonlogout" onClick={handleSearch} ><b>Search</b></Button>
            <Search className="search" value={userDetail.firstName} name="firstName"  onSearch={handleSearch} onChange={handleChange}  placeholder="input Firstname "  />
            <Search className="search" value={userDetail.lastName} name="lastName" onSearch={handleSearch} onChange={handleChange}  placeholder="input Lastname " />
            <Search className="search" value={userDetail.email} name="email" onSearch={handleSearch} onChange={handleChange} placeholder="input Email "  />
            <Search className="search" value={userDetail.phoneNo} name="phoneNo" onSearch={handleSearch} onChange={handleChange} placeholder="input PhoneNo "  />
            <Search className="search" value={userDetail.age} name="age" onSearch={handleSearch} onChange={handleChange} placeholder="input age "/>
            <Search className="search" value={userDetail.gender} name="gender" onSearch={handleSearch} onChange={handleChange} placeholder="input gender "/>
            <h3>Users Details</h3>
            <Row>
                <Col span={4}> </Col>
                <Col span={16}>
                    <Table columns={columns}
                           dataSource={data}
                        pagination={{pageSize:5}}/>
                </Col>
                <Col/>
            </Row>
            </>
    );

}
export default Users;