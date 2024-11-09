import React, {useEffect, useState}from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar'
import './UpdateTransaction.css'
import { useParams } from "react-router-dom";
import swal from "sweetalert";


function UpdateTransaction() {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransaction] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();

  const loadTransaction = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/transactions/${id}`
    );
    const {
      amount: amount,
      transactionType: transactionType,
      category: category,
      description: description,
    } = response?.data?.data;
    setAmount(amount);
    setTransaction(transactionType);
    setCategory(category);
    setDescription(description);
  };
  useEffect(() => {
    loadTransaction();
  }, []);


  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user' || '{}'));
    if (!storageUser) {
      alert('Before you proceed, log in is required 🤪');
      window.location.href = '/login';
    }
  }, []); 

  const updateTransaction = async() =>{

    if (!amount) {
      showToast("Amount is required", "alert", 4000);
      return;
    }
    if (!transactionType) {
      showToast("Transaction Type is required", "alert", 4000);
      return;
    }
    const updateDetails = {
      amount: amount,
      transactionType: transactionType,
      category: category,
      description: description,
    };

    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/transactions/${id}`,
      updateDetails
    );
    if (response?.data?.message) {
      swal({
        title: ` Success`,
        text: "Your transations have been Updated Successfully.",
        icon: "success",
      }).then(() => {
        window.location.href = "/showtransaction";
      });
    }
  }


  return (
    <div>
      <Navbar/>
      <div className='form mx-auto mt-14'>
      {/* <div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-md mt-10"> */}
      <h2 className="text-2xl font-semibold mb-4">  Update Transaction</h2>
      <form className="space-y-4">

        {/* Amount Input */}
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e)=>{
            setAmount(e.target.value);
          }}

          placeholder="Amount (₹)"
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
        onClick={updateTransaction}
        >
          Update Transaction
        </button>
      </form>
    </div>

    </div>
  )
}

export default UpdateTransaction