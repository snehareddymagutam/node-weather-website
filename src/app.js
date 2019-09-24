const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const directoryName = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialPath)

app.use(express.static(directoryName))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sneha Reddy'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sneha Reddy'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        text:'This a helpful msg',
        title:'Help',
        name:'Sneha Reddy'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"no address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            res.send({error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send({error })
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
        
            })

        })
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"no search"
        })
    }
    console.log(req.query.search)
    res.send({
    products:[]

    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sneha Reddy',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sneha Reddy',
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log("server is running")
})
