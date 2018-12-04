import React from 'react'
import {  HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import login from './pages/login/index'
import Home from './pages/home/index'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BaseTable from './pages/table/baseTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './common'
import orderDetail from './pages/order/detail'
import User from './pages/user/index'
import Bike from './pages/map/bike'
import Bar from './pages/echarts/bar'
export default class ERouter extends React.Component{
    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={login}/>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/admin/ui/buttons" component={Buttons} />
                                    <Route path="/admin/ui/modals" component={Modals} />
                                    <Route path="/admin/ui/loadings" component={Loadings} />
                                    <Route path="/admin/ui/notification" component={Notice} />
                                    <Route path="/admin/ui/messages" component={Messages} />
                                    <Route path="/admin/ui/tabs" component={Tabs} />
                                    <Route path="/admin/ui/gallery" component={Gallery} />
                                    <Route path="/admin/ui/carousel" component={Carousel} />
                                    <Route path="/admin/form/login" component={FormLogin} />
                                    <Route path="/admin/form/reg" component={FormRegister} />
                                    <Route path="/admin/table/basic" component={BaseTable} />
                                    <Route path="/admin/table/high" component={HighTable} />
                                    <Route path="/admin/city" component={City} />
                                    <Route path="/admin/order/detail" component={Order} />
                                    <Route path="/admin/user" component={User} />
                                    <Route path="/admin/bikeMap" component={Bike} />
                                    <Route path="/admin/charts/bar" component={Bar} />
                                </Switch>
                            </Admin>
                        }/>
                        <Route path="/common" render = {()=>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={orderDetail}/>
                            </Common>
                        }>

                        </Route>
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}