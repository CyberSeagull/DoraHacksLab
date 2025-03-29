import {
    Canister,
    query,
    update,
    text,
    nat32,
    ic
  } from 'azle';
  
  import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
  } from './posts.logic';
  
  import {
    getUserProfile,
    updateUserProfile
  } from './user.logic';
  
  import {
    registerIfNewUser
  } from './auth.logic';
  
  export default Canister({
    // 📝 Пости
    createPost: update([text], text, (content) => {
      const caller = ic.caller().toString();
      const result = createPost(caller, content);
      return result.success ? "Post created" : "Failed";
    }),
  
    getAllPosts: query([], text, () => {
      return JSON.stringify(getAllPosts());
    }),
  
    getPostById: query([nat32], text, (id) => {
      return JSON.stringify(getPostById(id));
    }),
  
    updatePost: update([nat32, text], text, (id, newContent) => {
      const caller = ic.caller().toString();
      return JSON.stringify(updatePost(id, caller, newContent));
    }),
  
    deletePost: update([nat32], text, (id) => {
      const caller = ic.caller().toString();
      return JSON.stringify(deletePost(id, caller));
    }),
  
    // 👤 Користувач
    getUser: query([], text, () => {
      const caller = ic.caller().toString();
      return JSON.stringify(getUserProfile(caller));
    }),
  
    updateUser: update([text, text], text, (name, email) => {
      const caller = ic.caller().toString();
      return JSON.stringify(updateUserProfile(caller, { name, email }));
    }),
  
    // 🔐 Реєстрація
    register: update([text, text], text, (name, email) => {
      const caller = ic.caller().toString();
      return JSON.stringify(registerIfNewUser(caller, name, email));
    })
  });
  