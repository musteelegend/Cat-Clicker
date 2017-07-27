var cats = [
                {
                    clickCount : 0,
                    name : 'Tabby',
                    imageSrc : 'images/cat1.jpg',
                    nicknames: ['Crazy Whiskers', 'One Eyes Cat', 'Cat WithManBalls']
                },
                {
                    clickCount: 0,
                    name : 'Teddy',
                    imageSrc : 'images/cat2.jpg'
                },
                {
                    clickCount : 0,
                    name : 'John McCat',
                    imageSrc : 'images/cat3.jpg'
                },
                {
                    clickCount : 0,
                    name : 'Sweetie',
                    imageSrc : 'images/cat4.jpg'
                },
                {
                    clickCount : 0,
                    name : 'Black Beauty',
                    imageSrc : 'images/cat5.jpg'
                }
            ];

var ViewModel = function() {
    var self = this

    this.catList = ko.observableArray([]);

    cats.forEach(function(catItem){
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat);
    }
};

var Cat = function(data) {
     this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imageSrc = ko.observable(data.imageSrc);
    this.nicknames = ko.observableArray(data.nicknames);


    this.level = ko.computed(function() {
        var title;
        if(this.clickCount() < 10){
            title = "infant";
        } else if (this.clickCount() < 15){
            title = "baby";
        }else if(this.clickCount() < 20){
            title = "teen";
        }
        return title;
    }, this);

};
ko.applyBindings(new ViewModel());