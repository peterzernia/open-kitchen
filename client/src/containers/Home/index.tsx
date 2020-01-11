import * as React from 'react'
import Save from 'assets/icons/save.svg'
import SmartPhone from 'assets/icons/smartphone.svg'
import Share from 'assets/icons/share.svg'

import './Home.css'

export default function Home(): React.ReactElement {
  return (
    <div>
      <header className="header">
        <span>open kitchen.</span>
      </header>

      <div className="features">
        <div className="feature my">
          <img src={Save} className="feature-icon mx" alt="save" />
          <h1 className="feature-title">Save</h1>
          <h3>All of your recipes in one location!</h3>
        </div>
        <div className="feature my">
          <img src={SmartPhone} className="feature-icon mx" alt="smartphone" />
          <h1 className="feature-title">Access</h1>
          <h3>All of your recipes on any device!</h3>
        </div>
        <div className="feature my">
          <img src={Share} className="feature-icon mx" alt="share" />
          <h1 className="feature-title">Share</h1>
          <h3>Your recipes anytime, anywhere!</h3>
        </div>
      </div>

    </div>
  )
}
