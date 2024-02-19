<script setup>
import {ref} from 'vue'
import { menuCategory } from './data'; 
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 cat-box" v-for="(item,i) in menuCategory" :key="i">
                <div class="card">
                    <img :src="item.img" alt="">
                    <h1>{{item.name}}</h1>
                </div>
            </div>
        </div>
    </div>
</template>