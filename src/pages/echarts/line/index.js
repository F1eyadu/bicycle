import React from 'react'
import { Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Line extends React.Component{
    state = {}
    componentWillMount(){
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () =>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{

            },
            tooltip:{
                trigger: 'item'
            },
            series:[
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,2200,1500,3300,2500,4000,6000
                    ]
                }
            ]
        }
        return option
    }
    getOption2 = () =>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend:{
                data:['OFO订单量', '摩拜订单量']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{

            },
            tooltip:{
                trigger: 'item'
            },
            series:[
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [
                        1000,2200,1500,3300,2500,4000,6000
                    ]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [
                        800,1200,2500,3300,2000,3500,7000
                    ]
                }
            ]
        }
        return option
    }
    getOption3 = () =>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日'],
                boundaryGap: false,
                type: 'category'
            },
            yAxis:{

            },
            tooltip:{
                trigger: 'item'
            },
            series:[
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,2200,1500,3300,2500,4000,6000
                    ],
                    areaStyle:{}
                }
            ]
        }
        return option
    }

    render(){
        return(
            <div>
                <Card title="折线图一">
                    <ReactEcharts 
                    option = {this.getOption()} 
                    theme='Imooc' 
                    notMerge={true} 
                    lazyUpdate={true} 
                    style={{height: 500}}>
                    </ReactEcharts>
                </Card>
                <Card title="折线图二" style={{marginTop: 20}}>
                <ReactEcharts 
                    option = {this.getOption2()}
                    theme='Imooc' 
                    notMerge={true} 
                    lazyUpdate={true} 
                    style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="折线图三" style={{marginTop: 20}}>
                <ReactEcharts 
                    option = {this.getOption3()}
                    theme='Imooc' 
                    notMerge={true} 
                    lazyUpdate={true} 
                    style={{height: 500}}></ReactEcharts>
                </Card>
            </div>
        )
    }
}