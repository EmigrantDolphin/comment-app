import React from 'react';
import { message, Form, Input, Button, Modal } from 'antd';
import { apiPaths, restMethod, requestApi } from '../../api';

class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            setVisible: false,
            isSubmitDisabled: false
        }
    }

    render () {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const onFinish = (values) => {
            this.setState({
                isSubmitDisabled: true
            });

            requestApi(apiPaths.postUser, values, restMethod.POST)
                .then(resp => {
                    if (resp.status === 200){
                        message.success("Registered successfully");
                        this.setState({
                            visible: false
                        });
                    } else {
                        resp.json().then(json => {
                            message.error(json?.error);
                        });
                    }

                    this.setState({
                        isSubmitDisabled: false
                    });
                })
        };

        const onFinishFailed = (errorInfo) => {
            console.log(errorInfo);
        };

        const showModal = () => {
            this.setState({
                visible: true
            });
        };

        const handleCancelModal = () => {
            this.setState({
                visible: false
            });
        };


        return (
            <>
                <Button
                type="secondary"
                onClick={showModal}
                style={{marginLeft: "10px"}}
                >
                    Register
                </Button>
                <Modal
                    title="Registration form"
                    visible={this.state.visible}
                    // onOk={handleOk}
                    onCancel={handleCancelModal}
                    footer={[
                        <Button
                            form="registrationForm"
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            disabled={this.state.isSubmitDisabled}
                        >
                            Submit
                        </Button>
                    ]}
                >
                    <Form
                        {...layout}
                        id="registrationForm"
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
                                }
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
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export { RegistrationContainer };