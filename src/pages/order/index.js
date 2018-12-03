import React from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/util'
const FormItem = Form.Item
const Option = Select.Option
export default class Order extends React.Component {
    state = {
        list: []
    }
    params = {
        page: 1
    }
    componentDidMount(){
        this.requestList()
    }
    requestList = () =>{
        let _this = this
        axios.getData({
            url: '/orderList',
            data: {
                params:{
                    page: this.params.page
                }
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
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: '-1px' }}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button>结束订单</Button>
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
            </div>
        )
    }
}

class FilterForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: '100px' }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">成都市</Option>
                                <Option value="2">重庆市</Option>
                                <Option value="3">南充市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker/>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker/>
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: '80px' }}
                                placeholder="全部"
                            >
                                <Option value=''>全部</Option>
                                <Option value='1'>进行中</Option>
                                <Option value='2'>结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm)