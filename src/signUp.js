import React,{useState,useEffect} from "react";
import {Row,Col,Card, Form, Input,Radio,InputNumber, Select, Checkbox, Button} from 'antd';
import {UserOutlined,MailOutlined,ContactsOutlined,HomeOutlined,LockOutlined} from '@ant-design/icons';

const SignUp = (props) => {
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
    const [editableIndex, setEditableIndex] = useState(null);

    const [items] =useState([
        {
            label: "India",
            value : "India"
        },
        {
            label: "Brazil",
            value : "Brazil"
        },
        {
            label: "USA",
            value : "USA"
        },
        {
            label: "Dubai",
            value : "Dubai"
        },
        {
            label: "UK",
            value : "UK"
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

    const submitValue = () => {
        if (props.match.params.id !== null) {
            let index =  data.findIndex(item => item.id == props.match.params.id);
            data[index] = userDetail
            setData(data)
        } else{

            userDetail.id =data.length+1;
            data.push(userDetail)
            setData(data)

        }
        localStorage.setItem("data", JSON.stringify(data));
        setUserDetail({})
    }
    return(
        <>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Card style={{borderColor:"#321fdb",marginTop:"25px"}}>
                        <h1 style={{color:"#321fdb"}}>Register</h1>
                        <p><b>Create your account</b></p>
                        <Form onFinish={() => {
                            props.history.push("/users")
                        }}>
                            <Form.Item
                            >
                                <Input  name="firstName" value={userDetail.firstName} onChange={handleChange} placeholder="Enter Your FirstName" addonBefore={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item

                            >
                                <Input name="lastName" value={userDetail.lastName} onChange={handleChange} placeholder="Enter Your Lastname" addonBefore={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item

                            >
                                <Input name="email" value={userDetail.email} onChange={handleChange} placeholder="Enter Your Email" addonBefore={<MailOutlined />}/>
                            </Form.Item>
                            <Form.Item
                            >
                                <Input name="phoneNo" value={userDetail.phoneNo} onChange={handleChange} placeholder="Enter Your phoneNo" addonBefore={<ContactsOutlined />}/>
                            </Form.Item>

                            <Form.Item
                              label="age"
                            >
                                <InputNumber placeholder="age" name="age" onChange={value => handleChange( {target : {name : "age",value}})} value={userDetail.age || ""}/>
                            </Form.Item>

                            <Form.Item
                                       label={(<HomeOutlined />)}>
                                <Input.TextArea name="address" onChange={handleChange} value={userDetail.address} placeholder="Enter Your Address" style={{resize:"none"}} addonBefore={<HomeOutlined />}/>
                            </Form.Item>
                        <label>Gender: &nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <Form.Item >
                                <Radio.Group onChange={e => handleChange( {target : {name : "gender",value: e.target.value}})} value={userDetail.gender}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                            </Form.Item>
                        <Form.Item ><br/>
                            <Select
                                placeholder="Please Select Your Country"
                                onChange={value => handleChange( {target : {name : "country",value}})}
                                allowClear
                                    value={userDetail.country || ""}
                            >
                                {items.map(items => (
                                    <Select.Option
                                        key={items.value}
                                        value={items.value}>
                                        {items.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                        >
                            <Input.Password  name="password"  value={userDetail.password} onChange={handleChange} addonBefore={(< LockOutlined/>)} placeholder="Enter Your Password" />
                        </Form.Item>
                        <Form.Item
                        >
                            <Input.Password name="rePassword" value={userDetail.rePassword} onChange={handleChange} addonBefore={(<LockOutlined/>)} placeholder="Re-Enter Password"/>
                        </Form.Item>
                        <Form.Item
                            name="active"
                            >
                            <Checkbox value={userDetail.active} onChange={handleChange} name="active" rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                                },
                            ]}> I Have Read The Agreement.</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button className="btn-md" htmlType="submit" onClick={submitValue} style={{backgroundColor:"#321fdb",color:"white"}} type="primary" size={"large"}>
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