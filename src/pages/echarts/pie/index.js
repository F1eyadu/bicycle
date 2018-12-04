import React from 'react'
import { Card} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
export default class Pie extends React.Component{
    state = {}
    componentWillMount(){
        echarts.registerTheme('Imooc', echartTheme)
    }
    getOption = () =>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom:20,
                data: ['周一','周二','周三','四一','周五','六一','周日']
            },
            tooltip:{
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series:[
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {
                            name: '周一',
                            value: 2000,
                        },
                        {
                            name: '周二',
                            value: 2500,
                        },
                        {
                            name: '周三',
                            value: 3000,
                        },
                        {
                            name: '周四',
                            value: 4000,
                        },
                        {
                            name: '周五',
                            value: 2500,
                        },
                        {
                            name: '周六',
                            value: 1500,
                        },
                        {
                            name: '周日',
                            value: 1000,
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }
    getOption2 = () =>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom:20,
                data: ['周一','周二','周三','四一','周五','六一','周日']
            },
            tooltip:{
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series:[
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center:['50%', '60%'],
                    data: [
                        {
                            name: '周一',
                            value: 2000,
                        },
                        {
                            name: '周二',
                            value: 2500,
                        },
                        {
                            name: '周三',
                            value: 3000,
                        },
                        {
                            name: '周四',
                            value: 4000,
                        },
                        {
                            name: '周五',
                            value: 2500,
                        },
                        {
                            name: '周六',
                            value: 1500,
                        },
                        {
                            name: '周日',
                            value: 1000,
                        }
                    ]
                }
            ]
        }
        return option
    }
    getOption3 = () =>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom:20,
                data: ['周一','周二','周三','四一','周五','六一','周日']
            },
            tooltip:{
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series:[
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    center:['50%', '50%'],
                    data: [
                        {
                            name: '周一',
                            value: 2000,
                        },
                        {
                            name: '周二',
                            value: 2500,
                        },
                        {
                            name: '周三',
                            value: 3000,
                        },
                        {
                            name: '周四',
                            value: 4000,
                        },
                        {
                            name: '周五',
                            value: 2500,
                        },
                        {
                            name: '周六',
                            value: 1500,
                        },
                        {
                            name: '周日',
                            value: 1000,
                        }
                    ].sort(function(a,b){ return a.value - b.value}),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function(index){
                        return Math.random() * 200
                    }
                }
            ]
        }
        return option
    }

    render(){
        return(
            <div>
                <Card title="饼图一">
                    <ReactEcharts 
                    option = {this.getOption()} 
                    theme='Imooc' 
                    notMerge={true} 
                    lazyUpdate={true} 
                    style={{height: 500}}>
                    </ReactEcharts>
                </Card>
                <Card title="饼图二" style={{marginTop: 20}}>
                <ReactEcharts 
                    option = {this.getOption2()}
                    theme='Imooc' 
                    notMerge={true} 
                    lazyUpdate={true} 
                    style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="饼图三" style={{marginTop: 20}}>
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