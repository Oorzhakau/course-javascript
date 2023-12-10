import './styles.css';
// import './promise';

// Backend - https://jsonplaceholder.typicode.com/

let posts = [];
const postsURL = 'https://jsonplaceholder.typicode.com/posts';

async function request(url) {
  const response = await fetch(url).then( response => response.json());
  return response;
};

function render(dataContent) {
  document.querySelector('.posts').innerHTML = '';

  for (const post of dataContent) {
    document.querySelector('.posts').innerHTML += `
    <div class="post_item">
      <h3>${post.title}</h3>
      <span>${post.body}</span>
      <button id=${post.id} class="btn_remove">Удалить</button>
    </div>
    `; 
  }
};

function search(inputValue) {
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(inputValue.toLowerCase()));
  render(filteredPosts); 
}
document.querySelector(".filter_input").addEventListener('input', (event) => {
  const inputValue = event.target.value;
  search(inputValue);
})

function removePost(id) {
  posts = posts.filter(post => post.id !== id);
  render(posts);
}

document.querySelector('.posts').addEventListener('click', function(event) {
  if (event.target.id) {
    removePost(Number(event.target.id));
  }
});

document.addEventListener('DOMContentLoaded',async () => {
  posts = await request(postsURL);
  render(posts);
});