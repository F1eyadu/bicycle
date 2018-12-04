import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/util'
import BaseForm from '../../components/BaseForm/index'
const FormItem = Form.Item
const Option = Select.Option
export default class Order extends React.Component {
    state = {
        list: [],
        orderInfo: {},
        orderConfirmVisble:false
    }
    params = {
        page: 1
    }
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
            initialValue: '1',
            width: 100,
            list: [
                {id:'0',name: '全部'},
                {id:'1',name: '进行中'},
                {id:'2',name: '结束行程'}
            ]
        }
    ]
    componentDidMount(){
        this.requestList()
    }
    requestList = () =>{
        let _this = this
        axios.getData({
            url: '/orderList',
            data: {
                params:this.params
            }
        }).then(res => {
            let list = res.data.data.result.item_list
            list.map((item, index)=>{
                item.key = index
                return item
            })
            this.setState({
                list,
                pagination: Utils.pagination(res, (current)=>{
                    _this.params.page = current
                    this.requestList()
                })
            })
        })
    }
    onRowClick = (record, index) =>{
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    openOrderDetail = ()=>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                text: '提示',
                content: '请选择一条订单再查看详情'
            })
            return
        }
        window.open(`/#/common/order/detail/${item.id}`, 'blank')
    }
    searchOrder = (params) => {
        console.log(params)
        this.params = params
        this.requestList()
    }
    orderComfrin = () =>{
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title: '提示',
                content:'请选择一条订单结束'
            })
            return
        }
        axios.getData({
            url: '/order/ebike_info',
            data:{
                params: {
                    orderId: item.id
                }
            }
        }).then((res) =>{
            let datas = res.data.data
            if(datas.code == '0'){
                this.setState({
                    orderInfo: datas.result,
                    orderConfirmVisble: true
                })
            }
        })
    }
    finishOrder = () => {
        let item = this.state.selectedItem
        axios.getData({
            url: '/order/finish_order',
            data: {
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.data.data.code == 0){
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble:false,
                    selectedItem: {},
                    selectedRowKeys: []
                })
                this.requestList()
            }
        })
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机号',
                dataIndex: 'mobile'
            }, {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance / 1000 +'Km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex:'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title:'订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        let selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        let formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol:{
                span: 19
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList = {this.formList} filterSubmit = {this.searchOrder}/>
                </Card>
                <Card style={{ marginTop: '-1px' }}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button onClick={this.orderComfrin}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection = {rowSelection}
                        onRow = {(record, index) =>{
                            return {
                                onClick: ()=>{
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    ></Table>
                </div>
                <Modal
                    title='结束订单'
                    visible = {this.state.orderConfirmVisble}
                    onCancel = {()=>{
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk = {this.finishOrder}
                    width = {600}
                    cancelText = '取消'
                    okText='结束'
                >
                    <Form>
                        <FormItem label='车辆编号' {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
