import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {useSelector} from 'react-redux'
import { Col, Row } from 'antd'
import Post from '../components/Post'
function Home() {
    const {users} = useSelector(state=>state.usersReducer)
    const {posts} = useSelector(state=>state.postsReducer)
    return (
        <DefaultLayout>
              <Row justify='center'>
                
                  <Col lg={12} xs={24}>

                      {posts.map(post=>{
                          return <Post post={post}/>
                      })}
                  
                  </Col>

              </Row>
        </DefaultLayout>
    )
}

export default Home
