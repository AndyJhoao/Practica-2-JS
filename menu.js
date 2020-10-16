class stack {
  constructor() {
    this.stack = [];
  }

  push(Element) {
    this.stack.push(Element);
    return this.stack;
  }
  pop() {
    return this.stack.pop();
  }
  popAll() {
    while (this.stack.length > 0) {
      this.stack.pop();
    }
  }
  popTwo() {
    for (let i = 0; i <= this.stack.length; i++) {
      this.stack.pop();
    }
  }
  peekNum(num) {
    return this.stack[num];
  }
  peek() {
    return this.stack[this.stack.length - 1];
  }
  size() {
    return this.stack.length;
  }
  vaciarPila(i) {
    let valores = "";
    for (let j = i - 1; j >= 0; j--) {
      valores += this.stack[j];
    }
    return valores;
  }
  sumarPila(i) { }
  print() {
    console.log(this.stack);
  }
}

var entrada = prompt(
  "Menú\n1.-Expresion Aritmerica\n2.-Expresion Lógica\n3.-Expresion Lógica V2\n4.-Salir"
);
while (entrada != 4) {
  if (entrada > 3 || entrada <= 0) {
    alert("Ingresa un valor entero (1 ó 2)");
    entrada = prompt(
      "Menú\n1.-Expresion Aritmerica\n2.-Expresion Lógica\n3.-Expresion Lógica V2\n4.-Salir"
    );
  }
  switch (entrada) {
    case "1":
      alert("Expresion aritmetica");
      expresionR();
      entrada = prompt(
        "Menú\n1.-Expresion Aritmerica\n2.-Expresion Lógica\n3.-Expresion Lógica V2\n4.-Salir"
      );
      break;
    case "2":
      alert("Expresion lógica");
      expresionL();
      entrada = prompt(
        "Menú\n1.-Expresion Aritmerica\n2.-Expresion Lógica\n3.-Expresion Lógica V2\n4.-Salir"
      );
      break;
    case "3":
      alert("Expresion lógica V2");
      expresionLV2();
      entrada = prompt(
        "Menú\n1.-Expresion Aritmerica\n2.-Expresion Lógica\n3.-Expresion Lógica V2\n4.-Salir"
      );
      break;
    default:
      alert("Nos vemos :c");
      break;
  }
}
function expresionLV2() {
  let data = prompt("Ingresa la cadena de números, letras y símbolos");
  let numeros = "";
  let letras = "";
  let simbolos = "";
  for (let i = 0; i < data.length; i++) {
    if (isNaN(data.charAt(i))) {
      letras += data.charAt(i);
    } else {
      numeros += data.charAt(i);
    }
  }
  alert(
    "Los resultados son :\n1.-Letras = " + letras + "\n2.-Números = " + numeros
  );
}
function expresionL() {
  let p = [true, true, false, false];
  let q = [true, false, true, false];
  const exp = "[(p->q)^p]->q";
  let j = exp.search("[)]");
  let k = exp.search("]");
  let a = "";
  for (let i = 0; i < j; i++) {
    if (exp[i] == "(" || exp[i] == "[") {
      continue;
    } else {
      a += exp[i];
    }
  }
  let newExp = exp.substring(j + 1, k);
  let newExp2 = exp.substring(k + 1);
  a = consultar(p, q, a, []);
  console.log(a);
  a = consultar(p, q, "b" + newExp, a);
  console.log(a);
  a = consultar(p, q, "b" + newExp2, a);

  alert("El resultado es = "+a + "Tautología");
}
function consultar(p, q, exp2, b) {
  let resultado = [p.length];
  if (exp2[0] == "b") {
    if (exp2.charAt(exp2.length - 2) == ">") {
      for (let i = 0; i < p.length; i++) {
        if (b[i] == q[i]) {
          resultado[i] = true;
        } else if (b[i] == true && q[i] == false) {
          resultado[i] = false;
        } else {
          resultado[i] = true;
        }
      }
    } else if (exp2.charAt(exp2.length - 2) == "^") {
      for (let i = 0; i < p.length; i++) {
        if (b[i] == p[i] && b[i] == true && p[i] == true) {
          resultado[i] = true;
        } else {
          resultado[i] = false;
        }
      }
    }
  } else {
    if (exp2.charAt(exp2.length - 2) == ">") {
      for (let i = 0; i < p.length; i++) {
        if (p[i] == q[i]) {
          resultado[i] = true;
        } else if (p[i] == true && q[i] == false) {
          resultado[i] = false;
        } else {
          resultado[i] = true;
        }
      }
    }
  }
  return resultado;
}

function expresionR() {
  let Input = prompt("Ingresa la expresion a resolver");
  let expresion = Input.split(/(?=[-+*/^()])|(?<=[-+*/^()])/); //Cambiar por un prompt

  resolverPilas(expresion);
}

function resolverPilas(exp) {
  const pilanew = new stack();
  let res = "";
  for (let i = 0; i < exp.length; i++) {
    if (
      exp[i] == "]" ||
      exp[i] == ")" ||
      exp[i] == "^" ||
      exp[i] == "/" ||
      exp[i] == "*" ||
      exp[i] == "+" ||
      exp[i] == "-"
    ) {
      if (pilanew.size() == 0) {
        pilanew.push(exp[i]);
        //pilanew.print();
      } else {
        pilanew.push(exp[i]);
        let temporal = exp[i];
        for (let j = 0; j <= pilanew.size(); j++) {
          if (
            (pilanew.peekNum(j) == "*" && pilanew.peekNum(j - 1) == "/") ||
            (pilanew.peekNum(j) == "/" && pilanew.peekNum(j - 1) == "*")
          ) {
            res += pilanew.peekNum(j - 1);
            pilanew.popAll();
            pilanew.push(temporal);
          }
          if (
            (pilanew.peekNum(j) == "+" && pilanew.peekNum(j - 1) == "-") ||
            (pilanew.peekNum(j) == "-" && pilanew.peekNum(j - 1) == "+")
          ) {
            res += pilanew.peekNum(j - 1);
            pilanew.popAll();
            pilanew.push(temporal);
          } else if (
            (pilanew.peekNum(j) == "+" && pilanew.peekNum(j - 1) == "*") ||
            (pilanew.peekNum(j) == "+" && pilanew.peekNum(j - 1) == "/")
          ) {
            res += pilanew.vaciarPila(j);
            pilanew.popAll();
            pilanew.push(temporal);
          } else if (
            (pilanew.peekNum(j) == "-" && pilanew.peekNum(j - 1) == "*") ||
            (pilanew.peekNum(j) == "-" && pilanew.peekNum(j - 1) == "/")
          ) {
            res += pilanew.vaciarPila(j);
            pilanew.popAll();
            pilanew.push(temporal);
          } else if (
            (pilanew.peekNum(j) == "-" && pilanew.peekNum(j - 1) == "^") ||
            (pilanew.peekNum(j) == "+" && pilanew.peekNum(j - 1) == "^")
          ) {
            res += pilanew.vaciarPila(j);
            pilanew.popAll();
            pilanew.push(temporal);
          } else if (
            (pilanew.peekNum(j) == "*" && pilanew.peekNum(j - 1) == "+") ||
            (pilanew.peekNum(j) == "/" && pilanew.peekNum(j - 1) == "+")
          ) {
          } else if (
            (pilanew.peekNum(j) == "*" && pilanew.peekNum(j - 1) == "-") ||
            (pilanew.peekNum(j) == "/" && pilanew.peekNum(j - 1) == "-")
          ) {
          } else if (
            (pilanew.peekNum(j) == "^" && pilanew.peekNum(j - 1) == "*") ||
            (pilanew.peekNum(j) == "^" && pilanew.peekNum(j - 1) == "/")
          ) {
          } else if (pilanew.peekNum(j) == ")" || pilanew.peekNum(j) == "]") {
            res += pilanew.vaciarPila(j);
            pilanew.popAll();
          } else if (pilanew.peekNum(j) == pilanew.peekNum(j - 1)) {
            res += pilanew.peekNum(j - 1);
            pilanew.popAll();
            pilanew.push(temporal);
          }
        }
      }
    } else {
      if (exp[i] == "(") {
        continue;
      }
      res += exp[i];
    }
  }
  for (let i = pilanew.size() - 1; i >= 0; i--) {
    res += pilanew.peekNum(i);
  }
  pilanew.popAll();
  console.log(res);
  desarrollarPila(res);

  function desarrollarPila(res) {
    const nums = new stack();
    let respuesta = 0;
    for (let i = 0; i < res.length; i++) {
      nums.print();
      if (
        res[i] == "^" ||
        res[i] == "/" ||
        res[i] == "*" ||
        res[i] == "+" ||
        res[i] == "-"
      ) {
        switch (res[i]) {
          case "+":
            respuesta =
              nums.peekNum(nums.size() - 1) + nums.peekNum(nums.size() - 2);
            nums.popTwo();
            nums.push(respuesta);
            break;
          case "-":
            respuesta =
              nums.peekNum(nums.size() - 2) - nums.peekNum(nums.size() - 1);
            nums.popTwo();
            nums.push(respuesta);
            break;
          case "*":
            respuesta =
              nums.peekNum(nums.size() - 1) * nums.peekNum(nums.size() - 2);
            nums.popTwo();
            nums.push(respuesta);
            break;
          case "/":
            respuesta =
              nums.peekNum(nums.size() - 2) / nums.peekNum(nums.size() - 1);
            nums.popTwo();
            nums.push(respuesta);
            break;
          case "^":
            respuesta = Math.pow(
              nums.peekNum(nums.size() - 1),
              nums.peekNum(nums.size() - 2)
            );
            nums.popTwo();
            nums.push(respuesta);
            break;
          default:
            break;
        }
      } else {
        nums.push(parseInt(res[i]));
      }
    }
    alert("El resultado de la operación es = "+respuesta);
  }
}
// ejercicios logicos [(p->q)^p]->q y (p->q)<->(¬pvq) resultado tautologias
