import React from 'react'
import { Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme'
import 'echarts/lib/chart/bar'
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
                text: '用户骑行订单',
            },
            tooltip:{
                trigger: 'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1000,2000,3000,4000,5000,6000,7000]
                }
            ]
        }
        return option
    }
    getOption2 = () =>{
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip:{
                trigger: 'axis'
            },
            legend:{
                data: ['OFO', '摩拜', '小蓝']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [1000,2000,3000,4000,5000,6000,7000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1300,2500,1800,4600,3000,6000,700]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000,500,2500,4000,3000,3500,5000]
                }
            ]
        }
        return option
    }

    render(){
        return(
            <div>
                <Card title="柱形图一">
                    <ReactEcharts option = {this.getOption()} theme='Imooc' notMerge={true} lazyUpdate={true} style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="柱形图二" style={{marginTop: 20}}>
                <ReactEcharts option = {this.getOption2()} theme='Imooc' notMerge={true} lazyUpdate={true} style={{height: 500}}></ReactEcharts>
                </Card>
            </div>
        )
    }
}