<template>
    <div class="home">
        <button @click="handleDownload">下载按钮测试</button>
    </div>
</template>

<script>
import { testApi, testPostApi } from '@/api'
export default {
    name: 'Home',
    components: {},
    methods: {
        handleDownload() {
            window.ShareTrace.preDownload()
        }
    },
    created() {
        window.ShareTrace.init({
            appkey: '62b38af93a8c7d2e',
            param: 'name=1',
            success() {
                console.log('shareTrace初始化成功！')
            },
            error(error) {
                console.log(error)
            }
        })
    },
    async mounted() {
        console.log('test axios:get ======================')
        await testApi()
        console.log('test axios:post =====================')
        await testPostApi()
    }
}
</script>

<style scoped></style>
