import React, {useState, useEffect} from "react";
import {Row, Col, Card, Form, Input, Radio, InputNumber, Select,message, Button} from 'antd';
import {UserOutlined, MailOutlined, ContactsOutlined, HomeOutlined, LockOutlined} from '@ant-design/icons';
import axios from "axios";
import {useHistory} from "react-router";

const SignUp = (props) => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        age: "",
        address: "",
        gender: "",
        country:"",
        password: ""
    });
    const history = useHistory()
    const [data, setData] = useState([]);
    const [errors,setError] = useState({});
    const [items] = useState([
        {
            label: "India",
            value: "India"
        },
        {
            label: "Brazil",
            value: "Brazil"
        },
        {
            label: "USA",
            value: "USA"
        },
        {
            label: "Dubai",
            value: "Dubai"
        },
        {
            label: "UK",
            value: "UK"
        }
    ]);

    useEffect(() => {
        listData()

    }, [])

    const listData = () => {
            axios.get(`http://localhost:8080/users/${props.match.params.id}`).then(response => setUserDetail(response.data || [])).catch(error => console.log(error));
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }
    const validation = (name,value) => {
        switch (name) {
            case 'firstName':
                if (!value) {
                    return "Please Enter First Name!!";
                } else {
                   return  "";
                }
            case 'lastName':
                if (!value) {
                    return "please Enter Last Name!!";
                }else {
                    return "";
                }
            case 'email':
                if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    return "please Enter valid email";
                }else {
                    return "";
                }
            case 'phoneNo':
                if (!value) {
                    return "please Enter Valid PhoneNo";
                }
                else {
                    return "";
                }
            case 'age':
                if(isNaN(value)||value<1||value>100) {
                    return "please enter valid age";
                }
                else {
                    return "";
                }
            case 'address':
                if(value.length < 20) {
                    return "please enter valid address";
                }
                else {
                    return "";
                }
            case 'gender':
                if(!value) {
                    return "please Select Gender";
                }
                else {
                    return "";
                }
            case 'country':
                if(!value) {
                    return "please enter valid country";
                }
                else {
                    return "";
                }
            case 'password':
                if (value.length < 8) {
                    return "Please Enter Valid Password";
                }
                else {
                    return "";
                }
        }
    }
    const submitValue = () => {
        let allErrors = {};
        const userData = {
            firstName:userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
            phoneNo: userDetail.phoneNo,
            age: userDetail.age,
            address: userDetail.address,
            gender: userDetail.gender,
            country:userDetail.country,
            password:userDetail.password
        }
        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error;
            }
        })
        if (Object.keys(allErrors).length) {
            return setError(allErrors)

        } else {
            // if (props.match.params.id !== undefined) {
            //     let index = data.findIndex(item => item.id == props.match.params.id);
            //     data[index] = userDetail
            //     setData(data)
            // } else {
            //     data.push(userDetail)
            //     setData(data)
            //     message.success("Registered Successfully ...");
            // }
            if (localStorage.getItem('token') !== null) {
                axios.put(`http://localhost:8080/users/${userDetail._id}`,userDetail)
                    .then((response) => {
                        console.log(response.data)
                            setUserDetail(response.data)
                            props.history.push("/users");
                        }
                    );
            } else {
                axios.post('http://localhost:8080/users', userDetail)
                    .then(() => {
                        history.push("/")
                    })
            }
        }
    }
    return (
        <>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Card className="cardtop">
                        <h1 className="h2login">Register</h1>
                        <p><b>Create your account</b></p>
                        <Form>
                            <Form.Item>
                                <Input name="firstName" value={userDetail.firstName} onChange={handleChange}
                                       placeholder="Enter Your FirstName" addonBefore={<UserOutlined/>}/>
                                       <span className="validation">{errors.firstName}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="lastName" value={userDetail.lastName} onChange={handleChange}
                                       placeholder="Enter Your Lastname" addonBefore={<UserOutlined/>}/>
                                <span className="validation">{errors.lastName}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="email" value={userDetail.email} onChange={handleChange}
                                       placeholder="Enter Your Email" addonBefore={<MailOutlined/>}/>
                                <span className="validation">{errors.email}</span>
                            </Form.Item>
                            <Form.Item>
                                <Input name="phoneNo" value={userDetail.phoneNo} onChange={handleChange}
                                       placeholder="Enter Your phoneNo" addonBefore={<ContactsOutlined/>}/>
                                <span className="validation">{errors.phoneNo}</span>
                            </Form.Item>

                            <Form.Item label="age">
                                <InputNumber placeholder="age" name="age"
                                             onChange={value => handleChange({target: {name: "age", value}})}
                                             value={userDetail.age || ""}/>
                                <span className="validation">{errors.age}</span>
                            </Form.Item>

                            <Form.Item
                                label={(<HomeOutlined/>)}>
                                <Input.TextArea name="address" onChange={handleChange} value={userDetail.address}
                                                placeholder="Enter Your Address" className="none"
                                                addonBefore={<HomeOutlined/>}/>
                                <span className="validation">{errors.address}</span>
                            </Form.Item>
                            <label>Gender: &nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <Form.Item>
                                <Radio.Group
                                    onChange={e => handleChange({target: {name: "gender", value: e.target.value}})}
                                    value={userDetail.gender}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                                <span className="validation">{errors.gender}</span>
                            </Form.Item>
                            <Form.Item
                                ><br/>

                                <Select
                                    placeholder="Please Select Your Country"
                                    onChange={value => handleChange({target: {name: "country", value}})}
                                    allowClear
                                    value={userDetail.country}
                                >
                                    {items.map(items => (
                                        <Select.Option
                                            key={items.value}
                                            value={items.value}>
                                            {items.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <span className="validation">{errors.country}</span>
                            </Form.Item>
                            <Form.Item
                            >
                                <Input.Password name="password" value={userDetail.password} onChange={handleChange}
                                                addonBefore={(< LockOutlined/>)} placeholder="Enter Your Password"/>
                                <span className="validation">{errors.password}</span>
                            </Form.Item>
                            <Form.Item>
                                <Button className="btn-md buttonsubmitlogin" htmlType="submit" onClick={submitValue}
                                       type="primary"
                                        size={"large"}>
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}/>
            </Row>
        </>
    );

}

export default SignUp;