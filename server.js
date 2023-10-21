/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aanchal Basra
*  Student ID: 156175200
*  Date: 21/10/2023
*
*  Published URL: https://gray-dhole-toga.cyclic.app/
*
********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require('express'); 
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; 
const path = require("path");
app.use(express.static('public')); 

// app.get('/', (req, res) => {
//     res.send('Assignment 2:  Aanchal Basra - 156175200');
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
});


app.get('/lego/sets', (req, res) => {
    if(req.query.theme){
        legoData.getSetsByTheme(req.query.theme).then((setByNum=>{
            res.json(setByNum);
        })).catch(err=>{
            res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
        });
    }
    else{
        legoData.getAllSets().then((allSets=>{
            res.json(allSets);
        })).catch(err=>{
            res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
        });
    }
    
});

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num).then((setByNum=>{
        res.json(setByNum);
    })).catch(err=>{
        // res.json({message: "unable to find requested set"});
        // res.status(404).send(`unable to find requested set`);
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"))

    });
});

// app.get('/lego/sets/theme-demo', (req, res) => {
//     legoData.getSetsByTheme("Supplemental").then((setByNum=>{
//         res.json(setByNum);
//     })).catch(err=>{
//         res.json({message: "unable to find requested sets"});
//     });
// });

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
});

legoData.initialize().then(()=>{
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
}).catch((err)=>{
    console.log(err);
})
