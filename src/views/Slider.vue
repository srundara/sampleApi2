<script setup>
 import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import {ref,onMounted} from 'vue'
import axios from 'axios'
const modules = [Navigation];
const onSwiper = (swiper) => {
    console.log(swiper); 
}
const slideChange = () => {
    console.log('swiper'); 
}
const slider = ref([])
const getSlide = () => {
    let url = "https://la3la3.com/home/api/get-slide.php"
    axios.get(url)
        .then(
            (rp) => {
                slider.value = rp.data
                console.log(slider)
            }
        )
}
onMounted ( () => {
    getSlide()
})
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 slide_container">
                <swiper
                @swiper="onSwiper"
                :navigation="true" 
                :modules="modules" 
                class="mySwiper">
                    <swiper-slide v-for="(item,i) in slider" :key="i">
                        <img :src="item.img" alt="">
                        <h1>Shop Now</h1>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
     </div>
</template>