function asignarState(estado) {
    if (estado == 2) 
        return ["A", "CLEAN", "DIRTY"];
    else if (estado == 3) 
        return ["A", "DIRTY", "CLEAN"];
    else if (estado == 4) 
        return ["A", "CLEAN", "CLEAN"];
    else if (estado == 5) 
        return ["B", "DIRTY", "DIRTY"];
    else if (estado == 6) 
        return ["B", "CLEAN", "DIRTY"];
    else if (estado == 7) 
        return ["B", "DIRTY", "CLEAN"];
    else if (estado == 8) 
        return ["B", "CLEAN", "CLEAN"];
}

function asigNuevaLoc(locacion) {
    var inicio, final;
    let estadoActual = 0;
    if (locacion == "A") {
        inicio = 0;
        final = 4;
    } else {
        inicio = 4;
        final = 8;
    }
    for (var i = inicio; i < final; i++) {
        estadoActual = i + 1;
        let existNodo = false;
        for (var j = 0; j < 8; j++) {
            if (estadoActual == nodosVisitados[j]) existNodo = true;
        }
        if (!existNodo) {
            posicionAgente = estadoActual;
            break;
        }
    }
}

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    if (action_result == "CLEAN") {
        if (location == "A") {
            states[1] = "CLEAN";
            if (states[2] == "CLEAN") 
                asigNuevaLoc(location);
            else 
                posicionAgente = 2;
        } else if (location == "B") {
            states[2] = "CLEAN";
            if (states[1] == "CLEAN") 
                asigNuevaLoc(location);
            else 
                posicionAgente = 7;
        }
    }
    else if (action_result == "RIGHT") {
        console.log("Moviendose a la derecha");
        states[0] = "B";
        asigNuevaLoc(states[0]);
    } else if (action_result == "LEFT") {
        console.log("Moviendose a la izquierda");
        states[0] = "A";
        asigNuevaLoc(states[0]);
    }
    if (nodosVisitados.length < 8) {
        states = asignarState(posicionAgente);
        nodosVisitados.push(posicionAgente);
        setTimeout(function () { test(states); }, 1500);
    } else {
        document.getElementById("log").innerHTML += "<br>Ejecucion finalizada.";
        return;
    }
}

var posicionAgente = 1;
var states = ["A", "DIRTY", "DIRTY"];
var nodosVisitados = [1];
test(states);