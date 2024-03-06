<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
// import MoreCategory from './MoreCategory.vue';
const data = ref([])
const s = ref(0)
const e = ref(8)
const isLoading = ref(false)
const isPopup = ref(false)
const getItem = () => {
    let url = `https://la3la3.com/home/api/get-product.php?s=${s.value}&e=${e.value}`
    axios.get(url)
        .then(
        (rp) => {
            
            // data.value = rp.data
            rp.data.forEach(el => {
                data.value.push(el)
            });
            isLoading.value = false
            console.log(data)
        }
    )
}
onMounted(() => {
    getItem()
})
const setImg = (i,img) => {
    console.log(data.value[i])
    data.value[i].img = img
}
const moreData = () => {
    isLoading.value = true
    s.value = s.value + e.value
    getItem()
} 

</script>
<template>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 item-box" v-for="(item,i1) in data" :key="i1">
                <div class="box">
                    <div class="img-box">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="box-text">
                        <div class="row">
                            <h1>{{ item.name }}</h1>
                        </div>
                        <div class="row">                            
                        </div>
                        <h2>${{ item.price }}</h2>
                        <ul>
                            <li @click="setImg(i1,img)" :class="{'active':item.img==img}" v-for="(img,k) in item.imgList" :key="k">
                                <img :src="img" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <ul class="add-card">
                    <button>
                        <i class="fa-solid fa-cart-plus"></i>
                        <span> ADD TO CARD</span>
                    </button>

                    </ul>
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
        <div class="popup" v-show="isLoading">
            <div class="loading">
            </div>
        </div>

        
    </div>
</template>