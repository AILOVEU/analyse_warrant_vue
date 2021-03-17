<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 900px;
}
.choice-box {
    width: 300px;
    height: 300px;
    line-height: 250px;
}
.choice-box .content{
    padding: 0 auto;
    
}
</style>
