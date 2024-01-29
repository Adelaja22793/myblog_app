"use client"
import React, { useEffect, useState } from "react"
import land from '/src/backvector.jpg'
import logo from '/src/logo.png'
import { Roboto_Flex } from "next/font/google"
import '/src/style.css'
import { redirect, useRouter } from "next/navigation"
import { loginFormSchema } from "@/app/lib/validations/form"
import Link from "next/link"

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    realname: "",
    phoneNumber: "",
    email: ""
  });
  const router = useRouter()
  // const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    realname: "",
    phoneNumber: "",
    email: ""
  }); 
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => { 
    validateForm(); 
  }, [formData.userName, formData.password, formData.phoneNumber, formData.email, formData.realname]); 
  const validateForm = () => { 
    let errors = {email: '', password: '', userName: '', phoneNumber: '', realname: ''}; 
    
    if (formData.password.length < 6) { 
      errors.password = 'Password must be at least 6 characters.'; 
    } 
    if (!formData.email) { 
        errors.email = ''; 
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { 
        errors.email = 'Email is invalid.'; 
    } 
    setErrors(errors); 
    setIsFormValid(Object.keys(errors).length === 0); 
  };

  const submitForm = (e:any) => {
    e.preventDefault()
    //const validatedData = loginFormSchema.parse({formData: formData.userName, formData1: formData.password })
    
      const formURL = 'https://localhost:7001/api/Authenticate/Login'
      const data = {
        name: formData.realname,
        email: formData.email,
        user: formData.userName,
        pass: formData.password,
        phoneNum: formData.phoneNumber
      };

      const requestOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(validatedData),
        body: JSON.stringify({
          "userName": data.user,
          "password": data.pass,
          "email": data.email,
          "realname": data.name,
          "phoneNumber": data.phoneNum
        }),
      };

      // POST the data to the URL of the form
      fetch(formURL, requestOptions)
      .then((res) => {
        if (!res.ok) {
          //throw new Error('')
          setFormSuccessMessage('Connection failed')
        }
        return res.json();
      })
      .then(data => {
        var mess = data.message;
        if (mess == "Success")
        router.push('/form/dashboard', { scroll: false })
        else
        setFormSuccessMessage(data.message)
      }).then(() => {
          setFormData({ 
            userName: "", 
            password: "",
            email: "",
            realname: "",
            phoneNumber: ""
          })
        })
      .catch(e => setFormSuccessMessage('Connection failed'));
  }
 
  // const myStyle = {
  //   height: "100vh",
  //   marginTop: "-70px",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // };

  return (
    <div>
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img src={land.src} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1520" />
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-xl sm:px-10 w-9/14">
          <div className="mx-auto max-w-md">
            <div style={{display: "flex", alignItems: "center", marginBottom: 10}}>
              <img src={logo.src} className="h-11" alt="Tailwind Play" /> 
              <p style={{fontFamily: "sans-serif", fontWeight: "bold"}}>Pepsi Academy Club</p>
            </div>
            {formSuccessMessage && (
                <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 ...">{formSuccessMessage}</div>
            ) }
            <br />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <form>
                <div className="flex flex-wrap -mx-4 mb-0">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Real Name
                        </label>
                        <input placeholder="Enter Real Name" className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" type="text" />
                        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Email
                        </label>
                        <input placeholder="Enter Email" className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" type="text" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4 mb-4">
                    <div className="w-full px-3 mb-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            UserName
                        </label>
                        <input value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" name="username" type="text" placeholder="Username" required />
                        {errors.userName && <p style={{color: 'red'}}>{errors.userName}</p>} 
                    </div>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Phone Number
                        </label>
                        <input type="tel" value={formData.phoneNumber} placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" name="phoneNumber" required />
                        {errors.phoneNumber && <p style={{color: 'red'}}>{errors.phoneNumber}</p>} 
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Password
                        </label>
                        <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" name="password" placeholder="******************" required />
                        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>} 
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Confirm Password
                        </label>
                        <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white" name="password" placeholder="******************" required />
                        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>} 
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" 
                    style={{ opacity: isFormValid ? 1 : 0.5 }}
                    disabled={!isFormValid}>
                    Sign In
                  </button>
                  
                  <Link href="/form/forgotpassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</Link>

                  {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a> */}
                </div>
                <div style={{ textAlign: 'center' }}>
                <Link href="/form/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Create Account?</Link>
                </div>
              </form>
            </div>
            <p className="text-center text-gray-500 text-xs">
              &copy;2023 Acme Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

