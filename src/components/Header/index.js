import React from 'react'
import { Row,Col } from "antd"
import './index.css'
import Util from '../../utils/util'
import axios from '../../axios'
// import { connect } from 'react-redux'
export default class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:'李雷'
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData(){
        let city = '重庆';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }
    render(){
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>共享单车后台管理系统</span>
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a>退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}
// const mapStateToProps = state => {
//     return {
//         menuName: state.menuName
//     }
// };
// export default connect(mapStateToProps)(Header)