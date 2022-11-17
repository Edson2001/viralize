<script lang="ts" setup>
    import {toRefs} from "vue"
    
    const props = defineProps({
        imageBackground: String,
        titlePost: String,
        descriptionPost: String,
        idPost: Number 
    })

    const {descriptionPost, idPost, titlePost, imageBackground} = toRefs(props)
    const emit = defineEmits([
        "deletePost",
        "edit"
    ])

    function deletePost(){
        emit("deletePost", idPost.value)
    }
    function editPost(){
        emit("edit", idPost.value)
    }

</script>
<template>
    <div class="card mb-3">
        <img :src="imageBackground" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{titlePost}}</h5>
            <p class="card-text">{{descriptionPost}}</p>
            <div class="d-flex">
                <a href="#" class="btn btn-outline-secondary">view</a>
                <a href="#" @click.prevent="editPost" class="btn btn-outline-secondary">edit</a>
                <a href="#" @click.prevent="deletePost" class="btn btn-outline-secondary">delete</a>
            </div>
        </div>
    </div>
</template>