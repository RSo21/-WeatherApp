import React, { Component } from "react";
import Background from '../assets/fabio-sasso-XjIajC-SYuc-unsplash.jpg';

class Home extends Component {
    state = {
        width: window.innerWidth,
        city: '',
        temperature: '',
        icon: '',
        pressure: '',
        humidity: '',
        wind: '',
        open: false
    };

    showWeather = () => {
        const {city} = this.state

        const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
        const UNITS = 'metric'
        const APP_ID = 'b945797c58d365f04b977e8b2475fe8a'
        const URL = `${API_URL}?q=${city}&units=${UNITS}&appid=${APP_ID}`;

        window.addEventListener('resize', this.handleWindowSizeChange);
        fetch(URL)
        .then(response => response.json())
        .then(data => {
          this.setState({
            temperature: data.main.temp,
            icon: data.weather[0].icon,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            open: true,
          });
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    handleChange = (e) => {
        this.setState({
            city: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        const { width, open, city, temperature, icon, pressure, humidity, wind } = this.state;
        const isMobile = width <= 978;

        if(isMobile){
            return(
                <div className="home-mobile">
                {city} {temperature} &#8451;
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt = "weather-icon"/> 
              </div>
            )
        }else{
            return(
                <div className="home">
                    <img className="background" src = {Background} alt = "background" />
                    <form className = "home-form"  onSubmit={this.handleSubmit} >
                        <label>        
                            enter the city name: 
                            <br/>
                            <input type="text" value = {city} name = "text"
                            onChange={this.handleChange} />
                        </label>
                    </form>
                    <button className = "weather-btn" onClick = {this.showWeather}>SHOW</button>
                    {open ? 
                        <div className = "home-weather">
                            <p className="home-weathe-city">{city}</p>                           
                            <div className="temp-and-pressure">
                                <div className="home-weather-box">
                                    <p className="home-weather-box-temp">TEPMERATURE</p>
                                    <div className="temp">
                                        <span>{temperature} &#8451;</span>
                                        <img className = "home-weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt = "weather-icon"/>
                                    </div>
                                </div>
                                <div className = "home-weather-box">
                                    <p>PRESSURE</p>
                                    {pressure} hPa
                                </div>
                            </div>
                            <div className = "himidity-and-wind">
                                <div className = "home-weather-box">
                                    <p>HUMIDITY</p>
                                    {humidity} %
                                </div>
                                <div className = "home-weather-box">
                                    <p>WIND</p> 
                                    {wind} km/h
                                </div>
                            </div>
                        </div> 
                    : ""}
              </div>
            )
        }
    }
}

export default Home;