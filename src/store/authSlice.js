import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  try {
    const serialized = localStorage.getItem("technova_auth");
    return serialized ? JSON.parse(serialized) : { user: null, isAuthenticated: false };
  } catch {
    return { user: null, isAuthenticated: false };
  }
};

const saveAuthToStorage = (authState) => {
  try {
    localStorage.setItem("technova_auth", JSON.stringify(authState));
  } catch {
    // ignore
  }
};

const loadUsersFromStorage = () => {
  try {
    const serialized = localStorage.getItem("technova_users");
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem("technova_users", JSON.stringify(users));
  } catch {
    // ignore
  }
};

const initialAuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialAuthState.user,
    isAuthenticated: initialAuthState.isAuthenticated,
    users: loadUsersFromStorage(),
    error: null,
  },
  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        state.error = "Ya existe una cuenta con ese email.";
        return;
      }
      const newUser = { id: Date.now(), name, email, password };
      state.users.push(newUser);
      state.user = { id: newUser.id, name, email };
      state.isAuthenticated = true;
      state.error = null;
      saveUsersToStorage(state.users);
      saveAuthToStorage({ user: state.user, isAuthenticated: true });
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const found = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        state.error = "Email o contraseña incorrectos.";
        return;
      }
      state.user = { id: found.id, name: found.name, email: found.email };
      state.isAuthenticated = true;
      state.error = null;
      saveAuthToStorage({ user: state.user, isAuthenticated: true });
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      saveAuthToStorage({ user: null, isAuthenticated: false });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
