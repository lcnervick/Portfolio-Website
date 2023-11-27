import React, { useEffect } from 'react'
import '../../css/pages/Skills.css';

export default function Skills(props) {
  document.title = props.title || 'Leif Nervick | Web Developer';

  useEffect(() => {
    const skillSetBars = document.getElementsByClassName('exp-bar');
    for (const index in skillSetBars) {
      if (!skillSetBars[index].classList) continue;
      setTimeout(() => {
        skillSetBars[index].classList.add('full');
      }, 50 * index);
    };
    return () => {
      for (const index in skillSetBars) {
        if (!skillSetBars[index].classList) continue;
        skillSetBars[index].classList.remove('full');
      }
    }
  });
  return (
    <section id="skills">
      <div className="content">
        <h2>[ Skills ~] $</h2>
        <article>
          <p>Programming requires a person to be dynamic, creative and open-minded. I requires someone who can learn new ideas and concepts quickly while maintaining humility so you can still open your mind to even more new ideas and concepts.
          This is an abridged list of the ideas and concepts that I've been lucky to learn through my journey so far and their respective levels of proficiency, both of which I hope will continue to grow.</p>
        </article>
        <ul className='skill-set-container'>
          <li className="skill-set">
            <h3></h3>
            <p style={{ margin: '0 30px' }}>The scale of proficiency is a self-assigned level that I derived based on my ability to utilize the skill without needed to refer to documentation.</p>
          </li>
          <li className="skill-set">
            <h3>HTML 5</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="10" style={{'--data-prof':10}}></div></div>
          </li>
          <li className="skill-set">
            <h3>CSS</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="8" style={{'--data-prof':8}}></div></div>
          </li>
          <li className="skill-set">
            <h3>JavaScript</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="8" style={{'--data-prof':8}}></div></div>
          </li>
          <li className="skill-set">
            <h3>jQuery</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="8" style={{'--data-prof':8}}></div></div>
          </li>
          <li className="skill-set">
            <h3>ReactJS</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="6" style={{'--data-prof':6}}></div></div>
          </li>
          <li className="skill-set">
            <h3>PHP</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="9" style={{'--data-prof':9}}></div></div>
          </li>
          <li className="skill-set">
            <h3>Laravel</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="3" style={{'--data-prof':3}}></div></div>
          </li>
          <li className="skill-set">
            <h3>Symfony</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="3" style={{'--data-prof':3}}></div></div>
          </li>
          <li className="skill-set">
            <h3>SQL</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="7" style={{'--data-prof':7}}></div></div>
          </li>
          <li className="skill-set">
            <h3>GraphQL</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="2" style={{'--data-prof':2}}></div></div>
          </li>
          <li className="skill-set">
            <h3>XML</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="8" style={{'--data-prof':8}}></div></div>
          </li>
          <li className="skill-set">
            <h3>Apache 2.4</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="5" style={{'--data-prof':5}}></div></div>
          </li>
          <li className="skill-set">
            <h3>Git / GitHub</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="6" style={{'--data-prof':6}}></div></div>
          </li>
          <li className="skill-set">
            <h3>Adobe Graphic Design</h3>
            <div className="exp-bar-container"><div className="exp-bar" data-prof="6" style={{'--data-prof':6}}></div></div>
          </li>
        </ul>
      </div>
    </section>
  );
}
