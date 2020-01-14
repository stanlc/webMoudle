module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    
    router.post('/',async (req,res)=>{
        const model =await req.Model.create(req.body)
        res.send({success:true})
    })
    router.post('/search',async (req,res)=>{
        const model =await req.Model.find(req.body)
        res.send(model)
    })
    router.put('/:id',async (req,res)=>{
        const model =await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send({success:true})
    })
    router.get('/',async (req,res)=>{
        const model = await req.Model.find()
        res.send(model)
    })
    router.get('/page',async (req,res)=>{
        let query = req.query
        const model = await req.Model.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||10)
        res.send(model)
    })
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.delete('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndRemove(req.params.id)
        res.send({success:true})
    })
    
    app.use('/web/api/rest/:resource',async (req,res,next) =>{
        const ModelName= require('inflection').classify(req.params.resource);
        req.Model = require(`../models/${ModelName}`)
        next()
    },router)
}

