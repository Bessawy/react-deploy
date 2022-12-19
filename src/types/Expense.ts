export interface ExpenseObj{
    source: string,
    amount: number,
    date: string,
}

export type EventOnChange = React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>;

export interface onChnageType{
    onChangeExpeHandler(event:  EventOnChange): void;
}

export interface SourceHandlerType extends onChnageType{
    onClickAddExpHandler(event: React.MouseEvent<HTMLButtonElement>): void;
    onClickRemoveExpHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}
