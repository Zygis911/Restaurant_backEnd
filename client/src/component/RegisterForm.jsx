import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import  { registerUser } from '../api/userApis'


function RegisterForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm()
  
    const [ serverError, setServerError ] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate();

    const onSubmit =  async (data) => {
        if(data.password !== data.repeatPassword) {
            setError('repeatPassword', {
                type: 'manual',
                message: 'Passwords do not match'
            });
            return
        }
        try {
            await registerUser(data)
            setSuccessMessage("registration successfull")
            navigate('/login')
        } catch (error) {
            console.log(error.response.data);
            if(error.response && error.response.status === 400) {
                setError('email', {
                    type: 'manual',
                    message: error.response.data.errors[0].msg
                })
            } else {
                setServerError('something went wrong')
            }
        }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("username", { required: true, minLength: 8, maxLength: 32 })} placeholder="Username" />
        { errors.username && <p>Username must be at least 6 characters and max charcters is 32 characters</p> }

        <input type="password" {...register("password", { required: true, minLength: 8, maxLength: 128 })} placeholder=" Password" />
        { errors.password && <p>Password must be between 8 and 128 characters</p> }

        <input type="password" {...register("repeatPassword", { required: true })} placeholder="Repeat Password" />
        { errors.repeatPassword && <p>Please repeat your password</p> }

        <input type="email" {...register("email", { required: true })} placeholder="Email" />
        { errors.email && <p>{errors.email.message}</p> }

        {serverError ? <p>{serverError}</p> : successMessage && <p>{successMessage}</p>}
  
       <button type="submit">Register</button>
      </form>
    )
}

export default RegisterForm;