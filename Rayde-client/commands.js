#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const { spawn } = require('child_process');
const child_process = require('child_process');
const Rayconnect = require('rayconnect-client').default
let events = require('events');


const miapp = new Rayconnect({
    scopes: 'messages',
    space: 'main',
    appID: 'MyrayConnectApp',
    type: 'client'
}, undefined, true)

program
    .version('1.0.0')


program
    .command('mkdir <file>')
    .description('make directory')
    .action(async(file)=>{
        await command_mkdir(file)  // ================> rayde read alireza.txt    
    })

program
    .command('rm <file>')
    .description('remove directory or file')
    .action(async(file)=>{
        await command_remove(file)  // ================> rayde read alireza.txt    
    })


// edit command
program
    .command('edit <file>')
    .description('nanoing file')
    .action((file)=>{
        let nano = spawn('nano', [file], {
            stdio: 'inherit'
        })

        nano.on('exit', () => {
            fs.readFile(file, 'utf8', async(err, data)=>{
                if(err){
                    console.log(err)
                }else{
                    await command_nano(file, data)
                }
            })
        })
    })



program
    .command('read <file>')
    .description('read file')
    .action(async(file)=>{
        await command_send_read(file)  // ================> rayde read alireza.txt    
    })

async function command_remove(file){

    try{
        miapp.execQuery({
            address: 'messages/subscribe',
            scope: 'messages',
            uniqueID: 'MyrayConnectApp_admin_system',
            TokenID: '*',
            info: {
                method: 'REMOVE',
                data: {
                    filename: file
                }
            }
        });
        console.log(`${file} removed from host.`)
        process.exit(0)
    }catch(err){
        console.log(err)
    }
}

async function command_mkdir(file){

    try{
        miapp.execQuery({
            address: 'messages/subscribe',
            scope: 'messages',
            uniqueID: 'MyrayConnectApp_admin_system',
            TokenID: '*',
            info: {
                method: 'MKDIR',
                data: {
                    filename: file
                }
            }
        });
        console.log(`directory ${file} created on host.`)
        process.exit(0)
    }catch(err){
        console.log(err)
    }
}

async function command_nano(file, NanoData){

    try{
        miapp.execQuery({
            address: 'messages/subscribe',
            scope: 'messages',
            uniqueID: 'MyrayConnectApp_admin_system',
            TokenID: '*',
            info: {
                method: 'NANO',
                data: {
                    NanoData: NanoData,
                    filename: file
                }
            }
        });
        fs.unlink(file, err =>{
            if(err){
                console.log(err)
            }else{
                console.log(`${file} saved on host.`)
            }
        })
        console.log(`${file} created on host.`)
        process.exit(0)
    }catch(err){
        console.log(err)
    }
}


async function command_send_read(file){

    try{
        await miapp.Query(
            {
                scope: "messages",
                address: "messages/subscribe",
                method: "SEND",
            },
            (result) => {
                console.log(result.data);
                process.exit(0)
            }
        )
        await miapp.execQuery({
            address: 'messages/subscribe',
            scope: 'messages',
            uniqueID: 'MyrayConnectApp_admin_system',
            TokenID: '*',
            info: {
                method: 'READ',
                data: {
                    filename: file
                }
            }
        })
    }catch(err){
        console.log(err)
    }
}


miapp.OnConnect(async()=>{
    await miapp.GetGuestAccess()
    program.parse(process.argv)
})




