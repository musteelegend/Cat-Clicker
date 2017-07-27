var ViewModel = function() {
    var self = this
    this.currentCat = ko.observable( new Cat({
        clickCount: 0,
        name: 'Tabby',
        imageSrc: 'images/cat1.jpg',
        nicknames: ['Crazy Whiskers', 'One Eyes Cat', 'Cat WithManBalls']

    }) );

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };
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