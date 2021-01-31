# Final Year Project
### Nicholas Murray - A00255953


## Booking Ally
### An Online Venue Booking site
Booking Ally will provide a platform for services such a Hairdresser and Barbers to both advertise there services to potential customers while also allowing them to take bookings from customers. The main idea behind the platform is to create a standard platform for businesses to use for taking reservations from customers. Currently there is a gap in the market for such a service as many businesses either do not have any kind of online service for taking bookings or use online messaging apps which can be very informal nd lead to delays in bookings and confirmations.

## System Architecture
I have decided to use a microservices architecture to build this system. I have chose a microservices architecture because it will give me an great opportunity to learn some technologies that are new to me, Docker being one of them. This type of architecture has many benefits of which I wil just name a few here.
#### Scalability
Using a microservices architecture allows the system to be scaled to meet increased demand. This also allows for scaling of individual services instead of the whole system eg.. if my authentication service has high demand I can create a new instance of that service alone.

#### Elasticity
Just as a microservice deployment can scale out it can also shrink by shutting down any uneeded instances of individual services allowing for cost/energy savings.

### Current Architecture Diagram
![System Architecture](/Resources/system-architecture-with-proxy.png)

(Previous architecture revisions can be found in the "Resources" folder)


