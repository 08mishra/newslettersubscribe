const https = require('https');
const express= require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
 
app.use(express.static('./Home'));
app.use(bodyparser.urlencoded({extended:true}));


app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './Home/index.html'));
})


app.post('/', (req, res)=>{
    const email = req.body.email;
    const fname= req.body.fname;
    const lname= req.body.lname;
    // console.log(email, fname, lname);

    // const data={
        
            
    //             email_address:email,
    //             status:"subscribed",
    //             merge_fields:{
    //                 FNAME:fname,
    //                 LNAME:lname
    //             }
            
      
    // }

    // const jsondata = JSON.stringify(data);

    mailchimp.setConfig({
        apiKey: "2403bf031dd50d30497bfa5e8cd934f2-us20",
        server: "us20",
      });
      const listId = "43589df584";
      const subscribingUser = {
        firstName:  fname,
        lastName: lname,
        email: email
      };

      async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }
        });
         
        if(response.status==='subscribed'){
                    res.sendFile(path.resolve(__dirname, './Home/success.html'))
                }else {
                    res.sendFile(path.resolve(__dirname, './Home/failure.html'))
                }
        // console.log(
        //   `Successfully added contact as an audience member. The contact's id is ${
        //     response.id
        //   }.`
       // );
      }
      
      run();


//     const url = "https://us20.api.mailchip.com/3.0/lists/43589df584/members";
//     const options= {
//         method:"POST",
//         auth:"prashant:2403bf031dd50d30497bfa5e8cd934f2-us20"
//     }

//   const request= https.request(url, options, (res)=>{

//     if(res.statusCode===200){
//         res.sendFile(path.resolve(__dirname, './Home/success.html'))
//     }else {
//         res.sendFile(path.resolve(__dirname, './Home/failure.html'))
//     }
//         res.on('data', (data)=>{
//             console.log(JSON.parse(data));
            
//         })


//     })

//     request.write(jsondata);
//     request.end();

    
    
})

app.post('/success', (req, res)=>{
    res.redirect('/');
})

app.post('/failure', (req, res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is runing on port 3000');
})


//api key =  2403bf031dd50d30497bfa5e8cd934f2-us20

// id = 43589df584