import React, { useState } from "react";
import {
  EventOnChange,
  ExpenseObj,
  ListExpenseType,
  onChnageType,
  SourceHandlerType,
} from "../types/Expense";

import "../sass/_expense.scss";
import Chart from "./Graphs";

export function listExpenseSources(data :ListExpenseType) {

    function Delete(id: string, index:number){
      const new_array = data.expenseObjs.filter(obj=> obj.id !== id)
      data.setBalance(data.balance + data.expenseObjs[index].amount)
      data.SetexpenseObjs(new_array)
  }

  return data.expenseObjs.map((obj, index) => {
    return (
      <li key={obj.id}>
        {obj.source}: {obj.amount}EUR on {obj.date}
        <span>
          <button onClick={(e)=> Delete(obj.id, index)}> D </button>
          <button onClick={(e)=> data.Edit_Expenses(obj.id)}> E </button>
        </span>
      </li>
    );
  });
}

export function checkExpense(expObj: ExpenseObj): boolean {
  const { source, amount, date } = expObj;
  const date_check = date.split("-");
  let years = date_check[0];
  if (source === "" || amount < 0 || years < "1930" || years > "2023") {
    alert("wrong Expense entry")
    console.log("here")
    return false;
  }
  return true;
}

function ExpenseSource(props: onChnageType) {
  return (
    <div className="main__expense__income">
      <label htmlFor="expense-source">Income Source</label>
      <select
        name="source"
        id="expense-source"
        onChange={props.onChangeExpeHandler}
      >
        <option value="">--Choose an option--</option>
        <option value="Phone bill">Phone bill</option>
        <option value="Rent">Rent</option>
        <option value="Groceries">Groceries</option>
        <option value="Electricity bill">Electricity bill</option>
        <option value="Insurance">Insurance</option>
      </select>
    </div>
  );
}

function ExpenseAmount(props: onChnageType) {
  return (
    <div className="main__expense__amount">
      <label htmlFor="amount-expense">Amount of income</label>
      <input
        type="number"
        onChange={props.onChangeExpeHandler}
        id="amount-expense"
        name="amount"
        min={0}
      />
    </div>
  );
}

function ExpenseDate(props: onChnageType) {
  return (
    <div className="main__expense__Date">
      <label htmlFor="date">Date of income</label>
      <input
        type="date"
        id="date-expense"
        name="date"
        placeholder="dd.mm.yyyy"
        min="01-01-1997"
        max="12-12-2023"
        onChange={props.onChangeExpeHandler}
      />
    </div>
  );
}

function Expense(props: SourceHandlerType) {
  return (
    <div className="main__expense">
      <ExpenseSource
        onChangeExpeHandler={(e: EventOnChange) => props.onChangeExpeHandler(e)}
      />
      <ExpenseAmount
        onChangeExpeHandler={(e: EventOnChange) => props.onChangeExpeHandler(e)}
      />
      <ExpenseDate
        onChangeExpeHandler={(e: EventOnChange) => props.onChangeExpeHandler(e)}
      />
      <div className="main_expense_btn">
        <button onClick={props.onClickAddExpHandler}> Add Expense </button>
        <button onClick={props.onClickRemoveExpHandler}> Remove Expense</button>
      </div>
    </div>
  );
}

export default Expense;
