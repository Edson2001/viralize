<script lang="ts" setup>
    
    import {onMounted, ref, watch, toRefs} from "vue"
    import Card from "../components/Card.vue"
    import {typePost} from "../types/Post"
    import {typeFormPost} from "../types/FormPost"

    let posts = ref<typePost[]>()
    let filterPosts = ref<typePost[]>()
    let filterInput = ref('')
    let filtered = ref(false)
    let isEditing = ref(false)
    let idPostEditing = ref<number>(0)
    
    const formPost = ref<typeFormPost>({
        descriptionPost: '',
        imageBackground: '',
        titlePost: ''
    })
    
    onMounted(()=>{
        posts.value = JSON.parse(localStorage.getItem('posts') || '[]')
    })

    function newPost(){
        
        const {descriptionPost, titlePost, imageBackground} = toRefs(formPost.value)

        if(descriptionPost.value == '' || titlePost.value == '' || imageBackground.value == ''){
            alert("Preencha todos os campos")
            return 
        }

        let newPost = [...posts.value || [], 
            {
                descriptionPost: descriptionPost.value,
                idPost:  posts.value!.length + 1,
                imageBackground: imageBackground.value,
                titlePost: titlePost.value
            }
        ]

        posts.value = newPost

        useClearFormPost()
    }

    watch(()=>posts.value, ()=>{
        localStorage.setItem("posts", JSON.stringify(posts.value))
    })

    function deletePost(postID:number){
        
        if(posts.value){
            posts.value =  posts.value.filter(item=>item.idPost != postID)
        }        
    }

    function filterPost(){
        if(posts.value){
            filterPosts.value = posts.value.filter(item=> item.titlePost === filterInput.value)
            if(filterPosts.value && filterPosts.value.length > 0){
                filtered.value = true
            }else{
                filtered.value = false
            }
        }        
    }

    function getPostToEdit(postID: number){
       if(posts.value){

        let postEdit: typePost = posts.value.filter(item=> item.idPost == postID)[0]
        
        isEditing.value = true
        idPostEditing.value = postID

        formPost.value.descriptionPost = postEdit.descriptionPost
        formPost.value.imageBackground = postEdit.imageBackground
        formPost.value.titlePost = postEdit.titlePost
        
       }
    }

    function update(){
        if(posts.value){

            const currentPosts = posts.value.filter(item=>item.idPost != idPostEditing.value)

            const {descriptionPost, imageBackground, titlePost} = toRefs(formPost.value)

            let newFormPost = {
                descriptionPost: descriptionPost.value,
                idPost: idPostEditing.value,
                imageBackground: imageBackground.value,
                titlePost: titlePost.value
            }

            posts.value  = [...currentPosts, newFormPost] 
            isEditing.value = false 
        }
        
    }

    function useClearFormPost(){
        formPost.value.descriptionPost = ''
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
                            <button @click="filterPost" class="btn btn-dark">Filter</button>
                        </div>
                    </div>
                    <div  v-if="filtered == false" v-for="item in posts" :key="item.idPost" class="col-md-6">
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
                        <button v-if="isEditing === false" @click="newPost" class="btn btn-dark">Post</button>
                        <button v-if="isEditing" @click="update" class="btn btn-dark">Update</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>