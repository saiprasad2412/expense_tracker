import React , {useState ,useEffect} from 'react'
import {Form ,Input ,message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner'
const Login = () => {
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false)
    //submit fn
const submitHandler =async(values)=>{
    try {
        setLoading(true);
        const {data}=await axios.post('/users/login',values);
        message.success("Login Successfull !!");
        setLoading(false);
        localStorage.setItem('user',JSON.stringify({...data.user ,password:" "}));
        navigate("/");
    } catch (error) {
        setLoading(false);
        message.error("Something went  wrong ! Please check your credentials and try again")
    }
}
//pevent login user to register 
useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate("/")
    }
  },[navigate])
  return (
    <>
    <div className='register_page'>
        {loading && <Spinner/>}
        <Form  layout="vertical" onFinish={submitHandler}>
            <h1>LOGIN FORM </h1>
            <Form.Item label="email" name="email" >
            <Input type="email" placeholder="please input your email"/>
            </Form.Item>
            <Form.Item label="password" name="password" >
            <Input type="password" placeholder="please input your password"/>
            </Form.Item>
            <div className='d-flex'>
                <Link to="/register">Don't  have an account? Register Here</Link>&nbsp;&nbsp;
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Login