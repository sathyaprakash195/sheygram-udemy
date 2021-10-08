import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined,
  PlusOutlined ,
  UsergroupDeleteOutlined,
  HomeOutlined,
  SaveOutlined , 
  DownSquareOutlined
} from '@ant-design/icons';
import './defaultlayout.css'
import React from 'react';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


class DefaultLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

 
  

  render() {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <Layout>
        
        <Layout className="site-layout">
          <Header className="site-layout-background"
           style={{
            position : 'sticky' , 
            top : 0,
            width : '100%',
            left : 0,
            padding : 0,
            zIndex : 9999
          }}
          >
            <div className='d-flex justify-content-between align-items-center bs1'>
            <div className='d-flex align-items-center'>
            <UserOutlined />
            <h4 className='pt-3'>{JSON.parse(localStorage.getItem('user')).username}</h4>
            </div>
            <h2 className='logotext pt-1'><b>SheyGram</b></h2>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              
              
             
            }}
          >
            {this.props.children}
          </Content>
        </Layout>

        <Sider 
         style={{
           position : 'sticky' , 
           top : 0,
           bottom :0 , 
           overflow : 'auto',
           height : '100vh'
         }}
        trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
               <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key="/addpost" icon={<PlusOutlined />}>
              <Link to='/addpost'>Addpost</Link>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </Menu.Item>

            <Menu.Item key="/allusers" icon={<UsergroupDeleteOutlined />}>
              <Link to='/allusers'>AllUsers</Link>
            </Menu.Item>

            <Menu.Item  icon={<SaveOutlined />}>
              <Link>Saved</Link>
            </Menu.Item>

            <Menu.Item  icon={<DownSquareOutlined />}>
              <Link >Archived</Link>
            </Menu.Item>
          

            <Menu.Item  icon={<LogoutOutlined />}>
              <Link onClick={()=>{localStorage.removeItem(('user') , window.location.reload());}}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>

      </Layout>
    );
  }
}

export default DefaultLayout