export async function fetchCurp(form,setForm,http,e,fetchColonias = false,calculate_age) {  
       
  const value = e.target.value
  // CABI940512HJCSCS06
  let Age = 0;
    try {   
      const ben = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/1111112022/get/curp/'+value);
      
      if (ben.data[0] === "ok") {
      
        if (fetchColonias) {
          fetchColonias(ben.data[1].codigopostal);
        }
        
        Age = calculate_age(ben.data[1].fechanacimiento)

        setForm({
          ...form,
          apaterno: ben.data[1].apaterno,
          amaterno: ben.data[1].amaterno,
          curp: ben.data[1].curp,
          nombre: ben.data[1].nombre,
          fechanacimiento: ben.data[1].fechanacimiento,
          codigopostal: ben.data[1].codigopostal,
          escolaridad: ben.data[1].escolaridad,
          ocupacion: ben.data[1].ocupacion,
          celular: ben.data[1].celular,
          edad: Age,
          email: ben.data[1].email,
          calle: ben.data[1].calle,
          vivienda: ben.data[1].vivienda,
          lenguamaterna: ben.data[1].lenguamaterna,
          municipio: ben.data[1].municipio,
          sexo: ben.data[1].sexo,
          primercruce: ben.data[1].primercruce,
          segundocruce: ben.data[1].segundocruce,
          numext: ben.data[1].numext,
          numint: ben.data[1].numint,
          serviciosmedicos: ben.data[1].serviciosmedicos,
          enfermedad: ben.data[1].enfermedad,
          enfermedad_otro: ben.data[1].enfermedad_otro,
        })
      
      }else{
          const response = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/1111112022/validarCurp/'+value);
       
          if (response.data[9] === "EXITOSO") {
            
            let date = response.data[5].split('/').reverse().join("-")
            Age = calculate_age(date)
            
            setForm({
              ...form,
              apaterno: response.data[2],
              amaterno: response.data[3],
              curp: response.data[0],
              nombre: response.data[1],
              fechanacimiento: date,
              edad:Age
            })
          }
        
      }

      return Age;
    } catch (error) {
      console.log(error);
    }
  
}


