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
    }
}