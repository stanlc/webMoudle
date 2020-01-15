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
                url: 'http://110.185.174.8:10006/live/cameraid/1000037%240/substream/1.m3u8'
            }
        },
        components:{videoPlayer}
    }
</script>

<style lang="scss" scoped>

</style>