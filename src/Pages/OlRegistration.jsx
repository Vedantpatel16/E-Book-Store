import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
// import {Navigate} from 'react-router-dom';
import {useEffect, useState} from "react";
// import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
// import Avatar from '@mui/material/Avatar';
// import {deepOrange, deepPurple} from '@mui/material/colors';
// import Popover from '@mui/material/Popover';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { Margin } from "@mui/icons-material";
import {Formik} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";


export const Registration = () => {
    const [name,setName] = useState("Dev");
    const [email,setEmail] = useState("devnkheradiya@gmail.com");
    const [open,setOpen] = useState(false); 
    const Navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [user,setUser]=useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
          console.log("User detail: ", res.data);
          setUser(res.data);
        });
      }, []);

    const initialValues ={
        fname :"",
        lname :"",
        email :"",
        password:""

    }

    const validationSchema=Yup.object().shape({
        "fname":Yup.string().min(3,"Please Make Sure you have Entered your name Atleast 3 characters long").required("please enter your first name"),
        "lname":Yup.string().min(3,"Please Make Sure you have Entered your name Atleast 3 characters long").required("please enter your last name"),
        "email":Yup.string().email("Please Enter Valid Email").required("please enter your email"),
        "password":Yup.string().min(10,"Password length must be 10 or greater than 10").required("please enter the password"),
      });

    const onFormSubmit = async (values) => {
    console.log("On the form submitted", values);

    const requestData = {
      userName: values.name,
      userEmail: values.email,
    };

    // call API to post submit the form
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", requestData);

    if (res.status === 201) {
      console.log(res.data.id);
      toast.success("API call is completted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
      if (res.status === 200) {
        toast.success("Data is deleted successfully", {
          position: "top-right",
          autoClose: 3000,
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
    const onHomePageButtonClick = () => {
        Navigate("/");
        console.log("Button clicked");
    };
    const handleClick = (event) => {
        console.log(123);
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        setOpen(false);
    };
    return ( 
        <>
        
         <div
         style={{
         padding: 10,
         rowGap: 10,
        //  display: 'flex',
         flexDirection: 'column'
     }}>
         <Formik 
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onFormSubmit}
         
         >
             {({values, errors,touched, isSubmitting, handleChange,handleBlur,handleSubmit})=>{
                return(
                  <form onSubmit={handleSubmit}>
                    <div
                    style={{textAlign: 'center', fontFamily:'Helvetica', color: '#E76161'}}>
                    <h1>Registration</h1>
                    <hr style={{width:400}}/>
                    </div>
                    
                  <div style={{
                    display:"flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'column',
                    marginBottom:5,
                    rowGap:10
                }}>
              
                    
                <TextField
                    type="text"
                    // value={name}
                    name="fname"
                    label="First Name"
                    color="secondary"
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    style={{
                        width:820,
                        margin:10,
                        }}
                    />
                    {errors.fname && touched.fname && 
                    <span style={{
                     color:'red',
                     fontSize:15,
                     marginBottom:5
                     }}>{errors.fname}</span>}
                     
                <TextField
                    type="text"
                    // value={name}
                    name="lname"
                    label="Last Name"
                    color="secondary"
                    onChange={handleChange}
                    onBlur={handleBlur} 
                    style={{
                        width:820,
                        margin:10,
                        }}
                    />
                    {errors.lname && touched.lname && 
                    <span style={{
                     color:'red',
                     fontSize:15,
                     marginBottom:5
                     }}>{errors.lname}</span>}
                    
                    
                    <TextField
                    type="email"
                    // value={email}
                    name="email"
                    label="Email"
                    color="secondary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        width:820,
                        margin:10
                    }}
                    />
                    {errors.email && touched.email && 
                    <span style={{
                     color:'red',
                     fontSize:15,
                    //  padding:10,
                    //  marginBottom:5
                     }}>{errors.email}</span>}
                    
                    
                    <TextField
                    type="text"
                    // value={email}
                    name="password"
                    label="Password"
                    color="secondary"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        width:820,
                        margin:10,
                        
                    }}
                    />
                    {errors.password && touched.password && 
                    <span style={{
                     color:'red',
                     fontSize:15,
                     marginBottom:5
                     }}>{errors.password}</span>}
                <Button variant="contained" className="button" type="submit"
                style={{
                    width:150,
                    padding:10,
                    margin:10
                }}
                > Submit</Button>
                </div>
                </form>
                )
             }}
        
         </Formik>
     </div>
     <div>
        {user.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <span>{item.body}</span>
          </div>
        ))}
      </div>
     </>
    );
};