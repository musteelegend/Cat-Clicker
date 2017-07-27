$(function() {
    var model = {
        currentCat: null,
        cats: [],
        init: function() {
            this.cats = [
                {
                    clickCount : 0,
                    name : 'Tabby',
                    imgSrc : 'images/cat1.jpg'
                },
                {
                    clickCount: 0,
                    name : 'Teddy',
                    imgSrc : 'images/cat2.jpg'
                },
                {
                    clickCount : 0,
                    name : 'John McCat',
                    imgSrc : 'images/cat3.jpg'
                },
                {
                    clickCount : 0,
                    name : 'Sweetie',
                    imgSrc : 'images/cat4.jpg'
                },
                {
                    clickCount : 0,
                    name : 'Black Beauty',
                    imgSrc : 'images/cat5.jpg'
                }
            ];
            this.currentCat = this.cats[0];

        }
    };

    /* ======= Octopus ======= */

    var octopus = {

        init: function() {
            // set our current cat to the first one in the list
            model.init();

            // tell our views to initialize
            catListView.init();
            catView.init();
            adminView.init();
        },
        getCurrentCat: function() {
            return model.currentCat;
        },

        updateCurrentCat: function(name, image, clickCount) {
            var cat = model.currentCat;
            cat.name = name;
            cat.image = image;
            cat.clickCount = clickCount;

            catView.render();
            catListView.render();
        },

        getCats: function() {
            return model.cats;
        },

        // set the currently-selected cat to the object passed in
        setCurrentCat: function(cat) {
            model.currentCat = cat;
            catView.render();
        },

        // increments the counter for the currently-selected cat
        incrementCounter: function() {
            model.currentCat.clickCount++;
            catView.render();
        }
    };


    /* ======= View ======= */

    var catView = {

        init: function() {
            // store pointers to our DOM elements for easy access later
            this.$catNameElem = $('#cat-name');
            this.$catImageElem = $('#cat-img');
            this.$countElem = $('#cat-count');

            // on click, increment the current cat's counter
            this.attachEventListener();

            // render this view (update the DOM elements with the right values)
            this.render();
        },
        render: function() {
            // update the DOM elements with values from the current cat
            var cat = octopus.getCurrentCat();
            this.$catImageElem.attr('src', cat.imgSrc);
            this.$countElem.text(cat.clickCount);
            this.$catNameElem.text(cat.name);
        },
        attachEventListener: function() {
            this.$catImageElem.click(function() {
                octopus.incrementCounter();
            });
        }
    };

    var catListView = {

        init: function() {
            // store the DOM element for easy access later
            this.$catListElem = $('#cat-list');

            // render this view (update the DOM elements with the right values)
            this.render();
        },

        render: function() {
            // get the cats we'll be rendering from the octopus
            var cats = octopus.getCats();

            // empty the cat list
            this.$catListElem.empty();

            // loop over the cats
            for (var i = 0; i < cats.length; i++) {
                // this is the cat we're currently looping over
                var cat = cats[i];

                // make a new cat list item and set its text
                var elem = $('<h3><li class="listing"></li></h3>');
                elem.text(cat.name);

                // on click, setCurrentCat and render the catView
                // (this uses our closure-in-a-loop trick to connect the value
                //  of the cat variable to the click event function)
                elem.click((function(cat) {
                    return function() {
                        octopus.setCurrentCat(cat);
                    }
                })(cat));

                // finally, add the element to the list
                this.$catListElem.append(elem);
            }
        }
    };

    var adminView = {

        init: function() {
            this.$adminButton = $('#admin-button');
            this.$adminForm = $('#admin-form');
            this.$saveButton = $('#save');
            this.$cancelButton = $('#cancel');

            this.$nameInput = $('#name');
            this.$imgSrcInput = $('#imgSrc');
            this.$clickCountInput = $('#clickCount');

            this.attachEventListeners();
        },

        attachEventListeners: function() {
            var thisView = this;

            this.$adminButton.click(function() {
                thisView.showForm();
            });

            this.$cancelButton.click(function() {
                thisView.hideForm();
            });

            this.$saveButton.click(function() {
                thisView.saveForm();
            });
        },

        hideForm: function() {
            this.$adminForm.addClass('hidden');
            this.clearForm();
        },

        showForm: function() {
            this.populateForm();
            this.$adminForm.removeClass('hidden');
        },

        clearForm: function() {
            this.$nameInput.val('');
            this.$imgSrcInput.val('');
            this.$clickCountInput.val('');
        },

        saveForm: function() {
            var name = this.$nameInput.val(),
                imgSrc = this.$imgSrcInput.val(),
                clickCount = this.$clickCountInput.val();
            this.hideForm();
            octopus.updateCurrentCat(name, imgSrc, clickCount);
        },

        populateForm: function() {
            var cat = octopus.getCurrentCat();

            this.$nameInput.val(cat.name);
            this.$imgSrcInput.val(cat.imgSrc);
            this.$clickCountInput.val(cat.clickCount);
        }
    };

    // make it go!
    octopus.init();
});