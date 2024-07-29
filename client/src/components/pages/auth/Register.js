import React,{ useState } from 'react'

const Register = () => {
    const [ value,setValue ] = useState({
        username:"",
        password:"",
        cfpassword:""
    })

    const handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setValue({...value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('value')
        if(value.password !== value.cfpassword){
            alert("Password not match")
        }else{
            alert("OK")
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" value={value.username} onChange={handleChange}></input>

            <label>Password</label>
            <input type="password" name="password" value={value.password} onChange={handleChange}></input>

            <label>Confirm Password</label>
            <input type="password" name="cfpassword" value={value.cfpassword} onChange={handleChange}></input>
            
            <button disabled={value.password.length < 6}>Submit</button>
            
        </form>
    </div>
  )
}

export default Register