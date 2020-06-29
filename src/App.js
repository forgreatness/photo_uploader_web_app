import React from 'react';
import './App.css';
const isImageUrl = require('is-image-url');

function UploadedImageContainer(props) {
    return (
        <div className='image-container'>
            <button className='close-image-button' onClick={props.removeUploadedImage}>x</button>
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
        <form className='upload-image-form' onSubmit={props.submitImageInfo} noValidate>
            <ul>
                <li>
                    <div>
                        <div>
                            <label htmlFor='imageURL'>Image URL</label>
                            <input type='url' id='imageURL' name='imageURL' placeholder='Enter URL' value={props.imagePath} onChange={props.changeImageInfo} noValidate/>
                        </div>
                        <span className='error'>{props.inputErrors.imageURL}</span>
                    </div>
                </li>
                <li>
                    <div>
                        <div>
                            <label htmlFor='imageCaption'>Image Caption</label>
                            <input type='text' id='imageCaption' name='imageCaption' placeholder='Enter Caption' value={props.imageCaption} onChange={props.changeImageInfo} noValidate/>
                        </div>
                        <span className='error'>{props.inputErrors.imageCaption}</span>
                    </div>
                </li>
                <li>
                    <button type='submit'>Submit</button>
                    <button type='button' onClick={props.cancelImageInfo}>Cancel</button>
                </li>
                <li id='form-error'>{props.isSubmitError ? 'Please make sure that both the URL and Caption are provided and meets the criteria.' : ''}</li>
            </ul>
        </form>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedImages: [{
                imageURL: '',
                imageCaption: '',
            }],
            submitError: false,
            openDialog: false
        };
    }

    handleChangeImageInfo = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        let uploadedImages = this.state.uploadedImages;
        uploadedImages[this.state.uploadedImages.length-1][name] = value;

        this.setState({
            uploadedImages: uploadedImages,
            submitError: false
        });
    }

    handleSubmitImageInfo = (e) => {
        e.preventDefault();

        let uploadedImages = this.state.uploadedImages.slice(0, this.state.uploadedImages.length);     
        let imageInfo = this.state.uploadedImages[uploadedImages.length-1];
        let submitError = !isImageUrl(imageInfo.imageURL) || imageInfo.imageCaption.length < 1;

        this.setState({
            uploadedImages: submitError ? uploadedImages : uploadedImages.concat([{ imageURL: '', imageCaption: '' }]),
            submitError: submitError
        });
    }

    handleCancelImageInfo = () => {
        let uploadedImages = this.state.uploadedImages;
        uploadedImages[uploadedImages.length-1].imageURL = '';
        uploadedImages[uploadedImages.length-1].imageCaption = '';
        
        this.setState({
            uploadedImages: uploadedImages,
            submitError: false,
            openDialog: false
        });
    }

    handleRemoveUploadedImage = (i) => {
        let uploadedImages = this.state.uploadedImages;
        uploadedImages.splice(i,1);

        this.setState({
            uploadedImages: uploadedImages
        });
    }

    handleOpenPhotoEntryDialog = () => {
        this.setState({
            openDialog: true
        });
    }

    render() {
        let numOfUploadedImages = this.state.uploadedImages.length - 1;
        let imageURLInput = this.state.uploadedImages[numOfUploadedImages].imageURL;
        let imageCaptionInput = this.state.uploadedImages[numOfUploadedImages].imageCaption;
        let formErrors = {
            'imageURL': isImageUrl(imageURLInput) ? '' : 'Invalid image URL',
            'imageCaption': imageCaptionInput.length > 0 ? '' : "Caption can't be empty"
        };

        let submittedImages = this.state.uploadedImages.slice(0, numOfUploadedImages);
        
        let openDialogButton = <button key='openDialogButton' style={{'marginBottom': '20px'}} onClick={this.handleOpenPhotoEntryDialog}>Open photo entry dialog</button>;
        let photoEntryDialog = <UploadImageForm 
            key='photoEntryDialog'
            imagePath={imageURLInput} 
            imageCaption={imageCaptionInput}
            changeImageInfo={this.handleChangeImageInfo}
            submitImageInfo={this.handleSubmitImageInfo}
            cancelImageInfo={this.handleCancelImageInfo}
            inputErrors={formErrors}
            isSubmitError={this.state.submitError}/>;
        let contentOfDialogContainer = [
            openDialogButton,
        ];

        if (this.state.openDialog) {
            contentOfDialogContainer.push(photoEntryDialog);
        }

        return (
            <div className='main-container'>
                <div className='main-left'>
                    {contentOfDialogContainer}
                </div>
                <div className='main-right'>
                    {
                        submittedImages.map((submittedImage, i) => {
                            return (
                                <UploadedImageContainer
                                    key={i.toString()}
                                    imagePath={submittedImage.imageURL} 
                                    imageCaption={submittedImage.imageCaption} 
                                    removeUploadedImage={() => this.handleRemoveUploadedImage(i)}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;