import React, {Component} from 'react';
import S3FileUpload from 'react-s3';


class Uploadimage extends Component {

    state = {
        config: {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            dirName: "venues",
            region: 'us-east-1',
            accessKeyId: process.env.REACT_APP_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
        },
        image: ""
    }

    upload=(e)=>{
        S3FileUpload.uploadFile(e.target.files[0], this.state.config)
            .then((data)=> {
                this.setState({
                    image: data.location
                })
            })
            .catch((error)=> {
                alert(error)
            })


    }

    render(){
        return(
            <div>
                <h3>Upload an Image</h3>
                <input type="file" onChange={this.upload}/>
                <img src={this.state.image}/>
            </div>
        )
    }
}

export default Uploadimage;
