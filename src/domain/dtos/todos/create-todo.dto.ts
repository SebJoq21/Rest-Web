
export class CreateTodoDto {

    private constructor(
        public readonly text: string,

    ){}

    static create( props: {[key:string]: any} ): [(string | undefined), (CreateTodoDto | undefined)?]{

        if ( !props ) return ['Body is required', undefined];
        const { text } = props
        
        if( !text ) return ['Text property is required', undefined];


        return [undefined, new CreateTodoDto(text)]
    }

}
