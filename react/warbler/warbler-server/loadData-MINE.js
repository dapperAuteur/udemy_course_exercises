const db = require("./models");
const faker = require("faker");

function hipsterMessages() {
  const HIPSTER = `Selvage mustache pop-up man bun hexagon, tattooed gastropub four loko flannel lo-fi. Direct trade activated charcoal everyday carry, post-ironic pok pok keytar skateboard hammock live-edge organic flexitarian 90's lumbersexual. Put a bird on it humblebrag unicorn, twee occupy chicharrones whatever tousled etsy mustache you probably haven't heard of them. Taxidermy 90's lomo, kale chips sartorial chicharrones cliche poutine. Neutra viral poutine, fap XOXO four loko edison bulb VHS fingerstache man braid hot chicken selfies small batch kale chips chambray. Pug semiotics before they sold out, ugh bespoke bitters ramps authentic. Microdosing kombucha listicle, tbh schlitz celiac vape gastropub woke air plant.

microdosing. La croix meh vape street art, artisan wayfarers ennui mixtape.
`;

  var hipWords = HIPSTER.replace(/\n/ig, ' ').replace(/  /ig, ' ').split(' ');
  var hipArr = [];
  var curStr = '';
  for (var i = 0; i < hipWords.length; i++) {
    if (`${curStr} ${hipWords[i]}`.length > 150) {
      hipArr.push(curStr);
      curStr = hipWords[i];
    } else {
      curStr = `${curStr} ${hipWords[i]}`;
    }
  }

  return hipArr;
}

function profileImageUrls() {
  urls = [];
  for (let i = 0; i < 100; i++) {
    if (i < 10) {
      urls.push(`https://randomuser.me/api/portraits/lego/${i}.jpg`);
    }
    urls.push(`https://randomuser.me/api/portraits/women/${i}.jpg`);
    urls.push(`https://randomuser.me/api/portraits/men/${i}.jpg`)
  }
  return urls;
}

function createUsers() {
  const password = 'password';
  const profileImages = profileImageUrls();
  const randomImage = () => profileImages[Math.floor(Math.random() * profileImages.length)];
  var emails = new Set();
  var usernames = new Set();
  var images = new Set();
  let promises = [];
  for(var i = 0; i < 100; i++) {
    var email = faker.internet.email();
    while(emails.has(email)) {
      var randomNum = Math.floor(Math.random() * 5000) + 99;
      email = `${randomNum}${email}`;
    }
    emails.add(email);

    var username = faker.internet.userName();
    while(usernames.has(username)) {
      var randomNum = Math.floor(Math.random() * 5000) + 99;
      username = `${username}${randomNum}`;
    }
    usernames.add(username);
    let profileImageUrl = randomImage();

    promises.push(db.User.create({email, username, password, profileImageUrl}));
  }

  Promise.all(promises).then(users => {
    let promises = [];
    const messages = hipsterMessages();
    for (var i = 0; i < messages.length; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      var p = db.Message.create({text: messages[i], userId: user.id})
        .then(message => {
          const user = users.find(u => u.id === message.userId.toString());
          user.messages.push(message.id);
          return user.save();
        });
      promises.push(p);
    }

    Promise.all(promises).then(() => {
      console.log("Your data was loaded successfully!")
      process.exit();
    }).catch(console.warn);
  });

}

console.log("Creating users and messages");
createUsers();
