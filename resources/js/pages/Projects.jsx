import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/pages/Projects.css';

import backgroundImage from '../../images/computer-background-3.jpg';
import serviceToolzDark from '../../images/service-toolz-dark.png';
import serviceToolzLight from '../../images/service-toolz-light.png';
import activityUpliftDark from '../../images/activity-uplift.png';
import gitHubDark from '../../images/github-logo-dark.png';
import gitHubLight from '../../images/github-logo-light.png';
import gitHubIcon from '../../images/github-icon.png';
import runCodeIcon from '../../images/run.png';

export default function Projects(props) {
  document.title = props.title || 'Leif Nervick | Web Developer';

  const [repoList, setRepoList] = useState([]);

  const getRepoList = () => {
    axios.get('/repoList').then(response => {
      if (response.data.error) setRepoList([]);
      else if (response.data.repoList) setRepoList(response.data.repoList);
    }).catch(err => {
      console.log('Could Not Get Repo List', err);
    }).finally(() => {

    });
  }

  useEffect(getRepoList, []);

  return (
    <section id="projects" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="content">
        <h2>[ Projects ~] $</h2>
        <ul className="project-list">

          <li className="project">
            <figure><a href="https://www.servicetoolz.com" target="_blank"><img src={serviceToolzDark} /></a></figure>
            <aside>
              <p>Service Toolz is the project I built from scratch and have been working on since 2018. It is a subscription-based SAAS application. For more information, please contact me for a demo to see what it can do (which is like, everything!).<br />
              <a href="https://www.servicetoolz.com" target="_blank">Visit the Website</a></p>
            </aside>
            <article>
              <p>Service Toolz is a simple cloud-based business management app for trades and field service businesses of all sizes. Its primary focuses include customer management, custom quoting, work order management with checklists, scheduling, inventory management, invoicing, payments and time tracking. Also track inquiries, gratuities, commissions, profit/loss, timesheets and more with intuitive live reports.</p>
              <p>A real-time automated task list allows users to stay coordinated by assigning and delegating tasks.</p>
              <p>By integrating with QuickBooks Online, Twilio, and Google Calendar, and utilizing AJAX, Webhooks, Websockets and Cron Jobs, it offers instant customer notifications through text messages, automated invoicing and payment processing, and coordinated dispatching.</p>
              <p>Developed primarily with HTML, CSS, JavaScript/jQuery, MySQL and PHP on a self-hosted Apache 2.4 framework.</p>
              <p>Successfully implemented in several companies that are currently using it to help run their entire business.</p>
            </article>
          </li>

          <li className="project">
            <figure><a href="https://activityuplift.com" target="_blank"><img src={activityUpliftDark} /></a></figure>
            <aside>
              <p>Activity Uplift is a service that provides downloadable activity sheets and videos geared towards senior citizens with Dementia or Alzheimer's Disease. Different difficulty levels for each activity cater towards seniors at all stages and ability levels.<br />
              <a href="https://activityuplift.com" target="_blank">Visit the Website</a></p>
            </aside>
            <article>
              <p>This was a takeover project that was initially put together using WordPress with Divi and utilized MemberPress and WooCommerce for their subscription management and order processing. The site was extremely slow and not well organized or user-friendly when it came to finding downloads.</p>
              <p>My job was to re-do the public facing website to help with SEO and increase conversions. I was also tasked with making the downloads easer to navigate and search for while maintaining the WordPress CMS and MemberPress functionality. There was also a desire to be able to move away from the WordPress environment at some point in the near future, so setting up a code-base that can be easily expanded on was going to be key.</p>
              <p>Accessibility was a also a big necessity for this project, so great care was taken to pick colors that provide the right contrast and text size and shape that is easily readable, and to ensure that screen readers could properly parse the page through the proper use of symmantic HTML tags and aria properties.</p>
              <p>To increase the speed of the page and be able to control routing, and because I had to maintain a PHP back-end for wordpress, I opted to use a Laravel back-end framework with a React.js based front-end. I was able to utilize a library that helped to integrate Laravel with the WordPress database to synchronize user authentication, membership status and post lookups.</p>
              <p>I developed an algorithm that parses the various WordPress pages that were initially set up to get a hierarchy of activity categories and activity files that were linked to each page, creating a data structure that was easily and quickly traversable for search functionalities. This data structure, along with the custom routing I set up, helped to automate the process of traversing the various activity categories and listing associated activity files.</p>
              <p>The whole thing also needed to be migrated away from the WordPress hosting site and onto a reliable server with root access. I was successful in moving everything to the new server and setting up virtual hosts to accommodate a 'sandbox' subdomain where the customer could preview future changes before making them live.</p>
            </article>
          </li>

          <li className="project">
            <figure><a href="https://github.com/lcnervick" target="_blank"><img src={gitHubDark} /></a></figure>
            <aside>
              <p>Since releasing Service Toolz, it became more and more apparent that I would need version control to help manage updates, features, bug fixes, etc.. This is my repository that includes small experimental projects, various training projects, and other open-source repositories that will hopefully be helpful one day.<br />
              <a href="https://github.com/lcnervick"  target="_blank">Visit my Repo</a></p>
            </aside>
            <article id="gitHubRepo">
              <ul>
                <li className='header'><div>My Public Repositories</div></li>
                {
                  repoList.map(repo => {
                    const { description, id, language, name, html_url, homepage } = repo;
                    if(name === "Portfolio-Website") return null;
                    if(name === "Leif-Nervick") return null;
      
                    return (
                      <li key={html_url}>
                        <div className='repoName'>
                          <h3>${name}</h3>
                        </div>

                        <div className='repoIcons icons'>
                          <a href={html_url} target="_blank"><img src={gitHubIcon} alt="link to github repository" /></a>
                          <a href={homepage ? homepage : ('./projects/'+html_url.replace("https://github.com/lcnervick/",""))} target="_blank"><img src={runCodeIcon} alt="link to run repository code" /></a>
                        </div>

                        <div className='repoDesc'>
                          {description}
                        </div>

                      </li>
                    )
                  })
                }
              </ul>
            </article>
          </li>

        </ul>
      </div>
    </section>
  );
}
