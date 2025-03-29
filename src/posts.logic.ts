type Post = {
    id: number;
    author: string;
    content: string;
    createdAt: number;
  };
  
  let posts: Post[] = [];
  
  export function createPost(authorPrincipal: string, content: string) {
    const post: Post = {
      id: posts.length + 1,
      author: authorPrincipal,
      content,
      createdAt: Date.now()
    };
    posts.push(post);
    return {
      success: true,
      post
    };
  }
  
  export function getAllPosts(): Post[] {
    return posts;
  }
  
  export function getPostById(postId: number) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
      return { success: false, message: 'Post not found' };
    }
    return { success: true, post };
  }
  
  export function updatePost(postId: number, authorPrincipal: string, newContent: string) {
    const post = posts.find(p => p.id === postId);
    if (!post) {
      return { success: false, message: 'Post not found' };
    }
    if (post.author !== authorPrincipal) {
      return { success: false, message: 'Unauthorized' };
    }
  
    post.content = newContent;
    return { success: true, post };
  }
  
  export function deletePost(postId: number, authorPrincipal: string) {
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) {
      return { success: false, message: 'Post not found' };
    }
    if (posts[index].author !== authorPrincipal) {
      return { success: false, message: 'Unauthorized' };
    }
  
    posts.splice(index, 1);
    return { success: true };
  }