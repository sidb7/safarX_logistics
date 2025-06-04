// store/slices/notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

// Load persisted notifications from localStorage
const loadPersistedNotifications = (): NotificationState => {
  try {
    const persistedData = localStorage.getItem("notifications");
    if (persistedData) {
      return JSON.parse(persistedData);
    }
  } catch (error) {
    console.error("Error loading persisted notifications:", error);
  }
  return {
    notifications: [],
    unreadCount: 0,
  };
};

// const initialState: NotificationState = {
//   notifications: [],
//   unreadCount: 0,
// };
const initialState: NotificationState = loadPersistedNotifications();

// Helper function to save state to localStorage
const saveToLocalStorage = (state: NotificationState) => {
  try {
    localStorage.setItem("notifications", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving notifications to localStorage:", error);
  }
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // addNotification(state, action: PayloadAction<Notification>) {
    //   state.notifications.unshift(action.payload);
    //   state.unreadCount += 1;
    // },
    addNotification(state, action: PayloadAction<Omit<Notification, "id">>) {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: action.payload.timestamp || new Date().toISOString(),
      };
      state.notifications.unshift(newNotification);
      if (!newNotification.read) {
        state.unreadCount += 1;
      }
      saveToLocalStorage(state);
    },
    markAllAsRead(state) {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
      saveToLocalStorage(state);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      saveToLocalStorage(state);
    },
    clearAll(state) {
      state.notifications = [];
      state.unreadCount = 0;
      saveToLocalStorage(state);
    },
    removeNotification(state, action: PayloadAction<string>) {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
      saveToLocalStorage(state);
    },
  },
});

export const {
  addNotification,
  markAllAsRead,
  markAsRead,
  clearAll,
  removeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
