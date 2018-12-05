import React from 'react'
import {Card, Button, Form, Select, Input, Modal, Tree, Transfer} from 'antd'
import ETable from './../../components/ETable/index'
import Utils from '../../utils/util'
import axios from '../../axios/index'
import menuConfig from '../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
export default class Permission extends React.Component{
    state = {
        list: [],
        isRoleVisible: false,
        isPermVisible: false,
        isUserVisible: false
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
            url: '/roleList',
            data:{
                params: this.params
            }
        }).then((res) =>{
            let result = res.data.data.result
            if(res.data.data.code == '0'){
                this.setState({
                    list: result.item_list.map((item, index) =>{
                        item.key = index
                        return item
                    }),
                    pagination:Utils.pagination(res, (current)=>{
                        _this.params.page = current
                        this.requestList()
                    })
                })
            }
        })
    }
    createRole = () =>{//创建角色
        this.setState({
            isRoleVisible: true
        })
    }
    handleRoleSubmit = () =>{//提交创建角色信息
        let data = this.roleForm.props.form.getFieldsValue()
        this.requestList()
        this.setState({
            isRoleVisible: false
        })
        this.roleForm.props.form.resetFields()
    }
    Permission = () =>{//显示权限
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return
        }
        let menuList = this.state.selectedItem.menus
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem,
            menuInfo: menuList
        })
    }
    handlePermEditSubmit = () =>{//设置权限
     let data = this.roleForm.props.form.getFieldsValue()
     data.role_id = this.state.selectedItem.id
     data.menus = this.state.menuInfo
     console.log(data)
     this.requestList()
     this.setState({
         isPermVisible: false
     })
    }
    UserAuth = () => {//用户授权
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id) => {
        axios.getData({
            url: '/user/List',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            let result = res.data.data.result
            this.getAuthUserList(result)
        })
    }
    getAuthUserList =(result)=>{
        let mockData = []
        let targetKeys = []
        if(result && result.length > 0){
            result.map((item)=>{
                const data = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status
                }
                if(data.status == 1){
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            })
        }
        this.setState({mockData, targetKeys})
    }
    handleUserSubmit = () =>{
        let data = {}
        data.user_ids = this.state.targetKeys ||{}
        data.role_id = this.state.selectedItem.id
        console.log(data)
        this.requestList()
        this.setState({
            isUserVisible: false,
            selectedItem: '',
            selectedIds: [],
            selectedRowKeys: ''
        })
    }
    render(){
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render:Utils.formateDate
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    return status == 1?'启用':'停用'
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render:Utils.formateDate
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name'
            }
        ]
        return(  
            <div>
                <Card>
                    <Button type="primary" onClick={this.createRole}>创建角色</Button>
                    <Button type="primary" onClick={this.Permission} style={{marginLeft: 10}}>设置权限</Button>
                    <Button type="primary" onClick={this.UserAuth} style={{marginLeft: 10}}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    okText="创建"
                    cancelText="取消"
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields()
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=> this.roleForm = inst} />
                </Modal>
                <Modal
                    title='权限设置'
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm 
                        wrappedComponentRef={(inst)=> this.roleForm = inst}
                        detailInfo = {this.state.detailInfo}
                        menuInfo = {this.state.menuInfo ||[]}
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title='用户授权'
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm 
                        wrappedComponentRef={(inst) => this.userAuthForm = inst} 
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData = {this.state.mockData}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

// 角色创建

class RoleForm extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol : {span:5},
            wrapperCol:{span: 19}
        }
        return(
            <Form layout='horizontal'>
                <FormItem label="创建角色" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)

class PermEditForm extends React.Component{

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    renderTreeNodes =(data, key='')=>{
      return  data.map((item)=>{
            let parentKey = key + item.key
            if(item.children){
                return(
                    <TreeNode {...item}>
                        {this.renderTreeNodes(item.children, parentKey)}
                    </TreeNode>
                )
            }
            return<TreeNode {...item}/>
        })
    }

    render(){
        const { getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        const detail_info = this.props.detailInfo
        const menuInfo = this.props.menuInfo
        return(
            <Form layout='horizontal'>
                <FormItem label='角色名称' {...formItemLayout}>
                    <Input disabled maxLength='8' placeholder={detail_info.role_name} />
                </FormItem> 
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue: '1'
                        })(
                            <Select style={{width: 80}} placeholder='启用'>
                                <Option value='1'>启用</Option>
                                <Option value='0'>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key='platform_all'>
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)

class RoleAuthForm extends React.Component{
    filterOption =(inputValue, option) =>{
        return option.title.indexOf(inputValue) > -1
    }
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }
    render(){
        const formItemLayout = {
            labelCol:{span: 5},
            wrapperCol:{span: 19}
        }
        let detail_info = this.props.detailInfo
        return(
            <Form layout='horizontal'>
                <FormItem label='角色名称:' {...formItemLayout}>
                    <Input maxLength={8} disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200, height: 400}}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户','已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)