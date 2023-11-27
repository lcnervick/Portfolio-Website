import React from 'react';
import '../../css/pages/Certifications.css';
import backgroundImage from '../../images/quote-background.png';
import frontEndCert from '../../images/front-end-engineer-cert.png';
import reactCert from '../../images/react-course.png';
import AnimatedElement from '../components/AnimatedElement';

export default function Certifications(props) {
  document.title = props.title || 'Leif Nervick | Web Developer';

  return (
    <section id="certifications" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className='background-overlay'></div>
      <div className='container'>
        <h2>[ Certifications ~] $</h2>
        <div className="content">
          <figure>
            <AnimatedElement animate='flip-right'>
              <img src={frontEndCert} />
            </AnimatedElement>
            <figcaption>This professional certification covered all the bases of front-end web design and application design in general. From basic semantic HTML, CSS, wire-framing and color theory, to advanced JavaScript, automated testing, algorithms and various data structures. I thought going into this that it would be easy because I've been doing it for so long, but I still found challenges in some of the new practices and ideas that were presented. This really helped me feel prepared to tackle any project I came across.</figcaption>
          </figure>

          <figure>
            <AnimatedElement animate='flip-left'>
              <img src={reactCert} options={{triggerOnce: false}} />
            </AnimatedElement>
            <figcaption>This course taught me most of what I need to know to develop web applications with the React.JS framework, which was developed by Meta for creating super-fast applications. This course also dove into Redux, which allows for easier and faster stateful programming when an application gets more complex and data stores get bigger. React is a powerful framework, with several modules allowing for native device applications and even AR/VR applications!</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
