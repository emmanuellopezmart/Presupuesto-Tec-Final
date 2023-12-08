const ingresos =[
    new Ingresos("Sueldo", 80000.00),
    new Ingresos("Venta de cohe", 150000.00),
    
];

const egresos = [
    new Egresos ("Renta de Departamento", 900.00),
    new Egresos ("Ropa", 400.00)
];

let cargarApp =() =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let totalIngresos= 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = () =>{
    let totalEgresos= 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}


let cargarCabecero = () =>{
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingreso").innerHTML=formatoMoneda(totalIngresos());
    document.getElementById("egreso").innerHTML=formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString ("es-MX" , {style: "currency", currency: "MXN", mininumFractionDigits: 2})
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString ("es-MX" , {style: "percent", mininumFractionDigits: 2})
}

//Ingresos

const cargarIngresos = () =>{
    let ingresosHtml = "";
    for (ingreso of ingresos){
        ingresosHtml += crearIngresos(ingreso);
    }

    document.getElementById("lista-ingresos").innerHTML = ingresosHtml;
}

const crearIngresos = (ingreso) =>{
    let ingresosTemplete = `
                    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${ingreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                            <div class="elemento_eliminar">
                            <button class="elemento_eliminar_btn" onclick="eliminarIngreso(${egreso.id})">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                            </div>
                        </div>
                    </div>`
    return ingresosTemplete;
}

const eliminarIngreso = (id) =>{
    let ingresoEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//Egresos

const cargarEgresos = () =>{
    let egresosHtml = "";
    for (egreso of egresos){
        egresosHtml += crearEgresos(egreso);
    }

    document.getElementById("lista-egresos").innerHTML = egresosHtml;
}

const crearEgresos = (egreso) =>{
    let porcentajeEgreso = egreso.valor/totalIngresos();
    let egresosTemplete = `
                    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${egreso.descripcion}</div>
                        <div class="derecha limpiarEstilos">
                            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                            <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
                            <div class="elemento_eliminar">
                            <button class="elemento_eliminar_btn" onclick="eliminarEgreso(${egreso.id})">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                            </div>
                        </div>
                    </div>`
    return egresosTemplete;
}

const eliminarEgreso = (id) =>{
    let egresoEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(egresoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato =() =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma ["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
        ingresos.push(new Ingresos(descripcion.value, +valor.value))
        cargarCabecero();
        cargarIngresos();
    }else if(tipo.value === "egreso"){
        let newEgreso = new Egresos (descripcion.value, +valor.value)
        egresos.push(newEgreso);
        cargarCabecero();
        cargarEgresos();
    }
    }else{
        console.log("Llenar los campos");
    }
}