import React from 'react';
import './App.css';

function UploadedImageContainer(props) {
    return (
        <div className='image-container'>
            <button className='close-image-button'>x</button>
            <img 
                className='uploaded-image'  
                src={props.imagePath}
                alt={props.imageCaption}
            />
            <div className='image-caption-container'>
                <b className='image-caption'>{props.imageCaption}</b>
            </div>
        </div>
    );
}

function UploadImageForm(props) {
    return (
        <form className='upload-image-form'>
            <ul>
                <li>
                    <label htmlFor='image_url'>Image URL</label>
                    <input type='url' id='image_url' name='image_url' value={props.imagePath} onChange={props.changeImagePath}/>
                </li>
                <li>
                    <label htmlFor='image_caption'>Image Caption</label>
                    <input type='text' id='image_caption' name='image_caption' value={props.imageCaption} onChange={props.changeImageCaption}/>
                </li>
                <li>
                    <button type='button'>Submit</button>
                    <button type='button'>Cancel</button>
                </li>
            </ul>
        </form>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedImages: [{
                imagePath: '',
                imageCaption: ''
            }]
        };
    }

    handleChangeImagePath = (e) => {
        let uploadedImages = this.state.uploadedImages;
        uploadedImages[0].imagePath = e.target.value;

        this.setState({
            uploadedImages: uploadedImages
        });
    }

    handleChangeImageCaption = (e) => {
        let uploadedImages = this.state.uploadedImages;
        uploadedImages[0].imageCaption = e.target.value;

        this.setState({
            uploadedImages: uploadedImages
        })
    }

    handleSubmitImage = (e) => {

    }

    render() {
        return (
            <div className='main-container'>
                <div className='main-left'>
                    <UploadImageForm 
                        imagePath={this.state.uploadedImages[0].imagePath} 
                        imageCaption={this.state.uploadedImages[0].imageCaption}
                        changeImagePath={this.handleChangeImagePath}
                        changeImageCaption={this.handleChangeImageCaption}/>
                </div>
                <div className='main-right'>
                    {/* <UploadedImageContainer imagePath={imageUrl} imageCaption={imageDescription}/>
                    <UploadedImageContainer imagePath={imageUrl} imageCaption={imageDescription}/>
                    <UploadedImageContainer imagePath={imageUrl} imageCaption={imageDescription}/> */}
                </div>
            </div>
        );
    }
}

export default App;