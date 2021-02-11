import React, {Component} from 'react';
import {connect} from "react-redux";
import './services.css';
import CreateServiceModal from "../CreateService/CreateServiceModal";
import EditServiceModal from "../EditService/EditServiceModal";

class Services extends Component {

    selectService = (service) => {
        if(service === this.props.selectedService) {
            service = null;
        }
        this.props.setSelectedService(service);
    }

    renderServices = () => {
        let servicesList;
        if(this.props.services && this.props.services.length) {
            servicesList = this.props.services.map(service => {
                return (
                    (service === this.props.selectedService) ?
                        <div key={service.id} className="w3-container w3-blue service" onClick={ () => {this.selectService(service)}}>
                            <h2 className="service-text w3-container w3-cell w3-left">{service.name}</h2>
                            <h2 className="service-cost w3-container w3-cell w3-right">€ {service.cost}</h2>
                        </div>
                    :
                        <div key={service.id} className="w3-container w3-hover-blue service" onClick={ () => {this.selectService(service)}}>
                            <h2 className="service-text w3-container w3-cell w3-left">{service.name}</h2>
                            <h2 className="service-cost w3-container w3-cell w3-right">€ {service.cost}</h2>
                        </div>
                )
            });
        } else {
            servicesList = (
                <div>
                    <h2>No Services for this venue</h2>
                </div>
            )
        }

        return servicesList;
    }

    getOption() {
        if(!this.props.selectedService){
            return (
                <CreateServiceModal venue={this.props.venue}/>
            )
        } else {
            return (
                <EditServiceModal service={this.props.selectedService}/>
            )
        }
    }

    render() {
        let serviceList = this.renderServices();
        let options = this.getOption();
        return (
            <div className="services">
                {serviceList}
                <div className="service-options">
                    {options}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        services: state.services,
        selectedService: state.selectedService
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
       setSelectedService: (service) => { dispatch({ type:'SET_SELECTED_SERVICE', service:service})},
       getServices: (id) => { dispatch({ type:'GET_SERVICE', id:id})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Services);