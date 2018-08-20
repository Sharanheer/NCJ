import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 19.100356,
      lng: 72.845215
    },
    zoom: 14
  };
 
  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ padding: '10% 0', marginRight: '10%', marginTop: '40px', marginBottom: '60px', height: '58vh', width: '30%' }}>
        <h3>Locate Us</h3>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDGLShm21lCPO4gFIJlqVnafV8RHyYAOO8' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={19.100356}
            lng={72.845215}
            // text={'Kreyser Avrora'}19.100356, 72.845215
          />
        </GoogleMapReact>
      </div>

    );
  }
}
 
export default SimpleMap;