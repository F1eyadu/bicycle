import React from 'react'
import { Card} from 'antd'
import axios from '../../axios/index'
import './detail.css'
export default class OrderDetail extends React.Component {
    state = {}
    componentDidMount(){
        let orderId = this.props.match.params.orderId
        if(orderId){
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) =>{
        axios.getData({
            url: '/order/Detail',
            data:{
                params: {
                    orderId: orderId
                }
            }
        }).then(res => {
            let orderInfo = res.data.data.result
            this.setState({
                orderInfo
            })
            this.renderMap(orderInfo)
        })
    }

    renderMap = (result) =>{
        this.map = new window.BMap.Map('orderDetailMap')
        this.addMapControl()
        this.drawBikeRoute(result.position_list)
        this.drawServiceArea(result.area)
    }
    addMapControl = () =>{
        let map = this.map
        map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }))
    }
    drawBikeRoute = (positionList) => {
        let map = this.map
        let startPoint = ''
        let endPoint = ''
        if(positionList.length > 0){
          let first = positionList[0]
          let last =  positionList[positionList.length - 1]
          startPoint = new window.BMap.Point(first.lon, first.lat)
          let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42),{
              imageSize: new window.BMap.Size(36,42),
              anchor: new window.BMap.Size(18,42)
          })
          let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon})
          this.map.addOverlay(startMarker)

          endPoint = new window.BMap.Point(last.lon, last.lat);
          let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
          })
          let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
          this.map.addOverlay(endMarker);

          //连接路线图
          let trackPoint = []
          for(let i of positionList){
              trackPoint.push(new window.BMap.Point(i.lon, i.lat))
          }
          let polyline = new window.BMap.Polyline(trackPoint,{
              strokeColor: '#1869ad',
              strokeWidth: 3,
              strokeOpacity: 1
          })
          this.map.addOverlay(polyline)
          this.map.centerAndZoom(endPoint, 11)
        }   
    }
    drawServiceArea = (positionList) =>{
        let trackPoint = []
        for(let i of positionList){
            trackPoint.push(new window.BMap.Point(i.lon, i.lat))
        }
        let polygon = new window.BMap.Polygon(trackPoint,{
            strokeColor: '#ce0000',
            strokeWidth: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polygon)
    }
    render(){
        const info = this.state.orderInfo || {}
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map">

                    </div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
