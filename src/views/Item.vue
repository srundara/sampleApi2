<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import {ref, onMounted, watchEffect, watch, computed} from 'vue'
import axios from 'axios';
const cateData = ref([])
const route = useRoute()
const s = ref(0)
const e = ref(3)
const itemData = ref([])
const isLoading = ref(true)
const cid = ref(0)
const sid = ref(0)
const limitImg = 4
const getSubCategory = () => {
    let url = `https://la3la3.com/home/api/get-sub-category.php?cate-id=${route.params.cid}`
    
    axios.get(url)
        .then(
            (rp) => {
               
              cateData.value = rp.data
              console.log( cateData.value)
            }
        )
}
const getItemByMenu = () => {
    if(!route.params.sid){
        var url = `https://la3la3.com/home/api/get-product.php?cate-id=${route.params.cid}&s=${s.value}&e=${e.value}`
    }else{
        var url = `https://la3la3.com/home/api/get-product.php?sub-cate-id2=${route.params.sid}&s=${s.value}&e=${e.value}`
    }
    console.log(url)
    axios.get(url)
        .then(
            (rp) => {
                rp.data.forEach(el => {
                    itemData.value.push(el)
            });
            isLoading.value = false
            }
        )
}
watch( [cid,sid], ([newCid,newSid],[oldCid,oldSid]) => {
    console.log("oldCid :" , oldCid)
    console.log("newCid :" , newCid)
    // console.log("oldSid :" , oldSid)
    // console.log("newSid :" , newSid)
    if(newCid != oldCid){
        itemData.value = []
        s.value = 0
        getSubCategory()
    }else if(newSid != oldSid){
        itemData.value = []
        s.value = 0
    }
    getItemByMenu()
    // getSubCategory()
})
watchEffect ( () => {
    // getSubCategory()
    cid.value = route.params.cid
    if(route.params.sid){
        sid.value = route.params.sid
    }
    console.log(sid.value)
})
const subActiveMenu = (menu) => {
    menu['active-sub'] = !menu['active-sub']
}
const setImg = (i,img) => {
    itemData.value[i].img = img
    // console.log(limitImg)
}

const moreData = () => {
    isLoading.value = true
    s.value = s.value + e.value
    getItemByMenu()
    // cid.value++
}
onMounted( ( ) => {
    getSubCategory()
}) 
computed
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
                                <li v-for="(item2,i2) in menu.sub" :key="i2">
                                    <router-link :to="{
                                        name:'sub-item', 
                                        params:{
                                            cid:item2.category , 
                                            sid:item2.id}}">
                                        {{ item2.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="col-xxl-9 col-xl-9 col-lg-9 col-md-9">
                    <div class="row">
                        <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 item-box" v-for="(item,i1) in itemData" :key="i1">
                            <div class="box">
                                <div class="img-box">
                                    <img :src="item.img" alt="">
                                </div>
                                <div class="box-text">
                                    <div class="row">
                                        <h1>{{ item.name }}</h1>
                                    </div>
                                    <div class="row">                            
                                        <h2>${{ item.price }}</h2>
                                    </div>
                                    <ul>
                                        <li @click="setImg(i1,img)" :class="{'active':item.img==img}" v-for="(img,k) in item.imgList" :key="k">
                                            <img :src="img" alt="">
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 btn-more">
                            <div class="get-more" @click="moreData">
                                Get More
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup" v-show="isLoading">
                    <div class="loading">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>