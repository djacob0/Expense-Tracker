import React, {useEffect, useState}from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar'
import './AddTransaction.css'
import swal from "sweetalert";


function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransaction] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    document.title="DJ Expense Tracker - Add Transaction"
    const storageUser = JSON.parse(localStorage.getItem('user' || '{}'));
    if (!storageUser) {
      swal({
        title: `Alert!`,
        text: 'Login is required.',
        icon: "warning",
        timer: 1500,
      }).then(() => {
        window.location.href = "/login";
      });
    }
  }, []); 

  const addTransaction = async() =>{

    if (!amount) {
      showToast("Amount is required", "alert", 4000);
      return;
    }
    if (!transactionType) {
      showToast("Transaction Type is required", "alert", 4000);
      return;
    }

    const user = JSON.parse(localStorage.getItem('user' || "{}"));

    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v2/transactions`,{
      user : user._id,
      amount,
      transactionType,
      category,
      description
    })
  if(response?.data?.data){
    swal({
      title: `Good Job `,
      text: "Your transaction added Successfully!",
      icon: "success",
    }).then(() => {
      window.location.href = "/showtransaction";
    });  
  }
  else{
    swal(response?.data?.data);
  }
  }


  return (
    <div>
      <Navbar/>
      <div className='form mx-auto mt-14'>
      {/* <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-md mt-10"> */}
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
      <form className="space-y-4">

        {/* Amount Input */}
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e)=>{
            setAmount(e.target.value);
          }}

          placeholder="Amount (₱)"
          className="w-full p-2 border rounded"
        />
        {
            console.log(amount)
        }
        {/* Transaction Type Input */}
        
        {/* radio buttons for credit and debit*/}
        <label className="block text-sm font-medium text-gray-700">Type of transaction:</label>

        <div className="flex items-center h-5">

          <input 
          id="credit" 
          name="transaction_type" 
          type="radio" 
          checked = {transactionType==='credit'}
          onChange={(e)=>{
            setTransaction('credit');
          }}
          className="focus:ring-indigo-500
          h-4 w-4 text-indigo-600 border-gray-300 cursor-pointer"
          required
          />
          
          <label htmlFor="credit" className="ml-3 block text-sm text-gray-900 cursor-pointer">Credit</label>{" "}

          <input 
          id="debit" 
          className="focus:ring-indigo-50
          h-4 w-4 text-indigo-600 border-gray-300 ms-5 cursor-pointer"
          name="transaction_type" 
          type="radio" 
          checked = {transactionType==='debit'}
          onChange={(e)=>{
            setTransaction('debit');
            required
          }}
          />

          <label htmlFor="debit" className="ml-3 block text-sm text-gray-900 cursor-pointer"> Debit</label>
        </div>

        {/* Category Input */}
        <select
          className="w-full p-2 border rounded"
          name="category"
          value={category}
          onChange={(e)=>{
            setCategory(e.target.value);
          }}
        >
         <option value="" disabled>Select Category Here</option>
          <option value="food">Food</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="freelancing">Freelancing</option>
          <option value="gift">Gift</option>
          <option value="salary">Salary</option>
          <option value="other">Other</option>
        </select>

        {/* Description Input */}
        <textarea
          name="description"
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value);
          }}
          placeholder="Description"
          className="w-full p-2 border rounded"
        ></textarea>

        {/* Submit Button */}
        <button 
        type="button" 
        className="form-add"
        onClick={addTransaction}
        >
          Add Transaction
        </button>
      </form>
    </div>

    </div>
  )
}

export default AddTransaction