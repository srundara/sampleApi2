<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import {ref, onMounted, watchEffect} from 'vue'
import axios from 'axios';
const cateData = ref([])
const route = useRoute()
const s = ref(0)
const e = ref(3)
const itemData = ref([])
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
const getItemByMenu = () => {
    let url = `https://la3la3.com/home/api/get-product.php?cate-id=1&s=${s.value}&e=${e.value}`
    axios.get(url)
        .then(
            (rp) => {
                console.log(rp.data)
                itemData.value = rp.value
            }
        )
}
// onMounted( () => {
//     getSubCategory()
// })

watchEffect ( () => {
    getSubCategory()
    getItemByMenu()
})
const subActiveMenu = (menu) => {
    console.log("asda")
    menu['active-sub'] = !menu['active-sub']
}
</script>
<template>
    <div class="container-fluid mt-3">
        <div class="container">
            <div class="row">
                <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 left-menu">
                    <ul>
                        <li v-for="(menu,i) in cateData" :key="i" >
                            <a @click="subActiveMenu(menu)" :class="{active:menu['active-sub']}">
                                <span>{{menu.name}}</span>
                                <i class="fa-solid fa-plus" v-if="!menu['active-sub']"></i>
                                <i class="fa-solid fa-minus" v-else></i>
                            </a>
                            <ul class="subMenu" v-if="menu['active-sub']">
                                <li v-for="(item,i) in menu.sub" :key="i">
                                    <a href="">{{ item.name }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
                    <div class="row">
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4" v-for="(item,i) in itemData" :key="i">
                            <!-- <div class="box"> -->
                                {{ item.name }}
                                <!-- {{ data.name }} -->
                            <!-- </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>