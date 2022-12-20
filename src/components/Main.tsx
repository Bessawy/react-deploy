import React, { useEffect, useState } from "react";
import uuid from "react-uuid";

import Source, { checkSource, listIncomeSources } from "./Source";
import { EventOnChange, IncomeObj } from "../types/Source";
import { ExpenseObj } from "../types/Expense";
import Expense, { checkExpense, listExpenseSources } from "./Expense";
import Savings from "./Savings";
import { changeToFloat } from "../utils/utils";
import "../sass/_main.scss";
import Chart from "./Graphs";
import "../sass/_charts.scss"

function MainSection() {
  const [source, setSource] = useState<IncomeObj>({
    source: "",
    amount: 0,
    date: "",
    id: "",
  });
  const [expense, setExpense] = useState<ExpenseObj>({
    source: "",
    amount: 0,
    date: "",
    id: "",
  });

  const [balance, setBalance] = useState<number>(0);
  const [saving, setSaving] = useState<number>(0);
  const [transferAmount, setTransferAmount] = useState<number>(0);

  const [sourceObjs, SetsourceObjs] = useState<IncomeObj[]>([]);
  const [expenseObjs, SetexpenseObjs] = useState<ExpenseObj[]>([]);

  function onSourceChange(event: EventOnChange) {
    let val: number | string = event.target.value;
    if (event.target.name === "amount") {
      val = changeToFloat(event.target.value);
    }
    setSource({
      ...source,
      [event.target.name]: val,
    });
  }

  function onExpenseChange(event: EventOnChange) {
    let val: number | string = event.target.value;
    if (event.target.name === "amount") {
      val = changeToFloat(event.target.value);
    }
    setExpense({
      ...expense,
      [event.target.name]: val,
    });
  }

  function onClick_Incomebtn(event: React.MouseEvent<HTMLButtonElement>) {
    const sourceObj: IncomeObj = {
      id: uuid(),
      source: source.source,
      amount: source.amount,
      date: source.date,
    };

    if (checkSource(sourceObj)) {
      const arrObjs: IncomeObj[] = sourceObjs.concat([sourceObj]);
      SetsourceObjs(arrObjs);
      setBalance(balance + sourceObj.amount);
    }
  }

  function Edit_Income(id: string) {
    const sourceObj: IncomeObj = {
      id: id,
      source: source.source,
      amount: source.amount,
      date: source.date,
    };

    if (checkSource(sourceObj)) {
      const indx = sourceObjs.findIndex((obj) => obj.id === id);
      if (balance + sourceObj.amount - sourceObjs[indx].amount >= 0) {
        setBalance(balance + sourceObj.amount - sourceObjs[indx].amount);
        sourceObjs[indx] = sourceObj;
        SetsourceObjs([...sourceObjs]);
      } else {
        alert("Balance will be less than 0");
      }
    }
  }

  function Edit_Expenses(id: string) {
    const expObj: ExpenseObj = {
      id: id,
      source: expense.source,
      amount: expense.amount,
      date: expense.date,
    };

    if (checkExpense(expObj)) {
      const indx = expenseObjs.findIndex((obj) => obj.id === id);
      if (balance - expObj.amount + expenseObjs[indx].amount >= 0) {
        setBalance(balance - expObj.amount + expenseObjs[indx].amount);
        expenseObjs[indx] = expObj;
        SetexpenseObjs([...expenseObjs]);
      } else {
        alert("Balance will be less than 0");
      }
    }
  }

  function onClick_Expbtn(event: React.MouseEvent<HTMLButtonElement>) {
    const exObj: ExpenseObj = {
      source: expense.source,
      amount: expense.amount,
      date: expense.date,
      id: uuid(),
    };

    if (checkExpense(exObj)) {
      let new_balance = balance - exObj.amount;
      if (new_balance >= 0) {
        const arrObjs: ExpenseObj[] = expenseObjs.concat([exObj]);
        console.log(arrObjs);
        SetexpenseObjs(arrObjs);
        setBalance(balance - exObj.amount);
      } else {
        alert("Balance is less than 0");
      }
    }
  }

  function remove_Incomebtn(event: React.MouseEvent<HTMLButtonElement>) {
    if (sourceObjs.length > 0) {
      let val = balance - sourceObjs[sourceObjs.length - 1].amount;
      if (val >= 0) {
        SetsourceObjs(sourceObjs.slice(0, sourceObjs.length - 1));
        setBalance(val);
      } else {
        alert("Balance is less than 0");
      }
    }
  }

  function remove_Expensebtn(event: React.MouseEvent<HTMLButtonElement>) {
    if (expenseObjs.length > 0) {
      SetexpenseObjs(expenseObjs.slice(0, expenseObjs.length - 1));
      setBalance(balance + expenseObjs[expenseObjs.length - 1].amount);
    }
  }

  function onTransferChange(event: EventOnChange) {
    setTransferAmount(parseFloat(event.target.value));
    if (transferAmount < 0 || event.target.value === "") {
      setTransferAmount(0);
    }
  }

  function transferBalance(event: React.MouseEvent<HTMLInputElement>) {
    let check = balance - transferAmount;
    if (check >= 0) {
      setBalance(balance - transferAmount);
      setSaving(saving + transferAmount);
    } else {
      alert("Balance is less than 0");
    }
  }

  function transferSaving(amount: number) {
    if (balance - amount >= 0 && saving - amount >= 0) {
      setBalance(balance + amount);
      setSaving(saving - amount);
    } else {
      alert("Balance or Sacing are less than 0");
    }
  }

  return (
    <div className="main">
      <div className="main__grid">
        <Source
          onChangeHandler={(e) => onSourceChange(e)}
          onClickAddHandler={(e) => onClick_Incomebtn(e)}
          onClickRemoveHandler={(e) => remove_Incomebtn(e)}
        />
        <ul className="main_source_list">
          {listIncomeSources({
            sourceObjs,
            SetsourceObjs,
            balance,
            setBalance,
            Edit_Income,
          })}
        </ul>
        <Expense
          onChangeExpeHandler={(e) => onExpenseChange(e)}
          onClickAddExpHandler={(e) => onClick_Expbtn(e)}
          onClickRemoveExpHandler={(e) => remove_Expensebtn(e)}
        />
        <ul className="main_expense_list">
          {listExpenseSources({
            expenseObjs,
            SetexpenseObjs,
            balance,
            setBalance,
            Edit_Expenses,
          })}
        </ul>
        <Savings savings={saving} transferSavings={transferSaving} />
      </div>

      <div className="main__graph">
        <Chart data={sourceObjs} />
        <Chart data={expenseObjs} />
      </div>

      <div className="main__section">
        <p>Current balance: {balance}</p>
        <form action="#">
          <label htmlFor="transfer-balance"> Transfer to saving account</label>
          <input type="number" min={0} onChange={onTransferChange} />
          <input type="reset" value="Transfer" onClick={transferBalance} />
        </form>
      </div>
    </div>
  );
}

export default MainSection;
