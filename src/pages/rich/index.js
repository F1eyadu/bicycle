import React from 'react'
import {Card, Button, Modal} from 'antd'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class Rich extends React.Component{
    state = {
        showRich: false,
        editorState: ''
    }
    onEditorStateChange = (editorState) =>{
        this.setState({
            editorState
        })
    }
    clearContent = () =>{
        this.setState({
            editorState: ''
        })
    }
    getContent = () =>{
        this.setState({
            showRich: true
        })
    }
    onEditorChange = (editorContent) =>{
        this.setState({
            editorContent
        })
    }
    render(){
        const {editorState} = this.state
        return(
            <div>
                <Card>
                   <Button type="primary" onClick={this.clearContent}>清空文本</Button> 
                   <Button type="primary" onClick={this.getContent}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState = {editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    ></Editor>
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRich}
                    onCancel={()=>{
                        this.setState({
                            showRich: false
                        })
                    }}
                    footer={null}
                >
                    {
                        draftToHtml(this.state.editorContent)
                    }
                </Modal>
            </div>
        )
    }
}