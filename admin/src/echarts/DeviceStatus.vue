<template>
    <div class="box">
        <div id="main" :class="[isIe?'ieCls':'normalCls']"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            count :0,
            alarmNum:0,
            openNum:0,
            closeNum:0,
        }
    },
    computed:{
        rest(){
            return (this.count-this.normal===0)?null:(this.count-this.normal)
        }
    },
    created(){
        
    },
    mounted(){
        this.getValue();   //获取设备数据
        
    },
    computed:{
        isIe(){
           if (!!window.ActiveXObject || "ActiveXObject" in window){
               return true
           }else{
               return false
           } 
        }
    },
    methods:{
        getValue(){
            let that = this 
            // this.$http.get('/index/deviceInfo').then(res=>{
            //     this.count = res.data.data.deviceNum
            //     this.alarmNum = res.data.data.alarmNum
            //     this.openNum = res.data.data.openNum
            //     this.closeNum = res.data.data.closeNum
            //     this.draw();
            // })
            this.count = 9
            this.alarmNum = 2
            this.openNum = 3
            this.closeNum = 6
            this.draw();
        },
        draw(){
            
            let myChart = this.$echarts.init(document.getElementById('main'))
                var data = [
                {
                    name: '打开',
                    value: this.openNum
                },{
                    name: '关闭',
                    value: this.closeNum
                },{
                    name: '报警',
                    value: this.alarmNum
                },{
                    name: '总数',
                    value:  this.count
                }]
                var titleArr= [], seriesArr=[];
                let count = this.count
                var colors=[['#35ddf0','#176273' ],['#ff8c37', '#ffdcc3'],['#ffc257', '#ffedcc'], ['#fd6f97', '#fed4e0'],['#a181fc', '#e3d9fe']]
                data.forEach(function(item, index){

                    titleArr.push(
                        {
                            text:item.name,
                            left: index * 25 + 11 +'%',
                            top: '75%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: '12',
                                color: colors[index][0],
                                textAlign: 'center',
                            },
                        }        
                    );
                    seriesArr.push(
                        {
                            name: item.name,
                            type: 'pie',
                            clockWise: false,
                            radius: ['30%', '35%'],
                            itemStyle:  {
                                normal: {
                                    color: colors[index][0],
                                    shadowColor: colors[index][0],
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                }
                            },
                            hoverAnimation: false,
                            center: [index * 26 + 11 +'%', '50%'],
                            data: [{
                                value: item.value,
                                label: {
                                    
                                    normal: {
                                        formatter: function(params){
                                            return params.value;
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: '14',
                                            color: '#fff'
                                        }
                                    }
                                },
                            }, {
                                value: count-item.value,  
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: colors[index][1]
                                    },
                                    emphasis: {
                                        color: colors[index][1]
                                    }
                                }
                            }]
                        }    
                    )
                   
                });
            
              
            let option = {
                title:titleArr,
                series: seriesArr
            }
            // let a = document.getElementById('main').getElementsByTagName('div')[0]
            // if (!!window.ActiveXObject || "ActiveXObject" in window){
            //     a.style.width = '300px'
            // }
            
            myChart.setOption(option)
            window.addEventListener("resize",function(){   
                myChart.resize();
            });
        }
    }
}
</script>
<style scoped>
    .box{
    width: 20vw;
    height: 10vw; 
    display: -moz-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -moz-box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -moz-box-pack: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    /*for ie9*/
    justify-content: center;
    
    }
    .ieCls{
        width: 110%;
        height: 100%;
    }
    .normalCls{
        width: 80%;
        height: 100%;
    }
</style>