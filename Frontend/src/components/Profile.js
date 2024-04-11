import React from 'react'
import './styles/profileStyles.css'

function Profile() {

    return (
        <div>
            <div className='body'>
                <figure className="fir-image-figure">
                    <div className="fir-imageover" rel="noopener" target="_blank">
                        <img className="fir-author-image fir-clickcircle" src="https://fir-rollup.firebaseapp.com/de-sm.jpg" alt="David East - Author" />
                    </div>
                    <figcaption>
                        <div className="fig-author-figure-title">David East</div>
                        <div className="fig-author-figure-title">Engineer at Google on Firebase.</div>
                        <div className="fig-author-figure-title">Jan. 16th, 2017 &#8212; 5m read</div>
                    </figcaption>
                </figure>
            </div>
            <h3>My Plans</h3>
            <div className='container' style={{ overflowY: 'hidden' }}>
                <div className='' style={{ display: 'flex', flexDirection: 'row', paddingTop: '50px' }}>
                </div>
            </div>
        </div>
    )
}

export default Profile
