import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [serverError, setServerError] = useState(null)

    const onSubmit = async (data) => { }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Username or Email:
                <input type="text" {...register("username", { required: 'Username is required' })} />
            </label>
            <label>
                Password:
                <input type="password" {...register("password", { required: 'Password is requires' })} />
            </label>
            {serverError && <p>{serverError}</p>}

            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm;