
export type EventOnChange = React.ChangeEvent<HTMLInputElement>

export interface TargetHandler{
    onChangeTargetHandler(event :EventOnChange):void;
    onClickTargetReset(event: React.MouseEvent<HTMLInputElement>): void;
}

export interface ProgressType{
    Saving_: number,
    Target_: number
}

export interface TransferType{
    transferSavings(amount: number):void;
}

export interface SavingType extends TransferType{
    savings: number;
}

