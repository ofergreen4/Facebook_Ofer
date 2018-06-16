class Usera {
    constructor(name, lastname) {
        this.name = name;
        this.lastname = lastname;
    }

    get fullname() {
        return `${this.name} ${this.lastname}`;
    }
}

class Feed {
    constructor (feedEl) {
        this.feedEl = feedEl;
        this.user = new Usera('Ofer', 'Green');
        this.postButton = feedEl.querySelector('button');
        this.textArea = feedEl.querySelector('textarea');

        this.postButton.addEventListener('click', () => this.createPost());
    }

    createPost() {
        let postBody = this.textArea.value;
        this.textArea.value = '';
        let post = new Post(postBody, this.user);
        this.feedEl.appendChild(post.el);
    }
}

class Post {
    constructor(postBody, author) {
        this.el = document.createElement('article');
        this.el.innerHTML = `
        <div class="post1">
        <img class="postphotodancer" src="images/nataraja.jpg" width=40 height=40>
        <div class="postdiv1">
        <author>${author.fullname}</author>
        <div class="date-post1">
        <span>2 seconds ago</span>
        </div>
        </div>
        </div>
        <p>${postBody}</p>
        <button>Remove Post</button>
  `;

        this.removeButton = this.el.querySelector('button');

        this.removeButton.addEventListener('click', () => this.remove());
    }

    remove() {
        this.el.parentNode.removeChild(this.el);
    }
}

new Feed( document.querySelector('.flex-item') );