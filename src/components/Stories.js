import React from 'react';

const Stories = (props) => {
  return (
    <div>
      {props.relatedStories.map(story => (
        <div className="story-container" key={story.objectID}>
          <h4 style={{margin: "5px"}}>{story.title}</h4>
          <p style={{fontSize: "20px", margin: "5px"}}>Author: {story.author}</p>
          <a href={story.url} target="_blank" rel="noreferrer" style={{color: "white", fontSize: "18px"}}>Visit Website</a>
        </div>
      ))}
    </div>
  )
}

export default Stories;