import React from 'react';
import { Card } from 'antd';
import { apiPaths, requestApi } from '../../api';

class CommentsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount () {
        this.updateComments();
    }

    updateComments() {
        requestApi(apiPaths.comments)
            .then( resp => {
                if (resp.status === 200){
                    resp.json().then(json => {
                        this.setState({
                            comments: json
                        });
                    })
                }
            });
    }

    render () {
        const renderComment = (comment, index) => {
            return (
                <div key={index}>
                    <Card
                        title={comment.authorFullName}
                        style={{
                            width: 300,
                            backgroundColor: comment.canEdit ? "#EFEBD8" : "#F0FFF0",
                            borderRadius: "25px",
                            marginTop: "10px"
                        }}
                    >
                        <p>{comment.comment}</p>
                    </Card>
                </div>
            )
        }

        return (
            <div style={{marginLeft: "40%"}}>
                {this.state.comments.map((comment, index) => {
                    return renderComment(comment, index)
                })}
            </div>
        )
    }
}

export { CommentsContainer };