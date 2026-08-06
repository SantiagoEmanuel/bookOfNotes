// mathSnippets.ts

// Definimos una interfaz limpia para nuestros datos crudos
export interface RawSnippet {
  label: string;
  insertText: string;
  documentation: string;
}

export const MATH_SNIPPETS: RawSnippet[] = [
  // ==========================================
  // ESTRUCTURA Y BÁSICOS
  // ==========================================
  {
    label: "fraccion",
    insertText: "$\\frac{${1:num}}{${2:den}}$",
    documentation: "Fracción en línea",
  },
  {
    label: "fraccion_bloque",
    insertText: "$$\n\\frac{${1:num}}{${2:den}}\n$$",
    documentation: "Fracción en bloque",
  },
  {
    label: "raiz",
    insertText: "$\\sqrt{${1:x}}$",
    documentation: "Raíz cuadrada",
  },
  {
    label: "raiz_n",
    insertText: "$\\sqrt[${1:n}]{${2:x}}$",
    documentation: "Raíz enésima",
  },

  // ==========================================
  // ÁLGEBRA LINEAL (Vectores y Matrices)
  // ==========================================
  {
    label: "vector",
    insertText: "\\vec{${1:v}}",
    documentation: "Símbolo de vector (flecha arriba)",
  },
  {
    label: "versor",
    insertText: "\\hat{${1:i}}",
    documentation: "Versor / Vector unitario (sombrerito)",
  },
  {
    label: "matriz_2x2",
    insertText: [
      "$$",
      "\\begin{pmatrix}",
      "${1:a_{11}} & ${2:a_{12}} \\\\\\",
      "${3:a_{21}} & ${4:a_{22}}",
      "\\end{pmatrix}",
      "$$",
    ].join("\n"),
    documentation: "Matriz 2x2 entre paréntesis",
  },
  {
    label: "matriz_3x3",
    insertText: [
      "$$",
      "\\begin{pmatrix}",
      "${1:a_{11}} & ${2:a_{12}} & ${3:a_{13}} \\\\\\",
      "${4:a_{21}} & ${5:a_{22}} & ${6:a_{23}} \\\\\\",
      "${7:a_{31}} & ${8:a_{32}} & ${9:a_{33}}",
      "\\end{pmatrix}",
      "$$",
    ].join("\n"),
    documentation: "Matriz 3x3 entre paréntesis",
  },
  {
    label: "determinante_3x3",
    insertText: [
      "$$",
      "\\begin{vmatrix}",
      "${1:a_{11}} & ${2:a_{12}} & ${3:a_{13}} \\\\\\",
      "${4:a_{21}} & ${5:a_{22}} & ${6:a_{23}} \\\\\\",
      "${7:a_{31}} & ${8:a_{32}} & ${9:a_{33}}",
      "\\end{vmatrix}",
      "$$",
    ].join("\n"),
    documentation: "Determinante 3x3 (barras rectas)",
  },
  {
    label: "producto_cruz",
    insertText: "\\times ",
    documentation: "Producto vectorial (cruz)",
  },
  {
    label: "producto_punto",
    insertText: "\\cdot ",
    documentation: "Producto escalar (punto centrado)",
  },
  {
    label: "norma",
    insertText: "\\left\\| ${1:v} \\right\\|",
    documentation: "Norma de un vector (doble barra)",
  },

  // ==========================================
  // CÁLCULO (Matemática 1, 2 y 3)
  // ==========================================
  {
    label: "limite",
    insertText: "\\lim_{${1:x} \\to ${2:\\infty}} ${3:f(x)}",
    documentation: "Límite de una función",
  },
  {
    label: "derivada",
    insertText: "\\frac{d${1:y}}{d${2:x}}",
    documentation: "Derivada ordinaria (Notación de Leibniz)",
  },
  {
    label: "derivada_parcial",
    insertText: "\\frac{\\partial ${1:f}}{\\partial ${2:x}}",
    documentation: "Derivada parcial",
  },
  {
    label: "integral",
    insertText: "\\int ${1:f(x)} \\,d${2:x}",
    documentation: "Integral indefinida",
  },
  {
    label: "integral_definida",
    insertText: "\\int_{${1:a}}^{${2:b}} ${3:f(x)} \\,d${4:x}",
    documentation: "Integral definida",
  },
  {
    label: "integral_doble",
    insertText: "\\iint_{${1:D}} ${2:f(x,y)} \\,dA",
    documentation: "Integral doble sobre región D",
  },
  {
    label: "integral_linea",
    insertText: "\\oint_{${1:C}} \\vec{${2:F}} \\cdot d\\vec{r}",
    documentation: "Integral de línea cerrada (circulación)",
  },
  {
    label: "sumatoria",
    insertText: "\\sum_{${1:i}=${2:1}}^{${3:n}} ${4:a_i}",
    documentation: "Sumatoria con límites",
  },

  // ==========================================
  // FÍSICA (Física 1, 2 y 3)
  // ==========================================
  {
    label: "nabla",
    insertText: "\\nabla ",
    documentation: "Operador Nabla (Gradiente)",
  },
  {
    label: "divergencia",
    insertText: "\\nabla \\cdot \\vec{${1:F}}",
    documentation: "Divergencia de un campo vectorial",
  },
  {
    label: "rotacional",
    insertText: "\\nabla \\times \\vec{${1:F}}",
    documentation: "Rotacional de un campo vectorial",
  },
  {
    label: "laplaciano",
    insertText: "\\nabla^2 ${1:f}",
    documentation: "Operador Laplaciano",
  },
  {
    label: "unidades",
    insertText: "\\left[{${1:m/s^2}} \\right]",
    documentation: "Corchetes para análisis dimensional / unidades",
  },

  // ==========================================
  // LÓGICA Y CONJUNTOS
  // ==========================================
  { label: "pertenece", insertText: "\\in ", documentation: "Pertenece" },
  {
    label: "no_pertenece",
    insertText: "\\notin ",
    documentation: "No pertenece",
  },
  { label: "para_todo", insertText: "\\forall ", documentation: "Para todo" },
  { label: "existe", insertText: "\\exists ", documentation: "Existe" },
  { label: "no_existe", insertText: "\\nexists ", documentation: "No existe" },
  { label: "union", insertText: "\\cup ", documentation: "Unión de conjuntos" },
  {
    label: "interseccion",
    insertText: "\\cap ",
    documentation: "Intersección de conjuntos",
  },
  {
    label: "implica",
    insertText: "\\implies ",
    documentation: "Implica (flecha doble)",
  },
  { label: "si_solo_si", insertText: "\\iff ", documentation: "Si y solo si" },

  // ==========================================
  // LETRAS GRIEGAS Y CONSTANTES
  // ==========================================
  {
    label: "alpha",
    insertText: "\\alpha",
    documentation: "Letra griega alpha",
  },
  { label: "beta", insertText: "\\beta", documentation: "Letra griega beta" },
  {
    label: "equivale",
    insertText: "≡\\{${1:}\\}",
    documentation: "Signo de equivalencia",
  },
  {
    label: "gamma",
    insertText: "\\gamma",
    documentation: "Letra griega gamma",
  },
  {
    label: "delta",
    insertText: "\\delta",
    documentation: "Letra griega delta minúscula",
  },
  {
    label: "Delta",
    insertText: "\\Delta",
    documentation: "Letra griega Delta mayúscula",
  },
  {
    label: "theta",
    insertText: "\\theta",
    documentation: "Letra griega theta",
  },
  {
    label: "lambda",
    insertText: "\\lambda",
    documentation: "Letra griega lambda",
  },
  { label: "mu", insertText: "\\mu", documentation: "Letra griega mu" },
  { label: "pi", insertText: "\\pi", documentation: "Número Pi" },
  {
    label: "sigma",
    insertText: "\\sigma",
    documentation: "Letra griega sigma",
  },
  {
    label: "omega",
    insertText: "\\omega",
    documentation: "Letra griega omega",
  },
  {
    label: "infinito",
    insertText: "\\infty",
    documentation: "Símbolo de infinito",
  },

  // ==========================================
  // LISTAS ENUMERADAS Y NO ENUMERADAS
  // ==========================================
  {
    label: "listNum",
    insertText: ["1. 1:"].join(","),
    documentation: "Listado enumerado",
  },
];
