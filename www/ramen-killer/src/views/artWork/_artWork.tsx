import React from 'react';
import {Link} from 'react-router-dom';

import {Row, Col, Slider, Card, Image} from "antd";
import {type WorkCardItemType} from "../../components/workCard/WorkCard";
import {UserOutlined} from "@ant-design/icons";
const { Meta } = Card;

// 遷移先 TODO: 【低】定数ファイル
const redirectPathToArtist  = '/artist';
const redirectPathToArtWork = '/artWork';


const ArtWork: React.FunctionComponent = () => {
    // TODO: 遷移前にセットしたstateから取得
    const workCardItem: WorkCardItemType = {
        title: 'On the River without safe',
        description: 'this is my first work.',
        coverImage: <img src="https://picsum.photos/id/1011/200/200" alt="featured_2"/>,
        isHover: true,
        style: {width: 300},
    };

    interface ArtWork {
        title: string,
        artist: string,
        description: string,
        coverImage: React.ReactNode,
        imageSrc: string,
    }
    const nowPlaying:ArtWork = {
        title: workCardItem.title,
        artist: 'Molto Lennon',
        description: workCardItem.description,
        coverImage: workCardItem.coverImage,
        imageSrc: 'https://picsum.photos/id/1011/200/200'
    };

    return (
        <div className="container" style={{color: "#d7d7d7", paddingLeft: 30}}>
            <section className="featured">
                <h2>ARTWORK</h2>
                <div className="work">
                    <Row>
                        <Col span={12} offset={6}>
                            <div>
                                <Card
                                    cover={
                                        <Image
                                            preview={false}
                                            src={nowPlaying.imageSrc}
                                            height={400} // TODO: 【低】アスペクト比考慮
                                        />
                                    }
                                    style={{width: '100%'}}
                                    actions={[
                                        <Slider defaultValue={0} key="slider"/>
                                    ]}
                                >
                                    <Meta
                                        title={
                                            <Link to={redirectPathToArtWork} style={{color:'rgb(0,0,0)'}}>{nowPlaying.title}</Link>
                                        }
                                        description={
                                            <Link to={redirectPathToArtist} style={{color:'rgb(98,98,98)'}}>
                                                <UserOutlined style={{paddingRight:20}}/>
                                                {nowPlaying.artist}
                                            </Link>
                                        }
                                        // avatar={<UserOutlined/>}
                                    />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};
export default ArtWork;