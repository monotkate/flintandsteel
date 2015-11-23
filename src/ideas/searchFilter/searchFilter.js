/* global angular */

angular.module('flintAndSteel')
.filter('search',
    [
        function() {
            "use strict";

            return function(items, searchTerm) {
                if (typeof searchTerm === "undefined" || searchTerm === '') {
                    return items;
                }
                var retArray = [];
                var re = /[.,-\/#!$%\^&\*;:{}=\-_`~()<>\'\"@\[\]\|\\\?]/g;
                items.map(function(item) {
                    var normalizedSearch = searchTerm.replace(re,"").toLowerCase();
                    var normalizedTitle = item.title.replace(re,"").toLowerCase();
                    var normalizedAuthor = item.author.name.replace(re,"").toLowerCase();
                    var normalizedAbstract = item.abstract.replace(re,"").toLowerCase();
                    if (normalizedTitle.indexOf(normalizedSearch) >= 0) {
                        retArray.push(item);
                    }
                    else if (normalizedAuthor.indexOf(normalizedSearch) >= 0) {
                        retArray.push(item);
                    }
                    else if (normalizedAbstract.indexOf(normalizedSearch) >= 0) {
                        retArray.push(item);
                    }
                });
                return retArray;
            };
        }
    ]
);
