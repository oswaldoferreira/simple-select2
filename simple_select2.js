Select2 = {
    initialize: function (settings) {
        this.settings = settings;

        this.settings.elem.select2({
            createSearchChoice: function(term, data) {
                var dataFiltered = $(data).filter(function() {
                    var _text = this.text.toUpperCase(),
                        _term = term.toUpperCase(),
                        isEqual = _text.localeCompare(_term) === 0;
                    return isEqual;
                });
            },
            placeholder: this.settings.placeholder,
            minimumInputLength: 3,
            ajax: {
                url: this.settings.ajax_url,
                dataType: 'json',
                data: function (attribute_value, page) {
                    object = { page_limit: 10 }
                    object[Select2.settings.attribute_name] = attribute_value
                    return object;
                },
                results: function (data) {
                    results = [];
                    $.each(data, function(index, item){
                      results.push({
                        id: item.id,
                        text: item[Select2.settings.attribute_name]
                      });
                    });
                    return {
                        results: results
                    };
                }
            },

            dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
            escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
            });
    }
}