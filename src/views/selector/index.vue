<template>
    <div>
        <selector-comp></selector-comp>
        <table-data></table-data>
    </div>
</template>

<script>
import selectorComp from './selectorComp'
import tableData from './tableData'

export default {
    name: 'selector',
    data() {
      return {
      } 
    },
    components: {
        selectorComp, 
        tableData
    },
}
</script>

<style scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}
</style>
