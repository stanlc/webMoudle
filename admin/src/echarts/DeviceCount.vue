<template>
    <div class="box">
        <span class="total"><b>{{count}}</b>总设备（台）</span>
        <div id="count" style="width:100%;height:100%;"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            count :0,
            organList:[],
            countlist:[
            ],
            colors:['#00ffff','#d5d147','#25c05f','#1e83f2','#d55521']
        }
    },
    computed:{
        rest(){
            return (this.count-this.normal===0)?null:(this.count-this.normal)
        }
    },
    created(){
        // this.utils.getOrganList(this)
        
    },
    mounted(){
           //获取设备数据
        this.getValue();
        
    },
    methods:{
        getValue(){
            let that = this 
            // this.$http.get('/index/deviceInfo').then(res=>{
            //     this.count = res.data.data.deviceNum
            //    let list = res.data.data.childrenInfo
            //    list.map(item=>{
            //        this.countlist.push({name:item.childOrganName,value:item.childDeviceNum,itemStyle:{normal:{color:''}},label:{normal:{formatter:function(params){
            //                     let per = 0
            //                     if(params.value===0 && that.count===0){
            //                         per = 0
            //                     }else{
            //                         per = ((params.value/that.count)*100).toFixed(2)
            //                     }
            //                     return params.name+' \n '+per+'%'+' \n '+params.value+'(台)';
            //                 }}}})
            //    })
            //     this.countlist.map((item,index)=>{item.itemStyle.normal.color=that.colors[index]})
            //     // console.log(this.countlist)
            //     this.draw()
            // })
            this.count = 3
               let list = [
                   {childOrganName: "成都金鑫", childDeviceNum: 1},
                   {childOrganName: "深圳金鑫", childDeviceNum: 1},
                   {childOrganName: "重庆金鑫", childDeviceNum: 1}
               ]
               list.map(item=>{
                   this.countlist.push({name:item.childOrganName,value:item.childDeviceNum,itemStyle:{normal:{color:''}},label:{normal:{formatter:function(params){
                                let per = 0
                                if(params.value===0 && that.count===0){
                                    per = 0
                                }else{
                                    per = ((params.value/that.count)*100).toFixed(2)
                                }
                                return params.name+' \n '+per+'%'+' \n '+params.value+'(台)';
                            }}}})
               })
                this.countlist.map((item,index)=>{item.itemStyle.normal.color=that.colors[index]})
                // console.log(this.countlist)
                this.draw()
        },
        draw(){
            let that = this
            let myChart = this.$echarts.init(document.getElementById('count'))
            myChart.setOption({
                    title:{
                        text:that.count,
                        top:'center',
                        left:'center',
                        textStyle:{
                            fontWeight: 'normal',
                            fontSize: '18',
                            color: '#fff',
                            textAlign: 'center',
                        }
                    },
                    series : [
                    {
                        type: 'pie',
                        radius: ['40%',"65%"],
                        label:{
                            normal:{
                                fontSize:'10',
                            }
                        },
                        labelLine:{
                            length:20,
                            length2:8
                        },
                        data:that.countlist,
                        minShowLabelAngle:1,  //扇区小于1%不显示
                    }
                ]
            })
            window.addEventListener("resize",function(){   
                myChart.resize();
            });
        }
    }
}
</script>
<style scoped>
  .box{
      width:100%;
      height: 60%;
  }
  .total{
    position: absolute;
    top: 25px;
    left: 40px;
    color: #fff;
    font-size: 12px;
  }
  .total b{
    color: #00ffff;
    font-size: 16px;
    font-weight: normal;
    margin-right: 4px;
  }
  #count{
      margin-top: 10px;
  }
</style>