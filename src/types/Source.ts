export interface IncomeObj{
    source: string,
    amount: number,
    date: string,
}

export type EventOnChange = React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>;

export interface onChnageType{
    onChangeHandler(event:  EventOnChange): void;
}

export interface SourceHandlerType extends onChnageType{
    onClickAddHandler(event: React.MouseEvent<HTMLButtonElement>): void;
    onClickRemoveHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}
