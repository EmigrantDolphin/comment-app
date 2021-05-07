import React from 'react';
import { message, Form, Input, Button } from 'antd';
import { apiPaths, restMethod, requestApi } from '../../api';
import { saveToken } from '../../utilities';

import { RegistrationContainer } from '../registration';

class LoginContainer extends React.Component {

    render () {
        const layout = {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 5,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 10,
                span: 16,
            },
        };

        const onFinish = (values) => {
            requestApi(apiPaths.login, values, restMethod.POST)
                .then(resp => {
                    if (resp.status === 200){
                        resp.json().then(json => {
                            saveToken(json.token);
                            this.props.onLogin();
                        });
                    } else {
                        resp.json().then(json => {
                            message.error(json?.error);
                        });
                    }
                })
        };

        const onFinishFailed = (errorInfo) => {
            console.log(errorInfo);
        };

        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <RegistrationContainer/>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export { LoginContainer };