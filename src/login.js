import React,{useEffect,useState} from 'react';
import {UserOutlined, LockOutlined}  from "@ant-design/icons";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Row,Col,Card, Form, Input, Button} from 'antd';
const Login = (props) => {
    const [data, setData] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [error,setError] = useState("");
    useEffect(()=> {
        let list = [];
        if(JSON.parse(localStorage.getItem('data',))!==null){
            list=JSON.parse(localStorage.getItem('data'));
        }
        setData(list);
    },[])

    const handleChange = e => {
        const {name, value} = e.target;
        setUserDetail({...userDetail, [name]: value})
    }
    const LogIn =() => {
        if(data.findIndex(item => item.email === userDetail.email && item.password === userDetail.password) !== -1) {
            props.history.push('/users');
        }
        else {
            setError("Email And Password Not matched");
        }
    }
    function signUp() {
        props.history.push("/signUp");
    }

    return (
       <>
           <Row className="row-class" >
               <Col span={8}></Col>

               <Col span={4}>
                   <Card className="mainCard-signUp"  bordered={true}>
                       <h2 className="h2login" >Log In</h2>
                       <Form
                           name="basic"
                           initialValues={{ remember: true }}
                       >
                           <Form.Item>
                               <Input placeholder="E-mail" name="email" value={userDetail.email} onChange={handleChange}  addonBefore={<UserOutlined />} />

                           </Form.Item>

                           <Form.Item>
                               <Input.Password placeholder="Password" name="password" value={userDetail.password} onChange={handleChange}  addonBefore={<LockOutlined />}/>
                               <span className="red" > {error}</span>
                           </Form.Item>
                           <Form.Item>
                               <Button className="btn-md buttonsubmitlogin"  type="button" htmlType="submit" onClick={LogIn}>
                                   Submit
                               </Button>
                           </Form.Item>
                       </Form>
                   </Card>
               </Col>
               <Col  span={4}>
                   <Card className="card-demo"    bordered={false}>
                        <h2 className="demo" >Sign up</h2>
                       <p className="demo">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                       <a> <button className="buttonsubmitlogin btn" onClick={signUp}   type="button">Register Now</button></a>
                   </Card>
               </Col>
               <Col span={8}></Col>
           </Row>
           </>
    );
}

export default Login;