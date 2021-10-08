import { Button, Col, Row, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { followUser, getAllUsers, unfollowUser } from "../redux/actions/userActions";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CheckOutlined

  } from '@ant-design/icons';
const { TextArea } = Input;

function AllUsers() {
  const { users } = useSelector((state) => state.usersReducer);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { followLoading , unfollowLoading } = useSelector((state) => state.alertsReducer);
  const [searchKey , setSearchKey] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [followLoading , unfollowLoading]);
  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20} className="d-flex mt-3">
            <Input placeholder='search users' className='search users' value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}}/>
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-3">
          {users.filter(obj=>obj.username.toLowerCase().includes(searchKey.toLowerCase())).map((user) => {
            return (
              <>
                {currentUser._id !== user._id && (
                  <Col lg={5} xs={24} className="text-left">
                    <div className="bs1 p-2 mt-3">
                      {user.profilePicUrl == "" ? (
                        <p className="profilepic2">{user.username[0]}</p>
                      ) : (
                        <img src={user.profilePicUrl} height='60' width='60' style={{borderRadius:'50%'}}/>
                      )}
                      <div><Link to={`/profile/${user._id}`}>{user.username}</Link></div>
                      <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>

                      {user.followers.find((obj) => obj == currentUser._id) ? (
                        <div className='d-flex'>
                           <Button icon={<CheckOutlined />}>Following</Button>
                           <Button className='ml-2'  onClick={() => {
                            dispatch(
                              unfollowUser({
                                currentuserid: currentUser._id,
                                receiveruserid: user._id,
                              })
                            );
                          }}>UnFollow</Button>
                        </div>
                      ) : (
                        <Button
                        icon={<UserAddOutlined />}
                          onClick={() => {
                            dispatch(
                              followUser({
                                currentuserid: currentUser._id,
                                receiveruserid: user._id,
                              })
                            );
                          }}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </Col>
                )}
              </>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
}

export default AllUsers;
