var template = {};

template.homeItem = [
  '<article class="tinyView col-md-3" data-artid="<%= id %>">',
  '<a href="#art/<%= title %>"><div class="backimg" style="background-image: url(<%= image_url %>)">',
  '<h3 class="INFO"><%= artist %></h3>',
  '<h3 class="title INFO" ref="<%= title %>"><%= title %></h3>',
  // '<h3 class="INFO">$<%= latestBidAmount %></h3>',
  '</div></a>',
  '</article>',
  '<article class="bidView col-md-8 col-md-offset-2">',
  '<h2><%= title %></h2>',
  '<img class="fullbackimg" src="<%= image_url %>">',
  '<div class="bid-info">',
  '<div class="your-clock"></div>',
  '<button class="bidItem btn btn-default"><i class="fa fa-hand-o-up"></i> Bid</button>',
  '<h3><%= artist %></h3>',
  '<h3><%= startingbid %></h3>',
  '<h3 class="bidder" ref="<%= bidder %>"><%= bidder %></h3>',
  '<h3 class="total_amount" ref="<%= total_amount %>">$<%= total_amount %></h3>',

  '<h3 class="bidAmount" ref="<%= bid_amount %>">$<%= bid_amount %></h3>',

  // '<h3>$<%= startingbid %></h3>',
  '<p><%= description %></p>',
  '<p><%= dimensions %></p>',
  '<button class="deleteItem btn btn-default btn-sm">Delete Item</button>',
  '</div>',
  '</article>'
].join("");
