<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
const data = ref([])
const getItem = () => {
    let url = `https://la3la3.com/home/api/get-product.php?s=0&e=4`
    axios.get(url)
        .then(
        (rp) => {
            data.value = rp.data
            console.log(data)
        }
    )
}
const setImg = (i,img) => {
    console.log(data.value[i])
    data.value[i] = img
}
onMounted(() => {
    getItem()
})
</script>
<template>
    <div class="container mt-3 mb-3">
        <div class="row">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 item-box" v-for="(item,i1) in data" :key="i1">
                <div class="box">
                    <div class="img-box">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="box-text">
                        <h1>{{ item.name }}</h1>
                        <h2>${{ item.price }}</h2>
                        <ul>
                            <li @click="setImg(i1,img)" :class="{'active':item.img==img}" v-for="(img,k) in item.imgList" :key="k">
                                <img :src="img" alt="">
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>