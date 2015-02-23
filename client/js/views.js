// Art View

var ArtView = Backbone.View.extend({
  template: _.template(template.homeItem),
  tagName: 'article',
  initialize: function () {
    console.log(this.el)

  },
  events: {
    'mouseover .backimg': 'showInfo',
    'mouseout article': 'hideInfo',
    'click .backimg': 'showBidView',
    'click .deleteItem': 'removeListing',
    'click .bidView img': 'showTinyView',
    'click .bidItem': 'bidOnListing',
  },
  showInfo: function () {
    this.$el.find('.INFO').show();
    console.log(this)
  },
  hideInfo: function () {
    this.$el.find('.INFO').hide();
  },
  showBidView: function ()  {
    this.$el.find('.bidView').toggleClass('show')
    $('.tinyView').toggleClass('hide')

    this.startCountdown()

  },
  startCountdown: function () {
    //Clock view
    var bidTime = this.model.attributes.endx;
    var self = this;

    var clock = $('.your-clock').FlipClock({
      countdown: true,
      clockFace: 'MinuteCounter',
      callbacks: {
        stop: function() {
          self.removeListing()
        }
      }
    });
    clock.setTime(bidTime);
    clock.start();
  },
  showTinyView: function () {
    this.$el.find('.bidView').toggleClass('show')
    $('.tinyView').toggleClass('hide')
  },
  render: function () {
    console.log(this.el);
    var markup = this.template(this.model.toJSON())
    this.$el.html(markup)

    return this;

  },
  removeListing: function () {
    this.model.destroy();
    this.$el.remove();
    $('.tinyView').toggleClass('hide')
    console.log('delete sent to server!')
  },
  bidOnListing: function (e) {
    // e.preventDefault()

    var bidsArr = this.model.attributes.bids
    bidsArr.push(this.model.attributes.bid_amount)
    console.log(bidsArr)

    var total = bidsArr.reduce(function(a, b) {
      return a + b;
    });

    console.log(total)

    this.model.set({
      bid: bidsArr,
      bidder: localStorage.name,
      total_amount: total
    })

    this.model.save();

    var self = this

    var start = self.model.attributes.starting

    var theTotal = total;
    $('.bidItem').click(function(){
      newTotal = self.model.attributes.bid_amount

      console.log(newTotal)
      theTotal += newTotal;
        self.model.set({
          bid: bidsArr,
          bidder: localStorage.name,
          total_amount: total
        })
      $('.total_amount').text("Total: "+theTotal);
    });

    $('.total_amount').text("Total: "+theTotal);

    // var newBid = {
    //   amount: this.$el.find('.bidAmount').attr('ref'),
    //   title: this.$el.find('.title').attr('ref'),
    //   bidder: localStorage.name,
    //   time: moment(),
    //   auction_id: this.$el.find('article').eq(0).data('artid')
    // }
    // console.log(this.el)
    // var newModelBid = new BidModel(newBid)
    // var bidPromise = newModelBid.save();
    // $.when(bidPromise).then(function(val) {
    //   console.log(val)
    // })
    console.log(this.$el.find('article').eq(0).data('artid'))
  }
});

//Collection View

var AppView = Backbone.View.extend({
  el: $('section'),
  initialize: function () {
    console.log('app view initialized')
    this.addAllListings();
  },
  events: {
    'click .createListing': 'createListing',
    'click #addButton': 'toggleForm'
  },
  toggleForm: function (event) {
    this.$el.find('#newProduct').toggleClass('show');
    console.log('shown')
  },

  createListing: function (e) {
    e.preventDefault();
    var newAuction = {
      art: newModelArt,
      title: $('#newProduct').find('input[name="newTitle"]').val(),
      startx: moment(),
      endx: moment().hours($('#newProduct').find('input[name="newEndx"]').val()),
      amount: $('#newProduct').find('input[name="bidAmount"]').val(),
      startingbid: $('#newProduct').find('input[name="newStartingBid"]').val()
    };

    var newModelAuction = new AuctionModel(newAuction);

    var newListing = {
      auction: newModelAuction,
      title: $('#newProduct').find('input[name="newTitle"]').val(),
      description: $('#newProduct').find('input[name="newDescription"]').val(),
      artist: $('#newProduct').find('input[name="newArtist"]').val(),
      image_url: $('#newProduct').find('input[name="newImage"]').val(),
      dimensions: $('#newProduct').find('input[name="newDimensions"]').val(),
      startingbid: $('#newProduct').find('input[name="newStartingBid"]').val(),
      bid_amount: parseInt($('#newProduct').find('input[name="bidAmount"]').val()),
      endx: $( ".newEndx option:selected" ).attr('ref'),
    };

    var endTime = $( ".newEndx option:selected" ).attr('ref')
    console.log(endTime)

    // create art object
    var newModelArt = new ArtModel(newListing)
    var artPromise = newModelArt.save();
    // var artid = newModelArt.get("id");
    // newModelArt.attributes.id = artid;
    // this.collection.add(newModelArt)
    var self = this
    $.when(artPromise).then(function(val) {
      console.log(val)
      var artid = newModelArt.get("id");
      newModelArt.attributes.id = artid;
      self.collection.add(newModelArt)
      // newModelAuction.save();
      self.addOneListing(newModelArt); // alternative method
    })

    // create auction
    // newModelAuction.save();

    this.$el.find('#newProduct').find('input', 'textarea').val('');
    this.toggleForm();

  },
  addOneListing: function (listing, idx, arr) {
    var artView = new ArtView({model: listing})
    this.$el.append(artView.render().el)
  },
  addAllListings: function () {
    _.each(this.collection.models, this.addOneListing, this)

  }
});
