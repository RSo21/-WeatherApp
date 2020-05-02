import React, { Component } from "react";


class Home extends Component {
    state = {
        width: window.innerWidth,
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render(){
        const { width } = this.state;
        const isMobile = width <= 978;

        if(isMobile){
            return(
               <div>
                   
               </div>
            )
        }else{
            return(
               <>
               
               </>
            )
        }
    }
}

export default Home;