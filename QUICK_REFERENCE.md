# Quick Reference Guide - New Features

## 🚀 How to Use Newly Implemented Features

### 1. **Accessing the Admin Portal**
```
URL: http://localhost:5173/admin
```
- Login as admin role
- Full sidebar navigation to all admin features
- Dashboard shows stats, charts, and system overview

---

### 2. **Viewing Public Athlete Profiles**
```
URL: http://localhost:5173/athlete/public/1
```
- No authentication required
- Perfect for sponsors and scouts
- Shows: profile, achievements, stats, performance, funding requests

---

### 3. **Notification Center**
```
URL: http://localhost:5173/notification
```
- View all notifications in one place
- Mark as read/Mark all as read
- Delete individual notifications
- Categorized by type (message, verification, opportunity, etc.)

**Accessing from code:**
```jsx
import { useNotifications } from '../context/NotificationContext';

const MyComponent = () => {
  const { notifications, unreadCount, markAsRead, addNotification } = useNotifications();
  
  // Add a notification
  addNotification({
    type: 'verification',
    title: 'Profile Verified',
    message: 'Your profile has been verified!',
    icon: '✓',
    color: 'blue'
  });
};
```

---

### 4. **Global Search**
Press `Ctrl + K` (or `Cmd + K` on Mac) anywhere in the app!

**Or add to your component:**
```jsx
import GlobalSearch from '../components/GlobalSearch';

const MyNavbar = () => {
  return (
    <nav>
      <GlobalSearch />
    </nav>
  );
};
```

---

### 5. **Toast Notifications**
```jsx
import { useToast } from '../context/ToastContext';

const MyComponent = () => {
  const toast = useToast();

  const handleAction = () => {
    toast.success('Action completed!');
    toast.error('Something went wrong');
    toast.warning('Be careful!');
    toast.info('Heads up!');
  };
};
```

---

### 6. **Loading Skeletons**
```jsx
import { StatsSkeleton, CardSkeleton, TableSkeleton } from '../components/LoadingSkeleton';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? <StatsSkeleton count={4} /> : <ActualStats />}
    </div>
  );
};
```

**Available Skeletons:**
- `StatsSkeleton` - For stat cards
- `CardSkeleton` - For card layouts
- `TableSkeleton` - For tables
- `ProfileSkeleton` - For profiles
- `ListSkeleton` - For lists
- `ChartSkeleton` - For charts
- `PageSkeleton` - Full page

---

### 7. **Empty States**
```jsx
import EmptyState from '../components/EmptyState';
import { Inbox } from 'lucide-react';

const MessagesPage = () => {
  const messages = [];

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No messages yet"
        description="Start a conversation"
        actionLabel="New Message"
        onAction={() => navigate('/messages/new')}
      />
    );
  }

  return <MessageList messages={messages} />;
};
```

---

### 8. **Notification Bell (for Layouts)**
```jsx
import NotificationBell from '../components/NotificationBell';

const PortalHeader = () => {
  return (
    <header className="flex items-center gap-4">
      <NotificationBell />
      {/* Shows unread count badge */}
    </header>
  );
};
```

---

### 9. **Role Protection**
All portals are now automatically protected! Users are redirected based on their role:

- Athletes → `/athlete/dashboard`
- Coaches → `/coach/dashboard`
- Users → `/user/dashboard`
- Admins → `/admin/dashboard`

No need to manually check roles in components - it's handled at the routing level!

---

### 10. **Custom 404 Page**
Navigate to any invalid URL to see the custom 404 page:
```
http://localhost:5173/invalid-route
```

---

## 🎨 **Component Imports Quick Reference**

```jsx
// Contexts
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

// Components
import GlobalSearch from '../components/GlobalSearch';
import NotificationBell from '../components/NotificationBell';
import EmptyState from '../components/EmptyState';
import RoleProtectedRoute from '../components/RoleProtectedRoute';
import SuccessAnimation, { ToastContainer } from '../components/SuccessAnimation';

// Loading Skeletons
import {
  StatsSkeleton,
  CardSkeleton,
  TableSkeleton,
  ProfileSkeleton,
  ListSkeleton,
  ChartSkeleton,
  PageSkeleton
} from '../components/LoadingSkeleton';

// Pages
import PublicAthleteProfile from '../pages/PublicAthleteProfile';
import NotificationCenter from '../pages/NotificationCenter';
import NotFound from '../pages/NotFound';
```

---

## 🔗 **All Routes**

### Public Routes
- `/` - Home page
- `/login` - Login
- `/signup` - Signup
- `/reset-key` - Reset password
- `/portal` - Portal selection
- `/athlete/public/:id` - Public athlete profile
- `/notifications` - Notification center

### Protected Routes

**Athlete Portal** (Role: "athlete")
- `/athlete/dashboard`
- `/athlete/profile`
- `/athlete/performance`
- `/athlete/injury`
- `/athlete/leaderboard`
- `/athlete/opportunities`
- `/athlete/academies`
- `/athlete/events`
- `/athlete/messages`
- `/athlete/funding`
- `/athlete/settings`

**Coach Portal** (Role: "coach")
- `/coach/dashboard`
- `/coach/athletes`
- `/coach/performance`
- `/coach/injury`
- `/coach/team-analytics`
- `/coach/events`
- `/coach/opportunities`
- `/coach/messages`
- `/coach/settings`

**User Portal** (Role: "user")
- `/user/dashboard`
- `/user/athletes`
- `/user/leaderboard`
- `/user/events`
- `/user/academies`
- `/user/opportunities`
- `/user/sponsorships`
- `/user/messages`
- `/user/settings`

**Admin Portal** (Role: "admin")
- `/admin/dashboard`
- `/admin/users`
- `/admin/verify`
- `/admin/opportunities`
- `/admin/academies`
- `/admin/events`
- `/admin/logs`
- `/admin/reports`
- `/admin/messages`
- `/admin/settings`

---

## 🎯 **Testing the Features**

1. **Test Admin Portal:**
   - Login with admin credentials
   - Navigate to `/admin`
   - Check all sidebar links

2. **Test Public Profile:**
   - Visit `/athlete/public/1`
   - Try without logging in (should work!)

3. **Test Notifications:**
   - Visit `/notifications`
   - Check notification bell in portals

4. **Test Global Search:**
   - Press `Ctrl/Cmd + K`
   - Search for "cricket" or "academy"

5. **Test Toast:**
   - Any action can trigger a toast
   - Use `useToast()` hook

6. **Test 404:**
   - Visit any invalid route
   - Should show animated 404 page

7. **Test Role Protection:**
   - Try accessing `/coach/dashboard` as an athlete
   - Should redirect to `/athlete/dashboard`

---

## 📦 **Provider Hierarchy**

Your app is wrapped in this order:

```jsx
<Router>
  <AuthProvider>              {/* Authentication */}
    <NotificationProvider>    {/* Notifications */}
      <ToastProvider>         {/* Toast messages */}
        <App />
      </ToastProvider>
    </NotificationProvider>
  </AuthProvider>
</Router>
```

All contexts are accessible from any component!

---

## 🎉 **You're All Set!**

All features are implemented and ready to use. Check `IMPLEMENTATION_STATUS.md` for detailed documentation.

For real-time features with Socket.io, see `SOCKET_INTEGRATION.md`.
