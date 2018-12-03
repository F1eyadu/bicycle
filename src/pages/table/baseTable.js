import React from 'react'
import {Card, Table} from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/util'
export default class BaseTable extends React.Component{
    state ={
        dataSource2: []
    }
    params = {
        page: 1
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName: '小明',
                sex: '1',
                state:'1',
                interest: '1',
                date: '2018-11-30',
                address: '不知道',
                time: '13:43'
            },
            {
                id:'1',
                userName: '李雷',
                sex: '1',
                state:'1',
                interest: '1',
                date: '2018-11-30',
                address: '不知道',
                time: '13:43'
            },{
                id:'2',
                userName: '韩梅梅',
                sex: '1',
                state:'1',
                interest: '1',
                date: '2018-11-30',
                address: '不知道',
                time: '13:43'
            }
        ]
        dataSource.map((item, index) => {
            item.key = index
        })
        this.setState({
            dataSource
        })
        this.request()
    }
    onRowClick = (record, index) =>{
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    request = () => {
        let _this = this
        axios.getData({
            url: '/list',
            data: {
                params:{
                    page:this.params.page
                }
            }
        }).then(res =>{
            let lists = res.data.data.result.list
            lists.map((item, index) => {
                item.key = index
            })
            this.setState({
                dataSource2: lists,
                selectedRowKeys: [],
                selectedRows: null,
                pagination: Utils.pagination(res, (current)=>{
                    _this.params.page = current
                    this.request()
                })
            })
        })
    }

    render(){
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex = 0?'女':'男'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '辣鸡',
                        '2': '辣鸡1',
                        '3': '菜鸡',
                        '4': '菜鸡1',
                        '5': 'nice'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1': '跑',
                        '2': '跳',
                        '3': '飞',
                        '4': '爬',
                        '5': '滚',
                        '6': '哭',
                        '7': '笑',
                        '8': '闹',
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'date'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '时间',
                dataIndex: 'time'
            }
        ]
        return(
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据表格" style={{marginTop: '20px'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据表格-单选" style={{marginTop: '20px'}}>
                    <Table 
                        columns={columns}
                        onRow = {(record, index) => {
                            return {
                                onClick: ()=>{
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据表格-多选" style={{marginTop: '20px'}}>
                    <Table 
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据表格-分页" style={{marginTop: '20px'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}