const express = require('express')
const algo = require('./algo')

const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => { //AGREGAR ESTUDIANTE
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  
  if (!existe) {
    estudiantes.push(estudiante)
    res.status(200)
    res.json(estudiante)
  } else {
    res.status(409)
    res.send()
  }
})

app.delete(route, (req, res) => { //ELIMINAR ESTUDIANTE POR DNI

  const estudiante = req.body;

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
    
  const pos = estudiantes.indexOf(existe);
  estudiantes.splice(pos, 1);
    

    if(existe){
    res.status(200)
    res.json(`Estudiante con DNI ${estudiante.dni} fue eliminado`)
    }else{
  
    res.status(409)
    res.send()
    }

})

app.put(route, (req, res) => { //MODIFICACION 
  const estudiante = req.body

  const e = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  const pos = estudiantes.indexOf(e)
  estudiantes[pos] = estudiante;

  if(e){
    res.status(200)
    res.json(estudiantes[pos])
  }
  else {
    res.status(409)
    res.send()
  }

})

app.get(route, (req, res) => { //BUSCAR A TODOS LOS EST
  res.json(estudiantes)
})

app.get(`${route}/:dni`, (req, res) => { //BUSCAR POR DNI
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })
  if(existe){
    res.status(200)
    res.json(existe)
  }
  else {
    res.status(409)
    res.send()
  }
  
})

app.get(`${route}/edad/:rango`, (req, res) => { //BUSCAR POR RANGO DE EDAD
  const estudiante = req.body
  const lista =[]
  estudiantes.forEach(i => {
    if(estudiante.edad == i.edad){
      lista.push(i)
    }
    
  });
 
  if(lista.length){
    res.status(200)
    res.json(lista)
  }
  else {
    res.status(409)
    res.send()
  }
})


app.listen(port, () => {
  console.log("Escuchando")
})