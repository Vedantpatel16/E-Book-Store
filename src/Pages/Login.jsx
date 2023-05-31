import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import axios from 'axios';
import {toast} from 'react-toastify';
// import { Avatar } from "@mui/material";
// import { Popover } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './css/login.css';
import authService from '../service/authService';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const Navigate = useNavigate('');
	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Please Enter Valid Email')
			.required('Please Enter Email'),
		password: Yup.string()
			.min(8, 'Password Must be a 8 Characters Long')
			.required('Please Enter Password'),
	});
	// const onFormSubmit = (values, {setSubmitting}) => {
	// 	console.log('On Form Submit:', values);
	// 	setTimeout(() => {
	// 		alert(JSON.stringify(values, null, 2));
	// 		setSubmitting(false);
	// 	}, 400);
	// 	alert('Form Submitted Successfully');
	// };
	const onFormSubmit = (values, { setSubmitting }) => {
		authService.login(values).then((res)=>{
		  delete res._id;
		  delete res._v;
		//   authContext.setUser(res);
		  Navigate('/');
		  toast.success("Successfully Logged in...")
		});
		// Navigate('/');
	  }
	// const onFormSubmit = (values, { setSubmitting }) => {
	// 	fetch('https://book-e-sell-node-api.vercel.app/api/user/login', {
	// 	  method: 'POST',
	// 	  headers: {
	// 		'Content-Type': 'application/json',
	// 	  },
	// 	  body: JSON.stringify(values),
	// 	})
	// 	  .then((response) => response.json())
	// 	  .then((data) => {
	// 		
	// 		console.log(data);
	// 		if (data.success) {
	// 		  Navigate('/');
	// 		}
	// 	  })
	// 	  .catch((error) => {
	// 		console.error(error);
	// 	  })
	// 	  .finally(() => {
	// 		setSubmitting(false);
	// 	  });
	//   };
	  
	const NavigateHome = () => {
		Navigate('/');
		// alert('The login button is clicked...')
		console.log('Email:', email);
		console.log('Password', password);
	};
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
			className="center1 "
			key="3"
			color="text.primary"
			style={{
				textDecoration: 'none',
				fontSize: 18,
				color: '#f14d54',
			}}
		>
			Login
		</Typography>,
	];
	return (
		<>
			<div style={{padding: 5}}></div>
			<div>
				<div className="center1 ">
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
					<div className="center1">
						<h1 className="loginheader">Login or Create an Account</h1>
						<hr className="line" />
					</div>
				</div>
			</div>
			<div>
				<div className="side-by-side">
					<div className="loginpart">
						<div style={{fontSize: '20px', color: '#414141', paddingTop: 0}}>
							New Customer
						</div>
						<hr className="hr2" style={{opacity: '0.3'}} />
						<div style={{marginBottom: 10, width: '500px', marginLeft: 20}}>
							<p className="para">Registration free and easy.</p>
						</div>
						<div style={{marginBottom: 10}}></div>
						<ul style={{fontSize: '15px', color: '#212121'}}>
							<li>Faster Checkout</li>
							<li>Save Multiple Shipping Addresses</li>
							<li>View and Track Orders and move</li>
						</ul>
						<div style={{marginBottom: '130px'}}></div>
						<Button
							variant="contained"
							type="submit"
							className="btn"
							onClick={() => Navigate('/Registration')}
						>
							Create an Account
						</Button>
					</div>
					<div className="loginpart">
						<div style={{fontSize: '20px', color: '#414141'}}>
							Registered Customers
						</div>
						<hr className="hr2" style={{opacity: '0.3'}} />
						<div style={{marginBottom: 10}}>
							<p className="para">
								If you have an account with us,Please log in.
							</p>
						</div>
						<div style={{marginBottom: 10}}></div>
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
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												marginBottom: 5,
												rowGap: 10,
											}}
										>
											<div>
												<div className="label1">Email Address</div>
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
										</div>
										<div style={{margin: '20px'}}></div>
										<Button
											variant="contained"
											type="submit"
											disabled={isSubmitting}
											sx={{width: 100}}
										>
											Login
										</Button>
									</form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
};
export default Login;