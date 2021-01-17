import React, {Component} from 'react';
import S3FileUpload from 'react-s3';
import RestClient from "../rest/RestClient";

class Uploadimage extends Component {

    state = {
        config: {
            bucketName: "",
            dirName: "venues",
            region: 'us-east-1',
            accessKeyId: "",
            secretAccessKey: ""
        },
        image: this.props.initialImage ? this.props.initialImage : ""
    }
    async componentDidMount() {
        let restClient = new RestClient();
        let response = await restClient.getUploadDetails();
        if(response != null) {
            this.setState({
                config: {
                    bucketName: response.bucket,
                    dirName: "venues",
                    region: 'us-east-1',
                    accessKeyId: response.key,
                    secretAccessKey: response.secret
                }
            });
        }
    }

    upload=(e)=>{
        S3FileUpload.uploadFile(e.target.files[0], this.state.config)
            .then((data)=> {
                this.setState({
                    image: data.location
                });
                this.props.setImage(data.location);

            })
            .catch((error)=> {
                alert(error)
            })


    }

    imagePreview = () => {
        return (
            (this.state.image !== "") ?
                <img src={this.state.image} style={{margin:"10px" , width:"500px", height:"300px"}}/>
            :
                <div></div>
        )
    }

    render(){
        let image = this.imagePreview();
        return(
            <div className="input">
                <input type="file" accept="image/png,image/jpeg" onChange={this.upload}/>
                {image}
            </div>
        )
    }
}

export default Uploadimage;
