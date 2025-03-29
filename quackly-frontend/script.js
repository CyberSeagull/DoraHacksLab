import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "../../.dfx/local/canisters/quackly_backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_id,
});

window.register = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const result = await backend.register(name, email);
  alert(result);
};

window.createPost = async function () {
  const content = document.getElementById("post").value;
  const result = await backend.createPost(content);
  alert(result);
};

window.loadPosts = async function () {
  const postsRaw = await backend.getAllPosts();
  const posts = JSON.parse(postsRaw);
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  posts.reverse().forEach((post) => {
    const li = document.createElement("li");
    li.textContent = `${post.author}: ${post.content}`;
    feed.appendChild(li);
  });
};