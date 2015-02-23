var AppRouter = Backbone.Router.extend({
  initialize: function() {
    console.log("routes have started");
  },
  routes: {
    '': 'home',
    'gallery': 'gallery',
    'art/:id': 'artbid'
  },
  gallery: function() {
    var self = this;
    var art = new ArtCollection();
    people.fetch().then(function() {
     self.loadView(new appView({collection: art}));
    });
  },
  artbid: function() {
    var self = this;
    var art = new ArtModel();

    people.fetch({data: $.param({limit: 2})}).then(function() {
     self.loadView(new appView({collection: artCollection}));
    });
  },
  addStudent: function() {
    this.loadView(new addOneListing());
  },
  loadView: function(view) {
    this.view && this.view.remove();
    this.view = view;
  }
});
