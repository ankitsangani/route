import React, {useEffect, useState} from 'react';
import { Table, Tag, Space ,Row,Col} from 'antd';

const Users = (props) => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        age: "",
        address: "",
        gender: "",
        country: "",
        password: ""
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        let list = [];
        if (JSON.parse(localStorage.getItem("data")) !== null) {
            list = JSON.parse(localStorage.getItem("data"));
        }
        setData(list);
    }, [])
    const handleDelete = (record) => {
       if(window.confirm("Do you want to delete this record?")){
           const filterData = data.filter(index => index !== record);
           localStorage.setItem('data', JSON.stringify(filterData));
           setData(filterData);
       }
    }
    const handleUpdate = (record) => {
        props.history.push(`/editUserDetails/${record.id}`);
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
                    <button className="btn btn-outline-primary btn-mini" onClick={() =>{handleUpdate(record)}}  >
                        Edit
                    </button>
                    &nbsp;&nbsp;
                    <button className="btn btn-outline-danger btn-mini"  onClick={() =>{handleDelete(record,text)}}>
                        Delete
                    </button>
                </div>
            )
        },
    ]

    return(
        <>
            <h3>Users Details</h3>
            <Row>
                <Col span={4}> </Col>
                <Col span={16}>
                    <Table columns={columns}
                           dataSource={data}/>

                </Col>
                <Col/>
            </Row>
            </>
    );

}
export default Users;