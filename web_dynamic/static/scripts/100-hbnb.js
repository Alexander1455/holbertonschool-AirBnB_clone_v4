// Script that is executed only when DOM is loaded with jQuery

// Objeto para almacenar los checkboxes seleccionados
let checked_box = {};

// Espera a que el DOM esté listo
$(document).ready(function () {
    // Maneja el cambio en los checkboxes
    $('input:checkbox').change(function () {
        // Verifica si el checkbox está marcado
        if ($(this).is(':checked')) {
            // Agrega el elemento al objeto checked_box con su ID y nombre
            checked_box[$(this).data('id')] = $(this).data('name');
        } else {
            // Elimina el elemento del objeto checked_box por su ID
            delete checked_box[$(this).data('id')];
        }
        // Actualiza el contenido de la sección de comodidades en el HTML
        $('div.amenities h4').html(function () {
            let amenities = [];
            // Itera a través de los elementos seleccionados y los agrega a la lista de comodidades
            Object.keys(checked_box).forEach(function (key) {
                amenities.push(checked_box[key]);
            });
            if (amenities.length === 0) {
                return '&nbsp';
            }
            return amenities.join(', ');
        });
    });
});

