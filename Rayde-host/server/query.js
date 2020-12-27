const fs = require('fs')
const child_process = require('child_process');
const { spawn } = require('child_process');
const path = require('path')
const rimraf = require("rimraf")



module.exports = (miapp) => {
    
    // handle rayde command
    miapp.Query(
        {
          scope: "messages",
          address: "messages/subscribe",
          method: "READ",
        },
        (result) => {
            
            fs.readFile(`${path.join(__dirname, result.data.filename)}`, 'utf8', async (err, data)=>{
                if(err){
                    console.log(err)
                }else{
                    await miapp.execQuery({
                        address: "messages/subscribe",
                        scope: "messages",
                        uniqueID: '*',
                        TokenID: result.token,
                        info: {
                            method: 'SEND',
                            data: data
                        }
                    })
                }
            })

        }    
    );

    miapp.Query(
        {
          scope: "messages",
          address: "messages/subscribe",
          method: "NANO",
        },
        (result) => {

            fs.writeFile(`${path.join(__dirname, result.data.filename)}`, `${result.data.NanoData}`, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(`${result.data.filename} file edited and saved.`)
                }
            })
        }   
    );

    miapp.Query(
        {
          scope: "messages",
          address: "messages/subscribe",
          method: "REMOVE",
        },
        (result) => {
            rimraf(`${path.join(__dirname, result.data.filename)}`, () => {
                console.log(`file ${result.data.filename} Removed.`)
            });
        }   
    );

    miapp.Query(
        {
          scope: "messages",
          address: "messages/subscribe",
          method: "MKDIR",
        },
        (result) => {

            if (!fs.existsSync(`${path.join(__dirname, result.data.filename)}`)){
                try{
                    fs.mkdirSync(`${path.join(__dirname, result.data.filename)}`)
                    console.log(`directory ${result.data.filename} created.`)    
                }catch(err){
                    console.log(err)
                }
            }
        }   
    );
}

