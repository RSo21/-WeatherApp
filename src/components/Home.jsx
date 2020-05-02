import React, { Component } from "react";

class Home extends Component {
    state = {
        width: window.innerWidth,
        city: '',
        temperature: '',
        icon: '',
        open: false
    };

    showWeather = () => {
        const {city} = this.state

        const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
        const UNITS = 'metric'
        const APP_ID = 'b945797c58d365f04b977e8b2475fe8a'

        const URL = `${API_URL}?q=${city}&units=${UNITS}&appid=${APP_ID}`;

        window.addEventListener('resize', this.handleWindowSizeChange);
        console.log(URL);
        fetch(URL)
        .then(response => response.json())
        .then(data => {
          this.setState({
            temperature: data.main.temp,
            icon: data.weather[0].icon,
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
        const { width, open, city, temperature, icon } = this.state;
        const isMobile = width <= 978;

        if(isMobile){
            return(
                <div className="App">
                {city} {temperature} &#8451;
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt = "weather-icon"/> 
              </div>
            )
        }else{
            return(
                <div className="App">
                    <form  onSubmit={this.handleSubmit} >
                        <label>        
                            enter the city name: 
                            <br/>
                            <input type="text" value = {city} name = "text"
                            onChange={this.handleChange} />
                        </label>
                    </form>
                    <button onClick = {this.showWeather}>check</button>
                    {open ? 
                        <div>
                            {city} {temperature} &#8451; 
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt = "weather-icon"/>
                        </div> 
                    : ""}
              </div>
            )
        }
    }
}

export default Home;