# Real-Time Features with Socket.io

## Overview
This document outlines how to integrate Socket.io for real-time features in Athlixir.

## Installation

```bash
npm install socket.io-client
```

## Setup

### 1. Create Socket Context

```javascript
// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Replace with your backend URL
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001');

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
```

### 2. Wrap App with SocketProvider

```javascript
// In App.jsx
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      {/* Rest of your app */}
    </SocketProvider>
  );
}
```

### 3. Use Socket in Components

```javascript
// Example: Real-time messages
import { useSocket } from '../context/SocketContext';
import { useEffect } from 'react';

const MessagesComponent = () => {
  const { socket, connected } = useSocket();
  const { addNotification } = useNotifications();
  const { success } = useToast();

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('new-message', (message) => {
      addNotification({
        type: 'message',
        title: 'New Message',
        message: `New message from ${message.sender}`,
        icon: '💬',
        color: 'purple'
      });
      
      success('New message received!');
    });

    // Cleanup
    return () => {
      socket.off('new-message');
    };
  }, [socket]);

  return (
    <div>
      {connected ? (
        <span className="text-green-500">● Live</span>
      ) : (
        <span className="text-gray-500">○ Offline</span>
      )}
    </div>
  );
};
```

## Real-Time Features to Implement

### 1. **Real-Time Messages**
```javascript
// Listen for new messages
socket.on('new-message', (data) => {
  // Update messages UI
  // Show notification
});

// Send message
socket.emit('send-message', { to: userId, message: text });
```

### 2. **Live Notifications**
```javascript
// Profile verified
socket.on('profile-verified', () => {
  addNotification({
    type: 'verification',
    title: 'Profile Verified',
    message: 'Your profile has been verified!',
    icon: '✓',
    color: 'blue'
  });
});

// New opportunity
socket.on('new-opportunity', (opportunity) => {
  addNotification({
    type: 'opportunity',
    title: 'New Opportunity',
    message: opportunity.title,
    icon: '💼',
    color: 'green'
  });
});
```

### 3. **Sync Status Indicators**
```javascript
const SyncIndicator = () => {
  const { connected } = useSocket();
  const [syncing, setSyncing] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-500'}`}></div>
      <span className="text-xs text-gray-400">
        {syncing ? 'Syncing...' : connected ? 'Synced' : 'Offline'}
      </span>
    </div>
  );
};
```

### 4. **User Presence**
```javascript
// Track online users
socket.on('user-online', (userId) => {
  // Update UI to show user is online
});

socket.on('user-offline', (userId) => {
  // Update UI to show user is offline
});
```

## Backend Setup (Node.js/Express)

```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send-message', (data) => {
    io.to(data.to).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Socket.io server running on port 3001');
});
```

## Events to Implement

1. **Messages**
   - `send-message` - Send a new message
   - `new-message` - Receive a new message
   - `message-read` - Mark message as read

2. **Notifications**
   - `profile-verified` - Profile verification complete
   - `new-opportunity` - New opportunity posted
   - `event-reminder` - Event reminder
   - `injury-alert` - Injury report updated

3. **Presence**
   - `user-online` - User comes online
   - `user-offline` - User goes offline
   - `typing` - User is typing

4. **Live Updates**
   - `opportunity-updated` - Opportunity modified
   - `event-updated` - Event modified
   - `profile-updated` - Profile updated

## Status Indicators

Create status indicators throughout the app:

```javascript
const StatusIndicator = () => {
  const { connected } = useSocket();
  
  return (
    <div className="fixed bottom-4 right-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        <span className="text-xs font-medium">
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
};
```

## Notes

- Socket.io requires a backend server to be running
- For production, use environment variables for socket URL
- Implement authentication with socket connections
- Add error handling and reconnection logic
- Consider using rooms for grouping users (teams, events, etc.)
