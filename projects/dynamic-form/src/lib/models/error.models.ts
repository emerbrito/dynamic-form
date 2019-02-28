
export class ErrorCodes {
    static ConfigIsNull: string = 'ConfigIsNull';
    static ControlConfigIsNull: string = 'ControlConfigIsNull';
    static ControlNameIsNull: string = 'ControlNameIsNull';
    static DuplicateControlName: string = 'DuplicateControlName';
    static DuplicateGroupName: string = 'DuplicateGroupName';    
    static InvalidName: string = 'InvalidName';
    static GroupConfigIsNull: string = 'GroupConfigIsNull';
    static GroupHasNoControls: string = 'GroupHasNoControls';
    static GroupNullOrEmpty: string = 'GroupNullOrEmpty';
    static TypeNullOrEmpty: string = 'TypeNullOrEmpty'
}

export class ValidationError extends Error {

    constructor(message: string, name?: string) {
        super(message);
        this.name = name || 'ValidationError';
    }

}
