import React ,{useState , useEffect} from 'react'
import {Form, Input, Modal, Select, Table, message , DatePicker}from 'antd'
import {UnorderedListOutlined, AreaChartOutlined} from '@ant-design/icons'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner';
import moment from 'moment'
import Analytics from '../components/Analytics'

const{RangePicker}=DatePicker;

const HomePage = () => {
  const [showModal ,setShowModal]=useState(false);
  const [loading , setLoading]=useState(false);
  const [allTransactions ,setAllTransactions]=useState([]);
  const [frequency , setFrequency]=useState('7');
  const [selectedDate , setSelectedDate]=useState([]);
  const [type , setType]=useState('all');
  const[viewData , setViewData]=useState('table');
  const[editable , setEditable]=useState(null);

 
  //table data
  const columns = [
    {
      title:"Date",
      dateIndex:'date',
      key:'date'
    },
    {
      title:"Amount",
      dateIndex:'amount',
      key:'amount',

    },
    {
      title:"Type",
      dateIndex:'type',
      key:'type',

    },
    {
      title:"Category",
      dateIndex:'category',
      key:'category',

    },
    {
      title:"Reference",
      dateIndex:'refrence',
      key:'refrence',

    },
    {
      title:"Description",
      dateIndex:'description',
      key:'description',

    },
    {
      title:"Actions",
      key:'actions'
    }
  ]

  //useeffect hok for getting trnsactions info
  useEffect(()=>{
     //get all transactions
  const getAllTransactions = async()=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('transactions/get-transactions',{userid:user._id, frequency , selectedDate ,type});
      setLoading(false);
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Error while getting your trsactions Info !")
    }
  }
    getAllTransactions();
  },[frequency , selectedDate , type])


// delete handler 
  const handleDelete=async (record)=>{
    try {
      setLoading(true)
      await  axios.post('transactions/delete-transaction',{transactionId:record._id});
      setLoading(false);
      message.success("Delete Successfully !!")

    } catch (error) {
      setLoading(false);
      message.error('Unable to Delete !!')
      console.log(error);
    }
  }


  //form handling
  const handleSubmit =async(values)=>{
    try {
      const user =JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if(editable){
        await axios.post('/transactions/edit-transaction',{
          payload:{
            ...values,
            userId:user._id 
          },
          transactionId:editable._id
        });
        setLoading(false)
        message.success('Transaction Updated Successfully !!');

      }
      else{
        await axios.post('/transactions/add-transaction',{...values,userid:user._id});
        setLoading(false)
        message.success('Transaction Added Successfully !!');
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
      
    }
  }
  return (
    <Layout>
      {loading && <Spinner/>}
        <div className="filters">
          <div >
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=>{setFrequency(values)}}>
              <Select.Option value='7'>Last 1 week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>

            </Select>
            {frequency==='custom' && <RangePicker value={selectedDate} onChange={(values)=>{
              setSelectedDate(values)
            }}/>}
          </div>
          <div >
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=>{setType(values)}}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          
          </div>
          <div className='switch_icons'>
              <UnorderedListOutlined className={`mx-2 ${viewData==='table' ? 'active_icon':'inactive_icon'}`} onClick={()=>setViewData('table')}/>
              <AreaChartOutlined className={`mx-2 ${viewData==='analytics' ? 'active_icon':'inactive_icon'}`}  onClick={()=>setViewData('analytics')}/>
            </div>
          <div>
           
            <button className='btn btn-primary ' onClick={()=>setShowModal(true)}>Add New</button>
          </div>
        </div>
        <div className="content">
          {viewData==='table' ?  <table className="table table-striped table-hover">
     <thead>
       <tr>
         <th scope="col">Date</th>
         <th scope="col">Amount</th>
         <th scope="col">Type</th>
         <th scope="col">Category</th>
         <th scope="col">Reference</th>
         <th scope="col">Description</th>
         <th scope="col">Action</th>
       </tr>
     </thead>
     <tbody>
       {allTransactions.map((transaction) => (
         <tr key={transaction._id}>
           <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
           <td>{transaction.amount}</td>
           <td>{transaction.type}</td>
           <td>{transaction.category}</td>
           <td>{transaction.refrence}</td>
           <td>{transaction.description}</td>
           <td>
             
             <button className="mx-2 btn btn-sm btn-warning" onClick={()=>{
              const record = transaction
              setShowModal(true)
              setEditable(record)
              console.log('edit :', record);
              }}>Edit</button>
             <button className=" btn btn-sm btn-danger" onClick={()=>{
              const record = transaction
              handleDelete(record)}}>Delete</button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
    : <Analytics allTransactions={allTransactions}/>}
          {/* <Table columns={columns} dataSource={allTransactions}  rowKey={allTransactions.createdAt}/> */}
         
        </div>
        <Modal title={editable?"Edit Transaction":"Add Transaction"} open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
            <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
              <Form.Item label='Amount' name="amount">
                <Input type='Number' placeholder='Enter Your Amount Here:'/>

              </Form.Item>
              <Form.Item label='type' name="type">
                <Select>
                  <Select.Option value='income'>Income</Select.Option>
                  <Select.Option value='expense'>Expense</Select.Option>

                </Select>

              </Form.Item>
              <Form.Item label='Category' name="category">
              <Input type='string' placeholder='(salary /rent /bike/ petroleum/ food/ recharge/ order/ hospital/ other)'/>
              </Form.Item>
              <Form.Item label='Date' name="date">
              <Input type='date' placeholder='Enter Date of income/expense  Here:'/>
              </Form.Item>
              <Form.Item label='Rafrence' name="refrence">
              <Input type='string' placeholder='Enter reference of income/expense  Here:'/>
              </Form.Item>
              <Form.Item label='Description' name="description">
              <Input type='string' placeholder='Enter Description of income/expense  Here:'/>
              </Form.Item>

              <div className="d-flex justify-content-end">
                <button type='submit' className='btn btn-primary'>SAVE </button>
              </div>

            </Form>
        </Modal>
    </Layout>
  )
}



export default HomePage