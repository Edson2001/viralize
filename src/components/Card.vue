<script lang="ts" setup>
    const props = defineProps({
        imageBackground: String,
        titlePost: String,
        descripptionPost: String,
        idPost: Number 
    })

</script>
<template>
    <div class="card mb-3">
        <img :src="imageBackground" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{props.titlePost}}</h5>
            <p class="card-text">{{props.descripptionPost}}</p>
            <div class="d-flex">
                <a href="#" class="btn btn-outline-secondary">view</a>
                <a href="#" class="btn btn-outline-secondary">edit</a>
            </div>
        </div>
    </div>
</template>