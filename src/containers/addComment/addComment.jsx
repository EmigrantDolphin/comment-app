import React from 'react';

import { message, Form, Input, Button } from 'antd';
import { apiPaths, restMethod, requestApi } from '../../api';

const { TextArea } = Input;

class AddCommentsContainer extends React.Component {

    render () {
        const onFinish = (values) => {
            requestApi(apiPaths.postComment, values, restMethod.POST)
                .then(resp => {
                    if (resp.status === 200){
                        message.success("Comment saved");
                    } else {
                        resp.json().then(json => {
                            message.error(json?.error);
                        });
                    }
                })
        };

        const onFinishFailed = (errorInfo) => {
            console.log(errorInfo);
            message.error(errorInfo.toString());
        };

        return (
            <div>
                <Form
                    style={{marginLeft: "35%", marginRight: "40%"}}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        name="comment"
                        rules={[
                        {
                            required: true,
                            message: 'Please type in a comment',
                        }
                        ]}
                    >
                        <TextArea showCount maxLength={100}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export { AddCommentsContainer };