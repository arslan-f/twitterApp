var users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [{
                text: 'I admit to judging books by their cover',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Starship to the moon',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'Out on launch pad, engine swap underway',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    },
    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [{
                text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Should I start tweeting memes? Let me know in a comment.',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'In 2020, I read a book every hour.',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    }
}



var mainContainer = document.querySelector('.main-container');
var header = document.querySelector('.header');
var coverPhotoContainer = document.querySelector('.cover-photo-container');
var profilePhoto = document.querySelector('.profile-photo')
var profileDetailsContainer = document.querySelector('.profile-details-container');
var tweetsContainer = document.querySelector('.tweets-container');

var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('user'));
console.log(users.user1);
console.log(users[urlParams.get('user')]);

var selectedUser = users[urlParams.get('user')] || users.user1;




header.innerHTML = `
    <h2 class='display-name'>${selectedUser.displayName} ✅</h2>
    <p class='tweets-count'>${selectedUser.tweets.length} tweets</p>
    `;
coverPhotoContainer.setAttribute('style', `background: url(${selectedUser.coverPhotoURL}) no-repeat; background-size:contain;`);
profilePhoto.src = selectedUser.avatarURL;

profileDetailsContainer.innerHTML = `
    <div class='profile-details'>
        <h2 class='display-name'>${selectedUser.displayName} ✅</h2>
        <p class='user-name'>${selectedUser.userName}</p>
        <p class='joined-date'>📆 ${selectedUser.joinedDate}</p>
        <div class='follow-following'>
            <p class='following-count'><span>${selectedUser.followingCount}</span> Following</p>
            <p class='follower-count'><span>${convertToInternationalCurrencySystem(selectedUser.followerCount)}</span> Followers</p>
        </div>
    </div>
    <div><button class='btn-follow'>Following</button></div>
    `



var counting = 0;
selectedUser.tweets.forEach(function (tweet) {
    var tweetBox = document.createElement('div');
    tweetBox.classList.add('tweet-box');


    tweetBox.innerHTML = `
        
            <div><img class='profile-photo' src=${selectedUser.avatarURL}></div>
            <div class='tweet-and-actions'>
                <div class='names'>
                    <h2 class='display-name'>${selectedUser.displayName} ✅</h2>
                    <p class='user-name'>${selectedUser.userName}</p>
                    <p class='user-name'>${timeAgo(new Date(tweet.timestamp))}</p> 
                </div>
                <div class='tweet'><p>${tweet.text}</p></div>
                <div class='actions'>
                    <p class='comment'>💬 1k </p>
                    <p class='retweet'>🔄 2.4k</p>
                    <p class='like'>♡0</p>
                    <p class='share'>Share</p>
                </div>
            </div>
            <div class='option'><p>⚙️</p></div>
        
        `
    counting++;
    tweetsContainer.appendChild(tweetBox)
})




//Imported functions

function convertToInternationalCurrencySystem(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ?
        (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        :
        Math.abs(Number(labelValue)) >= 1.0e+6

        ?
        (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
        // Three Zeroes for Thousands
        :
        Math.abs(Number(labelValue)) >= 1.0e+3

        ?
        (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

        :
        Math.abs(Number(labelValue));

}

function timeAgo(d) {
    const diff = (new Date() - d) / 1000;
    if (diff < 60) {
        const v = Math.round(diff)
        return v + ' second' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60) {
        const v = Math.round(diff / 60)
        return v + ' minute' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24) {
        const v = Math.round(diff / (60 * 60))
        return v + ' hour' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24 * 30.436875) {
        const v = Math.round(diff / (60 * 60 * 24))
        return v + ' day' + (v === 1 ? '' : 's') + ' ago';
    } else if (diff < 60 * 60 * 24 * 30.436875 * 12) {
        const v = Math.round(diff / (60 * 60 * 24 * 30.436875))
        return v + ' month' + (v === 1 ? '' : 's') + ' ago';
    }
    const v = Math.round(diff / (60 * 60 * 24 * 30.436875 * 12))
    return v + ' year' + (v === 1 ? '' : 's') + ' ago';
}