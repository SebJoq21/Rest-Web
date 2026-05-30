
export class UpdateTodoDto {

    private constructor(
        public readonly text?: string,
        public readonly completedAt?: string

    ){}

    static create( props: {[key:string]: any} ): [(string | undefined), (UpdateTodoDto | undefined)?]{

        if ( !props ) return ['Body is required', undefined];

        const { text, completedAt } = props
        let newCompletedAt = completedAt;

        if( completedAt ){
            const newCompletedAt = new Date(completedAt)
            if( newCompletedAt.toString() === 'Invalid Date'){
                return ['CompletedAt must be a valid date']
            }
        }

        return [undefined, new UpdateTodoDto(text, newCompletedAt)]
    }

}

