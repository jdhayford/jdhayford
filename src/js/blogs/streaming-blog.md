# Popping the Hood on Video Streaming

A couple of years ago I was watching a sports stream and got to thinking. Not about the website's questionable legality, strange domain name or borderline offensive sidebar ads. Oh no, I was ready to a peek behind the black box that has delivered hours and hours of rom-coms, compilations of dads catching foul balls and Star Wars fan theories.

Like so many quests for knowledge, this one began by cracking open the Developer sidebar. Well these ol' moving pictures gotta come from somewhere right? So lets hop on over to the network tab to see whats going on.

> Before we start, I would prefer not to designate a DMCA agent just for this post (an old side-project, [Deja](/projects#deja), already wades in shady waters) so I will be using a simple Twitch "sports" stream as my example.

<video src='https://www.jdhayford.io/videos/blogs/video-1.mp4' alt='Demo of Network Requests in Developer Sidebar' autoPlay loop muted>

Well that certainly looks active. We can see new requests being made every second but what we notices is that there are GET requests to some files either ending in `.ts` or `.m3u8`. Lets take a look at one of requests to the following url: 

`https://video-edge-8c7268.mia02.abs.hls.ttvnw.net/v1/segment/CooFP2R-...etc...brAeZag.ts`


<img class='small' src='https://jdhayford.io/images/request-body.png'>


So actually if you look closely you'll notice `G@` which is commonly used with - just messing around, this is clearly a binary file in mortal tongue (the `Content-Type` header from the response is `application/octet-stream`). Lets see what our file system thinks of it.

<img src='https://jdhayford.io/images/file-row.png'>

Now we notice that the file system recognizes this `.ts` file extension as a "MPEG-2 Transport Stream". Now if you aren't familiar with MPEG, it stands for Moving Pictures Experts Group which is the working group that brought us neat things like the MP3 and MP4 (you can learn more about the group, the invention of MP3 and all of the drama involved in [How Music Got Free](https://www.amazon.com/How-Music-Got-Free-Obsession/dp/0143109340)).

A quick wikipedia sesh of "MPEG-2" reveals to us that it is the generic coding of ~~moving pictures and associated audio information~~ video.  Our second trip to wiki tells us that "Transport Stream" is just a fancy digital container for transmission of different audio and video codecs. over unreliable means (also the starting sync byte is 0xff000000 ... remember that G?).

When we open the file our default video player takes over and gives us this:

<video src='https://www.jdhayford.io/videos/blogs/segment-example.mp4' alt='Demo of MPEG-2 transport stream' autoPlay loop muted>

2 seconds of glorious video! So the player is requesting a whole bunch of these tiny videos and stitching them together to make our stream. But this is no time to celebrate, we're not done here. We still have 2 big questions:

- a) Why are the video segments so short?
- b) How does the video player find all of these segments and put them together?

Some of you smarty pants might already have a guess or two for a) but we're going to save that for dessert, leaving us with b). So how does the player know what to do?

This brings us back to those `.m3u8` requests. Lets take a peek in one of these. 

> Placeholder: Picture of .m3u8 request

Hey would you look at that, its just a plain text file. This is actually pretty reasonable. We can see some cool metadata all prefixed with EXT. Fun fact, the well known rapper DMX claims these files motivated his hit single "EXT gon' give it to you" (sorry).

The most interesting part of this file is the latter half where we see a list of a bunch of links. Actually those links look a whole lot like the one we tracked to get that video segment earlier. And the number matches here roughly to the duration of the video. Neato! A quick wikipedia gets us something called M3U which is described as such:

> (MP3 URL[1][2] or Moving Picture Experts Group Audio Layer 3 Uniform Resource Locator[3] in full) is a computer file format for a multimedia playlist.


Cool so these files act as playlists of the video segments for the stream. But how does this static file update? Notice that the playlist seems like its the same location and it changes every time you get it. So at any point it includes the most recent N segments. And than all a web player would need to do is to continue to fetch this playlist and stich the newest seegments in.

Picture of a playlist and then again 5 seconds later, use figma to draw arrows to show where the same segment shows up.

Lets take a look at the very first playlist is.

Go into how this is a master playlist, which refers to others quality streams, which not only map to the quality options in the player but also talk about how these fancy players will look at how you're network is and can use these options to make sure you have a good playback experience aka can download content faster than you are watching it.