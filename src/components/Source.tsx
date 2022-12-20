import React from "react";

import "../sass/_source.scss";

import {
  EventOnChange,
  IncomeObj,
  ListIncomeType,
  onChnageType,
  SourceHandlerType,
} from "../types/Source";


// key is index which should be fine since when only remove or added elements
// at the end of the list (could use uuid instead)
export function listIncomeSources(data :ListIncomeType) {
  function Delete(id: string, index:number){
      const new_array = data.sourceObjs.filter(obj=> obj.id !== id)
      data.setBalance(data.balance - data.sourceObjs[index].amount)
      data.SetsourceObjs(new_array)
  }

  return data.sourceObjs.map((obj, index) => {
    return (
      <li key={obj.id}>
        {obj.source}: {obj.amount}EUR on {obj.date}
        <span>
          <button onClick={(e)=> Delete(obj.id, index)} disabled={data.balance - obj.amount < 0}> D </button>
          <button onClick={(e)=> data.Edit_Income(obj.id)}> E </button>
        </span>
      </li>
    );
  });
}

export function checkSource(sourceObj: IncomeObj): boolean {
  const { source, amount, date } = sourceObj;
  const date_check = date.split("-");
  let years = date_check[0];

  if (source === "" || amount < 0 || years < "1930" || years > "2023") {
    alert("wrong Income entry")
    return false;
  }
  return true;
}

function IncomeSource(props: onChnageType) {
  return (
    <div className="main__source__income">
      <label htmlFor="income-source">Income Source</label>
      <select name="source" id="income-source" onChange={props.onChangeHandler}>
        <option value="">--Choose an option--</option>
        <option value="Salary">Salary</option>
        <option value="Inheritance">Inheritance</option>
        <option value="Bonuses">Bonuses</option>
        <option value="Rental">Rental Properties</option>
        <option value="Investment">Investment</option>
      </select>
    </div>
  );
}

function IncomeAmount(props: onChnageType) {
  return (
    <div className="main__source__amount">
      <label htmlFor="amount-income">Amount of income</label>
      <input
        type="number"
        onChange={props.onChangeHandler}
        id="amount-income"
        name="amount"
        min={0}
      />
    </div>
  );
}

function IncomeDate(props: onChnageType) {
  return (
    <div className="main__source__Date">
      <label htmlFor="date">Date of income</label>
      <input
        type="date"
        id="date-income"
        name="date"
        placeholder="dd.mm.yyyy"
        min="01-01-1997"
        max="12-12-2023"
        onChange={props.onChangeHandler}
      />
    </div>
  );
}

function Source(props: SourceHandlerType) {
  return (
    <div className="main__source">
      <IncomeSource
        onChangeHandler={(e: EventOnChange) => props.onChangeHandler(e)}
      />
      <IncomeAmount
        onChangeHandler={(e: EventOnChange) => props.onChangeHandler(e)}
      />
      <IncomeDate
        onChangeHandler={(e: EventOnChange) => props.onChangeHandler(e)}
      />
      <div className="main_source_btn">
        <button onClick={props.onClickAddHandler}> Add Income </button>
        <button onClick={props.onClickRemoveHandler}> Remove Income</button>
      </div>
    </div>
  );
}

export default Source;
