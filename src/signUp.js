import React,{useState} from "react";
import {Row,Col,Card, Form, Input,Radio,InputNumber, Select, Checkbox, Button,Layout} from 'antd';
import {UserOutlined,MailOutlined,ContactsOutlined,HomeOutlined,LockOutlined} from '@ant-design/icons';

const SignUp = (props) => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        email:"",
        phoneno:"",
        address: "",
        gender: "",
        age: "",
        country: "",
        password: "",
        repassword:"",
        agree:""
    });
    const [data,setdata] = useState([]);
    return(
        <>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Card style={{borderColor:"#321fdb",marginTop:"25px"}}>
                        <h1 style={{color:"#321fdb"}}>Register</h1>
                        <p><b>Create your account</b></p>
                        <Form onFinishFailed onFinish={() => {
                            props.history.push("/users")
                        }}>
                            <Form.Item
                                name="firstname"
                                rules={[{ required: true, message: 'Please input your firstname!' }]}
                            >
                                <Input placeholder="Enter Your FirstName" addonBefore={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item
                                name="lastname"
                                rules={[{ required: true, message: 'Please input your lastname!' }]}
                            >
                                <Input placeholder="Enter Your Lastname" addonBefore={<UserOutlined />}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Enter Your Email" addonBefore={<MailOutlined />}/>
                            </Form.Item>
                            <Form.Item
                                name="phoneno"
                                rules={[{ required: true, message: 'Please input your phoneno!' }]}
                            >
                                <Input placeholder="Enter Your phoneno" addonBefore={<ContactsOutlined />}/>
                            </Form.Item>

                            <Form.Item name="age"  label="Age"
                                       rules={[{
                                           required: true,
                                           message: 'Please input your age!',
                                           type: 'number',
                                           min: 0,
                                           max: 99
                                       }]}>
                                <InputNumber  />
                            </Form.Item>

                            <Form.Item name="address"
                                       rules={[{required: true, message: 'Address is required'}]}
                                       label={(<HomeOutlined />)}>
                                <Input.TextArea  placeholder="Enter Your Address" style={{resize:"none"}} addonBefore={<HomeOutlined />}/>
                            </Form.Item>
                        <label>Gender: &nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <Form.Item name="gender" rules={[{required: true, message: 'Gender is required'}]}>
                        <Radio.Group name="gender" >
                            <Radio value="male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Others">Others</Radio>
                        </Radio.Group>
                            </Form.Item>
                        <Form.Item name="country" ><br/>
                            <Select placeholder="Select Your Country" rules={[{required: true, message: 'country is required'}]}>
                                <Select.Option value="India">India </Select.Option>
                                <Select.Option value="Brazil">Brazil</Select.Option>
                                <Select.Option value="USA">USA</Select.Option>
                                <Select.Option value="UK">UK</Select.Option>
                                <Select.Option value="Dubai">Dubai</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password addonBefore={(< LockOutlined/>)} placeholder="Enter Your Password" />
                        </Form.Item>
                        <Form.Item
                            name="repassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password addonBefore={(<LockOutlined/>)} placeholder="Re-Enter Password"/>
                        </Form.Item>
                        <Form.Item
                            name="agree"
                            >
                            <Checkbox rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                                },
                            ]}> I Have Read The Agreement.</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button className="btn-md" htmlType="submit" style={{backgroundColor:"#321fdb",color:"white"}} type="primary" size={"large"}>
                                Create Account
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}></Col>
            </Row>
            </>
    );

}

export default SignUp;