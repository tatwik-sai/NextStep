import { create } from "zustand";

export const createUsersSlice = (set, get) => ({
    users: [],
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (id) => set((state) => ({ users: state.users.filter(u => u.id !== id) })),
    updateUser: (updatedUser) => set((state) => ({
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
    })),
    clearUsers: () => set({ users: [] })
});

export const useUsersStore = create(createUsersSlice);
