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
onMounted(() => {
    getItem()
})
</script>
<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 item-box" v-for="(item,i) in data" :key="i">
                <div class="card">
                    <div class="card-header">
                        <img :src="item.img" alt="">

                    </div>
                    <div class="card-body">
                        <div class="title">
                            <p>{{item.name}}</p>
                            <p>{{item.price}}</p>
                        </div>
                        <div class="card-img">
                            <img :src="item.imgList" alt="">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>