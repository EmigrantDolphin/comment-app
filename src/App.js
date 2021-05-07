import './App.css';
import React, { useState, useRef } from 'react';

import { Tabs, Button } from 'antd';

import { CommentsContainer, AddCommentsContainer, LoginContainer } from './containers'
import { checkIfAuthenticated, removeToken } from './utilities';

const { TabPane } = Tabs;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const commentsContainerRef = useRef(null);

  const onTabChange = (key) => {
    if (key === "1"){
      commentsContainerRef.current.updateComments();
    }
  }

  const logoutButton = () => {
    if (isAuthenticated || checkIfAuthenticated()){
      return (
        <Button
          style={{marginRight: "20px"}}
          onClick={() => {
            removeToken();
            setIsAuthenticated(false);
          }}
        >
          Logout
        </Button>
      )
    }
    else
      return <></>
  }

  return (
    <div>
        <Tabs
          centered
          style={{marginTop: "50px"}}
          tabBarExtraContent={logoutButton()}
          defaultActiveKey="1"
          onChange={onTabChange}
        >
          <TabPane tab="Comments" forceRender={true} key="1">
            <CommentsContainer ref={commentsContainerRef}/>
          </TabPane>
          <TabPane tab="Add comment" key="2">
           {isAuthenticated || checkIfAuthenticated() ? (
             <AddCommentsContainer/>
           ) : (
             <LoginContainer
              onLogin={() => setIsAuthenticated(checkIfAuthenticated)}
             />
           )}
          </TabPane>
        </Tabs>
    </div>
  );
}

export default App;
