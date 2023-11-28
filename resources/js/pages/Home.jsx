import React from "react";
import AnimatedElement from "../components/AnimatedElement";

import '../../css/pages/Home.css';
import heroImage from '../../images/hero-background.png';
import profilePic from '../../images/profile-pic.png';
import synapticSoftwareDark from '../../images/synaptic-software-dark.png';
import quoteBackground from '../../images/quote-background.png';
import { Link } from "react-router-dom";

export default function Home(props) {
  document.title = props.title || 'Leif Nervick | Web Developer';

  return (<>
      <section id="hero">
        <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }}></div>
        <div className="card content">
          <AnimatedElement animate={'slide-right'}>
            <figure><img src={profilePic} alt="profile photo" /></figure>
          </AnimatedElement>
          <h1>Leif Nervick</h1>
          <h3>Full-Stack Web Development</h3>
          <div className="contact-info">
            <p><span className="material-icons">phone</span> <a href="tel:7209125225">(720) 912-5225</a></p>
            <p><span className="material-icons">email</span> <a href="mailto: leif@synapticsoftware.net">leif@synapticsoftware.net</a></p>
            <p> <span className="material-icons fa-brands fa-linkedin" style={{color: 'var(--theme-light)', verticalAlign: 'baseline'}}></span> <a href="https://linkedIn.com/in/leif-nervick" target="_blank">LinkedIn Profile</a></p>
            <p> <span className="material-icons fa-brands fa-github" style={{color: 'var(--theme-light)', verticalAlign: 'baseline'}}></span> <a href="https://github.com/lcnervick" target="_blank">GitHub Repository</a></p>
          </div>
          <div className="synaptic-logo"><a href="http://www.synapticsoftware.net" target="_blank"><img src={synapticSoftwareDark} /></a></div>
          <AnimatedElement animate='zoom' options={{delay:1000}}>
            <Link to="/contact" className="button"><button>Contact Me</button></Link>
          </AnimatedElement>
        </div>
      </section>


      <section id="about">
        <h2>[ About me ~] $</h2>
        <article className="executive-summary">
          <p>I am a motivated self-taught problem-solver that enjoys taking challenging projects and turning them into something beautiful, simple and useful.</p>
          <p>With an extensive background in various types of coding on many different platforms, and in-depth experience in every aspect of the Audio/Video and IT industry, I am uniquely positioned to take on a myriad of different types of projects and can learn new concepts and languages quickly and easily.</p>
        </article>
        <AnimatedElement animate={'slide-left'} options={{rootMargin: '-50px 0px 0px 0px'}}>
        <aside>
          <h4>Did you know</h4>
          <p>Leif was home-schooled for seven years in elementary and middle school, which allowed him to supplement his school work with additional computer programming lessons.</p>
          <p>He started programming C and HTML at the age of 12, and procured his first job designing web-sites in 1996 at the age of 14.</p>
        </aside>
        </AnimatedElement>
        <article className="experience">
          <h3>&lt;Experience max-results="2" /&gt;</h3>
          <div className="job-cards">
            <AnimatedElement animate='opacity' options={{rootMargin: '-300px 0px 0px 0px'}}>
            <div className="job-card">
              <h4>Synaptic Software LLC</h4>
              <h5>Owner - Developer</h5>
              <h6>May 2018 - Present</h6>
              <p>Synaptic Software is my company, and I absolutely love coding. I'm an freelance developer and have been coding various programs, web sites and control drivers for the last 27 years. For the last five years, I have been designing and developing a full-featured field-service management platform called Service Toolz to help run my Audio/Video business. At the beginning of this year, I was finally able to place that business in good hands, release Service Toolz to the public and concentrate on full-time coding, which is a dream come true!<br /><br />
              I'm now a full-time freelance full-stack web developer that develops various web applications for many different types of product owners. In order to produce happy clients and high-quality web applications, I adhere to several important principles:</p>
              <ul>
                <li>Listening carefully and taking the time to understand project requirements and design ideas.</li>
                <li>Constantly and consistently communicating ideas, project status updates, challenges and possible scope infringements.</li>
                <li>Maintaining complete transparency through the entire process.</li>
                <li>Crafting applications with a "mobile-first" mind-set to ensure an attractive and functional app for all screen sizes.</li>
                <li>Utilizing a Test-Driven-Development (TDD) atmosphere where possible to ensure application is as bug-free as possible.</li>
                <li>Ensuring applications are following best practices for SEO, speed, reliability and accessibility.</li>
                <li>Maintaining a private and secure repository to help any team development efforts go smoothly with as much documentation as possible.</li>
                <li>Utilizing a CI/CD (continuous integration and continuous deployment) environment where possible to ensure updates and bug fixes are deployed quickly and automatically.</li>
              </ul>

            </div>
            </AnimatedElement>
            <AnimatedElement animate='opacity' options={{rootMargin: '-300px 0px 0px 0px'}}>
            <div className="job-card">
              <h4>Mile High Audio Video</h4>
              <h5>Incorporator / CFO / CTO</h5>
              <h6>Jan 2017 - May 2018<br />July 2021 - Aug 2022</h6>
              <p>Created and implemented an employee-owned audio/video/integration business. Ran technical and financial operations and created specialty User Interface designs for larger, more complicated projects.</p>
              <ul>
                <li>Specializing in the system control aspect of the low-voltage industry.</li>
                <li>A/V and Control System sales, design, installation, programming, and service.</li>
                <li>Operations, Sales Tax Compliance.</li>
                <li>Responsible for UI development on commercial projects needing multiple zones of audio/video controlled from a single device.</li>
                <li>Designed and deployed Service Toolz into system processes, proving the concept of the software and greatly boosting overall productivity.</li>
              </ul>
            </div>
          </AnimatedElement>
          </div>
        </article>
      </section>

      <section id="quote" style={{ backgroundImage: `url(${quoteBackground})` }}>
        <div className="transparent-cover"></div>
        <AnimatedElement animate='zoom' options={{rootMargin: '-100px'}}>
          <h3>"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."</h3>
        </AnimatedElement>
        <AnimatedElement animate='slide-left' options={{rootMargin: '-100px'}}>
          <h4>Martin Fowler</h4>
        </AnimatedElement>
      </section>




  </>);
}
