import React from 'react';
import { Route, BrowserRouter, Routes, Link , useLocation} from "react-router-dom";
import { TabBar } from 'antd-mobile'
// antDesignコンポーネント
import {
    // Breadcrumb,
    // theme,
    ConfigProvider, Avatar, Layout, Menu, type MenuProps
} from "antd";
// ページ群
import Login from "./views/login/_login";
import Home from "./views/home/_home";
import Artist from "./views/artist/_artist";
import NowPlaying from "./views/nowPlaying/_nowPlaying";
import ArtWork from "./views/artWork/_artWork";
import './styles/styles.css';
import AccountSetting from "./views/accountSetting/_accountSetting";
import SignUp from "./views/signUp/_signUp";
import {RecoilRoot, useRecoilState} from 'recoil';
import {authenticationState} from "./atoms/authenticationState";
import {HomeOutlined, SearchOutlined, TeamOutlined} from "@ant-design/icons";

// 遷移先 TODO: 【低】定数ファイル
const redirectPathToSignUp         = '/signUp';
const redirectPathToLogin          = '/login';
const redirectPathToHome           = '/home';
const redirectPathToArtist         = '/artist';
const redirectPathToArtWork        = '/artWork';
const redirectPathToNowPlaying     = '/nowPlaying';
const redirectPathToAccountSetting = '/accountSetting';

// antDesignコンポーネント
const { Header, Content, Footer} = Layout;

const App: React.FunctionComponent = () => {
    // const { token: { colorBgContainer },} = theme.useToken();
    return (
        <RecoilRoot>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#632fff',
                        colorBgBase: '#ffffff',
                        colorBgContainer: '#ffffff',
                        colorBgLayout: '#000000',
                        colorBgElevated: '#00b96b',
                        colorText: 'rgba(0, 0, 0, 0.88)',
                        colorTextDescription: 'rgba(0, 0, 0, 0.45)',
                        colorTextHeading: 'rgba(0, 0, 0, 0.88)'
                    },
                    // algorithm: theme.darkAlgorithm, // TODO: 【低】ダークモード対応
                }}
            >
                <Layout>
                    <React.StrictMode>
                        <BrowserRouter>
                            <HeaderNav/>
                            <Layout style={{minHeight: '100vh'}}>
                                <Layout className="site-layout">
                                    {/*
                                <Header style={{padding: 0, background: '#000000FF'}}/>
                                */}
                                    <Content style={{margin: '0 16px'}}>
                                        <div>
                                            <Routes>
                                                <Route path={redirectPathToSignUp} element={<SignUp/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToLogin} element={<Login/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToHome} element={<Home/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToArtWork} element={<ArtWork/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToArtist} element={<Artist/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToNowPlaying} element={<NowPlaying/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={redirectPathToAccountSetting} element={<AccountSetting/>}/>
                                            </Routes>
                                        </div>
                                    </Content>
                                    <BottomMenu/>
                                    <Footer style={{textAlign: 'center'}}>
                                        Ant Design ©2023 Created by Ant UED</Footer>
                                </Layout>
                            </Layout>
                        </BrowserRouter>
                    </React.StrictMode>
                </Layout>
            </ConfigProvider>
        </RecoilRoot>
  );
};
export default App;

const BottomMenu: React.FunctionComponent = () => {
    // const history = useHistory()
    const location = useLocation()
    const { pathname } = location
    //
    // const setRouteActive = (value: string) => {
    //     // history.push(value)
    //
    // }

    const tabs = [
        {
            key: '/home',
            title: 'RAMEN DATA',
            icon: <HomeOutlined />
        },
        {
            key: '/add',
            title: 'SEARCH',
            icon: <SearchOutlined />
        },
        {
            key: '/mylist',
            title: 'MY LIST',
            icon: <TeamOutlined />
        },
        // {
        //     key: '/recommend',
        //     title: 'RECOMMEND',
        //     icon: <HeaderNav/>
        // },
    ]

    return (
        <TabBar activeKey={pathname} >
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}

/**
 * ヘッダーメニューコンポーネント
 */
const HeaderNav: React.FunctionComponent = () => {

    const AvatarIcon: React.FunctionComponent = () => {
        const UserList = ['User', 'Lucy', 'Tom', 'Edward'];
        const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
        const GapList = [4, 3, 2, 1];

        // 仮
        const color = ColorList[3];
        const user  = UserList[0];
        const gap   = GapList[0];

        return (
            <div>
                <Avatar style={{backgroundColor: color, verticalAlign: 'middle'}} size="large" gap={gap}>
                    {user}
                </Avatar>
            </div>
        );
    }

    const headerItems: MenuProps['items'] = [
        _generateMenuItem('', 'sub1', <AvatarIcon/>, [
            _generateMenuItem(<Link to={'/profile'}>profile</Link>, '1'),
            _generateMenuItem(<Link to={'/your-works'}>works</Link>, '2'),
            _generateMenuItem(<Link to={'/wip'}>WIP</Link>, '3'),
            _generateMenuItem(<Link to={redirectPathToAccountSetting}>account Setting</Link>, '4'),
        ]),
    ];

    const GuestIcon: React.FunctionComponent = () => {
        const color = '#00a2ae';
        const user  = 'guest';
        const gap   = 2;

        return (
            <Avatar style={{backgroundColor: color, verticalAlign: 'middle'}} size="large" gap={gap}>
                {user}
            </Avatar>
        );
    }

    const loginButton: MenuProps['items'] = [
        _generateMenuItem('', 'sub1', <GuestIcon/>, [
            _generateMenuItem(<Link to={'/login'}>SIGNIN</Link>, '1')
        ]),
    ];

    const [authentication] = useRecoilState(authenticationState);
    const isLogin: boolean = authentication.uid.length > 0;
    return (
        <Header className="header" style={{paddingRight: 10}}>
            <div style={{display: "flex", placeContent: "space-between", height: 65}}>
                <Menu style={{width: '100%', justifyContent: 'right'}} theme="dark" mode="horizontal" items={isLogin ? headerItems : loginButton}/>
            </div>
        </Header>
    );
}

/**
 * サイドメニューの項目を生成する
 * @param label    ラベル
 * @param key      インデックスキー
 * @param icon     アイコン
 * @param children 子項目
 */
type MenuItem = Required<MenuProps>['items'][number];
const _generateMenuItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem => {
    return (
        {
            key, icon, children, label
        }
    );
};
// const logInMenu = (authentication.uid !== '') ? <a href={'/logout'}>logout</a> : <a href={'/login'}>login</a>;
