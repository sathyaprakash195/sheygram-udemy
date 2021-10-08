import { Col, Row, Form, Input , Select , Button } from "antd";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { editUser } from "../redux/actions/userActions";

function Editprofile() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [profilePicUrl , setProfilePicUrl] = useState(user.profilePicUrl)
    const dispatch = useDispatch()
    function handleFileInput(e){

        const file = e.target.files[0]

        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend=()=>{

              
               setProfilePicUrl(reader.result)
              

        }

    }

    function edit(values){
          values.profilePicUrl = profilePicUrl
          values._id = user._id
          console.log(values)

          dispatch(editUser(values))
    }
 
  return (
    <DefaultLayout>
      <Row justify='center mt-5'>
        <Col lg={10} xs={24} sm={24} className='mt-5'>
          <div>
            <Form layout="vertical" initialValues={user} className='p-2 bs1' onFinish={edit}>
                <h3>Edit Profile</h3>
              <Form.Item name="username" label="Username">
                <Input />
              </Form.Item>

              <Form.Item name="bio" label="Bio">
                <Input />
              </Form.Item>

              <Form.Item label="Profile pic" name="profilePicUrl">
                <div className="d-flex align-items-center">
                  {profilePicUrl == "" ? (
                    <p className="profilepic2">{user.username[0]}</p>
                  ) : (
                    <img src={profilePicUrl} height='60' width='60'/>
                  )}

                  <Input type='file' onChange={handleFileInput}/>

                </div>
              </Form.Item>

              <Form.Item name='privateAccount'>
                  <Select>
                      <Select.Option value={true}>Private</Select.Option>
                      <Select.Option value={false}>Public</Select.Option>
                  </Select>
              </Form.Item>

              <Button htmlType='submit'>Edit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default Editprofile;
