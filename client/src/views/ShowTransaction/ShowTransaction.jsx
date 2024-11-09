import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import editImg from './edits.png';
import deleteImg from './deletes.png';
import swal from "sweetalert";


function ShowTransaction() {
  const [userName, setUserName] = useState({});
  const [myTransactions, setMyTransactions] = useState([]);
  const [creditSum, setCreditSum] = useState("");
  const [debitSum, setDebitSum] = useState("");

  let totalCredit = 0;
  let totalDebit = 0;

  const CATEGORY_EMOJI_MAP = {
    food: "Food 🍽️",
    education: "Education 📚",
    entertainment: "Entertainment 🎥",
    travel: "Travel ✈️",
    shopping: "Shopping 🛍️",
    freelancing: "Freelancing 👩🏻‍💻",
    gift: "Gift 🎁",
    salary: "Salary 💰",
    other: "🤷‍♀️",
  };

  const loadTransactionData = async () => {
    const userID = userName._id;
    console.log(userID);
    if (!userID) {
      return;
    }

    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/transaction/user/${
        userName._id
      }`
    );

    const transactionData = response?.data?.data;
    // console.log(transactionData);

    transactionData.forEach((transaction) => {
      if (transaction.transactionType === "credit") {
        totalCredit += transaction.amount;
      } else {
        totalDebit += transaction.amount;
      }
    });

    setCreditSum(totalCredit);
    setDebitSum(totalDebit);

    setMyTransactions(transactionData);
  };

  useEffect(
    () => {
      loadTransactionData();
    },
    [userName],
    [myTransactions]
  );

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user" || "{}"));
    if (storageUser) {
      setUserName(storageUser);
    } else {
      swal({
        title: `Alert!`,
        text: "Login is required.",
        icon: "warning",
        timer: 1500,
      }).then(() => {
        window.location.href = "/login";
      });
    }
  }, []);

  const deleteTransition = async (_id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/transactions/${_id}`
    );
    if (response?.data?.message) {
      loadTransactionData();
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-4xl font-extrabold my-5 font-mono text-black-900">
        All Transactions
      </h1>
      <div
        className="text-center mt-2 border w-52 mx-auto bg-white rounded-md py-2 px-4"
        style={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>
        <h2 className="font-bold">
          <span className="text-green-500">Credit Sum : </span>{" "}
          <span className="text-green-500">{creditSum}</span>{" "}
        </h2>
        <div className="border-b border border-black-900"></div>
        <h2 className="font-bold">
          <span className="text-green-500">Debit Sum : </span>{" "}
          <span className="text-red-500">- {debitSum} </span>
        </h2>
      </div>

      {myTransactions?.map((transaction, index) => {
        const {
          _id,
          amount,
          transactionType,
          category,
          description,
          createdAt,
          updatedAt,
        } = transaction;

        const date = new Date(createdAt).toLocaleDateString();
        const time = new Date(createdAt).toLocaleTimeString();

        return (
          <div key={index} className="p-3">
            <div
              className="border lg:w-4/6 sm:w-96 mx-auto p-5 px-5 bg-white rounded-md relative"
              style={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.2)" }}>
              <div
                className={`font-extrabold font-mono lg:text-base sm:text-sm, mt-4  ${
                  transactionType === "debit"
                    ? "text-red-500"
                    : "text-green-500"
                }`}>
                {transactionType === "debit" ? "-" : "+"}
                {amount}
                {"  "}
                <span
                  className={`font-extrabold font-mono ${
                    transactionType === "debit"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}>
                  {transactionType === "debit" ? "debited" : "credited"}
                </span>{" "}
                <span className="text-black">
                  on {date} at {time}
                </span>
              </div>

              <p className="leading-5 absolute right-4 top-2">
                {CATEGORY_EMOJI_MAP[category]}
              </p>
              <div className="border my-2"></div>
              <div>
                <p>{description}</p>
              </div>

              {/* Delete Image */}
              <img
                src={deleteImg}
                alt="delete"
                className="h-7 absolute right-2 bottom-2 cursor-pointer b-border border-green-500 border-2 p-1 rounded-md shadow-sm"
                onClick={() =>  swal({
                  title: "Are you sure to delete your transaction permanently?",
                  text: "After deletion, this transaction cannot be recovered.",
                  icon: "warning",
                  buttons: true,
                  successMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    deleteTransition(_id);
                  } else {
                    swal("Don't worry, your transaction is secure!");
                  }
                })
              }
              />

              {/* Edit Image */}
              <a href={`/update_translations/${_id}`} target="blank">
                <img
                  src={editImg}
                  alt="editPng"
                  className="h-7 absolute right-11 bottom-2 cursor-pointer b-border border-green-500 border-2 p-1 rounded-md shadow-sm "
                  onClick={() => { swal({
                      icon: "info",
                      title: "Are you sure you want edit transition ?",
                      buttons: ["Cancel", "Yes"],
                    }).then((userConfirmed) => {
                      if (userConfirmed) {
                        // User clicked "Yes", proceed with edit Transition
                        window.location.href = `update_translations/${_id}`;
  
                        editTransition(_id);
                      } else {
                        // User clicked "Cancel"
                        swal("Ok no ploblem ");
                      }
                    });
                  }}
                />{" "}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowTransaction;
