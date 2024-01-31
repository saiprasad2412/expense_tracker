import React , {useState , useEffect} from 'react'
import {Form ,Input ,message} from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register = () => {
    //to navigate from one page to another
    const navigate=useNavigate();
    //loading
    const [loading , setLoading]=useState(false);
//submit fn
const submitHandler =async(values)=>{
    try {
        setLoading(true);
        await axios.post('/users/register', values);
        message.success("Registration sucessfull !! ");
        setLoading(false);
        navigate("/login");

    } catch (error) {
        setLoading(false);

        message.error("Invalid  Credentials !!"+ error.response?.data.message);
        
    }
}
//pevent for login user 
  useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate("/")
    }
  },[navigate])
  return (
    <div className='register_page'>
        {loading && <Spinner/>}
        <Form  layout="vertical" onFinish={submitHandler}>
            <h1>REGISTRATION FORM </h1>
            <Form.Item label="name" name="name" >
            <Input type="text" placeholder="please input your name"/>
            </Form.Item>
            <Form.Item label="email" name="email" >
            <Input type="email" placeholder="please input your email"/>
            </Form.Item>
            <Form.Item label="password" name="password" >
            <Input type="password" placeholder="please input your password"/>
            </Form.Item>
            <div className='d-flex'>
                <Link to="/login">Already  have an account? Login Here</Link>&nbsp;&nbsp;
                <button className='btn btn-primary'>Register</button>
            </div>
        </Form>
    </div>
  )
}

export default Register