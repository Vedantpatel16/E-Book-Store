import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import { TextField } from "@mui/material";
import { Avatar, Popover} from "@mui/material";
import {Formik} from "formik";
import  * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";



export const Apple = () => {
     //const [ name,setName]= useState("nidhi");
    // const [ email,setEmail]= useState("nidhi@test.com");
     const [ open,setOpen]= useState(false);
     const [ anchorEl, setAnchorEl]= useState(null);
     const Navigate = useNavigate();

     useEffect(() => {
         // console.log("The new value of name: ",name);
         // return () => {
          //console.log("The old value of name: ",name);
          //};
     }, []);

     const validationSchema = Yup.object().shape({
          name: Yup.string().min(3,"Please enter name with atleats 3 characters")
          .required("Please enter your name"),
          email:Yup.string().email("Please enter valid email")
          .required("Please enter your email"),
     });

     const initialValues= {
          name:"",
          email:"",
     }

     const onFormSubmit = (values) => {
          console.log("on the form submitted",values);

     const requestData = {
     userName: values.name,
     userEmail: values.email,
     };
     //call api to post submit the form
     axios.post("https://jsonplaceholder.typicode.com/posts",requestData).then((res) => { 
     if(res.status === 201){
          console.log(res.data.id);
     toast.success("API call is completed successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
     }
     });
     };
     const handleClick = (event) => {
          console.log(123);
          setAnchorEl(event.currentTarget);
          setOpen(true);
     };
     const handleClose = () => {
          setAnchorEl(null);
          setOpen(false);
     };


     
     return(

     <div style={{padding: 5,}}> 
    {/* <div>Apple Page</div>*/}
    <div style={{
           display: "flex",
           justifyContent:"flex-end",
           cursor:"pointer",
               }}
               
      >
          <div onClick= {handleClick}
          style={{
               display:"flex",
               justifyContent:"flex-end",
               alignItems:"center",
               columnGap: 5,
          }}>
    <Avatar sx={{ bgcolor: "blue"}}>VP</Avatar>
    <span>Vedant Patel</span>
    </div>
    </div>

     <div style={{padding: 5,
          display: "flex",
          flexDirection:"column",
          rowGap:5}}>
     
     <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}>

          {({ value, errors, touched, handleChange,handleBlur,handleSubmit }) => (
                       
           <form onSubmit={handleSubmit}>
               <div style={{
                    display:"flex",
                    flexDirection: "column"
               }}>
          <TextField variant="outlined" type="text" label="Name" id="name" placeholder="Name" 
          onChange={handleChange} onBlur={handleBlur}/>

          {touched.name && errors.name && <span style={{
                                                       padding: 5,
                                                       color:"red",
                                                       fontSize: 16 }}>{errors.name}</span> }
          </div>

          <div style={{
                    display:"flex",
                    flexDirection: "column"
               }}>

          <TextField variant="outlined"type="email" label="Email" id="email" placeholder="email"
           onChange={handleChange} onBlur={handleBlur}/> 

          {console.log("Email validation:",errors)}
          {touched.email && errors.email && <span style={{
                                                       padding: 5,
                                                       color:"red",
                                                       fontSize: 16 }}>{errors.email}</span> }    
          </div> 

          {/*<button onClick={onHomePageButtonClick}>Navigate to homepage</button>*/}
          <Button variant="contained" type="submit" className="">SUBMIT</Button>

          </form>
           )}
     
      
     </Formik>
     </div>

     
 {/*<Popover 
open={open}

  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
  transformOrigin={{vertical: 'top', horizontal: 'left',}}

     anchorEl= {anchorEl}
     onClose={handleClose}
>
  <div style={{
     padding: 5,
  }}>
  <Button variant="contained" onClick={onHomePageButtonClick }className="">Logout</Button>
  </div>
</Popover>*/}

     </div>
     
     );
     };
