<script lang="ts" setup>
    
    const emit = defineEmits([
        "changeContentTab"
    ])

    function changeContentTab(value:string){
        emit("changeContentTab", value)
    }

</script>
<template>
    <ul class="tab">
        <li @click="changeContentTab('posts')">
            Posts
        </li>
        <li @click="changeContentTab('post')">
            Postar
        </li>
    </ul>
</template>