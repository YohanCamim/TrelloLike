<template>
    <div class="footer-card">
        <i class="fas fa-plus-circle"></i>
        <input class="input-card" type="text" placeholder="Create a Card" v-model="cardName" @keyup.enter="createCard()"/>
    </div>
</template>

<script>
import secret from '@/secret.js'

export default {
    props: ['listId'],
    data() {
        return {
            cardName: null

        }
    },
    methods: {
        createCard() {
            if (this.cardName !== '') {
                const url = secret.url + 'posts'

                const card = {
                    listId: this.listId,
                    name: this.cardName
                    
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Basic ' + secret.TOKEN
                    },
                    body: JSON.stringify({
                        title: card.name,
                        content: 'Empty card',
                        excerpt: 'Empty card',
                        categories: [card.listId],
                        status: 'publish'

                    })
                }).then(() => {
                    this.$store.dispatch('getPosts')
                    this.cardName = ''

                })
            }
        }
    }
}
</script>

<style scoped>
.input-card {
    position: relative;
    background-color: white;
    min-height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 10px;
    word-break: break-all;
    font-size: 16px;
}

.footer-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
}

.fa-plus-circle{
    margin: 0 10px;
}
</style>