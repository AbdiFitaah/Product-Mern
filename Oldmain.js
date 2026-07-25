

// marka hore create greee express app si aad u isticmasho
const express= require("express");

// ka dib faco function ah si loo create gareeyo app
const app = express()
const port = 5173;

// waa adoo dhahy ka hor inta soo mar hadii aad rabot inaa checking marsiiso xogta wax ka badasho like protected route
app.use(express.json());

// kan waa route oo ah qofka waxa uu soo codsanaayo oo pages ah inaa ku manage gareyso waxa uu qaataa request oo ah waxa userka soo codasnaayo iyo responce oo ah jawaabta aa u celineysid
app.get("",(req,res)=>{
    res.send("Hi i am from Express");
})
app.get("/admin",(req,res)=>{
    res.send("Hi i am from Express admin");
})

// post waa abuur xog cusub
app.post("/users/",(req,res)=>{
    //request waxaa lagu helaa wax walba uu userka soo gudbiyo ama soo sameeyo
    //resp waa qaabka ama mesha ugu jawaabi laheyd resultga
    console.log(`waa la ubdate garey qofka wata magaciisa ayaana laga update gareyyay ${req.body.name}`)
    res.send("Done")
})


// waa update ku samee xog hore
app.put('/users/:id',(req,res)=>{
    const id = req.params.id
    console.log(`Updated`)
    res.send(`Done Updated,${req.body.name}`)
})

app.delete("/users/:id",(req,res)=>{
    const id= req.params.id;
    res.send(`Deleted this id: ${id}`)
})
// ka waa mesha routes marka lasoo codsanayo mesha loo soo maraaayo kaliya port number kaas ayaa laga soo gali karaa si hadhow aa ugu dhigtid domain namekaaga
app.listen(port,()=>{
    console.log("server is running")
})