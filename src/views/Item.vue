<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import {ref, onMounted, watchEffect} from 'vue'
import axios from 'axios';
const cateData = ref([])
const route = useRoute()
const getSubCategory = () => {
    let url = `https://la3la3.com/home/api/get-sub-category.php?cate-id=${route.params.cid}`
    axios.get(url)
        .then(
            (rp) => {
              cateData.value = rp.data
              console.log(cateData)
            }
        )
}
// onMounted( () => {
//     getSubCategory()
// })
watchEffect ( () => {
    getSubCategory()
})
</script>
<template>
    <div class="container-fluid mt-3">
        <div class="container">
            <div class="row">
                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 left-menu">
                    <!-- <div class="row"> -->
                        <ul>
                            <li v-for="(menu,i) in cateData" :key="i" @click="menu['active-sub'] = !menu['active-sub']">
                                <a>
                                    <!-- <img :src="menu.img" alt=""> -->
                                    <span>{{menu.name}}</span>
                                    <i class="fa-solid" :class="{ 'fa-minus':menu['active-sub'] , 'fa-plus':!menu['active-sub'] }"></i>
                                </a>
                                <ul class="subMenu" v-if="menu['active-sub']">
                                    <li v-for="(item,i) in menu.sub" :key="i">
                                        <a href="">{{ item.name }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    <!-- </div> -->
                </div>
                <div class="col-xxl-9 col-xl-9 col-lg-9 col-md-9 content-box">
                    asdasda
                </div>
            </div>
        </div>
    </div>
</template>