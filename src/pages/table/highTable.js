import React from 'react'
import { Card, Table,Badge, Modal } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/util'
import { Button } from 'antd/lib/radio';
export default class HighTable extends React.Component {
    state = {}
    params = {
        page: 1
    }
    componentDidMount() {
        this.request()
    }
    request = () => {
        let _this = this
        axios.getData({
            url: '/newTable',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            let lists = res.data.data.result.list
            lists.map((item, index) => {
                item.key = index
            })
            this.setState({
                dataSource2: lists,
                selectedRowKeys: [],
                selectedRows: null,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current
                    this.request()
                })
            })
        })
    }
    handleChange = (pagination, filters, sorter) =>{
        this.setState({
            sortOrder: sorter.order
        })
    }
    delete = (item) =>{
        let id = item.id
        Modal.confirm({
            title: '确认',
            content: '你确认要删除该条数据吗',
            onOk:()=>{
                this.request()
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key:'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex = 0 ? '女' : '男'
                }
            },
            {
                title: '状态',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
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
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(interest) {
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
                key: 'date',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '时间',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                fixed: 'left',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 80,
                fixed: 'left',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key:'sex',
                width: 80,
                fixed: 'left',
                dataIndex: 'sex',
                render(sex) {
                    return sex = 0 ? '女' : '男'
                }
            },
            {
                title: '状态',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
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
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(interest) {
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
                key: 'date',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date1',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date2',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date3',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date4',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date5',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date6',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date7',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date8',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '生日',
                key: 'date9',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '时间',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key:'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex = 0 ? '女' : '男'
                }
            },
            {
                title: '年龄',
                key:'age',
                width: 80,
                dataIndex: 'age',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: '状态',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
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
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(interest) {
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
                key: 'date',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '时间',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }
        ]
        const columns4 = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                width: 80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key:'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex = 0 ? '女' : '男'
                }
            },
            {
                title: '状态',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': <Badge status="success" text="辣鸡"/>,
                        '2': <Badge status="error" text="辣鸡1"/>,
                        '3': <Badge status="default" text="菜鸡"/>,
                        '4': <Badge status="processing" text="菜鸡1"/>,
                        '5': <Badge status="warning" text="nice"/>
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                key: 'interest',
                width: 80,
                dataIndex: 'interest',
                render(interest) {
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
                key: 'date',
                width: 120,
                dataIndex: 'date'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '操作',
                key: 'time',
                width: 80,
                render:(item)=>{
                    return <Button size="small" onClick={()=> {this.delete(item)}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y:400}}
                    ></Table>
                </Card>
                <Card title="左侧固定">
                    <Table 
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x:1680}}
                    ></Table>
                </Card>
                <Card title="表格排序">
                    <Table 
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onChange={this.handleChange}
                    ></Table>
                </Card>
                <Card title="操作按钮">
                    <Table 
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    ></Table>
                </Card>
            </div>
        )
    }
}