import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {toast} from 'react-toastify';
import './css/registration.css';
import Footer from '../Footer';

const Registration1 = () => {
	const [name, setName] = useState("Dev");
	const [email, setEmail] = useState("devnkheradiya@gmail.com");
	const [roleId, setRoleId] = useState(0);
	const [role, setRole] = useState('');
    // const[roleId,setRoleId]=useState(0);
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const Navigate = useNavigate('');
	const selectedRoleId = undefined;

	const initialValues = {
		firstName: '',
		lastName: '',
		roleId:0,
		email: '',
		password: '',
	};
	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(3, 'First Name Must be 3 characters long...')
			.required('Please Enter Your First Name'),
		lastName: Yup.string()
			.min(3, 'Last Name must be 3 characters long...')
			.required('Please Enter Your Last Name'),
		email: Yup.string()
			.email('Please Enter Valid Email')
			.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'invalid email')
			.required('please Enter your Email ID'),
		password: Yup.string()
			.min(8, 'Password Must be 8 Characters Long...')
			.matches(/[a-zA-Z]/, 'Password Contains atleast one character')
			.required('Please Enter Your Password'),
		cpassword: Yup.string()
			.required('Please Enter Confirm Password')
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	});

	const onFormSubmit = (values, { setSubmitting }) => {
        const requestData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            roleId:values.roleId
        }
        console.log("On Form Submit:", values);
    
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        alert("Form Submitted Successfully....");
        axios.post('https://book-e-sell-node-api.vercel.app/api/user', requestData).then((res) => {
            if (res.status == 200) {
                console.log(res.data.id);
                toast.success('User Registered Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });

            }
        });

    }
	const NavigateHome = () => {
	    Navigate('/');
	    // alert('The login button is clicked...')
	    // console.log("Name:", name);
	    // console.log("Email:", email);
	}
	const handleClick = (event) => {
	    setAnchorEl(event.currentTarget);
	    setOpen(true);
	};

	const handleClose = () => {
	    setAnchorEl(null);
	    setOpen(false);
	};
	const breadcrumbs = [
		<Link
			color="inherit"
			href="/"
			style={{
				textDecoration: 'none',
				fontSize: 18,
			}}
			// onClick={handleClick}
		>
			Home
		</Link>,
		<Typography
			className="center "
			key="3"
			color="text.primary"
			style={{
				textDecoration: 'none',
				fontSize: 18,
				color: '#f14d54',
			}}
		>
			Create an Account
		</Typography>,
	];
	return (
		<>
			<div style={{padding: 5}}></div>
			<div>
				<div className="center ">
					<Breadcrumbs
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							paddingTop: '20px',
						}}
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						{breadcrumbs}
					</Breadcrumbs>
				</div>
				<div>
					<div className="center">
						<h1 className="loginheader">Login or Create an Account</h1>
						<hr className="line" style={{bgcolor: '#f14d54'}} />
					</div>
				</div>
				<div
					style={{
						textAlign: 'left',
					}}
				>
					<h3 style={{}}>Personal Information</h3>
					<hr className="hr1" style={{opacity: '0.3'}} />
					<p className="paraStyle">
						Please enter the following information to create your account.
					</p>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onFormSubmit}
					>
						{({
							value,
							errors,
							touched,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => {
							return (
								<form onSubmit={handleSubmit}>
									<div className="side-by-side">
										<div>
											<div className="label1">First Name</div>
											<TextField
												type="text"
												placeholder="firstName"
												name="firstName"
												style={{width: '500px'}}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											{errors.fname && touched.fname && (
												<div
													style={{
														color: 'red',
														fontSize: 15,
														marginBottom: 5,
													}}
												>
													{errors.fname}
												</div>
											)}
										</div>
										<div>
											<div className="label">Last Name </div>
											<TextField
												type="text"
												placeholder="lastName"
												name="lastName"
												style={{width: '500px', paddingLeft: 10}}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
											{errors.lname && touched.lname && (
												<div
													style={{
														color: 'red',
														fontSize: 15,
														marginBottom: 5,
													}}
												>
													{errors.lname}
												</div>
											)}
										</div>
									</div>

									<div style={{padding: 5}}></div>
									<div className="side-by-side">
										<div>
											<div className="label1">Email </div>
											<TextField
												type="email"
												placeholder="Email"
												style={{width: '500px'}}
												onChange={handleChange}
												name="email"
												onBlur={handleBlur}
											/>
											{errors.email && touched.email && (
												<div
													style={{
														color: 'red',
														fontSize: 15,
														marginBottom: 5,
													}}
												>
													{errors.email}
												</div>
											)}
										</div>

										<div>
											<div className="label">Role</div>
											<Select
												name="roleId"
												// value={roleId}
												id={"roleId"}
												value={selectedRoleId || ''}
											
												style={{width: '500px', marginLeft: 10}}
												onChange={handleChange}
                                                onBlur={handleBlur}
											>
												<MenuItem value='1'></MenuItem>
                                               <MenuItem value='2'>Buyer</MenuItem>
                                               <MenuItem value='3'>Seller</MenuItem>
											</Select>
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											marginBottom: 5,
											rowGap: 10,
										}}
									>
										<div>
											<h3>Login Information</h3>
											<hr className="hr1" style={{opacity: '0.3'}} />
										</div>
										<div className="side-by-side">
											<div>
												<div className="label1">Password</div>
												<TextField
													type="password"
													placeholder="Password"
													style={{width: '500px'}}
													onChange={handleChange}
													name="password"
													onBlur={handleBlur}
												/>
												{errors.password && touched.password && (
													<div
														style={{
															color: 'red',
															fontSize: 15,
															marginBottom: 5,
														}}
													>
														{errors.password}
													</div>
												)}
											</div>
											<div>
												<div className="label">Confirm Password</div>
												<TextField
													type="password"
													placeholder="Confirm Password"
													onChange={handleChange}
													style={{width: '500px', paddingLeft: 10}}
													name="cpassword"
													onBlur={handleBlur}
												/>
												{errors.cpassword && touched.cpassword && (
													<div
														style={{
															color: 'red',
															fontSize: 15,
															marginBottom: 5,
														}}
													>
														{errors.cpassword}
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="btn" style={{marginBottom: '20px'}}>
										<Button variant="contained" type="submit">
											Register
										</Button>
									</div>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
			<Footer/>
		</>
	);
};

export default Registration1;