<script lang="ts" setup>
    
    import { onMounted, reactive, ref } from "vue"
   
    import Tab from "../components/Tab.vue"
    import Card from "../components/Card.vue"

    const content = ref('posts')
    const formPost = ref<{
        titlePost: string,
        imgBackground: string,
        descriptionPost: string
    }>({
        descriptionPost: '',
        imgBackground: '',
        titlePost: ''
    })
    const posts = ref<[{
        imageBackground: string,
        titlePost: string,
        descripptionPost:string,
        idPost: number}]>()
    
    function toggleTab(value:string){
        content.value = value
    }

    onMounted(()=>{
        posts.value?.push(localStorage.getItem('posts') || [])
    })

    function addPost(){
        localStorage.setItem("posts", [
            {
                imageBackground: 'https://kaleidousercontent.com/removebg/designs/4621cf76-fb41-4177-bc33-f12a67816592/thumbnail_image/change-background-thumbnail.png',
                titlePost: 'Exemplo de titulo',
                descripptionPost: "Some quick example text to build on the card title and make up the bulk of the card's content.",
                idPost: 1 
            }
        ])
    }

</script>

<template>
    <div class="container">
        <Tab @change-content-tab="toggleTab" />

        <div v-if="content === 'posts'" class="content">
            <div class="row">
                <div v-for="item in posts" :key="item.idPost" class="col-md-3">
                    <Card 
                        :descripption-post="item.descripptionPost"
                        :image-background="item.imageBackground" 
                        :title-post="item.titlePost"
                        :id-post="item.idPost"
                    />
                </div>
            </div>
        </div>

        <div v-if="content === 'post'" class="content">
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <label class="input-group-text" for="">Title</label>
                        <input v-model="formPost.titlePost" type="text" class="form-control" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <label class="input-group-text" for="">Image URL</label>
                        <input type="text" v-model="formPost.imgBackground"  class="form-control" />
                    </div>
                </div>
                <div class="col-md-12 mt-4">
                    <label for="">Description</label>
                    <textarea v-model="formPost.descriptionPost" class="form-control" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="col-md-12 mt-4">
                  <button @click="addPost" class="btn btn-dark">Post</button>
                </div>
            </div>
        </div>

    </div>
</template>