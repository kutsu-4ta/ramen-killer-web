import React from 'react';

import {Row, Col} from "antd";
// 遷移先 TODO: 【低】定数ファイル
// const redirectPathToArtist  = '/artist';
// const redirectPathToArtWork = '/artWork';


const Artist: React.FunctionComponent = () => {
    return (
        <div className="container" style={{color: "#d7d7d7", paddingLeft: 30}}>
            <section className="featured">
                <h2>ARTIST</h2>
                <div className="work">
                    <Row>
                        <Col span={12} offset={6}>
                            <div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};
export default Artist;