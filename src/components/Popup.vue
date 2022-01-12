<template>
    <transition>
        <div v-if="overlay" class="modal">
            <div class="header">
                <div class="listname">
                    <p>In the list</p>
                    <h1><i class="fas fa-bookmark"></i>&nbsp;&nbsp;{{ currentData.listName }}</h1><br>
                </div>            
                <div class="id">
                    <h2><i class="fas fa-thumbtack"></i>&nbsp;&nbsp;Id:&nbsp;{{ currentData.id }}</h2><br>
                </div>
                
                <div class="description">
                    <p class="font-description"><i class="fas fa-align-left"></i>&nbsp;&nbsp;Description</p>
                    <h3>{{ this.$store.state.card.title.rendered }}</h3>
                    <span v-html="this.$store.state.card.content.rendered"></span>
                </div>    
            </div>
            <div class="edit">
                <h2><i class="far fa-edit"></i>&nbsp;&nbsp;Edit</h2>
                <input :placeholder="currentData.name" v-model="cardName" />
                <textarea :placeholder="currentData.content" v-model="cardContent" />
                <label>Category:</label>
                <select v-model="selected">
                    <option v-for="list in lists" :value="list.id" :key="list.id">{{list.name}}</option>
                </select>
                <div class="container-button">
                <button class="save" @click="saveElement(currentData.id)">save</button>
                <button class="delete" @click="deleteElement(currentData.id)">delete</button>
            </div>
                
            </div>

            <div class="comments">
                <h2><i class="far fa-comment"></i>&nbsp;&nbsp;Comments:</h2>
                
                <div class="eachComments" v-for="(comment,index) in comments" :key="index">
                    <div class="quote-comments">
                        <span v-html="comment.content.rendered"></span>
                    </div>
                    <div class="infos-author">
                        <p>Author: </p>&nbsp;&nbsp;
                        <span v-html="comment.author_name"></span>&nbsp;&nbsp;
                        <p>{{comment.date}}</p>
                    </div>
                    <input placeholder="Update Comment" v-model="updateContentC"/>
                    <div class="container-button">
                        <button class="save" @click="updateComment(comment.id)">Update comment</button>
                        <button class="delete" @click="deleteComment(comment.id)">Delete comment</button>
                    </div>
                </div>
                
                <input type="text" @keyup.enter="addComment(currentData.id)" placeholder="New comment ( tape enter to valid )" v-model="commentContent" />
            <div v-if="message">You already said that !</div>
            
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
import secret from '@/secret.js'

export default {
    data() {
        return {
            cardName: null,
            cardContent: null,
            message: false
        };
    },
    computed: {
        ...mapGetters(["overlay", "currentData", 'card', 'comments', 'lists']),
    },
    methods: {
        saveElement(id) {
            console.log('ici')
            console.log(this.selected)
            console.log('la')
            if (this.cardName === null) {
                this.cardName = this.currentData.name;
            }
            const url = secret.url + "posts/" + id

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                },
                body: JSON.stringify({
                    title: this.cardName,
                    categories: [this.selected],
                    content: this.cardContent

                })
            }).then(() => {

                this.$store.dispatch('getPosts')
                this.$store.dispatch('getLists')
                this.$store.dispatch("toggleOverlay");
                this.cardName = ''
                this.cardContent = ''
            })
        },
        deleteElement(id) {
            const url = secret.url + "posts/" + id

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                }
            }).then(() => {
                this.$store.dispatch('getPosts')
                this.$store.dispatch("toggleOverlay");
            })
        },
        addComment(id) {
            const url = secret.url + "comments"
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                },
                body: JSON.stringify({
                    content: this.commentContent,
                    post: id,
                    status: 'aproved'
                })
            }).then((res) => {
                if (res.ok) {
                    this.$store.dispatch('getComments', id)
                    this.commentContent = ''
                } else {
                    this.commentContent = ''
                    this.message = true
                    setTimeout(function() { this.message = false; }.bind(this), 1500);
                }

            })
        },
        updateComment(id) {
            const url = secret.url + "comments/" + id
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                },
                body: JSON.stringify({
                    content: this.updateContentC,
                })
            }).then(() => {
                this.$store.dispatch('getComments', this.currentData.id)
                this.updateContentC = ''
            })
        },
        deleteComment(id) {
            const url = secret.url + "comments/" + id

            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                }
            }).then(() => {
                this.$store.dispatch('getComments', this.currentData.id)
            })
        },
    },
};
</script>

<style scoped>

body, html {
    margin: 0;
    padding: 0;
}

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.header {
    margin: 40px 30px 10px 30px;
}

.edit, .comments {
    margin: 10px 30px 10px 30px;
    width: 90%;
}

.eachComments {
    width: 100%;
}

.header, .edit {
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

h1, h2, .font-description, label {
    font-size: 1.5rem;
}

.fas, .far {
    font-size: 1.5rem;
}

.fa-grip-lines {
   width: 100%;
}

.listname, .description, .edit, .eachComments, .comments {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
}

.quote-comments {
    display: flex;
    margin: 10px 0;
}

.infos-author {
    display: flex;
}


/* .v-enter-from {
    opacity: 0;
}

.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-enter-to {
    opacity: 1;
}

.v-leave-from {
    opacity: 1;
}

.v-leave-active {
    transition: all 0.3s ease-in;
}

.v-leave-to {
    opacity: 0;
} */

.modal {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    border-radius: 5px;
    background-color: #fffeef;;
    z-index: 550;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-top-style: solid;
    border-top-width: 50px;
    border-image: linear-gradient(#DE772A,#5C3328) 1;
    overflow: scroll;
    height: 80vh;
    width: 30vw;
}

input, select {
    width: 100%;
    height: 50px;
    border: 1px solid rgba(60, 60, 60, 0.2);
    border-radius: 5px;
    padding: 10px;
    background-color: white;
}

textarea {
    width: 100%;
    height: 60%;
    margin: 10px 0 10px 0;
    border-radius: 5px;
    border: 1px solid rgb(214, 214, 214);
}

button {
    border: 1px solid black;
    padding: 10px;
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-size: 16px;
    border-radius: 2px;
    cursor: pointer;
    transition-duration: 0.4s;
    margin-right: 10px;
}

.container-button {
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;

}

.delete {
    color: #DB3865;
}

.delete:hover {
    background: #DB3865;
    color: white;
}

.save:hover {
    background: #DD7629;
}

</style>