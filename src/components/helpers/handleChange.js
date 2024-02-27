export const handleChange = (e,form,setForm) => {
   
    let {value,name} = e.target
    setForm({
        ...form,
        [name]: value
    })
  }