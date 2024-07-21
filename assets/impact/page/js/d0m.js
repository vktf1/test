(function(){"use strict";

    window.d0m = function(input){
        return new D0m(input);
    }

    var parser = new DOMParser();

    window.d0m.html = function(html){
        var htmlNode = parser.parseFromString(html, 'text/html');
        return d0m(htmlNode.body.firstChild);
    };

    window.d0m.create = function(element, attributes, child){
        var node = document.createElement(element);
        if(attributes){
            for(var attrib in attributes){
                node.setAttribute(attrib, attributes[attrib]);
            }
        }
        if(child || child === 0){
            if(child instanceof Array){
                for(var i = 0; i < child.length; ++i){
                    node.appendChild(getElement(child[i]));
                }
            }
            else if(child instanceof jQuery || child instanceof D0m || child instanceof Element)
                node.appendChild(getElement(child));
            else{
                node.textContent = child.toString();
            }
        }
        return $(node);
    };

    window.D0m = function(input){
        if(input instanceof D0m){
            return input;
        }

        if(input instanceof jQuery){
            if(input.length > 1){
                throw new Error("DomWrapper attempted to store more than one element");
            }
            if(input.length == 1){
                this[0] = input[0];
            }
            this.length = input.length;
        }
        else{
            if(typeof input == "string"){
                input = document.querySelector(input);
            }

            if(input &&
                (input instanceof Element || input instanceof Document || input instanceof Window)){
                this[0] = input;
                this.length = 1;
            }
            else{
                this.length = 0;
            }
        }
    }



    D0m.prototype = {

        parent: function(){
            // TODO: Implement
        },
        find: function(query){
            if(!this.length) return this;
            var node = this[0].querySelector(query);
            return d0m(node);
        },

        hasClass: function(name){
            return $(this[0]).hasClass(name);
        },
        addClass: function(name){
            return $(this[0]).addClass(name);
        },

        append: function(child){
            if(!this.length) return;
            var element = getElement(child);
            if(element) this[0].appendChild(element);
        },
        prepend: function(child){
            if(!this.length) return;
            var element = getElement(child);
            if(element) this[0].insertBefore(element, this[0].firstChild);
        },
        before: function(child){
            if(!this.length) return;
            var element = getElement(child);
            if(!element) return;
            var parent = this[0].parentElement;
            parent.insertBefore(element, this[0]);
        },

        remove: function(){
            if(!this.length) return;
            this[0].parentNode.removeChild(this[0]);
        },


        html: function(string){
            if(!this.length) return;
            this[0].innerHTML = string;
        },
        attr: function(attribute, value){
            if(!this.length) return;
            if(value === undefined){
                return this[0].getAttribute(attribute);
            }
            this[0].setAttribute(attribute, key);
        },

        css: function(){
            // TODO: Implement
        },

        val: function(){
            if(!this.length) return;
            return this[0].value;
        },


        focus: function(){
            if(!this.length) return;
            this[0].focus();
        },
        blur: function(){
            if(!this.length) return;
            this[0].blur();
        },

        bind: function(){
            // TODO: Implement
        },
        unbind: function(){
            // TODO: Implement
        }

    }


    // Helper Methods

    function getElement(input){
        if(input instanceof D0m)
            return input[0];
        else if(input instanceof jQuery)
            return input[0];
        else if(input instanceof Element)
            return input;
        return null;
    }

})();

