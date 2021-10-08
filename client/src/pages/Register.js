import React from 'react'
import {Row , Col , Form , Input, Button} from 'antd'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { userRegister } from '../redux/actions/userActions'
function Register() {
  const dispatch = useDispatch()
    function register(values) {

             console.log(values)

             delete values.cpassword

             dispatch(userRegister(values))

    }

    return (
        <div className='register-maindiv'>
            
            <Row justify='center' className='register-div align-items-center'>

                <Col lg={5} sm={24} xs={24}>
                  <h1 className='left-title mr-3'>Shey</h1>
                </Col>
              
                <Col lg={8} xs={24}>

                    <Form layout='vertical' className='bs1 p-3' onFinish={register}>
                        <h3>Register</h3>
                        <hr />
                        <Form.Item label="username" name='username' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="password" name='password' rules={[{required: true}]}>
                            <Input type='password'/>
                        </Form.Item>

                        <Form.Item label="confirm password" name='cpassword' rules={[{required: true}]}>
                            <Input />
                        </Form.Item>

                        <div className="text-left">
                        <Button type="primary" htmlType='submit'>Register</Button>
                        </div>

                        <Link to='/login'>Already registered , click here to login</Link>

                    </Form>
                
                </Col>
                <Col lg={5} sm={24} xs={24}>
                  <h1 className='right-title ml-3'>Gram</h1>
                </Col>
          
            </Row>

        </div>
    )
}

export default Register
