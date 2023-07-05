import React from 'react';
import {Link} from 'react-router-dom';

import {Row, Col} from "antd";
import './_home_style.css';
import {WorkCard, type WorkCardItemType} from "../../components/workCard/WorkCard";

// 遷移先 TODO: 【低】定数ファイル
const redirectPathToArtist  = '/artist';
const redirectPathToArtWork = '/artWork';
const redirectPathToNowPlaying = '/nowPlaying';


const Home: React.FunctionComponent = () => {
    // TODO: RamenTile. get ramenInfo by API
    const featuredWorkCardItems: WorkCardItemType[] = [
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <Link to={redirectPathToNowPlaying}><img src="https://picsum.photos/id/1011/200/200" alt="featured_2"/></Link>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/1012/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     isHover: true,
        //     style: {width: 300},
        //     coverImage: <img src="https://picsum.photos/id/1013/200/200" alt="featured_2"/>
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/1014/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/1015/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/1016/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // }
    ];
    // TODO: 作品情報をAPIで取得
    const newReleaseWorkCardItems: WorkCardItemType[] = [
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/41/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300, boxShadow: '#000000FF'},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/42/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     isHover: true,
        //     style: {width: 300},
        //     coverImage: <img src="https://picsum.photos/id/43/200/200" alt="featured_2"/>
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/44/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/45/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // },
        // {   title:'テストラーメン',
        //     description: 'this is my first work.',
        //     coverImage: <img src="https://picsum.photos/id/46/200/200" alt="featured_2"/>,
        //     isHover: true,
        //     style: {width: 300},
        // }
    ];

    // 作品カードを動的に生成
    // 特集
    const featuredWorkCards:JSX.Element[] = [];
    for (let i = 0; i < featuredWorkCardItems.length; i++){
        featuredWorkCards.push(
            <Col span={8} style={{paddingTop: 32, paddingBottom: 32}}>
                <WorkCard
                    coverImage={featuredWorkCardItems[i].coverImage}
                    title={featuredWorkCardItems[i].title}
                    description={featuredWorkCardItems[i].description}
                    isHover={featuredWorkCardItems[i].isHover}
                    style={featuredWorkCardItems[i].style}
                    titleLinkPath={redirectPathToArtist}
                    describeLinkPath={redirectPathToArtWork}
                />
            </Col>
        )
    }
    // ニューリリース
    const newReleaseWorkCards:JSX.Element[] = [];
    for (let i = 0; i < newReleaseWorkCardItems.length; i++){
        newReleaseWorkCards.push(
            <Col span={8} style={{paddingTop: 32, paddingBottom: 32}}>
                <Link to={redirectPathToNowPlaying}>
                    <WorkCard coverImage={newReleaseWorkCardItems[i].coverImage}
                              title={newReleaseWorkCardItems[i].title}
                              titleLinkPath={redirectPathToArtist}
                              description={newReleaseWorkCardItems[i].description}
                              describeLinkPath={redirectPathToArtWork}
                              isHover={newReleaseWorkCardItems[i].isHover}
                              style={newReleaseWorkCardItems[i].style}
                    />
                </Link>
            </Col>
        )
    }

    return (
        <div className="container" style={{color: "#d7d7d7", paddingLeft: 30}}>
            <section className="featured">
                <h2>Recommend</h2>
                <div className="works">
                    <Row gutter={[48, 32]}>
                        {featuredWorkCards}
                    </Row>
                </div>
            </section>
            <div style={{paddingTop: 70}}></div>
            <section className="new-releases">
                <h2>Your Data</h2>
                <div className="works">
                    <Row gutter={[48, 32]}>
                        {newReleaseWorkCards}
                    </Row>
                </div>
            </section>
        </div>
    );
};
export default Home;