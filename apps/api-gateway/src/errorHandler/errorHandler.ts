export class errorHandler extends Error{

    statusCode:number
    success:boolean

    constructor(message:string,statusCode:number,success:boolean){
        super(message)

        this.message=message;
        this.statusCode=statusCode;
        this.success=success

    }
}


export class authError extends errorHandler{

    constructor(message:string){
        super(message,401,false)
    }
}