import React, {useState, useEffect} from "react";
import {Row, Col, Card, Form, Input, Radio, InputNumber, Select, Checkbox, Button} from 'antd';
import {UserOutlined, MailOutlined, ContactsOutlined, HomeOutlined, LockOutlined} from '@ant-design/icons';

const SignUp = (props) => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        age: "",
        address: "",
        gender: "",
        password: ""
    });
    const [data, setData] = useState([]);
    const [editableIndex, setEditableIndex] = useState(null);
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
        let list = [];
        if (JSON.parse(localStorage.getItem("data")) !== null) {
            list = JSON.parse(localStorage.getItem("data"));
            if (props.match.params.id) {
                const findUserDetail = list.find(user => user.id === parseInt(props.match.params.id))
                if (findUserDetail) {
                    setUserDetail(findUserDetail)
                }
            }
        }
        setData(list);
    }, [])

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
                if (!value.match(/^[0]?[789]\d{9}$/)) {
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
            if (props.match.params.id !== undefined) {
                let index = data.findIndex(item => item.id == props.match.params.id);
                data[index] = userDetail
                setData(data)
            } else {
                userDetail.id = data.length + 1;
                data.push(userDetail)
                setData(data)
            }
            localStorage.setItem("data", JSON.stringify(data));
            setUserDetail({});
            props.history.push("/users")
        }
    }
    return (
        <>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Card style={{borderColor: "#321fdb", marginTop: "25px"}}>
                        <h1 style={{color: "#321fdb"}}>Register</h1>
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
                                                placeholder="Enter Your Address" style={{resize: "none"}}
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
                                <Button className="btn-md" htmlType="submit" onClick={submitValue}
                                        style={{backgroundColor: "#321fdb", color: "white"}} type="primary"
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