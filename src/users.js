import React, {useEffect, useState} from 'react';
import { Table,Popconfirm,Button, Tag, Space ,Row,Col} from 'antd';


const Users = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let list = [];
        if (JSON.parse(localStorage.getItem("data")) !== null) {
            list = JSON.parse(localStorage.getItem("data"));
        }
        setData(list);
    }, [])
    const handleDelete = (record) => {
           const filterData = data.filter(index => index !== record);
           localStorage.setItem('data', JSON.stringify(filterData));
           setData(filterData);
    }
    const handleUpdate = (record) => {
        props.history.push(`/editUserDetails/${record.id}`);
    }
    function LogOut() {
        localStorage.setItem('token','');
        props.history.push("/");
    }
    const handleDashboard = () => {
        props.history.push("/dashboard");
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
                    <Popconfirm title="Are you sure to Update？"  style={{ color: 'red' }} onConfirm={()=> {handleUpdate(record)}} >
                    <Button className="btn btn-outline-primary btn-mini"  >Edit</Button>
                    </Popconfirm>
                    &nbsp;&nbsp;
                    <Popconfirm title="Are you sure to Delete？"  style={{ color: 'red' }} onConfirm={()=> {handleDelete(record)}} >
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