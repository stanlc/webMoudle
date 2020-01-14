<template>
    <div>
        <video-player :url="url"></video-player>
    </div>
</template>

<script>
import videoPlayer from '../components/videoPlayer'
    export default {
        data() {
            return {
                url: 'http://stream2.ahtv.cn/ahws/cd/live.m3u8'
            }
        },
        components:{videoPlayer}
    }
</script>

<style lang="scss" scoped>

</style>