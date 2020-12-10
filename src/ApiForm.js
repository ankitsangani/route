import React,{useState, useEffect} from "react";
import {Row, Col, Table, Button, message, Input, Card, InputNumber} from 'antd';
import axios from "axios";
import {UserOutlined} from "@ant-design/icons";
let editId = null;
const ApiForm = () => {
    const [employeeData,setEmployeeData] = useState([{
        _id : "",
        name:"",
        salary:"",
        age:""
    }]);
    const [data,setData] = useState([]);
    useEffect(() => {
        getinitdata();
    }, [])
     const getinitdata = () => {
         axios.get('http://localhost:8080/notes').then(response => setData(response.data)).catch( error => error )
     }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/notes/${id}`).then(response => {
            getinitdata()
            message.success(response.data.message)
        });
        getinitdata();
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setEmployeeData({...employeeData, [name]: value});
    }
    const handleUpdate = (id) => {
        editId = id;
        const findData = data.find(record => record._id === (id))
        setEmployeeData(findData);
    }
    const handleInsert = () => {
        if (editId !== null){
            axios.put(`http://localhost:8080/notes/${editId}`,employeeData).then(response => {
                console.log(employeeData)
            })
        }
        else {
            axios.post(`http://localhost:8080/notes`,{...employeeData}).then(response => {
            })
        }
        getinitdata()
    }
    const columns = [
        {
            title: 'Employee Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Employee Salary',
            key: 'salary',
            dataIndex: 'salary',
        },
        {
            title: 'Employee Age',
            key: 'age',
            dataIndex: 'age',
        },
        {
            title: 'Action',
            render: (record) => (
                <Button className="btn btn-outline-danger btn-mini" onClick={()=>handleDelete(record._id)} >Delete</Button>
            )
        },
        {
            title: 'Action',
            render: (record) => (
                <Button className="btn btn-outline-success btn-mini" onClick={()=>handleUpdate(record._id)} >Update</Button>
            )
        }]
    return(
        <>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Card>
                        <h2>Registration</h2><br/>
                        <Input name="name" placeholder="Enter Your Employee Name" value={employeeData.name} onChange={handleChange} addonBefore={<UserOutlined/>}/><br/><br/>
                        <Input name="salary" placeholder="Enter Your Employee Salary"  value={employeeData.salary} onChange={handleChange} addonBefore={<UserOutlined/>}/><br/><br/>
                        <label>Age</label> <InputNumber placeholder="age" name="age"   onChange={value => handleChange({target: {name: "age", value}})}
                                                        value={employeeData.age || ""}  /><br/><br/>
                        <Button className="btn-md buttonsubmitlogin" onClick={handleInsert} htmlType="submit" type="primary" size={"large"}>Submit</Button>
                    </Card>
                    <Table columns={columns} dataSource={data} rowKey={(r) => r.id}/>
                </Col>
            </Row>
        </>
    );
}
export default ApiForm;