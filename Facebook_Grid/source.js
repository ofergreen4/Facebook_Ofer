class Usera {
    constructor(name, lastname) {
        this.name = name;
        this.lastname = lastname;
    }

    get fullname() {
        return `${this.name} ${this.lastname}`;
    }
}

const globalUser = new Usera("Ofer", "Green");

fetch('http://127.0.0.1:3000')
    .then((data) => {
        console.log(data);
        data.json()
            .then((res) => {
                res.posts.forEach(element => {
                    const post = new Post(element.message, globalUser, element.likes)
                    document.querySelector('.posts').appendChild(post.el);
                });
            });
    });

//   function createPost(message) {
//     let postDiv = document.createElement("div");
//     postDiv.innerHTML = message;
//     document.body.appendChild(postDiv);
//   }



class Feed {
    constructor(feedEl) {
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
        // this.myPosts = feedEl.querySelector('.myPosts');
        // this.feedEl.insertBefore(post.el, this.myPosts);
    }
}

class Post {
    constructor(postBody, author, likes) {
        this.el = document.createElement('article');
        this.el.innerHTML = `
        <div class="post1-imagetext">
            <div class="post1-photonamedate">
                <div class="postphotodancer-general">
                    <img class="postphotodancer" src="images/nataraja.jpg" width=40 height=40>
                </div>
                <div class="postdiv1">
                    <div class="postname-1">
                        <div class="postname1">
                            <author>${author.fullname}</author>
                        </div>
                        <div class="date-post1">
                            <span>2 seconds ago</span>
                        </div>                   
                    </div>
                </div>
            </div>    
            <button>Remove Post</button>
        </div>
        <p>${postBody}</p>
        <div class="reactions">
            <div class="reactions-space">
                <div class="reactions-icons">
                <img class="like" src="images/like.PNG" width=18 height=18>
                <img class="love" src="images/love.png" width=18 height=18>
                <img class="haha" src="images/haha.png" width=18 height=18>
                </div>
            <span>${likes}</span> 
            </div>
        </div>
        <div class="lcs">
            <div class="dolike">
                <img class="dolike-image" src="images/dolike.JPG" width=26 height=26>
                <span>like</span>
            </div>
            <div class="docomment">
                <img class="dolike-image" src="images/docomment.JPG" width=26 height=26>
                <span>Comment</span>
            </div>
            <div class="doshare">
                <img class="dolike-image" src="images/doshare.JPG" width=26 height=26>
                <span>Share</span>
            </div>
        </div>
        
  `;

        this.removeButton = this.el.querySelector('button');

        this.removeButton.addEventListener('click', () => this.remove());
    }

    remove() {
        this.el.parentNode.removeChild(this.el);
    }
}

new Feed(document.querySelector('.posts'));




