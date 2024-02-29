import React from 'react';

import './_home_style.css';



const Home: React.FunctionComponent = () => {
    return (
        <div className="container">
            <section className="featured">
                <h2>Recommend</h2>
            </section>
            <div style={{paddingTop: 0}}></div>
            <section className="new-releases">
                <h2>Your Data</h2>
            </section>
        </div>
    );
};
export default Home;