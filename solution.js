import React, { useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import OnlineStatusMock from './OnlineStatusMock';
import './App.css';

const withOnlineStatus = WrappedComponent => (props) => {
    const [isOnline, setIsOnline] = useState(false);
    const handleIsOnlineChange = newIsOnline => {
      if (isOnline != newIsOnline) {
        setIsOnline(newIsOnline);
      }
    }
    return (
      <>
        <OnlineStatusMock
          onIsOnlineChange={handleIsOnlineChange}
        />
        <WrappedComponent {...props} isOnline={isOnline} />
      </>
    );
}

class App extends React.Component {
  componentDidUpdate({ isOnline }) {
    NotificationManager.info(isOnline ? 'Online' : 'Offline');
  }

  render() {
    const { isOnline } = this.props;
    return (
      <>
        <div className={isOnline ? 'online' : 'offline'}>
          {isOnline ? 'Online' : 'Offline'}
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default withOnlineStatus(App);
