<template>
    <main class="list-container">
        <Overlay/>
        <Popup v-bind:card='card' />
        <section class="list-wrapper">
            <draggable :options="{ group: 'lists' }" group="lists" ghostClass="ghost" class="list-draggable">
                <div class="list-card" v-for="(list,index) in lists" :key="index">
                 
                    <label class="list-header">{{ list.name }}</label>
                   
                    <div class="list-content">
                        <CardsList :listId="list.id" :listName="list.name" />
                    </div>
                    <div class="list-footer">
                        <Card :listId="list.id" />
                        <button @click="deleteList(list.id)"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></button>
                    </div>
                    
    
                </div>
            </draggable>
            <input type="text" class="input-new-list" placeholder="Create a List" v-model="listName" @keyup.enter="createList" />
        </section>
    </main>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next"
import CardsList from '@/components/CardsList.vue'
import Card from '@/components/Card.vue'
import Overlay from '@/components/Overlay.vue'
import Popup from '@/components/Popup.vue'
import secret from '@/secret.js'

export default {
    name: 'Home',
    components: {
        draggable: VueDraggableNext,
        CardsList,
        Card,
        Overlay,
        Popup
    },
    data() {
        return {
            messageError: false,
            listName: ""
        }
    },
    methods: {
        createList() {
            if (this.listName !== "") {
                const url = secret.url + 'categories'

                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Basic ' + secret.TOKEN
                    },
                    body: JSON.stringify({
                        name: this.listName,
                    })
                }).then(() => {
                    this.$store.dispatch('getLists')
                    this.listName = ''

                })
            }
        },
        deleteList(id) {
            const url = secret.url + 'categories/' + id + '?force=true'
            console.log(url)
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Basic ' + secret.TOKEN
                }
            }).then((res) => {
                if (res.ok) {
                    this.$store.dispatch('getLists')
                    this.$store.dispatch('getPosts')
                    alert('All cards has been moved to the To Do List !')
                } else {
                    alert("You can't delete this list !")
                }


            })

        }
    },
    mounted() {
        this.$store.dispatch('getLists')
    },
    computed: {
        lists() {
            return this.$store.getters['lists']
        }
    }
}
</script>

<style>
.list-container {
    position: relative;
    display: flex;
    width: 100vw;
    height: 100vh;
    border: 1px;
    z-index: 10;
}

.list-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    min-width: 100vw;
    height: 100vh;
    padding: 20px;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    background-image: url("../assets/background-image.jpg");
    gap: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.ghost {
    opacity: 0.5;
}

.list-draggable {
    display: flex;
    gap: 20px;
}

.input-new-list {
    display: flex;
    height: 30px;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(235, 236, 240, 0.5);
    min-width: 260px;
}

.input-new-list::placeholder {
    color: white;
}

.list-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    height: auto;
}

.list-header {
    position: relative;
    display: flex;
    justify-content: center;
    word-break: break-all;
    align-items: center;
    min-width: 280px;
    max-width: 280px;
    line-height: 50px;
    padding: 0px 10px 0px 10px;
    background-color: rgba(235, 236, 240, 1);
    border-radius: 10px 10px 0px 0px;
    color: rgba(24, 43, 77, 1);
    user-select: none;
}

.list-content {
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 280px;
    max-width: 280px;
    height: auto;
    background-color: rgba(235, 236, 240, 1);
    padding: 0px 10px 0px 10px;
    box-shadow: 1.5px 1.5px 1.5px 0.1px rgba(255, 255, 255, 0.1);
    color: rgba(24, 43, 77, 1);
}

.list-footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    background-color: rgba(235, 236, 240, 1);
    border-radius: 0px 0px 10px 10px;
    border-top: 0.5px solid rgba(255, 255, 255, 0.25);
    padding: 0px 10px 10px 10px;
}
</style>

