import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../styles.css";

const Tracker = () => {
  const [history, setHistory] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(Date.toLocaleString(""));
  const amounts = history.map((el) => Number(el.amount));

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  const balance = (income - expense).toFixed(2);
  useEffect(() => {
    getDate();
  }, []);
  const getDate = () => {
    let today = new Date();
    setDate(today);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setHistory([...history, { id: date, text: text, amount: amount }]);
    setAmount("");
    setText("");
  };
  useEffect(() => {
    const newHistory = JSON.parse(sessionStorage.getItem("saved-data"));
    if (newHistory) {
      setHistory(newHistory);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem("saved-data", JSON.stringify(history));
    });
  }, [history]);
  const handleDelete = (id) => {
    setHistory(history.filter((el) => el.id !== id));
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Expense Tracker</h2>
        <h3>YOUR BALANCE</h3>
        <h1>${balance}</h1>
        <div className="flex">
          <div>
            <h3>INCOME</h3>
            <h3>${income}</h3>
          </div>
          <div>
            <h3>EXPENSE</h3>
            <h3>${expense}</h3>
          </div>
        </div>
        <h3 className="history">History</h3>
        <ul className="list">
          {history.map((el) => (
            <div className="list-flex" key="el.id">
              <button onClick={() => handleDelete(el.id)} className="deleteBtn">
                X
              </button>
              <li key={el.id} className="list-item">
                {el.text} <span>{el.amount}</span>{" "}
              </li>
            </div>
          ))}
        </ul>
        <h3 className="transaction">Add new transaction</h3>
        <p className="text">Text</p>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
          placeholder="Enter text..."
        />
        <p className="amount">Amount</p>
        <span>(negative-expense,positive-income)</span>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
          type="number"
          placeholder="Enter amount..."
        />
        <button className="btn" type="submit">
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default Tracker;
