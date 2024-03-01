<script setup>
import {ref, onMounted, } from 'vue'
import {RouterLink,RouterView} from 'vue-router'
import axios from 'axios'
import { menuCategory } from '../data';
// const menuCategory = ref([])
const isLoading = ref(false)
const getMenu = () => {
    // isLoading.value = true
    let url = "https://la3la3.com/home/api/get-category.php"
    axios.get(url)
        .then(
            (rp) => {
                menuCategory.value = rp.data
                isLoading.value = true  
            }
        )
}
onMounted ( () => {
    getMenu()
})
</script>
<template>
    <div class="container-fluid top_menu">
        <div class="container">
            <div class="menu_bar">
                <h1 v-show="!isLoading">Loading</h1>
                <ul v-show="isLoading">
                    <li>
                        <RouterLink to="/">
                            <i class="fa-solid fa-house"></i>
                        </RouterLink>
                    </li>
                    <li class="" v-for="(item,i) in menuCategory" :key="i">
                        <RouterLink :to="{name:'item', params:{cid:item.id}}">{{item.name}}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div >
</template>