export interface IncomeObj{
    source: string,
    amount: number,
    date: string,
    id: string,
}

export type EventOnChange = React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>;

export interface onChnageType{
    onChangeHandler(event:  EventOnChange): void;
}

export interface SourceHandlerType extends onChnageType{
    onClickAddHandler(event: React.MouseEvent<HTMLButtonElement>): void;
    onClickRemoveHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ListIncomeType{
  sourceObjs: IncomeObj[], 
  SetsourceObjs:  React.Dispatch<React.SetStateAction<IncomeObj[]>>,
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  Edit_Income(id: string):void;
}
