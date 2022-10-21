// ==UserScript==
// @name         GitRec
// @namespace    https://github.com/lisonge
// @version      1.0.0
// @author       lisonge
// @description  A recommender system for GitHub repositories based on Gorse
// @license      MIT
// @icon         https://gitrec.gorse.io/logo.png
// @homepageURL  https://github.com/lisonge/userscripts
// @source       https://github.com/lisonge/userscripts
// @downloadURL  https://github.com/lisonge/userscripts/raw/main/packages/gitrec/dist/gitrec.user.js
// @match        *://github.com/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.min.js
// @connect      gitrec.gorse.io
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function($2, client) {
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const $__default = /* @__PURE__ */ _interopDefaultLegacy($2);
  const api = {
    read: async ({
      itemId: itemId2
    }) => {
      return new Promise((res, rej) => {
        client.GM_xmlhttpRequest({
          url: `https://gitrec.gorse.io/api/read/${itemId2}`,
          method: "POST",
          onload(response) {
            res(JSON.parse(response.responseText));
          },
          onerror(response) {
            rej(response);
          }
        });
      });
    },
    delete: async ({
      itemId: itemId2
    }) => {
      return new Promise((res, rej) => {
        client.GM_xmlhttpRequest({
          url: `https://gitrec.gorse.io/api/delete/${itemId2}`,
          method: "POST",
          onload(response) {
            res(JSON.parse(response.responseText));
          },
          onerror(response) {
            rej(response);
          }
        });
      });
    },
    neighbors: async ({
      neighbors,
      offset
    }) => {
      return new Promise((res, rej) => {
        client.GM_xmlhttpRequest({
          url: `https://gitrec.gorse.io/api/v2/neighbors/${neighbors}?offset=${offset}&n=6`,
          onload(response) {
            res(JSON.parse(response.responseText));
          },
          onerror(response) {
            rej(response);
          }
        });
      });
    },
    recommendSession: async ({
      recommend
    }) => {
      return new Promise((res, rej) => {
        client.GM_xmlhttpRequest({
          url: `https://gitrec.gorse.io/api/v2/session/recommend?n=6`,
          method: "POST",
          data: JSON.stringify(recommend),
          onload(response) {
            res(JSON.parse(response.responseText));
          },
          onerror(response) {
            rej(response);
          }
        });
      });
    },
    recommendExtension: async () => {
      return new Promise((res, rej) => {
        client.GM_xmlhttpRequest({
          url: `https://gitrec.gorse.io/api/v2/extension/recommend`,
          onload(response) {
            res(JSON.parse(response.responseText));
          },
          onerror(response) {
            rej(response);
          }
        });
      });
    }
  };
  const LANGUAGE_COLORS = {
    "1C Enterprise": {
      color: "#814CCC",
      url: "https://github.com/trending?l=1C-Enterprise"
    },
    "2-Dimensional Array": {
      color: "#38761D",
      url: "https://github.com/trending?l=2-Dimensional-Array"
    },
    "4D": {
      color: "#004289",
      url: "https://github.com/trending?l=4D"
    },
    ABAP: {
      color: "#E8274B",
      url: "https://github.com/trending?l=ABAP"
    },
    "ABAP CDS": {
      color: "#555e25",
      url: "https://github.com/trending?l=ABAP-CDS"
    },
    ActionScript: {
      color: "#882B0F",
      url: "https://github.com/trending?l=ActionScript"
    },
    Ada: {
      color: "#02f88c",
      url: "https://github.com/trending?l=Ada"
    },
    "Adobe Font Metrics": {
      color: "#fa0f00",
      url: "https://github.com/trending?l=Adobe-Font-Metrics"
    },
    Agda: {
      color: "#315665",
      url: "https://github.com/trending?l=Agda"
    },
    "AGS Script": {
      color: "#B9D9FF",
      url: "https://github.com/trending?l=AGS-Script"
    },
    AIDL: {
      color: "#34EB6B",
      url: "https://github.com/trending?l=AIDL"
    },
    AL: {
      color: "#3AA2B5",
      url: "https://github.com/trending?l=AL"
    },
    Alloy: {
      color: "#64C800",
      url: "https://github.com/trending?l=Alloy"
    },
    "Alpine Abuild": {
      color: "#0D597F",
      url: "https://github.com/trending?l=Alpine-Abuild"
    },
    "Altium Designer": {
      color: "#A89663",
      url: "https://github.com/trending?l=Altium-Designer"
    },
    AMPL: {
      color: "#E6EFBB",
      url: "https://github.com/trending?l=AMPL"
    },
    AngelScript: {
      color: "#C7D7DC",
      url: "https://github.com/trending?l=AngelScript"
    },
    "Ant Build System": {
      color: "#A9157E",
      url: "https://github.com/trending?l=Ant-Build-System"
    },
    ANTLR: {
      color: "#9DC3FF",
      url: "https://github.com/trending?l=ANTLR"
    },
    ApacheConf: {
      color: "#d12127",
      url: "https://github.com/trending?l=ApacheConf"
    },
    Apex: {
      color: "#1797c0",
      url: "https://github.com/trending?l=Apex"
    },
    "API Blueprint": {
      color: "#2ACCA8",
      url: "https://github.com/trending?l=API-Blueprint"
    },
    APL: {
      color: "#5A8164",
      url: "https://github.com/trending?l=APL"
    },
    "Apollo Guidance Computer": {
      color: "#0B3D91",
      url: "https://github.com/trending?l=Apollo-Guidance-Computer"
    },
    AppleScript: {
      color: "#101F1F",
      url: "https://github.com/trending?l=AppleScript"
    },
    Arc: {
      color: "#aa2afe",
      url: "https://github.com/trending?l=Arc"
    },
    AsciiDoc: {
      color: "#73a0c5",
      url: "https://github.com/trending?l=AsciiDoc"
    },
    ASL: {
      color: null,
      url: "https://github.com/trending?l=ASL"
    },
    "ASP.NET": {
      color: "#9400ff",
      url: "https://github.com/trending?l=ASP.NET"
    },
    AspectJ: {
      color: "#a957b0",
      url: "https://github.com/trending?l=AspectJ"
    },
    Assembly: {
      color: "#6E4C13",
      url: "https://github.com/trending?l=Assembly"
    },
    Astro: {
      color: "#ff5a03",
      url: "https://github.com/trending?l=Astro"
    },
    Asymptote: {
      color: "#ff0000",
      url: "https://github.com/trending?l=Asymptote"
    },
    ATS: {
      color: "#1ac620",
      url: "https://github.com/trending?l=ATS"
    },
    Augeas: {
      color: "#9CC134",
      url: "https://github.com/trending?l=Augeas"
    },
    AutoHotkey: {
      color: "#6594b9",
      url: "https://github.com/trending?l=AutoHotkey"
    },
    AutoIt: {
      color: "#1C3552",
      url: "https://github.com/trending?l=AutoIt"
    },
    "Avro IDL": {
      color: "#0040FF",
      url: "https://github.com/trending?l=Avro-IDL"
    },
    Awk: {
      color: "#c30e9b",
      url: "https://github.com/trending?l=Awk"
    },
    Ballerina: {
      color: "#FF5000",
      url: "https://github.com/trending?l=Ballerina"
    },
    BASIC: {
      color: "#ff0000",
      url: "https://github.com/trending?l=BASIC"
    },
    Batchfile: {
      color: "#C1F12E",
      url: "https://github.com/trending?l=Batchfile"
    },
    Beef: {
      color: "#a52f4e",
      url: "https://github.com/trending?l=Beef"
    },
    Befunge: {
      color: null,
      url: "https://github.com/trending?l=Befunge"
    },
    Berry: {
      color: "#15A13C",
      url: "https://github.com/trending?l=Berry"
    },
    BibTeX: {
      color: "#778899",
      url: "https://github.com/trending?l=BibTeX"
    },
    Bicep: {
      color: "#519aba",
      url: "https://github.com/trending?l=Bicep"
    },
    Bison: {
      color: "#6A463F",
      url: "https://github.com/trending?l=Bison"
    },
    BitBake: {
      color: "#00bce4",
      url: "https://github.com/trending?l=BitBake"
    },
    Blade: {
      color: "#f7523f",
      url: "https://github.com/trending?l=Blade"
    },
    BlitzBasic: {
      color: "#00FFAE",
      url: "https://github.com/trending?l=BlitzBasic"
    },
    BlitzMax: {
      color: "#cd6400",
      url: "https://github.com/trending?l=BlitzMax"
    },
    Bluespec: {
      color: "#12223c",
      url: "https://github.com/trending?l=Bluespec"
    },
    Boo: {
      color: "#d4bec1",
      url: "https://github.com/trending?l=Boo"
    },
    Boogie: {
      color: "#c80fa0",
      url: "https://github.com/trending?l=Boogie"
    },
    Brainfuck: {
      color: "#2F2530",
      url: "https://github.com/trending?l=Brainfuck"
    },
    Brightscript: {
      color: "#662D91",
      url: "https://github.com/trending?l=Brightscript"
    },
    Browserslist: {
      color: "#ffd539",
      url: "https://github.com/trending?l=Browserslist"
    },
    C: {
      color: "#555555",
      url: "https://github.com/trending?l=C"
    },
    "C#": {
      color: "#178600",
      url: "https://github.com/trending?l=Csharp"
    },
    "C++": {
      color: "#f34b7d",
      url: "https://github.com/trending?l=C++"
    },
    "C2hs Haskell": {
      color: null,
      url: "https://github.com/trending?l=C2hs-Haskell"
    },
    "Cabal Config": {
      color: "#483465",
      url: "https://github.com/trending?l=Cabal-Config"
    },
    Cadence: {
      color: "#00ef8b",
      url: "https://github.com/trending?l=Cadence"
    },
    Cairo: {
      color: "#ff4a48",
      url: "https://github.com/trending?l=Cairo"
    },
    CameLIGO: {
      color: "#3be133",
      url: "https://github.com/trending?l=CameLIGO"
    },
    "Cap'n Proto": {
      color: "#c42727",
      url: "https://github.com/trending?l=Cap'n-Proto"
    },
    CartoCSS: {
      color: null,
      url: "https://github.com/trending?l=CartoCSS"
    },
    Ceylon: {
      color: "#dfa535",
      url: "https://github.com/trending?l=Ceylon"
    },
    Chapel: {
      color: "#8dc63f",
      url: "https://github.com/trending?l=Chapel"
    },
    Charity: {
      color: null,
      url: "https://github.com/trending?l=Charity"
    },
    ChucK: {
      color: "#3f8000",
      url: "https://github.com/trending?l=ChucK"
    },
    Cirru: {
      color: "#ccccff",
      url: "https://github.com/trending?l=Cirru"
    },
    Clarion: {
      color: "#db901e",
      url: "https://github.com/trending?l=Clarion"
    },
    Clarity: {
      color: "#5546ff",
      url: "https://github.com/trending?l=Clarity"
    },
    "Classic ASP": {
      color: "#6a40fd",
      url: "https://github.com/trending?l=Classic-ASP"
    },
    Clean: {
      color: "#3F85AF",
      url: "https://github.com/trending?l=Clean"
    },
    Click: {
      color: "#E4E6F3",
      url: "https://github.com/trending?l=Click"
    },
    CLIPS: {
      color: "#00A300",
      url: "https://github.com/trending?l=CLIPS"
    },
    Clojure: {
      color: "#db5855",
      url: "https://github.com/trending?l=Clojure"
    },
    "Closure Templates": {
      color: "#0d948f",
      url: "https://github.com/trending?l=Closure-Templates"
    },
    "Cloud Firestore Security Rules": {
      color: "#FFA000",
      url: "https://github.com/trending?l=Cloud-Firestore-Security-Rules"
    },
    CMake: {
      color: "#DA3434",
      url: "https://github.com/trending?l=CMake"
    },
    COBOL: {
      color: null,
      url: "https://github.com/trending?l=COBOL"
    },
    CodeQL: {
      color: "#140f46",
      url: "https://github.com/trending?l=CodeQL"
    },
    CoffeeScript: {
      color: "#244776",
      url: "https://github.com/trending?l=CoffeeScript"
    },
    ColdFusion: {
      color: "#ed2cd6",
      url: "https://github.com/trending?l=ColdFusion"
    },
    "ColdFusion CFC": {
      color: "#ed2cd6",
      url: "https://github.com/trending?l=ColdFusion-CFC"
    },
    COLLADA: {
      color: "#F1A42B",
      url: "https://github.com/trending?l=COLLADA"
    },
    "Common Lisp": {
      color: "#3fb68b",
      url: "https://github.com/trending?l=Common-Lisp"
    },
    "Common Workflow Language": {
      color: "#B5314C",
      url: "https://github.com/trending?l=Common-Workflow-Language"
    },
    "Component Pascal": {
      color: "#B0CE4E",
      url: "https://github.com/trending?l=Component-Pascal"
    },
    Cool: {
      color: null,
      url: "https://github.com/trending?l=Cool"
    },
    Coq: {
      color: "#d0b68c",
      url: "https://github.com/trending?l=Coq"
    },
    Crystal: {
      color: "#000100",
      url: "https://github.com/trending?l=Crystal"
    },
    CSON: {
      color: "#244776",
      url: "https://github.com/trending?l=CSON"
    },
    Csound: {
      color: "#1a1a1a",
      url: "https://github.com/trending?l=Csound"
    },
    "Csound Document": {
      color: "#1a1a1a",
      url: "https://github.com/trending?l=Csound-Document"
    },
    "Csound Score": {
      color: "#1a1a1a",
      url: "https://github.com/trending?l=Csound-Score"
    },
    CSS: {
      color: "#563d7c",
      url: "https://github.com/trending?l=CSS"
    },
    CSV: {
      color: "#237346",
      url: "https://github.com/trending?l=CSV"
    },
    Cuda: {
      color: "#3A4E3A",
      url: "https://github.com/trending?l=Cuda"
    },
    CUE: {
      color: "#5886E1",
      url: "https://github.com/trending?l=CUE"
    },
    Curry: {
      color: "#531242",
      url: "https://github.com/trending?l=Curry"
    },
    CWeb: {
      color: "#00007a",
      url: "https://github.com/trending?l=CWeb"
    },
    Cycript: {
      color: null,
      url: "https://github.com/trending?l=Cycript"
    },
    Cython: {
      color: "#fedf5b",
      url: "https://github.com/trending?l=Cython"
    },
    D: {
      color: "#ba595e",
      url: "https://github.com/trending?l=D"
    },
    Dafny: {
      color: "#FFEC25",
      url: "https://github.com/trending?l=Dafny"
    },
    "Darcs Patch": {
      color: "#8eff23",
      url: "https://github.com/trending?l=Darcs-Patch"
    },
    Dart: {
      color: "#00B4AB",
      url: "https://github.com/trending?l=Dart"
    },
    DataWeave: {
      color: "#003a52",
      url: "https://github.com/trending?l=DataWeave"
    },
    "Debian Package Control File": {
      color: "#D70751",
      url: "https://github.com/trending?l=Debian-Package-Control-File"
    },
    DenizenScript: {
      color: "#FBEE96",
      url: "https://github.com/trending?l=DenizenScript"
    },
    Dhall: {
      color: "#dfafff",
      url: "https://github.com/trending?l=Dhall"
    },
    "DIGITAL Command Language": {
      color: null,
      url: "https://github.com/trending?l=DIGITAL-Command-Language"
    },
    "DirectX 3D File": {
      color: "#aace60",
      url: "https://github.com/trending?l=DirectX-3D-File"
    },
    DM: {
      color: "#447265",
      url: "https://github.com/trending?l=DM"
    },
    Dockerfile: {
      color: "#384d54",
      url: "https://github.com/trending?l=Dockerfile"
    },
    Dogescript: {
      color: "#cca760",
      url: "https://github.com/trending?l=Dogescript"
    },
    DTrace: {
      color: null,
      url: "https://github.com/trending?l=DTrace"
    },
    Dylan: {
      color: "#6c616e",
      url: "https://github.com/trending?l=Dylan"
    },
    E: {
      color: "#ccce35",
      url: "https://github.com/trending?l=E"
    },
    Earthly: {
      color: "#2af0ff",
      url: "https://github.com/trending?l=Earthly"
    },
    Easybuild: {
      color: "#069406",
      url: "https://github.com/trending?l=Easybuild"
    },
    eC: {
      color: "#913960",
      url: "https://github.com/trending?l=eC"
    },
    "Ecere Projects": {
      color: "#913960",
      url: "https://github.com/trending?l=Ecere-Projects"
    },
    ECL: {
      color: "#8a1267",
      url: "https://github.com/trending?l=ECL"
    },
    ECLiPSe: {
      color: "#001d9d",
      url: "https://github.com/trending?l=ECLiPSe"
    },
    EditorConfig: {
      color: "#fff1f2",
      url: "https://github.com/trending?l=EditorConfig"
    },
    Eiffel: {
      color: "#4d6977",
      url: "https://github.com/trending?l=Eiffel"
    },
    EJS: {
      color: "#a91e50",
      url: "https://github.com/trending?l=EJS"
    },
    Elixir: {
      color: "#6e4a7e",
      url: "https://github.com/trending?l=Elixir"
    },
    Elm: {
      color: "#60B5CC",
      url: "https://github.com/trending?l=Elm"
    },
    "Emacs Lisp": {
      color: "#c065db",
      url: "https://github.com/trending?l=Emacs-Lisp"
    },
    EmberScript: {
      color: "#FFF4F3",
      url: "https://github.com/trending?l=EmberScript"
    },
    EQ: {
      color: "#a78649",
      url: "https://github.com/trending?l=EQ"
    },
    Erlang: {
      color: "#B83998",
      url: "https://github.com/trending?l=Erlang"
    },
    Euphoria: {
      color: "#FF790B",
      url: "https://github.com/trending?l=Euphoria"
    },
    "F#": {
      color: "#b845fc",
      url: "https://github.com/trending?l=Fsharp"
    },
    "F*": {
      color: "#572e30",
      url: "https://github.com/trending?l=F*"
    },
    Factor: {
      color: "#636746",
      url: "https://github.com/trending?l=Factor"
    },
    Fancy: {
      color: "#7b9db4",
      url: "https://github.com/trending?l=Fancy"
    },
    Fantom: {
      color: "#14253c",
      url: "https://github.com/trending?l=Fantom"
    },
    Faust: {
      color: "#c37240",
      url: "https://github.com/trending?l=Faust"
    },
    Fennel: {
      color: "#fff3d7",
      url: "https://github.com/trending?l=Fennel"
    },
    "FIGlet Font": {
      color: "#FFDDBB",
      url: "https://github.com/trending?l=FIGlet-Font"
    },
    "Filebench WML": {
      color: "#F6B900",
      url: "https://github.com/trending?l=Filebench-WML"
    },
    Filterscript: {
      color: null,
      url: "https://github.com/trending?l=Filterscript"
    },
    fish: {
      color: "#4aae47",
      url: "https://github.com/trending?l=fish"
    },
    Fluent: {
      color: "#ffcc33",
      url: "https://github.com/trending?l=Fluent"
    },
    FLUX: {
      color: "#88ccff",
      url: "https://github.com/trending?l=FLUX"
    },
    Forth: {
      color: "#341708",
      url: "https://github.com/trending?l=Forth"
    },
    Fortran: {
      color: "#4d41b1",
      url: "https://github.com/trending?l=Fortran"
    },
    "Fortran Free Form": {
      color: "#4d41b1",
      url: "https://github.com/trending?l=Fortran-Free-Form"
    },
    FreeBasic: {
      color: "#867db1",
      url: "https://github.com/trending?l=FreeBasic"
    },
    FreeMarker: {
      color: "#0050b2",
      url: "https://github.com/trending?l=FreeMarker"
    },
    Frege: {
      color: "#00cafe",
      url: "https://github.com/trending?l=Frege"
    },
    Futhark: {
      color: "#5f021f",
      url: "https://github.com/trending?l=Futhark"
    },
    "G-code": {
      color: "#D08CF2",
      url: "https://github.com/trending?l=G-code"
    },
    "Game Maker Language": {
      color: "#71b417",
      url: "https://github.com/trending?l=Game-Maker-Language"
    },
    GAML: {
      color: "#FFC766",
      url: "https://github.com/trending?l=GAML"
    },
    GAMS: {
      color: "#f49a22",
      url: "https://github.com/trending?l=GAMS"
    },
    GAP: {
      color: "#0000cc",
      url: "https://github.com/trending?l=GAP"
    },
    "GCC Machine Description": {
      color: "#FFCFAB",
      url: "https://github.com/trending?l=GCC-Machine-Description"
    },
    GDB: {
      color: null,
      url: "https://github.com/trending?l=GDB"
    },
    GDScript: {
      color: "#355570",
      url: "https://github.com/trending?l=GDScript"
    },
    GEDCOM: {
      color: "#003058",
      url: "https://github.com/trending?l=GEDCOM"
    },
    "Gemfile.lock": {
      color: "#701516",
      url: "https://github.com/trending?l=Gemfile.lock"
    },
    Genero: {
      color: "#63408e",
      url: "https://github.com/trending?l=Genero"
    },
    "Genero Forms": {
      color: "#d8df39",
      url: "https://github.com/trending?l=Genero-Forms"
    },
    Genie: {
      color: "#fb855d",
      url: "https://github.com/trending?l=Genie"
    },
    Genshi: {
      color: "#951531",
      url: "https://github.com/trending?l=Genshi"
    },
    "Gentoo Ebuild": {
      color: "#9400ff",
      url: "https://github.com/trending?l=Gentoo-Ebuild"
    },
    "Gentoo Eclass": {
      color: "#9400ff",
      url: "https://github.com/trending?l=Gentoo-Eclass"
    },
    "Gerber Image": {
      color: "#d20b00",
      url: "https://github.com/trending?l=Gerber-Image"
    },
    Gherkin: {
      color: "#5B2063",
      url: "https://github.com/trending?l=Gherkin"
    },
    "Git Attributes": {
      color: "#F44D27",
      url: "https://github.com/trending?l=Git-Attributes"
    },
    "Git Config": {
      color: "#F44D27",
      url: "https://github.com/trending?l=Git-Config"
    },
    Gleam: {
      color: "#ffaff3",
      url: "https://github.com/trending?l=Gleam"
    },
    GLSL: {
      color: "#5686a5",
      url: "https://github.com/trending?l=GLSL"
    },
    Glyph: {
      color: "#c1ac7f",
      url: "https://github.com/trending?l=Glyph"
    },
    Gnuplot: {
      color: "#f0a9f0",
      url: "https://github.com/trending?l=Gnuplot"
    },
    Go: {
      color: "#00ADD8",
      url: "https://github.com/trending?l=Go"
    },
    "Go Checksums": {
      color: "#00ADD8",
      url: "https://github.com/trending?l=Go-Checksums"
    },
    "Go Module": {
      color: "#00ADD8",
      url: "https://github.com/trending?l=Go-Module"
    },
    Golo: {
      color: "#88562A",
      url: "https://github.com/trending?l=Golo"
    },
    Gosu: {
      color: "#82937f",
      url: "https://github.com/trending?l=Gosu"
    },
    Grace: {
      color: "#615f8b",
      url: "https://github.com/trending?l=Grace"
    },
    Gradle: {
      color: "#02303a",
      url: "https://github.com/trending?l=Gradle"
    },
    "Grammatical Framework": {
      color: "#ff0000",
      url: "https://github.com/trending?l=Grammatical-Framework"
    },
    GraphQL: {
      color: "#e10098",
      url: "https://github.com/trending?l=GraphQL"
    },
    "Graphviz (DOT)": {
      color: "#2596be",
      url: "https://github.com/trending?l=Graphviz-(DOT)"
    },
    Groovy: {
      color: "#4298b8",
      url: "https://github.com/trending?l=Groovy"
    },
    "Groovy Server Pages": {
      color: "#4298b8",
      url: "https://github.com/trending?l=Groovy-Server-Pages"
    },
    GSC: {
      color: "#FF6800",
      url: "https://github.com/trending?l=GSC"
    },
    Hack: {
      color: "#878787",
      url: "https://github.com/trending?l=Hack"
    },
    Haml: {
      color: "#ece2a9",
      url: "https://github.com/trending?l=Haml"
    },
    Handlebars: {
      color: "#f7931e",
      url: "https://github.com/trending?l=Handlebars"
    },
    HAProxy: {
      color: "#106da9",
      url: "https://github.com/trending?l=HAProxy"
    },
    Harbour: {
      color: "#0e60e3",
      url: "https://github.com/trending?l=Harbour"
    },
    Haskell: {
      color: "#5e5086",
      url: "https://github.com/trending?l=Haskell"
    },
    Haxe: {
      color: "#df7900",
      url: "https://github.com/trending?l=Haxe"
    },
    HCL: {
      color: null,
      url: "https://github.com/trending?l=HCL"
    },
    HiveQL: {
      color: "#dce200",
      url: "https://github.com/trending?l=HiveQL"
    },
    HLSL: {
      color: "#aace60",
      url: "https://github.com/trending?l=HLSL"
    },
    HolyC: {
      color: "#ffefaf",
      url: "https://github.com/trending?l=HolyC"
    },
    hoon: {
      color: "#00b171",
      url: "https://github.com/trending?l=hoon"
    },
    HTML: {
      color: "#e34c26",
      url: "https://github.com/trending?l=HTML"
    },
    "HTML+ECR": {
      color: "#2e1052",
      url: "https://github.com/trending?l=HTML+ECR"
    },
    "HTML+EEX": {
      color: "#6e4a7e",
      url: "https://github.com/trending?l=HTML+EEX"
    },
    "HTML+ERB": {
      color: "#701516",
      url: "https://github.com/trending?l=HTML+ERB"
    },
    "HTML+PHP": {
      color: "#4f5d95",
      url: "https://github.com/trending?l=HTML+PHP"
    },
    "HTML+Razor": {
      color: "#512be4",
      url: "https://github.com/trending?l=HTML+Razor"
    },
    HTTP: {
      color: "#005C9C",
      url: "https://github.com/trending?l=HTTP"
    },
    HXML: {
      color: "#f68712",
      url: "https://github.com/trending?l=HXML"
    },
    Hy: {
      color: "#7790B2",
      url: "https://github.com/trending?l=Hy"
    },
    HyPhy: {
      color: null,
      url: "https://github.com/trending?l=HyPhy"
    },
    IDL: {
      color: "#a3522f",
      url: "https://github.com/trending?l=IDL"
    },
    Idris: {
      color: "#b30000",
      url: "https://github.com/trending?l=Idris"
    },
    "Ignore List": {
      color: "#000000",
      url: "https://github.com/trending?l=Ignore-List"
    },
    "IGOR Pro": {
      color: "#0000cc",
      url: "https://github.com/trending?l=IGOR-Pro"
    },
    "ImageJ Macro": {
      color: "#99AAFF",
      url: "https://github.com/trending?l=ImageJ-Macro"
    },
    "Inform 7": {
      color: null,
      url: "https://github.com/trending?l=Inform-7"
    },
    INI: {
      color: "#d1dbe0",
      url: "https://github.com/trending?l=INI"
    },
    "Inno Setup": {
      color: "#264b99",
      url: "https://github.com/trending?l=Inno-Setup"
    },
    Io: {
      color: "#a9188d",
      url: "https://github.com/trending?l=Io"
    },
    Ioke: {
      color: "#078193",
      url: "https://github.com/trending?l=Ioke"
    },
    Isabelle: {
      color: "#FEFE00",
      url: "https://github.com/trending?l=Isabelle"
    },
    "Isabelle ROOT": {
      color: "#FEFE00",
      url: "https://github.com/trending?l=Isabelle-ROOT"
    },
    J: {
      color: "#9EEDFF",
      url: "https://github.com/trending?l=J"
    },
    Janet: {
      color: "#0886a5",
      url: "https://github.com/trending?l=Janet"
    },
    "JAR Manifest": {
      color: "#b07219",
      url: "https://github.com/trending?l=JAR-Manifest"
    },
    Jasmin: {
      color: "#d03600",
      url: "https://github.com/trending?l=Jasmin"
    },
    Java: {
      color: "#b07219",
      url: "https://github.com/trending?l=Java"
    },
    "Java Properties": {
      color: "#2A6277",
      url: "https://github.com/trending?l=Java-Properties"
    },
    "Java Server Pages": {
      color: "#2A6277",
      url: "https://github.com/trending?l=Java-Server-Pages"
    },
    JavaScript: {
      color: "#f1e05a",
      url: "https://github.com/trending?l=JavaScript"
    },
    "JavaScript+ERB": {
      color: "#f1e05a",
      url: "https://github.com/trending?l=JavaScript+ERB"
    },
    "Jest Snapshot": {
      color: "#15c213",
      url: "https://github.com/trending?l=Jest-Snapshot"
    },
    JFlex: {
      color: "#DBCA00",
      url: "https://github.com/trending?l=JFlex"
    },
    Jinja: {
      color: "#a52a22",
      url: "https://github.com/trending?l=Jinja"
    },
    Jison: {
      color: "#56b3cb",
      url: "https://github.com/trending?l=Jison"
    },
    "Jison Lex": {
      color: "#56b3cb",
      url: "https://github.com/trending?l=Jison-Lex"
    },
    Jolie: {
      color: "#843179",
      url: "https://github.com/trending?l=Jolie"
    },
    jq: {
      color: "#c7254e",
      url: "https://github.com/trending?l=jq"
    },
    JSON: {
      color: "#292929",
      url: "https://github.com/trending?l=JSON"
    },
    "JSON with Comments": {
      color: "#292929",
      url: "https://github.com/trending?l=JSON-with-Comments"
    },
    JSON5: {
      color: "#267CB9",
      url: "https://github.com/trending?l=JSON5"
    },
    JSONiq: {
      color: "#40d47e",
      url: "https://github.com/trending?l=JSONiq"
    },
    JSONLD: {
      color: "#0c479c",
      url: "https://github.com/trending?l=JSONLD"
    },
    Jsonnet: {
      color: "#0064bd",
      url: "https://github.com/trending?l=Jsonnet"
    },
    Julia: {
      color: "#a270ba",
      url: "https://github.com/trending?l=Julia"
    },
    "Jupyter Notebook": {
      color: "#DA5B0B",
      url: "https://github.com/trending?l=Jupyter-Notebook"
    },
    "Kaitai Struct": {
      color: "#773b37",
      url: "https://github.com/trending?l=Kaitai-Struct"
    },
    KakouneScript: {
      color: "#6f8042",
      url: "https://github.com/trending?l=KakouneScript"
    },
    "KiCad Layout": {
      color: "#2f4aab",
      url: "https://github.com/trending?l=KiCad-Layout"
    },
    "KiCad Legacy Layout": {
      color: "#2f4aab",
      url: "https://github.com/trending?l=KiCad-Legacy-Layout"
    },
    "KiCad Schematic": {
      color: "#2f4aab",
      url: "https://github.com/trending?l=KiCad-Schematic"
    },
    Kotlin: {
      color: "#A97BFF",
      url: "https://github.com/trending?l=Kotlin"
    },
    KRL: {
      color: "#28430A",
      url: "https://github.com/trending?l=KRL"
    },
    kvlang: {
      color: "#1da6e0",
      url: "https://github.com/trending?l=kvlang"
    },
    LabVIEW: {
      color: "#fede06",
      url: "https://github.com/trending?l=LabVIEW"
    },
    Lark: {
      color: "#2980B9",
      url: "https://github.com/trending?l=Lark"
    },
    Lasso: {
      color: "#999999",
      url: "https://github.com/trending?l=Lasso"
    },
    Latte: {
      color: "#f2a542",
      url: "https://github.com/trending?l=Latte"
    },
    Lean: {
      color: null,
      url: "https://github.com/trending?l=Lean"
    },
    Less: {
      color: "#1d365d",
      url: "https://github.com/trending?l=Less"
    },
    Lex: {
      color: "#DBCA00",
      url: "https://github.com/trending?l=Lex"
    },
    LFE: {
      color: "#4C3023",
      url: "https://github.com/trending?l=LFE"
    },
    LigoLANG: {
      color: "#0e74ff",
      url: "https://github.com/trending?l=LigoLANG"
    },
    LilyPond: {
      color: "#9ccc7c",
      url: "https://github.com/trending?l=LilyPond"
    },
    Limbo: {
      color: null,
      url: "https://github.com/trending?l=Limbo"
    },
    Liquid: {
      color: "#67b8de",
      url: "https://github.com/trending?l=Liquid"
    },
    "Literate Agda": {
      color: "#315665",
      url: "https://github.com/trending?l=Literate-Agda"
    },
    "Literate CoffeeScript": {
      color: "#244776",
      url: "https://github.com/trending?l=Literate-CoffeeScript"
    },
    "Literate Haskell": {
      color: "#5e5086",
      url: "https://github.com/trending?l=Literate-Haskell"
    },
    LiveScript: {
      color: "#499886",
      url: "https://github.com/trending?l=LiveScript"
    },
    LLVM: {
      color: "#185619",
      url: "https://github.com/trending?l=LLVM"
    },
    Logos: {
      color: null,
      url: "https://github.com/trending?l=Logos"
    },
    Logtalk: {
      color: "#295b9a",
      url: "https://github.com/trending?l=Logtalk"
    },
    LOLCODE: {
      color: "#cc9900",
      url: "https://github.com/trending?l=LOLCODE"
    },
    LookML: {
      color: "#652B81",
      url: "https://github.com/trending?l=LookML"
    },
    LoomScript: {
      color: null,
      url: "https://github.com/trending?l=LoomScript"
    },
    LSL: {
      color: "#3d9970",
      url: "https://github.com/trending?l=LSL"
    },
    Lua: {
      color: "#000080",
      url: "https://github.com/trending?l=Lua"
    },
    M: {
      color: null,
      url: "https://github.com/trending?l=M"
    },
    M4: {
      color: null,
      url: "https://github.com/trending?l=M4"
    },
    M4Sugar: {
      color: null,
      url: "https://github.com/trending?l=M4Sugar"
    },
    Macaulay2: {
      color: "#d8ffff",
      url: "https://github.com/trending?l=Macaulay2"
    },
    Makefile: {
      color: "#427819",
      url: "https://github.com/trending?l=Makefile"
    },
    Mako: {
      color: "#7e858d",
      url: "https://github.com/trending?l=Mako"
    },
    Markdown: {
      color: "#083fa1",
      url: "https://github.com/trending?l=Markdown"
    },
    Marko: {
      color: "#42bff2",
      url: "https://github.com/trending?l=Marko"
    },
    Mask: {
      color: "#f97732",
      url: "https://github.com/trending?l=Mask"
    },
    Mathematica: {
      color: "#dd1100",
      url: "https://github.com/trending?l=Mathematica"
    },
    MATLAB: {
      color: "#e16737",
      url: "https://github.com/trending?l=MATLAB"
    },
    Max: {
      color: "#c4a79c",
      url: "https://github.com/trending?l=Max"
    },
    MAXScript: {
      color: "#00a6a6",
      url: "https://github.com/trending?l=MAXScript"
    },
    mcfunction: {
      color: "#E22837",
      url: "https://github.com/trending?l=mcfunction"
    },
    Mercury: {
      color: "#ff2b2b",
      url: "https://github.com/trending?l=Mercury"
    },
    Meson: {
      color: "#007800",
      url: "https://github.com/trending?l=Meson"
    },
    Metal: {
      color: "#8f14e9",
      url: "https://github.com/trending?l=Metal"
    },
    MiniD: {
      color: null,
      url: "https://github.com/trending?l=MiniD"
    },
    MiniYAML: {
      color: "#ff1111",
      url: "https://github.com/trending?l=MiniYAML"
    },
    Mint: {
      color: "#02b046",
      url: "https://github.com/trending?l=Mint"
    },
    Mirah: {
      color: "#c7a938",
      url: "https://github.com/trending?l=Mirah"
    },
    "mIRC Script": {
      color: "#3d57c3",
      url: "https://github.com/trending?l=mIRC-Script"
    },
    MLIR: {
      color: "#5EC8DB",
      url: "https://github.com/trending?l=MLIR"
    },
    Modelica: {
      color: "#de1d31",
      url: "https://github.com/trending?l=Modelica"
    },
    "Modula-2": {
      color: "#10253f",
      url: "https://github.com/trending?l=Modula-2"
    },
    "Modula-3": {
      color: "#223388",
      url: "https://github.com/trending?l=Modula-3"
    },
    "Module Management System": {
      color: null,
      url: "https://github.com/trending?l=Module-Management-System"
    },
    Monkey: {
      color: null,
      url: "https://github.com/trending?l=Monkey"
    },
    "Monkey C": {
      color: "#8D6747",
      url: "https://github.com/trending?l=Monkey-C"
    },
    Moocode: {
      color: null,
      url: "https://github.com/trending?l=Moocode"
    },
    MoonScript: {
      color: "#ff4585",
      url: "https://github.com/trending?l=MoonScript"
    },
    Motoko: {
      color: "#fbb03b",
      url: "https://github.com/trending?l=Motoko"
    },
    "Motorola 68K Assembly": {
      color: "#005daa",
      url: "https://github.com/trending?l=Motorola-68K-Assembly"
    },
    MQL4: {
      color: "#62A8D6",
      url: "https://github.com/trending?l=MQL4"
    },
    MQL5: {
      color: "#4A76B8",
      url: "https://github.com/trending?l=MQL5"
    },
    MTML: {
      color: "#b7e1f4",
      url: "https://github.com/trending?l=MTML"
    },
    MUF: {
      color: null,
      url: "https://github.com/trending?l=MUF"
    },
    mupad: {
      color: "#244963",
      url: "https://github.com/trending?l=mupad"
    },
    Mustache: {
      color: "#724b3b",
      url: "https://github.com/trending?l=Mustache"
    },
    Myghty: {
      color: null,
      url: "https://github.com/trending?l=Myghty"
    },
    nanorc: {
      color: "#2d004d",
      url: "https://github.com/trending?l=nanorc"
    },
    NASL: {
      color: null,
      url: "https://github.com/trending?l=NASL"
    },
    NCL: {
      color: "#28431f",
      url: "https://github.com/trending?l=NCL"
    },
    Nearley: {
      color: "#990000",
      url: "https://github.com/trending?l=Nearley"
    },
    Nemerle: {
      color: "#3d3c6e",
      url: "https://github.com/trending?l=Nemerle"
    },
    nesC: {
      color: "#94B0C7",
      url: "https://github.com/trending?l=nesC"
    },
    NetLinx: {
      color: "#0aa0ff",
      url: "https://github.com/trending?l=NetLinx"
    },
    "NetLinx+ERB": {
      color: "#747faa",
      url: "https://github.com/trending?l=NetLinx+ERB"
    },
    NetLogo: {
      color: "#ff6375",
      url: "https://github.com/trending?l=NetLogo"
    },
    NewLisp: {
      color: "#87AED7",
      url: "https://github.com/trending?l=NewLisp"
    },
    Nextflow: {
      color: "#3ac486",
      url: "https://github.com/trending?l=Nextflow"
    },
    Nginx: {
      color: "#009639",
      url: "https://github.com/trending?l=Nginx"
    },
    Nim: {
      color: "#ffc200",
      url: "https://github.com/trending?l=Nim"
    },
    Nit: {
      color: "#009917",
      url: "https://github.com/trending?l=Nit"
    },
    Nix: {
      color: "#7e7eff",
      url: "https://github.com/trending?l=Nix"
    },
    "NPM Config": {
      color: "#cb3837",
      url: "https://github.com/trending?l=NPM-Config"
    },
    NSIS: {
      color: null,
      url: "https://github.com/trending?l=NSIS"
    },
    Nu: {
      color: "#c9df40",
      url: "https://github.com/trending?l=Nu"
    },
    NumPy: {
      color: "#9C8AF9",
      url: "https://github.com/trending?l=NumPy"
    },
    Nunjucks: {
      color: "#3d8137",
      url: "https://github.com/trending?l=Nunjucks"
    },
    NWScript: {
      color: "#111522",
      url: "https://github.com/trending?l=NWScript"
    },
    "Objective-C": {
      color: "#438eff",
      url: "https://github.com/trending?l=Objective-C"
    },
    "Objective-C++": {
      color: "#6866fb",
      url: "https://github.com/trending?l=Objective-C++"
    },
    "Objective-J": {
      color: "#ff0c5a",
      url: "https://github.com/trending?l=Objective-J"
    },
    ObjectScript: {
      color: "#424893",
      url: "https://github.com/trending?l=ObjectScript"
    },
    OCaml: {
      color: "#3be133",
      url: "https://github.com/trending?l=OCaml"
    },
    Odin: {
      color: "#60AFFE",
      url: "https://github.com/trending?l=Odin"
    },
    Omgrofl: {
      color: "#cabbff",
      url: "https://github.com/trending?l=Omgrofl"
    },
    ooc: {
      color: "#b0b77e",
      url: "https://github.com/trending?l=ooc"
    },
    Opa: {
      color: null,
      url: "https://github.com/trending?l=Opa"
    },
    Opal: {
      color: "#f7ede0",
      url: "https://github.com/trending?l=Opal"
    },
    "Open Policy Agent": {
      color: "#7d9199",
      url: "https://github.com/trending?l=Open-Policy-Agent"
    },
    OpenCL: {
      color: "#ed2e2d",
      url: "https://github.com/trending?l=OpenCL"
    },
    "OpenEdge ABL": {
      color: "#5ce600",
      url: "https://github.com/trending?l=OpenEdge-ABL"
    },
    OpenQASM: {
      color: "#AA70FF",
      url: "https://github.com/trending?l=OpenQASM"
    },
    "OpenRC runscript": {
      color: null,
      url: "https://github.com/trending?l=OpenRC-runscript"
    },
    OpenSCAD: {
      color: "#e5cd45",
      url: "https://github.com/trending?l=OpenSCAD"
    },
    Org: {
      color: "#77aa99",
      url: "https://github.com/trending?l=Org"
    },
    Ox: {
      color: null,
      url: "https://github.com/trending?l=Ox"
    },
    Oxygene: {
      color: "#cdd0e3",
      url: "https://github.com/trending?l=Oxygene"
    },
    Oz: {
      color: "#fab738",
      url: "https://github.com/trending?l=Oz"
    },
    P4: {
      color: "#7055b5",
      url: "https://github.com/trending?l=P4"
    },
    Pan: {
      color: "#cc0000",
      url: "https://github.com/trending?l=Pan"
    },
    Papyrus: {
      color: "#6600cc",
      url: "https://github.com/trending?l=Papyrus"
    },
    Parrot: {
      color: "#f3ca0a",
      url: "https://github.com/trending?l=Parrot"
    },
    "Parrot Assembly": {
      color: null,
      url: "https://github.com/trending?l=Parrot-Assembly"
    },
    "Parrot Internal Representation": {
      color: null,
      url: "https://github.com/trending?l=Parrot-Internal-Representation"
    },
    Pascal: {
      color: "#E3F171",
      url: "https://github.com/trending?l=Pascal"
    },
    Pawn: {
      color: "#dbb284",
      url: "https://github.com/trending?l=Pawn"
    },
    "PEG.js": {
      color: "#234d6b",
      url: "https://github.com/trending?l=PEG.js"
    },
    Pep8: {
      color: "#C76F5B",
      url: "https://github.com/trending?l=Pep8"
    },
    Perl: {
      color: "#0298c3",
      url: "https://github.com/trending?l=Perl"
    },
    PHP: {
      color: "#4F5D95",
      url: "https://github.com/trending?l=PHP"
    },
    PicoLisp: {
      color: "#6067af",
      url: "https://github.com/trending?l=PicoLisp"
    },
    PigLatin: {
      color: "#fcd7de",
      url: "https://github.com/trending?l=PigLatin"
    },
    Pike: {
      color: "#005390",
      url: "https://github.com/trending?l=Pike"
    },
    PLpgSQL: {
      color: "#336790",
      url: "https://github.com/trending?l=PLpgSQL"
    },
    PLSQL: {
      color: "#dad8d8",
      url: "https://github.com/trending?l=PLSQL"
    },
    PogoScript: {
      color: "#d80074",
      url: "https://github.com/trending?l=PogoScript"
    },
    Pony: {
      color: null,
      url: "https://github.com/trending?l=Pony"
    },
    PostCSS: {
      color: "#dc3a0c",
      url: "https://github.com/trending?l=PostCSS"
    },
    PostScript: {
      color: "#da291c",
      url: "https://github.com/trending?l=PostScript"
    },
    "POV-Ray SDL": {
      color: "#6bac65",
      url: "https://github.com/trending?l=POV-Ray-SDL"
    },
    PowerBuilder: {
      color: "#8f0f8d",
      url: "https://github.com/trending?l=PowerBuilder"
    },
    PowerShell: {
      color: "#012456",
      url: "https://github.com/trending?l=PowerShell"
    },
    Prisma: {
      color: "#0c344b",
      url: "https://github.com/trending?l=Prisma"
    },
    Processing: {
      color: "#0096D8",
      url: "https://github.com/trending?l=Processing"
    },
    Procfile: {
      color: "#3B2F63",
      url: "https://github.com/trending?l=Procfile"
    },
    Prolog: {
      color: "#74283c",
      url: "https://github.com/trending?l=Prolog"
    },
    Promela: {
      color: "#de0000",
      url: "https://github.com/trending?l=Promela"
    },
    "Propeller Spin": {
      color: "#7fa2a7",
      url: "https://github.com/trending?l=Propeller-Spin"
    },
    Pug: {
      color: "#a86454",
      url: "https://github.com/trending?l=Pug"
    },
    Puppet: {
      color: "#302B6D",
      url: "https://github.com/trending?l=Puppet"
    },
    PureBasic: {
      color: "#5a6986",
      url: "https://github.com/trending?l=PureBasic"
    },
    PureScript: {
      color: "#1D222D",
      url: "https://github.com/trending?l=PureScript"
    },
    Python: {
      color: "#3572A5",
      url: "https://github.com/trending?l=Python"
    },
    "Python console": {
      color: "#3572A5",
      url: "https://github.com/trending?l=Python-console"
    },
    "Python traceback": {
      color: "#3572A5",
      url: "https://github.com/trending?l=Python-traceback"
    },
    q: {
      color: "#0040cd",
      url: "https://github.com/trending?l=q"
    },
    "Q#": {
      color: "#fed659",
      url: "https://github.com/trending?l=Qsharp"
    },
    QMake: {
      color: null,
      url: "https://github.com/trending?l=QMake"
    },
    QML: {
      color: "#44a51c",
      url: "https://github.com/trending?l=QML"
    },
    "Qt Script": {
      color: "#00b841",
      url: "https://github.com/trending?l=Qt-Script"
    },
    Quake: {
      color: "#882233",
      url: "https://github.com/trending?l=Quake"
    },
    R: {
      color: "#198CE7",
      url: "https://github.com/trending?l=R"
    },
    Racket: {
      color: "#3c5caa",
      url: "https://github.com/trending?l=Racket"
    },
    Ragel: {
      color: "#9d5200",
      url: "https://github.com/trending?l=Ragel"
    },
    Raku: {
      color: "#0000fb",
      url: "https://github.com/trending?l=Raku"
    },
    RAML: {
      color: "#77d9fb",
      url: "https://github.com/trending?l=RAML"
    },
    Rascal: {
      color: "#fffaa0",
      url: "https://github.com/trending?l=Rascal"
    },
    RDoc: {
      color: "#701516",
      url: "https://github.com/trending?l=RDoc"
    },
    REALbasic: {
      color: null,
      url: "https://github.com/trending?l=REALbasic"
    },
    Reason: {
      color: "#ff5847",
      url: "https://github.com/trending?l=Reason"
    },
    ReasonLIGO: {
      color: "#ff5847",
      url: "https://github.com/trending?l=ReasonLIGO"
    },
    Rebol: {
      color: "#358a5b",
      url: "https://github.com/trending?l=Rebol"
    },
    "Record Jar": {
      color: "#0673ba",
      url: "https://github.com/trending?l=Record-Jar"
    },
    Red: {
      color: "#f50000",
      url: "https://github.com/trending?l=Red"
    },
    Redcode: {
      color: null,
      url: "https://github.com/trending?l=Redcode"
    },
    "Regular Expression": {
      color: "#009a00",
      url: "https://github.com/trending?l=Regular-Expression"
    },
    "Ren'Py": {
      color: "#ff7f7f",
      url: "https://github.com/trending?l=Ren'Py"
    },
    RenderScript: {
      color: null,
      url: "https://github.com/trending?l=RenderScript"
    },
    ReScript: {
      color: "#ed5051",
      url: "https://github.com/trending?l=ReScript"
    },
    reStructuredText: {
      color: "#141414",
      url: "https://github.com/trending?l=reStructuredText"
    },
    REXX: {
      color: "#d90e09",
      url: "https://github.com/trending?l=REXX"
    },
    Ring: {
      color: "#2D54CB",
      url: "https://github.com/trending?l=Ring"
    },
    Riot: {
      color: "#A71E49",
      url: "https://github.com/trending?l=Riot"
    },
    RMarkdown: {
      color: "#198ce7",
      url: "https://github.com/trending?l=RMarkdown"
    },
    RobotFramework: {
      color: "#00c0b5",
      url: "https://github.com/trending?l=RobotFramework"
    },
    Roff: {
      color: "#ecdebe",
      url: "https://github.com/trending?l=Roff"
    },
    "Roff Manpage": {
      color: "#ecdebe",
      url: "https://github.com/trending?l=Roff-Manpage"
    },
    Rouge: {
      color: "#cc0088",
      url: "https://github.com/trending?l=Rouge"
    },
    RPC: {
      color: null,
      url: "https://github.com/trending?l=RPC"
    },
    RPGLE: {
      color: "#2BDE21",
      url: "https://github.com/trending?l=RPGLE"
    },
    Ruby: {
      color: "#701516",
      url: "https://github.com/trending?l=Ruby"
    },
    RUNOFF: {
      color: "#665a4e",
      url: "https://github.com/trending?l=RUNOFF"
    },
    Rust: {
      color: "#dea584",
      url: "https://github.com/trending?l=Rust"
    },
    Sage: {
      color: null,
      url: "https://github.com/trending?l=Sage"
    },
    SaltStack: {
      color: "#646464",
      url: "https://github.com/trending?l=SaltStack"
    },
    SAS: {
      color: "#B34936",
      url: "https://github.com/trending?l=SAS"
    },
    Sass: {
      color: "#a53b70",
      url: "https://github.com/trending?l=Sass"
    },
    Scala: {
      color: "#c22d40",
      url: "https://github.com/trending?l=Scala"
    },
    Scaml: {
      color: "#bd181a",
      url: "https://github.com/trending?l=Scaml"
    },
    Scheme: {
      color: "#1e4aec",
      url: "https://github.com/trending?l=Scheme"
    },
    Scilab: {
      color: "#ca0f21",
      url: "https://github.com/trending?l=Scilab"
    },
    SCSS: {
      color: "#c6538c",
      url: "https://github.com/trending?l=SCSS"
    },
    sed: {
      color: "#64b970",
      url: "https://github.com/trending?l=sed"
    },
    Self: {
      color: "#0579aa",
      url: "https://github.com/trending?l=Self"
    },
    ShaderLab: {
      color: "#222c37",
      url: "https://github.com/trending?l=ShaderLab"
    },
    Shell: {
      color: "#89e051",
      url: "https://github.com/trending?l=Shell"
    },
    "ShellCheck Config": {
      color: "#cecfcb",
      url: "https://github.com/trending?l=ShellCheck-Config"
    },
    ShellSession: {
      color: null,
      url: "https://github.com/trending?l=ShellSession"
    },
    Shen: {
      color: "#120F14",
      url: "https://github.com/trending?l=Shen"
    },
    Sieve: {
      color: null,
      url: "https://github.com/trending?l=Sieve"
    },
    Singularity: {
      color: "#64E6AD",
      url: "https://github.com/trending?l=Singularity"
    },
    Slash: {
      color: "#007eff",
      url: "https://github.com/trending?l=Slash"
    },
    Slice: {
      color: "#003fa2",
      url: "https://github.com/trending?l=Slice"
    },
    Slim: {
      color: "#2b2b2b",
      url: "https://github.com/trending?l=Slim"
    },
    Smali: {
      color: null,
      url: "https://github.com/trending?l=Smali"
    },
    Smalltalk: {
      color: "#596706",
      url: "https://github.com/trending?l=Smalltalk"
    },
    Smarty: {
      color: "#f0c040",
      url: "https://github.com/trending?l=Smarty"
    },
    SmPL: {
      color: "#c94949",
      url: "https://github.com/trending?l=SmPL"
    },
    SMT: {
      color: null,
      url: "https://github.com/trending?l=SMT"
    },
    Solidity: {
      color: "#AA6746",
      url: "https://github.com/trending?l=Solidity"
    },
    SourcePawn: {
      color: "#f69e1d",
      url: "https://github.com/trending?l=SourcePawn"
    },
    SPARQL: {
      color: "#0C4597",
      url: "https://github.com/trending?l=SPARQL"
    },
    SQF: {
      color: "#3F3F3F",
      url: "https://github.com/trending?l=SQF"
    },
    SQL: {
      color: "#e38c00",
      url: "https://github.com/trending?l=SQL"
    },
    SQLPL: {
      color: "#e38c00",
      url: "https://github.com/trending?l=SQLPL"
    },
    Squirrel: {
      color: "#800000",
      url: "https://github.com/trending?l=Squirrel"
    },
    "SRecode Template": {
      color: "#348a34",
      url: "https://github.com/trending?l=SRecode-Template"
    },
    Stan: {
      color: "#b2011d",
      url: "https://github.com/trending?l=Stan"
    },
    "Standard ML": {
      color: "#dc566d",
      url: "https://github.com/trending?l=Standard-ML"
    },
    Starlark: {
      color: "#76d275",
      url: "https://github.com/trending?l=Starlark"
    },
    Stata: {
      color: "#1a5f91",
      url: "https://github.com/trending?l=Stata"
    },
    StringTemplate: {
      color: "#3fb34f",
      url: "https://github.com/trending?l=StringTemplate"
    },
    Stylus: {
      color: "#ff6347",
      url: "https://github.com/trending?l=Stylus"
    },
    "SubRip Text": {
      color: "#9e0101",
      url: "https://github.com/trending?l=SubRip-Text"
    },
    SugarSS: {
      color: "#2fcc9f",
      url: "https://github.com/trending?l=SugarSS"
    },
    SuperCollider: {
      color: "#46390b",
      url: "https://github.com/trending?l=SuperCollider"
    },
    Svelte: {
      color: "#ff3e00",
      url: "https://github.com/trending?l=Svelte"
    },
    SVG: {
      color: "#ff9900",
      url: "https://github.com/trending?l=SVG"
    },
    Swift: {
      color: "#F05138",
      url: "https://github.com/trending?l=Swift"
    },
    SWIG: {
      color: null,
      url: "https://github.com/trending?l=SWIG"
    },
    SystemVerilog: {
      color: "#DAE1C2",
      url: "https://github.com/trending?l=SystemVerilog"
    },
    Talon: {
      color: "#333333",
      url: "https://github.com/trending?l=Talon"
    },
    Tcl: {
      color: "#e4cc98",
      url: "https://github.com/trending?l=Tcl"
    },
    Tcsh: {
      color: null,
      url: "https://github.com/trending?l=Tcsh"
    },
    Terra: {
      color: "#00004c",
      url: "https://github.com/trending?l=Terra"
    },
    TeX: {
      color: "#3D6117",
      url: "https://github.com/trending?l=TeX"
    },
    Textile: {
      color: "#ffe7ac",
      url: "https://github.com/trending?l=Textile"
    },
    "TextMate Properties": {
      color: "#df66e4",
      url: "https://github.com/trending?l=TextMate-Properties"
    },
    Thrift: {
      color: "#D12127",
      url: "https://github.com/trending?l=Thrift"
    },
    "TI Program": {
      color: "#A0AA87",
      url: "https://github.com/trending?l=TI-Program"
    },
    TLA: {
      color: "#4b0079",
      url: "https://github.com/trending?l=TLA"
    },
    TOML: {
      color: "#9c4221",
      url: "https://github.com/trending?l=TOML"
    },
    TSQL: {
      color: "#e38c00",
      url: "https://github.com/trending?l=TSQL"
    },
    TSV: {
      color: "#237346",
      url: "https://github.com/trending?l=TSV"
    },
    TSX: {
      color: "#2b7489",
      url: "https://github.com/trending?l=TSX"
    },
    Turing: {
      color: "#cf142b",
      url: "https://github.com/trending?l=Turing"
    },
    Twig: {
      color: "#c1d026",
      url: "https://github.com/trending?l=Twig"
    },
    TXL: {
      color: "#0178b8",
      url: "https://github.com/trending?l=TXL"
    },
    TypeScript: {
      color: "#2b7489",
      url: "https://github.com/trending?l=TypeScript"
    },
    "Unified Parallel C": {
      color: "#4e3617",
      url: "https://github.com/trending?l=Unified-Parallel-C"
    },
    "Unity3D Asset": {
      color: "#222c37",
      url: "https://github.com/trending?l=Unity3D-Asset"
    },
    "Unix Assembly": {
      color: null,
      url: "https://github.com/trending?l=Unix-Assembly"
    },
    Uno: {
      color: "#9933cc",
      url: "https://github.com/trending?l=Uno"
    },
    UnrealScript: {
      color: "#a54c4d",
      url: "https://github.com/trending?l=UnrealScript"
    },
    UrWeb: {
      color: "#ccccee",
      url: "https://github.com/trending?l=UrWeb"
    },
    V: {
      color: "#4f87c4",
      url: "https://github.com/trending?l=V"
    },
    Vala: {
      color: "#a56de2",
      url: "https://github.com/trending?l=Vala"
    },
    "Valve Data Format": {
      color: "#f26025",
      url: "https://github.com/trending?l=Valve-Data-Format"
    },
    VBA: {
      color: "#867db1",
      url: "https://github.com/trending?l=VBA"
    },
    VBScript: {
      color: "#15dcdc",
      url: "https://github.com/trending?l=VBScript"
    },
    VCL: {
      color: "#148AA8",
      url: "https://github.com/trending?l=VCL"
    },
    Verilog: {
      color: "#b2b7f8",
      url: "https://github.com/trending?l=Verilog"
    },
    VHDL: {
      color: "#adb2cb",
      url: "https://github.com/trending?l=VHDL"
    },
    "Vim Help File": {
      color: "#199f4b",
      url: "https://github.com/trending?l=Vim-Help-File"
    },
    "Vim Script": {
      color: "#199f4b",
      url: "https://github.com/trending?l=Vim-Script"
    },
    "Vim Snippet": {
      color: "#199f4b",
      url: "https://github.com/trending?l=Vim-Snippet"
    },
    "Visual Basic .NET": {
      color: "#945db7",
      url: "https://github.com/trending?l=Visual-Basic-.NET"
    },
    Volt: {
      color: "#1F1F1F",
      url: "https://github.com/trending?l=Volt"
    },
    Vue: {
      color: "#41b883",
      url: "https://github.com/trending?l=Vue"
    },
    Vyper: {
      color: "#2980b9",
      url: "https://github.com/trending?l=Vyper"
    },
    wdl: {
      color: "#42f1f4",
      url: "https://github.com/trending?l=wdl"
    },
    "Web Ontology Language": {
      color: "#5b70bd",
      url: "https://github.com/trending?l=Web-Ontology-Language"
    },
    WebAssembly: {
      color: "#04133b",
      url: "https://github.com/trending?l=WebAssembly"
    },
    WebIDL: {
      color: null,
      url: "https://github.com/trending?l=WebIDL"
    },
    Wikitext: {
      color: "#fc5757",
      url: "https://github.com/trending?l=Wikitext"
    },
    "Windows Registry Entries": {
      color: "#52d5ff",
      url: "https://github.com/trending?l=Windows-Registry-Entries"
    },
    wisp: {
      color: "#7582D1",
      url: "https://github.com/trending?l=wisp"
    },
    "Witcher Script": {
      color: "#ff0000",
      url: "https://github.com/trending?l=Witcher-Script"
    },
    Wollok: {
      color: "#a23738",
      url: "https://github.com/trending?l=Wollok"
    },
    "World of Warcraft Addon Data": {
      color: "#f7e43f",
      url: "https://github.com/trending?l=World-of-Warcraft-Addon-Data"
    },
    X10: {
      color: "#4B6BEF",
      url: "https://github.com/trending?l=X10"
    },
    xBase: {
      color: "#403a40",
      url: "https://github.com/trending?l=xBase"
    },
    XC: {
      color: "#99DA07",
      url: "https://github.com/trending?l=XC"
    },
    XML: {
      color: "#0060ac",
      url: "https://github.com/trending?l=XML"
    },
    "XML Property List": {
      color: "#0060ac",
      url: "https://github.com/trending?l=XML-Property-List"
    },
    Xojo: {
      color: "#81bd41",
      url: "https://github.com/trending?l=Xojo"
    },
    Xonsh: {
      color: "#285EEF",
      url: "https://github.com/trending?l=Xonsh"
    },
    XProc: {
      color: null,
      url: "https://github.com/trending?l=XProc"
    },
    XQuery: {
      color: "#5232e7",
      url: "https://github.com/trending?l=XQuery"
    },
    XS: {
      color: null,
      url: "https://github.com/trending?l=XS"
    },
    XSLT: {
      color: "#EB8CEB",
      url: "https://github.com/trending?l=XSLT"
    },
    Xtend: {
      color: "#24255d",
      url: "https://github.com/trending?l=Xtend"
    },
    Yacc: {
      color: "#4B6C4B",
      url: "https://github.com/trending?l=Yacc"
    },
    YAML: {
      color: "#cb171e",
      url: "https://github.com/trending?l=YAML"
    },
    YARA: {
      color: "#220000",
      url: "https://github.com/trending?l=YARA"
    },
    YASnippet: {
      color: "#32AB90",
      url: "https://github.com/trending?l=YASnippet"
    },
    ZAP: {
      color: "#0d665e",
      url: "https://github.com/trending?l=ZAP"
    },
    Zeek: {
      color: null,
      url: "https://github.com/trending?l=Zeek"
    },
    ZenScript: {
      color: "#00BCD1",
      url: "https://github.com/trending?l=ZenScript"
    },
    Zephir: {
      color: "#118f9e",
      url: "https://github.com/trending?l=Zephir"
    },
    Zig: {
      color: "#ec915c",
      url: "https://github.com/trending?l=Zig"
    },
    ZIL: {
      color: "#dc75e5",
      url: "https://github.com/trending?l=ZIL"
    },
    Zimpl: {
      color: "#d67711",
      url: "https://github.com/trending?l=Zimpl"
    }
  };
  function renderLanguageColor(language) {
    return LANGUAGE_COLORS[language].color;
  }
  let itemId = null;
  let similarOffset = 0;
  const mountFn = async () => {
    const splits = location.pathname.split("/").filter((s) => s);
    if (splits.length === 2) {
      itemId = splits[0] + ":" + splits[1];
      await api.read({
        itemId
      });
      loadSimilarRepos();
    } else if (splits.length === 0) {
      let exploreDiv = $__default.default("[aria-label='Explore']");
      exploreDiv.children("h2.f5").remove();
      exploreDiv.children("div.py-2").remove();
      exploreDiv.children("a.f6").remove();
      const result = await api.recommendExtension();
      if (result.is_authenticated) {
        showRecommend(result);
      } else {
        const login = $__default.default("meta[name=user-login]").attr("content");
        const result2 = await (await fetch(`https://api.github.com/users/${login}/starred?per_page=100`)).json();
        if (result2.message) {
          showRecommend(result2);
        } else {
          let repoNames = result2.map((value) => {
            return value.full_name.replace("/", ":");
          });
          const scores = await api.recommendSession({
            recommend: repoNames
          });
          let responses = [];
          for (const score of scores) {
            const full_name = score.Id.replace(":", "/");
            responses.push(fetchRepo(full_name));
          }
          Promise.all(responses).then((repos) => {
            result2.repos = repos;
            for (const [i, score] of scores.entries()) {
              result2.repos[i].item_id = score.Id;
            }
            showRecommend(result2);
          });
        }
      }
    }
  };
  $__default.default(mountFn);
  const pushState = history.pushState.bind(history);
  const replaceState = history.replaceState.bind(history);
  history.pushState = function(...args) {
    setTimeout(mountFn);
    return pushState(...args);
  };
  history.replaceState = function(...args) {
    setTimeout(mountFn);
    return replaceState(...args);
  };
  client.unsafeWindow.addEventListener("popstate", mountFn);
  async function loadSimilarRepos() {
    const result = await api.neighbors({
      neighbors: itemId,
      offset: similarOffset
    });
    if (result.is_authenticated) {
      renderSimilarDiv(result);
    } else {
      let responses = [];
      for (const score of result.scores) {
        const full_name = score.Id.replace(":", "/");
        responses.push(fetchRepo(full_name));
      }
      Promise.all(responses).then((repos) => {
        result.repos = repos;
        for (const [i, score] of result.scores.entries()) {
          if (repos[i].full_name) {
            result.repos[i].item_id = score.Id;
          } else {
            result.message = repos[i].message;
          }
        }
        renderSimilarDiv(result);
      });
    }
  }
  async function renderSimilarDiv(result) {
    let count = 0;
    let rows = "";
    let previous = "";
    let next = "";
    if (result.message) {
      let errorMessage = "";
      if (result.message.startsWith("API rate limit exceeded")) {
        errorMessage = `API rate limit exceeded. Login <a href="https://gitrec.gorse.io" target="_blank">GitRec</a> to get a higher rate limit.`;
      } else {
        errorMessage = result.message;
      }
      rows = `<div class="text-small color-fg-muted">${errorMessage}</div>`;
    } else if (result.repos.length > 0) {
      for (const repo of result.repos) {
        if (repo.full_name) {
          if (repo.item_id != repo.full_name.replace("/", ":").toLowerCase()) {
            api.delete({
              itemId: repo.item_id
            });
          } else if (count < 3) {
            count++;
            rows += `
<div class="py-2 my-2 color-border-muted">
    <a class="f6 text-bold Link--primary d-flex no-underline wb-break-all d-inline-block" href="/${repo.full_name}">${repo.full_name}</a>
    <p class="f6 color-fg-muted mb-2" itemprop="description">${repo.description ? repo.description : ""}</p>
    ${renderLanguageSpan(repo.language)}
    <span class="f6 color-fg-muted text-normal">
        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        ${repo.stargazers_count}
    </span>
</div>`;
          }
        } else if (repo.message == "Not Found") {
          api.delete({
            itemId: repo.item_id
          });
        }
      }
      previous = similarOffset > 0 ? `<a id="previous-button" class="text-small" href="#">\u{1F860} Previous</a>` : '<span id="previous-button" class="text-small color-fg-muted">\u{1F860} Previous</span>';
      next = similarOffset < 9 ? `<a id="next-button" class="text-small" style="float: right" href="#">Next \u{1F862}</a>` : `<span id="next-button" class="text-small color-fg-muted" style="float: right">Next \u{1F862}</span>`;
    } else {
      rows = '<div class="text-small color-fg-muted">No similar repositories found</div>';
    }
    const template = `
<div class="BorderGrid-row" id="similar-repositories">
    <div class="BorderGrid-cell">
        <h2 class="h4 mb-3">Related repositories</h2>
        ${rows}${previous}${next}
    </div>
</div>`;
    $__default.default("#similar-repositories").remove();
    $__default.default(".BorderGrid:first").append($__default.default($__default.default.parseHTML(template)));
    $__default.default("a#previous-button").click(function() {
      $__default.default("#previous-button").remove();
      $__default.default("#next-button").remove();
      similarOffset -= 3;
      loadSimilarRepos();
      return false;
    });
    $__default.default("a#next-button").click(function() {
      $__default.default("#previous-button").remove();
      $__default.default("#next-button").remove();
      similarOffset += 3;
      loadSimilarRepos();
      return false;
    });
  }
  async function showRecommend(result) {
    let exploreDiv = $__default.default("[aria-label='Explore']");
    exploreDiv.children("h2.f5").remove();
    exploreDiv.children("div.py-2").remove();
    exploreDiv.children("a.f6").remove();
    exploreDiv.children("#error-message").remove();
    let template = `<h2 class="f5 text-bold mb-1">Explore repositories <a href="https://gitrec.gorse.io" target="_blank">by GitRec</a></h2>`;
    exploreDiv.append($__default.default($__default.default.parseHTML(template)));
    if (result.message) {
      let errorMessage = "";
      if (result.message.startsWith("API rate limit exceeded")) {
        errorMessage = `API rate limit exceeded. Login <a href="https://gitrec.gorse.io" target="_blank">GitRec</a> to get a higher rate limit.`;
      } else {
        errorMessage = result.message;
      }
      template = `<div class="d-block no-underline f6 mb-3" id="error-message">${errorMessage}</div>`;
    } else if (result.repos.length > 0) {
      for (const [i, repo] of result.repos.entries()) {
        let row = `
<div class="py-2 my-2${i == result.repos.length - 1 ? "" : " border-bottom color-border-muted"}">
    <a class="f6 text-bold Link--primary d-flex no-underline wb-break-all d-inline-block" href="/${repo.full_name}">${repo.full_name}</a>
    <p class="f6 color-fg-muted mb-2" itemprop="description">${repo.description ? repo.description : ""}</p>
    ${renderLanguageSpan(repo.language)}
    <span class="f6 color-fg-muted text-normal">
        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
    ${repo.stargazers_count}
    </span>
</div>`;
        exploreDiv.append($__default.default($__default.default.parseHTML(row)));
      }
      if (result.is_authenticated) {
        template = `
    <a class="d-block Link--secondary no-underline f6 mb-3" href="#" id="renew-button">
        Renew recommendation \u2192
    </a>`;
      } else {
        template = `
    <a class="d-block Link--secondary no-underline f6 mb-3" href="https://gitrec.gorse.io" target="_blank">
        Login GitRec for better recommendation \u2192
    </a>`;
      }
    }
    exploreDiv.append($__default.default($__default.default.parseHTML(template)));
    $__default.default("a#renew-button").click(async function() {
      $__default.default("#renew-button").remove();
      const items = result.items;
      await Promise.all(items.map((id) => api.read({
        itemId: id
      })));
      const result2 = await api.recommendExtension();
      showRecommend(result2);
      return false;
    });
  }
  async function fetchRepo(name) {
    let response = await fetch(`https://api.github.com/repos/${name}`);
    return await response.json();
  }
  function renderLanguageSpan(language) {
    if (language) {
      return `
<span class="mr-2 f6 color-fg-muted text-normal">
    <span class="">
        <span class="repo-language-color" style="background-color: ${renderLanguageColor(language)}"></span>
        <span itemprop="programmingLanguage">${language}</span>
    </span>
</span>`;
    } else {
      return "";
    }
  }
})($, (window.monkeyWindow = window, window));
