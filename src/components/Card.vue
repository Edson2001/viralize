<script lang="ts" setup>
 
    const props = defineProps({
        imageBackground: String,
        titlePost: String,
        descriptionPost: String,
        idPost: Number 
    })
    
    const emit = defineEmits([
        "deletePost",
        "edit"
    ])

    function deletePost(){
        emit("deletePost", props.idPost)
    }
    function editPost(){
        emit("edit", props.idPost)
    }

</script>
<template>
    <div class="card mb-3">
        <img :src="props.imageBackground" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{props.titlePost}}</h5>
            <p class="card-text">{{props.descriptionPost}}</p>
            <div class="d-flex">
                <a href="#" @click.prevent="editPost" id="edit" class="btn btn-outline-secondary">edit</a>
                <a href="#" @click.prevent="deletePost" id="delete" class="btn btn-outline-secondary">delete</a>
            </div>
        </div>
    </div>
</template>