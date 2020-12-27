class Subscribes {
    constructor(){
        this.users = new Set([])
    }

    Add(data){
        this.users.add(data)
    }

    Next(callback){
        return this.users.forEach(callback)
    }
}

module.exports = Subscribes