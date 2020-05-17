Vue.component('text-case', {
    props: ['convert', 'attribute'],
    data: function () {
        return {
        }
    },
    created() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        seeMore = true;
    },
    methods: {
        copy: function (id) {
            //Crea un campo de texto "oculto"
            var aux = document.createElement("input");

            // Asigna el contenido del elemento especificado al valor del campo
            aux.setAttribute("value", document.getElementById(id).innerHTML);

            // Añade el campo a la página
            document.body.appendChild(aux);

            // Selecciona el contenido del campo
            aux.select();

            // Copia el texto seleccionado
            document.execCommand("copy");

            // Elimina el campo de la página
            document.body.removeChild(aux);
            
            alert = document.getElementById('alert');
            alert.style.display = "block";

            setTimeout(function(){ alert.style.display = "none"; }, 3000);
        },
        seeMore: function(id){
            paragraph = document.getElementById(id);
            btn = document.getElementById('btn-' + id);

            if(seeMore){
                paragraph.style.maxHeight = 'none';
                btn.innerHTML = 'Ver menos';
            }else{
                paragraph.style.maxHeight = '200px';
                btn.innerHTML = 'Ver mas';
            }
            console.log(this.paragraph);
            seeMore = !seeMore;
        }
    },
    template:
        `
        <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <label for="text"><b>{{ attribute.name }}</b>
                <a class="ml-3" data-toggle="tooltip" data-placement="right" :title="attribute.nameTitle">
                <svg class="bi bi-info-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
                    <circle cx="8" cy="4.5" r="1"/>
                </svg>
                </a> </label>
                <button type="button" class="btn btn-outline-primary btn-sm" :class="attribute.idText" data-toggle="tooltip" data-placement="top" :title="attribute.textTitle" @click="copy(attribute.idText)">copy</button>
            </div>
            <p :id="attribute.idText" class="limit-convert"> {{ convert }} </p>
            <div class="text-center" v-show="convert != ''">
                <button :id="'btn-'+attribute.idText" class="btn btn-outline-success" @click="seeMore(attribute.idText)">Ver más</button>
            </div>
            <hr>
        </div>
        `
})

const app = new Vue({
    el: '#app',

    data: {
        originalText: '',
        lowerCaseAttribute: {
            idText: 'lowerCase',
            name: 'Minúsculas',
            textTitle: 'Copiar texto en Minúsculas',
            nameTitle: 'Convierte todo el texto en minúsculas',
        },
        upperCaseAttribute: {
            idText: 'upperCase',
            name: 'Mayúsculas',
            textTitle: 'Copiar texto en Mayúsculas',
            nameTitle: 'Convierte todo el texto en mayúsculas',
        },
        capitalizedAttribute: {
            idText: 'capitalized',
            name: 'Capitalizado',
            textTitle: 'Copiar texto Capitalizado',
            nameTitle: 'Convierte la primera letra de cada palabra en mayúscula',
        }
    },
    computed: {
        lowerCase: function () {
            return this.originalText.toLowerCase();
        },
        upperCase: function () {
            return this.originalText.toUpperCase();
        },
        capitalized: function () {
            return this.originalText.replace(/(?:^|\s|["'([{])+\S/g, function(l){ return l.toUpperCase() });
        }
        
    },
})

