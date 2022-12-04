import tiendabd, {guardar,consultar,crearEtiqueta} from './funciones.js';

//Inndicamos el nombre de la base de datos "Tineda", la tabla "productos"
//y sus atributos ++id(autoincremental), nombre, correoo y descripción.
let bd=tiendabd("Malvart", {mensajes:`nombre, correo,mensaje`});


//recuperando inputs del formulario

const nombre_prod = document.getElementById("nombre");
const costo_prod = document.getElementById("correo");
const desc_prod = document.getElementById("mensaje");
const mesajeSinRegistros = document.getElementById("siRegistros");

const divMensajes = document.getElementById("Mensajes");
const contenedorError = document.getElementById("contenedorError");
const contenedorOk = document.getElementById("contenedorOk");
const mensajeError = document.getElementById("mensajeError");
const mensajeOk = document.getElementById("mensajeOk");

//accediendo a los botones
const btGuardar=document.getElementById("guardar");



//visualizando datos registrados 
window.onload=() =>{

cargarTabla();
}



//Evento click para guardar
btGuardar.onclick=(evento)=>{
    //Se enviar los datos del formulario a la función guardar del archivo funciones.js
     let flag =guardar(bd.mensajes, {
     nombre:nombre_prod.value,
     correo:costo_prod.value,
     mensaje:desc_prod.value
 });
 
 if(flag){
    //Se limpian las cajas de texto
   nombre_prod.value="";
   costo_prod.value=""
   desc_prod.value="";

   cargarTabla();
   
}
}


//Evento click para guardar cambios
btModificar.onclick=(evento)=>{
    //Se recupera el id del producto a modificar
    //const id=parseInt(clave_prod.value||0);
    //if(id){
       //si exiete el id se enviar los datos del formulario a la función guardar del archivo funciones.js
        bd.mensajes.update({
            nombre:nombre_prod.value,
            correo:costo_prod.value,
            mensaje:desc_prod.value
        }).then((resultado)=>{
            if(resultado){
               console.log("Modificación realizada");
                nombre_prod.value="";
                costo_prod.value=""
                desc_prod.value="";
                cargarTabla();
                
            }else{
                console.log("No se aplicaron los cambios");
        
            }
            
        })

        
    }
   
    
//}


//Evento click para  eliminar todo
btEliminarTodo.onclick=()=>{
    
      //se ejecuta el borrado de toda la base de datos y se crea nuevamente pero vacia
    
       bd.delete();
       bd=tiendabd("Malvart", {mensajes:`nombre, correo,mensaje`});
       bd.open();
       location.reload();
      
}

//Encagado de consultar los productos y enviarlos al html
function cargarTabla(){
    const tbody =document.getElementById("tbody");
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    consultar(bd.mensajes,(productos)=>{
       
        if (productos){
            mesajeSinRegistros.textContent="";

            crearEtiqueta("tr",tbody, (tr)=>{
              for(const atributo in productos){
               
                crearEtiqueta("td",tr, (td)=>{
                  td.textContent =productos.correo===productos[atributo]?` ${productos[atributo]}`:productos[atributo];
                })
            }
          
    })
}else{
    mesajeSinRegistros.textContent="No existen comentarios registrados";
}
})

}



    




