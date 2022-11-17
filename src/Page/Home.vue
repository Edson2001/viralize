<script lang="ts" setup>
    
    import {onMounted, ref, watch, toRefs} from "vue"
    import Card from "../components/Card.vue"

    let posts = ref([])
    let filterPosts = ref([])
    let filterInput = ref('')
    let filtered = ref(false)
    let editing = ref(false)

    let idPostEditing = ref<number | null>(null)
    
    const formPost = ref<{
        descriptionPost: string,
        imageBackground: string,
        titlePost: string, 
        idPost:number | null}>({
        descriptionPost: '',
        idPost: null,
        imageBackground: '',
        titlePost: ''
    })
    
    onMounted(()=>{
        posts.value = JSON.parse(localStorage.getItem('posts') || '[]')
    })

    function addPost(){
        
        const {descriptionPost, titlePost, imageBackground} = toRefs(formPost.value)

        if(descriptionPost.value == '' || titlePost.value == '' || imageBackground.value == ''){
            alert("Preencha todos os campos")
            return "Preecha todos os campos"
        }

        posts.value = [...posts.value, 
            {
                descriptionPost: descriptionPost.value,
                idPost: posts.value.length + 1,
                imageBackground: imageBackground.value,
                titlePost: titlePost.value
            }
        ]

        useClearFormPost()
    }

    watch(()=>posts.value, ()=>{
        localStorage.setItem("posts", JSON.stringify(posts.value))
    })

    function deletePost(postID:number){
        posts.value = posts.value.filter(item=>item.idPost != postID)
    }

    function filter(){

        filterPosts.value = posts.value.filter(item=> item.titlePost === filterInput.value)
        if(filterPosts.value.length > 0){
            filtered.value = true
        }else{
            filtered.value = false
        }
    }

    function getPostToEdit(postID: number){
        let postEdit = posts.value.filter(item=> item.idPost == postID)
        
        editing.value = true
        idPostEditing.value = postID

        formPost.value.descriptionPost = postEdit[0].descriptionPost
        formPost.value.imageBackground = postEdit[0].imageBackground
        formPost.value.titlePost = postEdit[0].titlePost
    }

    function update(){
        const currentPosts = posts.value.filter(item=>item.idPost != idPostEditing.value)
        posts.value = [...currentPosts, formPost.value]
        editing.value = false
    }

    function useClearFormPost(){
        formPost.value.descriptionPost = ''
        formPost.value.idPost = null
        formPost.value.imageBackground = ''
        formPost.value.titlePost = ''
    }

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 content">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="input-group">
                            <input  v-model="filterInput" type="text" class="form-control" />
                            <button @click="filter" class="btn btn-dark">Filter</button>
                        </div>
                    </div>
                    <div  v-if="filtered === false" v-for="item in posts" :key="item.idPost" class="col-md-6">
                        <Card 
                            :descriptionPost="item.descriptionPost"
                            :imageBackground="item.imageBackground" 
                            :title-post="item.titlePost"
                            :idPost="item.idPost"
                            @delete-post="deletePost"
                            @edit="getPostToEdit"
                        />
                    </div>
                    <div v-if="filtered"  v-for="item in filterPosts" :key="item.idPost" class="col-md-6">
                        <Card 
                            :descriptionPost="item.descriptionPost"
                            :imageBackground="item.imageBackground" 
                            :title-post="item.titlePost"
                            :idPost="item.idPost"
                            @delete-post="deletePost"
                            @edit="getPostToEdit"
                        />
                    </div>
                </div>
            </div>

            <div class="col-md-4 content">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="input-group">
                            <label class="input-group-text" for="">Title</label>
                            <input v-model="formPost.titlePost" type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="input-group">
                            <label class="input-group-text" for="">Image URL</label>
                            <input type="text" v-model="formPost.imageBackground"  class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-12 mt-4">
                        <label for="">Description</label>
                        <textarea v-model="formPost.descriptionPost" class="form-control" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div class="col-md-12 mt-4">
                        <button v-if="editing === false" @click="addPost" class="btn btn-dark">Post</button>
                        <button v-if="editing" @click="update" class="btn btn-dark">Update</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>