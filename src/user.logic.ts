type User = {
    name: string;
    email: string;
    createdAt: number;
  };
  
  const users: Map<string, User> = new Map();
  
  export function createUser(principal: string, name: string, email: string) {
    if (users.has(principal)) {
      return { success: false, message: 'User already exists' };
    }
  
    const newUser: User = {
      name,
      email,
      createdAt: Date.now()
    };
  
    users.set(principal, newUser);
    return { success: true, user: newUser };
  }
  
  export function getUserProfile(principal: string) {
    if (!users.has(principal)) {
      return { success: false, message: 'User not found' };
    }
  
    return { success: true, user: users.get(principal) };
  }
  
  export function updateUserProfile(principal: string, updates: { name?: string, email?: string }) {
    if (!users.has(principal)) {
      return { success: false, message: 'User not found' };
    }
  
    const user = users.get(principal)!;
  
    if (updates.name !== undefined) {
      user.name = updates.name;
    }
    if (updates.email !== undefined) {
      user.email = updates.email;
    }
  
    users.set(principal, user);
    return { success: true, user };
  }