/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
    DashboardOutlined,
    ApiOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Breadcrumb } from 'antd';
import logo from '../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logout } from '../services/login';
const { Header, Sider, Content } = Layout;
const siderMenu = [
    {
        key: '/admin/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/admin/apis',
        icon: <ApiOutlined />,
        label: 'APIs',
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        label: 'Users'
    },
    // {
    //     key: '/admin/about',
    //     icon: <UserOutlined />,
    //     label: 'About'
    // },
]
const findOpenKeys = (key) => {
    const result = [];
    const findInfo = (arr) => {
        arr.forEach(element => {
            if (key.includes(element.key)) {
                result.push(element.key)
                if (element.children) {
                    findInfo(element.children)
                }
            }
        });
    }
    findInfo(siderMenu)

    return result
}

const findDeepPath = (key, menu) => {
    const result = [];
    const findInfo = (arr) => {
        arr.forEach(element => {
            const { children, ...info } = element;
            result.push(info);
            if (children) {
                findInfo(children)
            }
        });
    }
    findInfo(menu);
    const tmpData = result.filter((item) => key.includes(item.key))
    if (tmpData.length > 0) {
        return [{ label: 'Home', key: '/admin/dashboard' }, ...tmpData];
    }
    return [];
}

const MyLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const tmpOpenKeys = findOpenKeys(pathname);
    // 监听pathname的改变，重新设置面包屑数据
    useEffect(() => {
        setBreadcrumbs(findDeepPath(pathname, siderMenu));
    }, [pathname]);

    const handleDropDownClick = async (e) => {
        console.log('click', e);
        switch (e.key) {
            case "Logout":
                await Logout();
                navigate("/");
                break;
            case "Profile":
                navigate("/admin/dashboard");
                break;
            default:
                break;
        }

    };
    const dropDownProps = {
        items: [{
            label: 'Profile',
            key: 'Profile',
            icon: <UserOutlined />,
        },
        {
            label: 'Logout',
            key: 'Logout',
            icon: <LogoutOutlined />,
        },],
        onClick: handleDropDownClick,
    };
    return (
        <Layout style={{ width: '100vw', height: '100vh' }} id='components-layout-demo-custom-trigger'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={logo} alt='ninja'></img>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultOpenKeys={tmpOpenKeys}
                    defaultSelectedKeys={tmpOpenKeys}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    items={siderMenu}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <span className='app-title'>NINJA - Fasten your iteration</span>

                    <Dropdown menu={dropDownProps}>
                        <img src={logo} style={{
                            width: '30px',
                            borderRadius: '50%',
                            float: 'right',
                            marginTop: '16px',
                            marginRight: '35px',
                        }}>
                        </img >
                    </Dropdown>

                </Header>
                <Content
                    style={{
                        // margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: scroll,
                        background: colorBgContainer,
                    }}
                >
                    <Breadcrumb style={{ marginBottom: 16 }}>
                        {breadcrumbs.map((item) => (
                            <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>

                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default MyLayout;