<template>
    <draggable :options="{ group: 'cards' }" group="cards" ghostClass="ghost">
        <span 
        class="element-card"
        v-for="(card,index) in cards"
        :key="index"
        @click="togglePopup(card)"
        >
            <div class="card-content">
                <i class="fas fa-align-left"></i>
                &nbsp;{{ card.title.rendered }}
            </div>
            <div class="footer-cardslist">
            <i class="far fa-comment"></i>
            </div>
        </span>
    </draggable>
</template>


<script>

import { VueDraggableNext } from "vue-draggable-next"

export default {
    props: ['listId', 'listName'],
    components: {
        draggable: VueDraggableNext,
    },
    methods: {
        togglePopup(card) {
            const currentData = {
                listId: this.listId,
                listName: this.listName,
                id: card.id,
                name: card.title.rendered,
                content: card.content.rendered
            }
            this.$store.dispatch("toggleOverlay")
            this.$store.dispatch("getComments", currentData.id)
            this.$store.dispatch("getPost", currentData.id)
            this.$store.dispatch("openForm", currentData)
        }
    },
    mounted(){
            this.$store.dispatch('getPosts')
    },
    computed: {
        cards() {
            const cardFilteredByListId = this.$store.getters['cards']


            return cardFilteredByListId.filter((card) => {
                if(card.categories[0] === this.listId) {
                    return true
                } else {
                    return false
                }
            })
        },
        overlayIsActive() {
            return this.$store.getters["overlay"]
        }
    }
}
</script>

<style scoped>

.element-card {
  position: relative;
  height: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 30px;
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
  cursor:pointer;
  background-color: #fffeef;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

/* .element-card::before {
  content: "";
  background-color: red;
  width: 50px;
  height: 50px;
} */

span {
    display: flex;
    flex-direction: column;
}

.footer-cardslist {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
}

.element-card:hover {
    cursor: pointer;
    box-shadow: 1px 3px 5px 0 rgba(0, 0, 0, .5);
}

</style>