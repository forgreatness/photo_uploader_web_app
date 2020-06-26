import React from 'react';
import './App.css';

function ImageContainer(props) {
    return (
        <div className='image-container'>
            <span className='close-image-block'>x</span>
            <img 
                className='uploaded-image'  
                src={props.imagePath}
                alt=""
            />
            <div className='image-caption-container'>
                <b className='image-caption'>{props.imageCaption}</b>
            </div>
        </div>
    );
}

const imageUrl = "data:image/jpeg;base64,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";

const imageDescription = "Roger Federer has decided to sit out the rest of 2020 calendar due to Covid 19 concerns and surgical recovery. You got this, you know how to do it!";

class App extends React.Component {
    render() {
        return (
            <div>
                <ImageContainer imagePath={imageUrl} imageCaption={imageDescription}/>
                <ImageContainer imagePath={imageUrl} imageCaption={imageDescription}/>
            </div>
        );
    }
}

export default App;