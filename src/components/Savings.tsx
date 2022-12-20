import React, { useState } from "react";
import { ProgressType, SavingType, TargetHandler, TransferType } from "../types/Savings";
import { EventOnChange } from "../types/Source";
import { setStringtoInt } from "../utils/utils";

import '../sass/_saving.scss'

function TargetAmount(props: TargetHandler) {
  return (
    <div className="main__saving__target">
      <form action="#">
        <label htmlFor="saving_target">Set target</label>
        <input
          type="number"
          onChange={props.onChangeTargetHandler}
          id="target-amount"
          name="amount"
          min={0}
        />
        <input type="reset" value="reset" onClick={props.onClickTargetReset} />
      </form>
    </div>
  );
}

function TransferSaving(props: TransferType) {

  const [transfer, setTransfer] = useState<number>(0);

  function onTransferChange(event: EventOnChange) {
    setStringtoInt(transfer, setTransfer, event.target.value);
  }

  function onclick(event: any){
    props.transferSavings(transfer)
  }

  return (
    <div className="main__saving__transfer">
      <form action="#">
        <label htmlFor="saving_transfer">Transfer saving</label>
        <input
          type="number"
          onChange={onTransferChange}
          id="target-amount"
          name="amount"
          min={0}
        />
        <input type="reset" value="transfer" onClick={onclick} />
      </form>
    </div>
  );
}



function Progress(props: ProgressType) {
  function getProgress(): string {
    if (props.Target_ === 0) {
      return "0";
    } else {
      return ((props.Saving_ / props.Target_) * 100).toFixed(2) + "";
    }
  }

  return (
    <div className="main__saving__progess">
      <label htmlFor="progress">Progress: {getProgress()}%</label>
      <progress id="save-progress" value={getProgress()} max="100"></progress>
    </div>
  );
}



function Savings(props: SavingType) {
  const [target, setTarget] = useState<number>(0);

  function onTargetChange(event: EventOnChange) {
    setStringtoInt(target, setTarget, event.target.value);
  }

  function resetTarget(event: React.MouseEvent<HTMLInputElement>) {
    setTarget(0);
  }

  return (
    <div className="main__saving">
      <TargetAmount
        onChangeTargetHandler={(e) => onTargetChange(e)}
        onClickTargetReset={(e) => resetTarget(e)}
      />
      <p> Current saving: {props.savings}</p>
      <p> Target: {target}</p>
      <TransferSaving transferSavings={props.transferSavings}/>
      <Progress Target_={target} Saving_={props.savings} />
    </div>
  );
}

export default Savings;
