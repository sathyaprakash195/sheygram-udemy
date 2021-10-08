import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { HeartFilled, CommentOutlined , DeleteOutlined , EditOutlined} from "@ant-design/icons";
import {
  addComment,
  deletePost,
  editPost,
  getAllPosts,
  likeOrUnlikePost,
} from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Row, Col, Input } from "antd";
const { TextArea } = Input;
function Post({ post , postInProfilePage}) {
  const dispatch = useDispatch();
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() == currentuser._id
  );
  const { likeOrUnlikeLoading, addCommentLoading , editPostLoading , deletePostLoading} = useSelector(
    (state) => state.alertsReducer
  );
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [comment, setComment] = useState("");
  const[description , setdescription] = useState(post.description)
  const { users } = useSelector((state) => state.usersReducer);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading, addCommentLoading , editPostLoading , deletePostLoading]);

  return (
    <div className="bs1 p-2 mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {post.user.profilePicUrl == "" ? (
            <span className="profilepic1 d-flex align-items-center">
              {post.user.username[0]}
            </span>
          ) : (
            <img src={post.user.profilePicUrl} height='35' width='35' style={{borderRadius:'50%'}}/>
          )}
          <Link className="ml-2">{post.user.username}</Link>
        </div>

        <div>
          <p>{moment(post.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>

      <img src={post.image} style={{height: postInProfilePage==true && '200px'}} className="postimage w-100"/>

      <p className="mt1 mb-1 text-left">{post.description}</p>

      <div className={postInProfilePage ? 'd-flex align-items-center justify-content-between' : 'd-flex align-items-center'}>
        <div className="d-flex align-items-center mr-3">
          <HeartFilled
            style={{ color: alreadyLiked ? "red" : "grey" }}
            onClick={() => {
              dispatch(likeOrUnlikePost({ postid: post._id }));
            }}
          />
          <p>{post.likes.length}</p>
        </div>

        <div className="d-flex align-items-center">
          <CommentOutlined
            onClick={() => {
              setCommentModalVisibility(true);
            }}
          />
          <p>{post.comments.length}</p>
        </div>

         {(post.user._id == currentuser._id && postInProfilePage==true) && (<> <div>
           <DeleteOutlined onClick={()=>{
             dispatch(deletePost({_id : post._id}))
           }}/>
        </div>

        <div>
           <EditOutlined  onClick={()=>{setEditModalVisibility(true)}}/>
        </div></>)}
        </div>

      <Modal
        visible={commentModalVisibility}
        title="Comments"
        closable={false}
        width={900}
        okText="Add comment"
        onOk={() => {
          dispatch(addComment({ postid: post._id, comment: comment }));
          setCommentModalVisibility(false);
        }}
        onCancel={() => {
          setCommentModalVisibility(false);
        }}
      >
        <Row>
          <Col lg={13} xs={0}>
            <img src={post.image} height="400" className="w-100" />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea
              placeholder="add your comment here"
              className="ml-2"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />

            {post.comments.map((comment) => {
              const user = users.find((obj) => obj._id == comment.user);

              return (
                <div className="d-flex align-items-center m-1 p-1 justify-content-between">
                  <div className='d-flex align-items-center '>
                  {user.profilePicUrl == "" ? (
                    <span className="profilepic1 d-flex align-items-center">
                      {user.username[0]}
                    </span>
                  ) : (
                    <img src={post.user.profilePicUrl} height='35' width='35' style={{borderRadius:'50%'}}/>
                  )}
                  <Link className='ml-1' style={{fontSize:15 , marginLeft:10}}>{user.username}</Link>
                  <p style={{fontSize:15}}>{comment.comment}</p>
                  </div>
                  <div className='text-right d-flex'>
                  <p style={{fontSize:13}} className='text-right'>{comment.date}</p>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Modal>
   
      <Modal title="Edit description" closable={false}
      onOk={()=>{
        dispatch(editPost({ _id: post._id , description : description}))
        setEditModalVisibility(false)
      }}
      okText='edit' visible={editModalVisibility} onCancel={()=>{setEditModalVisibility(false)}}>

          <Input value={description} onChange={(e)=>{setdescription(e.target.value)}} />

      </Modal>
    </div>
  );
}

export default Post;
