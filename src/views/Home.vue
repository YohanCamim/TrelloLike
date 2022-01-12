<template>
    <div class="home">
        <Overlay/>
        <Popup/>
        <section class="list todo" v-for="(list,index) in lists" :key="index">
            <div class="list-contain">
                <header class="head-todo">
                    <label class="list-header"><i class="fas fa-bookmark"></i>&nbsp;{{ list.name }}&nbsp;<button @click="togglePopup(list)"><i class="far fa-edit"></i></button></label>
                </header>
                
                <draggable :options="{ group: 'lists' }" group="lists" ghostClass="ghost" class="list-draggable">
                    <article class="card">
                        <header>
                            <CardsList :listId="list.id" :listName="list.name" />
                        </header>
                    </article>
                </draggable>
            </div>
            <div class="footer-post">
                <Card :listId="list.id" />
                <button @click="deleteList(list.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </section>
    
        <div class="addpost">
            <header class="head-addpost">
                <i class="fas fa-plus-circle"></i>&nbsp;<input type="text" class="input-new-list" placeholder=" Create a List" v-model="listName" @keyup.enter="createList" />
            </header>
        </div>
    </div>
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
        togglePopup(list) {
            var name = prompt("New Name:")
            if (name !== null) {
                let str = "Edit name ? Actual name: " + list.name + " New name: " + name
                if (confirm(str)) {
                    const url = secret.url + 'categories/' + list.id
                    console.log(url)
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': 'Basic ' + secret.TOKEN
                        },
                        body: JSON.stringify({
                            name: name
                        })
                    }).then((res) => {
                        if (res.ok) {
                            this.$store.dispatch('getLists')
                            this.$store.dispatch('getPosts')
                        } else {
                            alert("You can't delete this list !")
                        }


                    })
                }
            }

        },
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

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');


.head-todo, .head-doing, .head-done {
  margin: 20px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
}

.head-addpost h2 {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
}

section {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  justify-content: space-between;
}

header {
  padding: 10px;
}

article {
  margin: 15px 15px;
}

.footer-section {
  margin: 10px;
}

.footer-post {
  align-self: flex-end;
}

.home {
  display: flex;
  align-items: flex-start;
  margin: 20px;
  min-width:min-content;
  background: transparent;
}

.list {
  background-color: #ffffff;
  margin: 5px 5px;
  padding: 10px;
  width: 260px;
  z-index: 200;
}

.addpost {
  height: 50px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  width: 260px;
  margin: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: content-box;
  padding: 8px 8px;
}

.head-addpost {
  display: flex;
  align-items: center;
  justify-content: center;
}

.list>header {
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
}

.list {
  border-top-style: solid;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  background-clip: content-box;
} 

.list-contain {
  display: flex;
  flex-direction: column;

}

.fa-comment{
  line-height: 2.5;
}
.fa-trash-alt {
  margin: 20px 0;
}

hr {
  width: 100%;
  margin: 20px;
}

.fa-trash-alt:hover {
  color: #CC262D;
}

.fa-edit:hover {
  color: #BF5627;
}

</style>
