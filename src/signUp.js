import React from "react";
import {Row,Col,Card, Form, Input, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const signUp = () => {
    return(
        <>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Card>
                        <Form>
                            <h1>Register</h1>
                            <p>Create your account</p>
                            <Form.Item
                                label={(<UserOutlined />)}
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Place Your UserName"/>
                            </Form.Item>
                            <Form.Item
                                name="lastname"
                                rules={[{ required: true, message: 'Please input your lastname!' }]}
                            >
                                <Input placeholder="Place Your Lastname"/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input placeholder="Place Your Email"/>
                            </Form.Item>
                            <Form.Item
                                name="age"
                                rules={[{ required: true, message: 'Please input your age!' }]}
                            >
                                <Input placeholder="Place Your Age"/>
                            </Form.Item>

                        </Form>
                    </Card>
                </Col>
                <Col span={8}></Col>
            </Row>
            </>
    );

}

export default signUp;