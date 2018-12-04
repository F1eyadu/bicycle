import React from 'react'
import {Card, Form} from 'antd'
import BaseForm from '../../components/BaseForm/index'
import axios from '../../axios/index'

export default class Bike extends React.Component{
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field:'city',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [
                {id:'0',name: '全部'},
                {id:'1',name: '成都市'},
                {id:'2',name: '重庆市'},
                {id:'3',name: '南充市'},
            ]
        },{
            type: '时间查询',
            field: 'time'
        },{
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 100,
            list: [
                {id:'0',name: '全部'},
                {id:'1',name: '进行中'},
                {id:'2',name: '已结束'}
            ]
        }
    ]
    state = {
        bikeInfo: {}
    }
    params={
        page: 1
    }
    handleFilterSubmit = (params)=>{
       this.params = params
       this.requestList()
    }
    requestList = () =>{
        axios.getData({
            url: '/bikeList',
            data:{
                params:this.params
            }
        }).then((res) => {
            let found = res.data.data
            if(found.code == '0'){
                this.setState({
                    total: found.result.total_count
                })
                this.renderMap(found)
            }
        })
    }
    componentDidMount(){
        this.requestList()
    }
    renderMap = (res) => {
        let data = res.result
        let list = data.route_list
        this.map = new window.BMap.Map('container', {enableMapClick: false})
        let gps1 = list[0].split(',')
        let startPoint = new window.BMap.Point(gps1[0], gps1[1])
        let gps2 = list[list.length -1].split(',')
        let endPoint = new window.BMap.Point(gps2[0], gps2[1])
        this.map.centerAndZoom(endPoint, 11)

        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size( 36,42),
            abchor: new window.BMap.Size(18,42)
        })

        let bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart)
        
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })

        let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon})
        this.map.addOverlay(bikeMarkerEnd)

        let routeList = []
        list.forEach((item) => {
            let p = item.split(',')
            let point = new window.BMap.Point(p[0], p[1])
            routeList.push(point)
        })

        let polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine)

        let serviceList = data.service_list
        let servicePointist = []
        serviceList.forEach((item)=>{
            let point = new window.BMap.Point(item.lon, item.lat)
            servicePointist.push(point)
        })
        let ployServiceLine = new window.BMap.Polyline(servicePointist, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(ployServiceLine)

        let bikeList = data.bike_list
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36,42), {
            imageSize: new window.BMap.Size(36,42),
            abchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',')
            let point = new window.BMap.Point(p[0], p[1])
            let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon})
            this.map.addOverlay(bikeMarker)
        })
        this.addMapControl()
    }
    addMapControl = () =>{
        let map = this.map
        let top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT})
        let top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT})
        map.addControl(top_right_control)
        map.addControl(top_right_navigation)
        map.enableScrollWheelZoom(true)
    }
    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList = {this.formList} filterSubmit = {this.handleFilterSubmit} />
                </Card>
                <Card>
                    <div>共{this.state.total}辆车</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        )
    }
}