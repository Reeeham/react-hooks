import { useState } from "react"


export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [values, e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }]
}


export const FormExample = () => {

    const [values, handleChange] = useForm({email : '', password : ''});

    return(
        <div>
            <input
            name="email"
            value={values.email}
            onChange={handleChange}/>
             <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}/>
        </div>
    )
}