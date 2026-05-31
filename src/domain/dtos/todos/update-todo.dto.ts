
export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date

    ){}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if( this.text ) returnObj.text = this.text;
        if( this.completedAt ) returnObj.completedAt = this.completedAt;

        return returnObj

    }

    static create( props: {[key:string]: any} ): [(string | undefined), (UpdateTodoDto | undefined)?]{

    if ( !props ) return ['Body is required', undefined];

    const { id, text, completedAt } = props;
    
    let newCompletedAt: Date | undefined; 

    if( !id || isNaN( Number(id) ) ){
        return ['id must be a valid number'];
    } 

    if( completedAt ){
        const parsedDate = new Date(completedAt); 
        
        if( parsedDate.toString() === 'Invalid Date'){
            return ['CompletedAt must be a valid date'];
        }
        
        newCompletedAt = parsedDate; 
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
}
}

