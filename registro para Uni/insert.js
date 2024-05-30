import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
//import { getFirestore } from "./node_modules/firebase/firebase-firestore-lite.js";

import { getFirestore,collection, getDocs,setDoc ,deleteDoc,doc, onSnapshot,query,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCHsc87iZBd-V5E5ZApcHw-4Q7Eze1uCi0",
  authDomain: "temas-selectos-bd.firebaseapp.com",
  projectId: "temas-selectos-bd",
  storageBucket: "temas-selectos-bd.appspot.com",
  messagingSenderId: "168068678278",
  appId: "1:168068678278:web:37fcadf471625d10a28707"
};

//CODIGO QUE SI ME MUESTRA LO INSERTADO Y LO EDITADO
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let bti =  document.getElementById("inser");//BOTON INSERTAR

let btc =  document.getElementById("consu");//BOTON CONSULTAR

let btins =  document.getElementById("inser2");//BOTON INSERTAR SUBCOLECCION

let btiMateria = document.getElementById("insertarMateria"); // BOTON INSERTAR MATERIA
let btm = document.getElementById("consuMaterias"); //BOTON CONSULTAR MATERIAS

const tablaUsuarios = document.querySelector("#tbUsuarios")

const tablaMaterias = document.querySelector("#tbMaterias");//tabla materias


/*evento que almacena nos datos dentro de una subcoleccion
btins.addEventListener('click', async (e) => {
    
  alert("insertando subcoleccion......")

  let idcel = document.getElementById("cel");

    try {

      // donde                            coleccion          iddoc                           subcole   iddoc
      const docRef = await setDoc(doc(db, "usuarios",  document.getElementById("cel").value ,"datos2", "001" ), 
                             
        
      {
        nombre: document.getElementById("nombre").value,
        ap: document.getElementById("ap").value,
        correo: document.getElementById("correo").value,
        tel: document.getElementById("cel").value,
        direccion:"josefa ortiz",
             
      }
      
      );

     

       // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

})*/

//evento que almacena nos datos dentro de la colección 
//BOTON INSERTAR
bti.addEventListener('click', async (e) => {
    
  let nom = document.getElementById("nombre");
  let ap = document.getElementById("ap");

    try {
        const docRef = await setDoc(doc(db, "usuarios", document.getElementById("cel").value ), 
                             
        
        {
          nombre: nom.value,
          ap: ap.value,
          correo: document.getElementById("correo").value,
          tel: document.getElementById("cel").value,
          direccion:"josefa ortiz",
               
        }
        
        );
       // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

})


//BOTON CONSULTAR
btc.addEventListener('click', async (e)=> {

  ShowUsers()
  viewUsuarios2()
  
})

//FUNCION PARA MOSTRAR LA TABLA 
async function ShowUsers() {

  tbUsuarios.innerHTML = ""
  const Allusers = await ViewUsuarios()

  Allusers.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      const datos = doc.data()
      
      tbUsuarios.innerHTML += `<tr class = "regis" data-id="${doc.id}">
      <td>${datos.nombre}</td>
      <td>${datos.ap}</td>
    
      <td>${datos.tel}</td>
      <td>
          <button class="btn-primary btn m-1 editar_" data-id="${doc.id}" >
           Editar 
          <span class="spinner-border spinner-border-sm" id="Edit-${doc.id}" style="display: none;"></span>
          </button> 

          <button class="btn-danger btn eliminar_"  data-id="${doc.id}|${datos.nombre}|${datos.ap}" >
          Eliminar 
          <span class="spinner-border spinner-border-sm" id="elim-${doc.id}" style="display: none;"></span>
          
          </button>
      </td>
   
      </tr>`

  });


}

 async function ViewUsuarios() {
  const userRef = collection(db, "usuarios")
  const Allusers = await getDocs(userRef)
  return Allusers
}

async function viewUsuarios2(){

  const q = query(collection(db, "usuarios"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];

  querySnapshot.forEach((doc) => {
      cities.push(doc.data().nombre);     
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
}


//FUNCION PARA ELIMINAR
$("#tbUsuarios").on("click", ".eliminar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)
 let datox = producto_id.split('|')
 console.log("datos  " + datox[1])
  try {
     
    await deleteDoc(doc(db, "usuarios", datox[0]));

  } catch (error) {
      console.log("error", error)

  }

})

//FUNCION PARA EDITAR USUARIO
$("#tbUsuarios").on("click", ".editar_", async function () {

  const producto_id = $(this).data("id")
  console.log("click en editar" + producto_id)

  try {
    // Obtener el nuevo número de teléfono del usuario
    const newTel = prompt("Ingrese el nuevo número de teléfono:");

    // Verificar si se ingresó un número de teléfono válido
    if (newTel) {
      const washingtonRef = doc(db, "usuarios", producto_id.toString());

      // Actualizar solo el campo 'tel' con el nuevo número de teléfono
      await updateDoc(washingtonRef, {
        tel: newTel
      });

      alert("Número de teléfono actualizado correctamente.");
    }
  } catch (error) {
    console.log("error", error)
  }

})



$("#tbUsuarios").on("click",".regis", async function () {

  const producto_id = $(this).data("id")
  console.log("click en " + producto_id)


  try {
     
  } catch (error) {
      console.log("error", error)

  }

})



// Evento para mostrar las materias al hacer clic en el botón correspondiente
btm.addEventListener('click', async (e) => {
  ShowMaterias();
});

// Función para mostrar las materias en la tabla
async function ShowMaterias() {
  // Limpiar la tabla
  tablaMaterias.innerHTML = "";

  // Obtener todas las materias
  const allMaterias = await ViewMaterias();

  // Mostrar cada materia en la tabla
  allMaterias.forEach((doc) => {
      const datos = doc.data();

      tablaMaterias.innerHTML += `<tr>
          <td>${datos.materia}</td>
          <td>${datos.descripcion}</td>
      </tr>`;
  });
}

// Función para obtener todas las materias
async function ViewMaterias() {
  const materiasRef = collection(db, "materias");
  const allMaterias = await getDocs(materiasRef);
  return allMaterias;
}

// Evento para insertar una materia al hacer clic en el botón correspondiente
btiMateria.addEventListener('click', async (e) => {
  alert("Insertando materia...");

  try {
      const docRef = await setDoc(doc(db, "materias", document.getElementById("materia").value), {
          materia: document.getElementById("materia").value,
          descripcion: document.getElementById("descripcion").value
      });
      alert("Materia insertada correctamente");
  } catch (e) {
      console.error("Error adding document: ", e);
  }
});
