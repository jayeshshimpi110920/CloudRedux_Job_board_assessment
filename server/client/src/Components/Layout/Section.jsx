import React from 'react';
import {  Element, Events, animateScroll as scroll,  scroller } from 'react-scroll'



export default class Section extends React.Component {

  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      }));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  render() {
    const {jobDescription,summary} = this.props
    return (
      <div>
          <Element name="test7" className="element" id="containerElement" style={{
            marginTop:"30px",
            position: 'relative',
            height: '500px',
            overflow: 'scroll'}}>

            <Element name="firstInsideContainer">
                <div>
                  {summary}
                </div>
                <div className='section'  dangerouslySetInnerHTML={{__html: jobDescription}}>

                </div>
            </Element>
          </Element>
      </div>
    );
  }
};



