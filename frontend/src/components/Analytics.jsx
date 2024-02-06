import React from "react";
import { Progress }from 'antd'

const Analytics =({allTransactions})=>{
    //categorywise 
    const categories = ['salary' , 'rent' , 'bike', 'petroleum','food', 'order','hospital','recharge', 'other'];



    //total transactions
    const totalTransaction = allTransactions.length;
    const totalIncomeTransaction = allTransactions.filter(transaction =>transaction.type==='income');
    const totalExpenseTransaction = allTransactions.filter(transaction =>transaction.type==='expense');
    const totalIncomePercent = (totalIncomeTransaction.length/totalTransaction)*100;
    const totalExpensePercent = (totalExpenseTransaction.length/totalTransaction)*100;

    //total turnover
    const totalTurnover =allTransactions.reduce((acc , transaction)=>acc+transaction.amount , 0);
    const totalIncome = allTransactions.filter(transaction=>transaction.type==='income').reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalExpense = allTransactions.filter(transaction=>transaction.type==='expense').reduce((acc,transaction)=>acc+transaction.amount,0);
    const totalIncomePercentTurnOver =(totalIncome/totalTurnover)*100;
    const totalExpensePercentTurnOver =(totalExpense/totalTurnover)*100;




    return(
        <>
            <div className="row m-3">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Total Transactions : {totalTransaction}
                        </div>
                        <div className="card-body">
                            <h5 className="text-success">Income Transactions :{totalIncomeTransaction.length}</h5>
                            <h5 className="text-danger">Expense Transactions : {totalExpenseTransaction.length}</h5>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomePercent.toFixed(0)}/>
                            <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpensePercent.toFixed(0)}/>

                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Total Turnover : { totalIncome> totalExpense ? <h5 className="text-success">+{totalTurnover} </h5> :<h5 className="text-danger">-{totalTurnover} </h5> }
                        </div>
                        <div className="card-body">
                            <h5 className="text-success">Income  :{totalIncome}</h5>
                            <h5 className="text-danger">Expense  : {totalExpense}</h5>
                            <Progress type="circle" strokeColor={'green'} className="mx-2" percent={totalIncomePercentTurnOver.toFixed(0)}/>
                            <Progress type="circle" strokeColor={'red'} className="mx-2" percent={totalExpensePercentTurnOver.toFixed(0)}/>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                    <h4>Categorywise Income</h4>
                    {categories.map(category  =>{
                        const amount =allTransactions.filter(transaction =>transaction.type==='income' && transaction.category ===category).reduce((acc, transaction)=>acc+transaction.amount,0);
                        return(
                            amount > 0 &&
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncome)*100).toFixed(0)}/>
                                    <h6>Amount:{amount}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-4">
                    <h4>Categorywise Expense</h4>
                    {categories.map(category  =>{
                        const amount =allTransactions.filter(transaction =>transaction.type==='expense' && transaction.category ===category).reduce((acc, transaction)=>acc+transaction.amount,0);
                        return(
                            amount > 0 &&
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpense)*100).toFixed(0)}/>
                                    <h6>Amount:{amount}</h6>

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default Analytics