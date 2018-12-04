import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(res, callback){
        let pages = res.data.data.result
        return {
            onChange: (current) =>{
                callback(current)
            },
            current: pages.page,
            pageSize: pages.page_size,
            total: pages.total,
            showTotal: () => {
                return `共${pages.total}条`
            },
            showQuickJumper: true
        }
    },
    getOptionList(data){
        if(!data){
            return []
        }
        let options = []
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options
    },
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedIds,
                selectedItem:selectedRows
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem:selectedRows
            })
        }
    }
}