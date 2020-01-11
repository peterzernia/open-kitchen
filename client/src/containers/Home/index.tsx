import * as React from 'react'
import Save from 'assets/icons/save.svg'
import SmartPhone from 'assets/icons/smartphone.svg'
import Share from 'assets/icons/share.svg'
import TestimonialOne from 'assets/images/testimonial-1.jpg'
import TestimonialTwo from 'assets/images/testimonial-2.jpg'
import TestimonialThree from 'assets/images/testimonial-3.jpg'

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

      <div className="testimonials">
        <div className="testimonial my">
          <img src={TestimonialOne} className="testimonial-img" alt="one" />
          <h3 className="testimonial-name">Fred S.</h3>
          <p>
            &quot;I hated how scattered my recipes used to be.
            Now I can keep track of them in one location!&quot;
          </p>
        </div>
        <div className="testimonial my">
          <img src={TestimonialTwo} className="testimonial-img" alt="one" />
          <h3 className="testimonial-name">Pretty B.</h3>
          <p>
            &quot;I really like how many chicken recipes are on here.&quot;
          </p>
        </div>
        <div className="testimonial my">
          <img src={TestimonialThree} className="testimonial-img" alt="one" />
          <h3 className="testimonial-name">Sarah W.</h3>
          <p>
            &quot;Sharing recipes has never been so easy!&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
