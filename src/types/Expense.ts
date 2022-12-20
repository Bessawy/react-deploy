export interface ExpenseObj {
  id: string;
  source: string;
  amount: number;
  date: string;
}

export type EventOnChange =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export interface onChnageType {
  onChangeExpeHandler(event: EventOnChange): void;
}

export interface SourceHandlerType extends onChnageType {
  onClickAddExpHandler(event: React.MouseEvent<HTMLButtonElement>): void;
  onClickRemoveExpHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ListExpenseType {
  expenseObjs: ExpenseObj[];
  SetexpenseObjs: React.Dispatch<React.SetStateAction<ExpenseObj[]>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  Edit_Expenses(id: string):void;
}
