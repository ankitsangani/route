import React from "react";
import {Row,Col,Card, Form, Input,Radio,InputNumber, Select, Checkbox, Button} from 'antd';
import {UserOutlined,MailOutlined,ContactsOutlined} from '@ant-design/icons';

const signUp = () => {
    return(
        <>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Card style={{borderColor:"#321fdb",marginTop:"50px"}}>
                        <h1 style={{color:"#321fdb"}}>Register</h1>
                        <p>Create your account</p>
                            <Form.Item
                                label={(<UserOutlined />)}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Place Your UserName"/>
                            </Form.Item>
                            <Form.Item
                                label={(<UserOutlined />)}
                                rules={[{ required: true, message: 'Please input your lastname!' }]}
                            >
                                <Input placeholder="Place Your Lastname"/>
                            </Form.Item>
                            <Form.Item
                                label={(<MailOutlined />)}
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Place Your Email"/>
                            </Form.Item>
                            <Form.Item
                                label={(<ContactsOutlined />)}
                                rules={[{ required: true, message: 'Please input your phoneno!' }]}
                            >
                                <Input placeholder="Place Your phoneno"/>
                            </Form.Item>

                            <Form.Item name={['user', 'age']} label="Age" >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item name={['Address', 'Address']} >
                                <Input.TextArea placeholder="Enter Your Address" style={{resize:"none"}}/>
                            </Form.Item>
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Others">Others</Radio>
                        </Radio.Group>
                        <Form.Item><br/>
                            <Select placeholder="Select Your Country">
                                <Select.Option value="India">India</Select.Option>
                                <Select.Option value="Brazil">Brazil</Select.Option>
                                <Select.Option value="USA">USA</Select.Option>
                                <Select.Option value="UK">UK</Select.Option>
                                <Select.Option value="Dubai">Dubai</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter Your Password" />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Re-Enter Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Checkbox> I Have Read The Agreement.</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button className="btn-md" style={{backgroundColor:"#321fdb",color:"white"}} type="primary" size={"large"}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}></Col>
            </Row>
            </>
    );

}

export default signUp;