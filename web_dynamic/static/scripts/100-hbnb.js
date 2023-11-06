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

	// Obtiene el estado de la API
    const apiStatus = $('DIV#api_status');
    $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
        if (data.status === 'OK') {
            // Agrega la clase 'available' si la API está en funcionamiento
            apiStatus.addClass('available');
        } else {
            // Elimina la clase 'available' si la API no está en funcionamiento
            apiStatus.removeClass('available');
        }
    });

	// Maneja el clic en el botón de búsqueda
	$('button').click(function () {
		const requestData = JSON.stringify({ amenities: Object.keys(checked_box) });

		// Realiza una solicitud POST a places_search con las comodidades seleccionadas
		$.ajax({
			type: 'POST',
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			contentType: 'application/json',
			data: requestData,
			success: function (data) {
				$('.places').empty(); // Limpia el contenido antes de agregar nuevos resultados
				for (let currentPlace of data) {
					// Agrega los resultados de la búsqueda al HTML
					$('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class "number_bathrooms"> <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"> Owner: ' + currentPlace.user_id + '</div><div class="description">' + currentPlace.description + '</div></article>');
				}
			}
		});
	});
});

