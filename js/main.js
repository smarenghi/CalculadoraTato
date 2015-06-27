// //VALORES QUE VA A DEFINIR EL USUARIO
// //dimensiones en metros
// var xSala = 20;	//largo de la sala (profundidad)
// var ySala = 5; 		//alto de la sala
// var zSala = 14;	//ancho de la sala
// var xAsiento = 0.85;	//largo del asiento + espacio tras cada asiento (profundidad de filas). Default: 0.95
// var zAsiento = 0.85;	//ancho del asiento. Buscar default

// var largoPantalla = 5;
// var anchoPantalla = 5.74;
// var distanciaPantallaPiso = 1.50; //1.50

// var maxCalidad = true;

function getDatos(){ //NO SE USA AL FINAL. BORRAR DESPUÉS
    var datos = document.getElementById("datos");
    //largo de la sala (profundidad)
    var xSala =Number(datos.xSala.value);
     //alto de la sala
    var ySala = Number(datos.ySala.value);
    //ancho de la sala
    var zSala = Number(datos.zSala.value);
    //largo del asiento + espacio tras cada asiento (profundidad de filas). Default: 0.95
    var xAsiento = Number(datos.xAsiento.value);
    //ancho del asiento. Buscar default
    var zAsiento = Number(datos.zAsiento.value);

}

function invalidForm(){
    
    //inicializo las variables de errores en "" asi no hay problemas
    var e1 = "";
    var e2 = "";
    var e3 = "";
    var e4 = "";
    var e5 = "";
    var e6 = "";
    var e7 = "";

    var datos = document.getElementById("datos");
    var res1=false;
    var resFinal=false;
    for (i=0; i<datos.length; i++){
        res1 = (res1||isNaN(datos.elements[i].value)); // revisar si los valores son numericos
        if (!isNaN(datos.elements[i].value)){ // Que los numeros sean mayores a 0
                if (datos.elements[i].value<=0){
                    var e2 = "Los valores deben ser mayores a 0\n";
                    resFinal=true;
                    
            }
        }
    }
    if (res1){
        var e1 = 'Ingrese valores numericos\n';
    }
    
    if (datos.distanciaPantallaPiso.value<1.5){
        var e3 = "La distancia de la pantalla al piso debe ser mayor a 1.5\n";
        resFinal=true;
           
    }
    
    if ( datos.ySala.value < ( Number(datos.distanciaPantallaPiso.value) + Number(datos.anchoPantalla.value)+ 0.2)){
        var e4 = "La pantalla es o está demasiado alta\n";
        resFinal=true;     
    }
    
    if ( datos.zSala.value < datos.largoPantalla.value){
        var e5 = "El largo de la pantalla es mayor al ancho de la sala\n";
        resFinal=true;
        
    }
    
    if ( datos.xAsiento.value > datos.xSala.value){
        var e6 = "La profundidad de la fila no puede superar el largo de la sala\n";
        resFinal=true;      
    }

    if (datos.zAsiento.value > datos.zSala.value){
            var e7 = "El ancho del asiento no puede superar el ancho de la sala\n";
            resFinal=true;      
    }
    
    
    resFinal=res1||resFinal;
    if (resFinal){
    
        alert("Han sucedido los siguientes errores:\n"+e1+e2+e3+e4+e5+e6+e7);
    }
    
    return resFinal;
}

//FUNCIONES
//funcion para calcular la tangente en grados
function getTanDeg(deg) {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

function isoptica(){
    
    if(!invalidForm()){ 
    
    var datos = document.getElementById("datos");
    //largo de la sala (profundidad)
    var xSala =Number(datos.xSala.value);
     //alto de la sala
    var ySala = Number(datos.ySala.value);
    //ancho de la sala
    var zSala = Number(datos.zSala.value);
    //largo del asiento + espacio tras cada asiento (profundidad de filas). Default: 0.95
    var xAsiento = Number(datos.xAsiento.value);
    //ancho del asiento. Buscar default
    var zAsiento = Number(datos.zAsiento.value);
    var largoPantalla = Number(datos.largoPantalla.value);
    var anchoPantalla = Number(datos.anchoPantalla.value);
    var distanciaPantallaPiso =Number(datos.distanciaPantallaPiso.value);

	//PARAMETROS FIJOS
	var diferenciaAltura = 0.12; //Entre los ojos y el tope de la cabeza. ¿Optima 0.15?
	var alfa = 45;//30 a  45 //angulo en grados desde la mitad de la pantalla.
	var beta = 80; //máximo angulo de visión horizontal
	var gamma = 30; //mínimo ángulo de visión horizonral (varía de 26 a 36)
	var alturaOjosEspectador = 1.50; //de los pies a los ojos, sentado

	//VALORES QUE PUEDE DETERMINAR LA CALCULADORA
	var distanciaPrimerFila = (largoPantalla/2)/getTanDeg(beta/2); //distancia de la primera fila a la pantalla
	var distanciaÚltimaFila = (largoPantalla/2)/getTanDeg(gamma/2);//distancia máxima de la última fila a la pantalla, de acuerdo al ángulo de visión horizontal
	//alert (distanciaÚltimaFila);
	//alert (distanciaPrimerFila);

	//CALCULO DE ISOPTICA
	var xEscalon=[distanciaPrimerFila];
	var yEscalon=[0];
	var yOjos = [alturaOjosEspectador];
	var distanciaFila = distanciaPrimerFila;
	var yOjo = alturaOjosEspectador;
	var tan = 0;
	while (distanciaFila <= (xSala - xAsiento) && yOjo <= ySala - diferenciaAltura && distanciaFila+xAsiento<= distanciaÚltimaFila) {
		tan = (distanciaPantallaPiso - yOjo - diferenciaAltura)/distanciaFila;
		distanciaFila += xAsiento;
		xEscalon.push(distanciaFila);
		yOjo = distanciaPantallaPiso - tan * distanciaFila;
		yOjos.push(yOjo);
		yEscalon.push(yOjo - alturaOjosEspectador);
	}

	var cantidadFilas = xEscalon.length;

	var radPrimer = Math.atan(anchoPantalla/distanciaPrimerFila);
	var radUltimo = Math.atan(anchoPantalla/xEscalon[cantidadFilas-1]);
	// alert(radPrimer*(180/Math.PI));
	// alert(radUltimo*(180/Math.PI));

	//CALCULO PARA LA PLANTA
	var asientosPorFila = parseInt(zSala / zAsiento);	//en z
	var centrarEnZ = (zSala % zAsiento)/2; //hay que saber este restito para poder centrar las filas

	//valores para calcular la porcion quitada por angulo alfa (para dibujar las líneas rojas) FALTA
	var zImpedidos = ( zSala / 2 );
	var xImpedidos = zImpedidos * getTanDeg(90 -(alfa/2));

	//DEVOLUCION DATOS
	//mostrarlo como tabla
	// document.getElementById("xEscalon").innerHTML = xEscalon;
	// document.getElementById("yEscalon").innerHTML = yEscalon;
	// document.getElementById("yOjos").innerHTML = yOjos;
	// document.getElementById("cantidadFilas").innerHTML = cantidadFilas;
	// document.getElementById("asientosPorFila").innerHTML = asientosPorFila;
	var tablita = document.createElement("TABLE");
        
        var th = document.createElement("TH");
        var th2 = document.createElement("TH");
        var tit1 = document.createElement("TD");
        var tit2 = document.createElement("TD");
        tit1.appendChild(document.createTextNode("Dist. asientos-pantalla  "));
        tit2.appendChild(document.createTextNode("  Altura escalones"));  
        
        th.appendChild(tit1);
        th2.appendChild(tit2);
        tablita.appendChild(th);
        tablita.appendChild(th2);
        
        
        var td1=document.createElement("TD");
        var td2=document.createElement("TD");
        
        for (i=0 ; i<xEscalon.length; i++){
            var tr = tablita.insertRow(i);
            var celda1= tr.insertCell(0);  
            var celda2= tr.insertCell(1); 
            celda1.innerHTML=Math.round((xEscalon[i]*100))/100;
            celda2.innerHTML=Math.round((yEscalon[i]*100))/100  ;
        }
        document.getElementById("xEscalon").appendChild(tablita);
        document.getElementById("cantidadFilas").innerHTML = cantidadFilas;
        document.getElementById("asientosPorFila").innerHTML = asientosPorFila;
        document.getElementById("totalAsientos").innerHTML = cantidadFilas * asientosPorFila;
	
    //Calculo de asientos impedidos
	// var impedidos = 0;

	// for (var i = 0; i < xEscalon; i++) {
	// 	var impz = xEscalon[i]* getTanDeg(90 -(alfa/2))
	// 	for (var j = 0; j < asientosPorFila; j++) {
	// 		Things[i]
	// 	};
	// };

	//CALCULO Y AJUSTE DE ESCALA
	//se obtiene el elemento canvas del html, isoptico
	var canvasiso = document.getElementById("canvasiso");
	//se obtiene el elemento canvas del html, cenital
	var canvascenital = document.getElementById("canvascenital");

	var canvasWidth = window.innerWidth *0.83; // Austar dibujos al ancho de la pantalla, con un pequeño margen.
	var escala = (canvasWidth*0.95) / xSala;
	var canvasIsoHeight = ySala * escala;
	var canvasCenitalHeight = zSala * escala;

	canvasiso.width = canvasWidth;
	canvasiso.height = canvasIsoHeight;

	canvascenital.width = canvasWidth;
	canvascenital.height = canvasCenitalHeight;

	//DIBUJO ISOPTICA
	//se crea un objeto para dibujar
	var ctxiso = canvasiso.getContext("2d");

	//dibujan contorno y fondo de la sala de cine
	ctxiso.fillStyle = "rgba(255, 255, 255, 0.77)";
	ctxiso.strokeStyle = 'black';
	ctxiso.fillRect(0,0,canvasWidth,canvasIsoHeight);
	ctxiso.strokeRect(0,0,canvasWidth,canvasIsoHeight);

	//dibuja la pantalla
	ctxiso.fillStyle = "white";
	//ctxiso.strokeStyle = 'white';
	ctxiso.fillRect(0,(ySala-(anchoPantalla+distanciaPantallaPiso))*escala,0.1*escala,anchoPantalla*escala);
	ctxiso.strokeRect(0,(ySala-(anchoPantalla+distanciaPantallaPiso))*escala,0.1*escala,anchoPantalla*escala);

	//eligen color de borde y relleno de los escalones
	ctxiso.fillStyle = "#E53C9C";
	//ctxiso.strokeStyle = 'black';

	//dibuja los escalones
	for (j in xEscalon){
		ctxiso.fillRect(xEscalon[j]*escala,(ySala-yEscalon[j])*escala,xAsiento*escala,yEscalon[j]*escala); //mejorable, metodo scale()
		ctxiso.strokeRect(xEscalon[j]*escala,(ySala-yEscalon[j])*escala,xAsiento*escala,yEscalon[j]*escala); //mejorable
	}

	//eligen color de borde y relleno de las cabezas
	ctxiso.fillStyle = "#E53C9C";
	//ctxiso.strokeStyle = 'black';

	//dibuja las cabezas
	for (j in xEscalon){
		ctxiso.beginPath();
		ctxiso.arc((xEscalon[j]+(xAsiento-diferenciaAltura))*escala,((ySala-yEscalon[j])-alturaOjosEspectador)*escala,diferenciaAltura*escala,0,2*Math.PI);
		ctxiso.fill();
		ctxiso.stroke();
	}

	//DIBUJO VISTA CENITAL
	//se crea un objeto para dibujar
	var ctxcenital = canvascenital.getContext("2d");

	//dibujan contorno y fondo de la sala de cine
	ctxcenital.fillStyle = "rgba(255, 255, 255, 0.77)";
	ctxcenital.strokeStyle = 'black';
	ctxcenital.fillRect(0,0,canvasWidth,canvasCenitalHeight);
	ctxcenital.strokeRect(0,0,canvasWidth,canvasCenitalHeight);

	//dibuja la pantalla
	ctxcenital.fillStyle = "white";
	//ctxiso.strokeStyle = 'white';
	ctxcenital.fillRect(0,((zSala-largoPantalla)/2)*escala,0.1*escala,largoPantalla*escala);
	ctxcenital.strokeRect(0,((zSala-largoPantalla)/2)*escala,0.1*escala,largoPantalla*escala);

	//eligen color de borde y relleno de los asientos
	ctxcenital.fillStyle = "#173140";
	//ctxcenital.strokeStyle = 'black';

	//dibujar los asientos
	for (j in xEscalon){
		for (i = 1; i <= asientosPorFila; i++) {
			ctxcenital.fillRect(xEscalon[j]*escala,(centrarEnZ+zAsiento*(i-1))*escala,xAsiento*escala,zAsiento*escala); //mejorable
			ctxcenital.strokeRect(xEscalon[j]*escala,(centrarEnZ+zAsiento*(i-1))*escala,xAsiento*escala,zAsiento*escala); //mejorable
		}
	}
// for (j = 0; j < asientosPorFila; j++){
// 	for (i = 0; i < cantidadFilas; i++) {
// 		xA = primerFila+i*xAsiento;	//coordenada en x de la esquina superior izquierda de cada asiento
// 		zA = j*zAsiento;			//coordenada en z de la esquina superior izquierda de cada asiento
// 		if (xA >= ( zSala/2 - zAsiento*j) * getTanDeg(90 -(alfa/2)) //se fija que quede a la derecha de las líneas rojas
// 			// && acá falta otra condición para que no aparezcan los del otro lado
// 			){
// 			//dibuja cada asiento
// 			ctx.fillRect(xA*escala,zA*escala,xAsiento*escala,zAsiento*escala); //mejorable
// 			ctx.strokeRect(xA*escala,zA*escala,xAsiento*escala,zAsiento*escala);

// 		}
		
// 	}
// }

	//dibuja las dos líneas rojas (a modo de guia, después las quitamos.)
	ctxcenital.strokeStyle = '#E53C9C';
	ctxcenital.stroke
	ctxcenital.moveTo(xImpedidos*escala,0);
	ctxcenital.lineTo(0,zImpedidos*escala);
	ctxcenital.stroke();
	ctxcenital.moveTo(xImpedidos*escala,zSala*escala);
	ctxcenital.lineTo(0,zImpedidos*escala);
	ctxcenital.stroke();
	}
}