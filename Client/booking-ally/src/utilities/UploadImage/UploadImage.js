import React, {Component} from 'react';
import RestClient from "../rest/RestClient";

class Uploadimage extends Component {

    state = {
        config: {
            bucketName: "",
            dirName: "venues/"+ this.props.partner,
            region: 'us-east-1',
            accessKeyId: "",
            secretAccessKey: ""
        },
        image: this.props.initialImage ? this.props.initialImage : "",
        isLoading: false
    }

    upload= async (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        let restClient = new RestClient();
        let response = await restClient.uploadImage(e.target.files[0] );
        if(response.imageUrl) {
            this.props.setImage(response.imageUrl);
            this.setState({
                image: response.imageUrl
            });
        } else {
            alert(response);
        }
        this.setState({
            isLoading: false
        });
    }

    imagePreview = () => {
        return (
            (this.state.image !== "") ?
                <img src={this.state.image} alt="Uploaded preview" style={{margin:"10px" , width:"500px", height:"300px"}}/>
            :
                <div></div>
        )
    }

    loading = () => {
        if(this.state.isLoading) {
            return (
                <i className=" w3-spin fas fa-spinner" style={{color: "#0e770e", fontSize: "30px"}}/>
            )
        } else {
            <div></div>
        }
    }

    render(){
        let image = this.imagePreview();
        let loading = this.loading();
        return(
            <div className="input">
                <input type="file" accept="image/png,image/jpeg" onChange={this.upload}/> {loading}
                {image}
            </div>
        )
    }
}

export default Uploadimage;
