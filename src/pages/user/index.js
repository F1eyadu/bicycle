import React from 'react'
import { Card, Button, Table, Form, Input, Checkbox, Select, Radio, Modal, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/util'
import ETable from '../../components/ETable/index'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
export default class User extends React.Component {
    state = {
        list: []
    }
    params = {
        page:1
    }
    requestList = () =>{
        let _this = this
        axios.getData({
            url: '/userList',
            data:{
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let found = res.data.data
            if(found.code == '0'){
                let list = found.result.item_list.map((item, index)=>{
                    item.key = index
                    return item
                })
                this.setState({
                    list,
                    pagination: Utils.pagination(res, (current)=>{
                        _this.params.page = current
                        _this.requestList()
                    })
                })
            }
        })
    }
    componentDidMount(){
        this.requestList()
    }
    handleOperator = (type) =>{
        let item = this.state.selectedItem
        if(type == 'create'){
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            })
        }else if(type == 'edit' || type == 'detail'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个员工'
                })
                return
            }
            this.setState({
                title: type == 'edit'?'编辑员工':'查看详情',
                isVisible: true,
                userInfo: item,
                type
            })
        }else if(type == 'delete'){
            if(!item){
                Modal.warning({
                    title: '提示',
                    content: '请选择一个员工'
                })
                return
            }
            Modal.error({
                title:'警告',
                content:'你确定要删除该员工?',
                cancelText:'取消',
                okText: '删除',
                onCancel:()=>{
                    this.setState({
                        isVisible: false
                    })
                },
                onOk: ()=>{
                    this.requestList()
                }
            })
        }
    }
    handleSubmit = () =>{
        let type = this.state.type
        let data = this.userForm.props.form.getFieldsValue()
        console.log(data)
        this.requestList()
    }
    render() {
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
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    let config = {
                        '1': '优',
                        '2': '良',
                        '3': '中',
                        '4': '差',
                        '5': '辣鸡'
                    }
                    return config[status]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '唱歌',
                        '2': '上网',
                        '3': '睡觉',
                        '4': '吃饭',
                        '5': '打豆豆',
                        '6': '看书',
                        '7': '读报'
                    }
                    return config[interest]
                }
            },
            {
                title: '婚姻',
                dataIndex: 'isMarried',
                render(isMarried){
                    return isMarried?'已婚':'未婚'
                }
            },
            {
                title: '生日',
                dataIndex:'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        return (
            <div>
                <Card>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card style={{ marginTop: '-1px' }}>
                    <Button type="primary" icon='plus' onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button icon='edit' onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon='delete' onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <Card style={{ marginTop: '-1px' }}>
                    <ETable
                        columns={columns}
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.list}
                        dataSource = {this.state.list}
                        pagination  = {this.state.pagination}
                    />
                </Card>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields()
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                >
                    <UserForm userInfo = {this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst)=>this.userForm = inst}/>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    getState = (state)=>{
        let config = {
            '1': '优',
            '2': '良',
            '3': '中',
            '4': '差',
            '5': '辣鸡'
        }
        return config[state]
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol: {
                span: 16
            }
        }
        const userInfo = this.props.userInfo || {}
        const type = this.props.type
        return(
            <Form layout='horizontal'>
                <FormItem label='姓名' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue: userInfo.username
                        })(
                            <Input type='text' placeholder='请输入姓名' />
                        )
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.sex==1?'男':'女':
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>优</Option>
                                <Option value={2}>良</Option>
                                <Option value={3}>中</Option>
                                <Option value={4}>差</Option>
                                <Option value={5}>辣鸡</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='生日' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label='地址' {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue: userInfo.address
                        })(
                            <Input.TextArea row={3} placeholder='请输入联系地址' />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create({})(UserForm)