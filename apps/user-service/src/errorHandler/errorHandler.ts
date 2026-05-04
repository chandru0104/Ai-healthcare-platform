export class errorHandler extends Error {

    statusCode:number
    success:boolean

    constructor(message:string,statusCode:number,success:boolean){
        super(message)

        this.statusCode=statusCode;
        this.success=success

        Error.captureStackTrace(this,this.constructor)
    }
}

export class validationError extends errorHandler {

    constructor(message:string){
        super(message,400,false)
    }
}



