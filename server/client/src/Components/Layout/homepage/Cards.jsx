import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Testimonials</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img 1.jpg'
              text='The portal is very user friendly in terms of searching resumes and job postings. Also, they have a good database to search resumes. As far as services are concerned its excellent! Their turnaround time for resolving any issue is just a few minutes and that is really appreciable.Thank you so much for all your effort.'
              path='/'
            />
            <CardItem
              src='images/img 2.jpg'
              text='This is an excellent job portal, we value the resumes received through this channel. It provides relevant and accurate matches as per the job openings. Magic Search and Power search are extremely useful tools.'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img 1.jpg'
              text='The Websites database has been one of our reliable sources for recruitment, backed by a very efficient team who would go out of their way to make sure that requests are taken ahead with immediate and complete closure.'
              path='/'
            />
            <CardItem
              src='images/img 4.jpg'
              text='The Websites database has been one of our reliable sources for recruitment, backed by a very efficient team who would go out of their way to make sure that requests are taken ahead with immediate and complete closure.'
              path='/'
            />
            <CardItem
              src='images/img 2.jpg'
              text='The Websites database has been one of our reliable sources for recruitment, backed by a very efficient team who would go out of their way to make sure that requests are taken ahead with immediate and complete closure.'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
