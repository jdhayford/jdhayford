# Popping the Hood on Video Streaming

A couple of years ago I was watching a sports stream and got to thinking. Not about the website's questionable legality, strange domain name or borderline offensive sidebar ads. Oh no, I was ready to a peek behind the black box that has delivered hours and hours of rom-coms, compilations of dads catching foul balls and Star Wars fan theories.

Like so many quests for knowledge, this one began by cracking open the Developer sidebar. Well these ol' moving pictures gotta come from somewhere right? So let's hop on over to the network tab to see whats going on.

> Before we start, I would prefer not to designate a DMCA agent just for this post (an old side-project, [Deja](/projects#deja), already wades in shady waters) so I will be using a simple Twitch "sports" stream as my example.

<video src='https://www.jdhayford.io/videos/blogs/video-1.mp4' alt='Demo of Network Requests in Developer Sidebar' autoPlay loop muted>

Well that certainly looks active. We can see new requests being made every second but what we notices is that there are GET requests to some files either ending in `.ts` or `.m3u8`. Let's take a look at a request for a `.ts` file: 

`GET https://video-edge-8c7268.mia02.abs.hls.ttvnw.net/v1/segment/CooFP2R-...etc...brAeZag.ts`

<img class='small' src='https://jdhayford.io/images/request-body.png' alt='request body, it is binary encoded into UTF-8, and its not pretty'>

So actually if you look closely you'll notice `G@` which is commonly used with - just messing around, this is clearly a binary file in mortal tongue (the `Content-Type` header from the response is `application/octet-stream`). Let's see what our file system thinks of it.

<img  src='https://jdhayford.io/images/file-row.png' alt='.ts file in the file browser, showing its suggested file type'>

Now we notice that the file system recognizes this `.ts` file extension as a "MPEG-2 Transport Stream". Now if you aren't familiar with MPEG, it stands for Moving Pictures Experts Group which is the working group that brought us neat things like the MP3 and MP4 (you can learn more about the group, the invention of MP3 and all of the drama involved in [How Music Got Free](https://www.amazon.com/How-Music-Got-Free-Obsession/dp/0143109340)).

A quick wikipedia sesh of "MPEG-2" reveals to us that it is the generic coding of ~~moving pictures and associated audio information~~ video.  Our second trip to wiki tells us that "Transport Stream" is just a fancy digital container for transmission of different audio and video codecs over unreliable means. Also the starting sync byte is 0xff000000 ... remember that `G` from before?

When we open the file our default video player takes over and gives us this:

<video src='https://www.jdhayford.io/videos/blogs/segment-example.mp4' alt='Demo of MPEG-2 transport stream' autoPlay loop muted>

2 seconds of glorious video! So the player is requesting a whole bunch of these tiny videos and stitching them together to make our stream. But this is no time to celebrate, we're not done here. We still have 2 big questions:

- a) Why are the video segments so short?
- b) How does the video player find all of these segments and put them together?

Some of you smarty pants might already have a guess or two for a) but we're going to save that for dessert, leaving us with b). So how does the player know what to do?

This brings us back to those `.m3u8` requests. A quick wikipedia gets us something called "M3U" which is described as such:

> (MP3 URL or Moving Picture Experts Group Audio Layer 3 Uniform Resource Locator in full) is a computer file format for a multimedia playlist.

Well that sounds promising, let's take a peek at one:

`GET https://video-weaver.mia02.hls.ttvnw.net/v1/playlist/CooFC7G6yWcazgZqDN...etc...tg_EN-uv938sqw.m3u8`

<img src='https://jdhayford.io/images/raw-playlist.png' alt='request body including the content of an m3u8 file'>

Hey would you look at that, its just a plain text file. This is actually really reasonable. We can see some cool metadata all prefixed with `EXT-X-`. Fun fact, the well known American rapper and songwriter DMX claims these files motivated his hit single "EXT gon' give it to you"  (sorry).

The most interesting part of this file is the latter half where we see a list of a bunch of links. Actually if you look close, those links look a whole lot like the one we tracked to get that video segment earlier. And the number in `#EXTINF:2.000,live` matches here roughly to the duration of that segment. Neato! 

Now we know that these files definitely act as playlists for the stream. The problem here is that we only see a handful of 2 second segments here, and its not like our stream is just ending. So where are the next segments? Time to check out that network activity again.

<img src='https://jdhayford.io/images/m3u-repeats.png' alt='network history filtering for m3u, showing repeated requests to the same url'>

The same URL huh? Lets take a look at some of the responses.

<img src='https://jdhayford.io/images/playlist-timeline.png' alt='3 consecutive results of requests for the playlist file, showing the changes between them as the video segments slide up several places each time'>

So that's the trick. The playlist is constantly updated and essentially serves as a "sliding window" of the most recent part of the stream. The `EXT-X-MEDIA-SEQUENCE` tag now makes quite a bit of sense as it give us an explicit way of determining how to order the playlists/manifests. All a player needs to do is poll this url on some interval to find if there are any new segments that it should fetch and queue up.

Now we know that the player runs off of a manifest file that is constantly updated, but how did we get this manifest url in the first place? In fact, how does a video player do things like allow us to change the quality/resolution of our stream?

Let's take a look at where it all began, the very first `.m3u8` request.

`GET https://usher.ttvnw.net/api/channel/hls/cyberlivearena11.m3u8`

<img src='https://jdhayford.io/images/master-manifest.png' alt='content of a master manifest request'>

Jackpot! This manifest is very different from the ones we've seen so far, in fact it is called the "master" manifest. Instead of a playlist of video segments, it serves as a playlist of other stream manifests. Looking at the metadata tags, we can see things like the resolution (`RESOLUTION=1280x720`), frame rate (`FRAME-RATE=30.000`), and name (`NAME="720p"`) of each stream option! Those name happen to be what the player uses to populate its quality menu.

<img class='tiny' src='https://jdhayford.io/images/quality-options.png' alt='video quality menu with different options like 720p and 480p'>

It even includes the bandwidth (`BANDWIDTH=2350314` aka bitrate) of each stream. This is super useful because your player can use with it with your network speed to determine what stream to use for you (hence the "Auto" option above), thats adaptive bit rate (ABR) streaming folks.

So there you have it folks, we've solved the case, to turn a video player into a stream all it needs is a manifest (and sometimes a library depending on the browser/platform). Now we'll do some rapid fire Q&A to solidify and add context to all new tidbits.


### Is all video streaming done like this, using these `.m3u8` and `.ts` files?

> Definitely not, but it is the most common. This particular technique is conveniently called [HLS (HTTP Live Streaming)](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) and was developed by Apple in 2009. The second most used method is called [DASH (Dynamic Adaptive Streaming over HTTP)](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP). I chose to use HLS here not only because it is the most pervasive, but also because the pure text manifests provide great visibility into how the bacon gets made.

### Is HLS only for video streams?

> Nuh-uh! Remember a transport stream is a "fancy digital container for transmission of different audio and video codecs". This hints that they can also be used to transmit segments of an audio stream, and manifests still get give us all of the same bells and whistles we talked about eariler.

### Is HLS only for live streams?

> Nope! It can easily be used for On Demand content. Instead of a constantly updating sliding window playlist, it just takes a single constant manifest that can provide us all of the segments or a master manifest to provide different quality streams of the content.

### Why are the segments so short?

> Ah so you remembered!


And this brings our lovely [yak-shaving](https://dev.to/dance2die/shaving-yak-4g2m) session to a close. Now we should all have a much better idea of how video streaming works. 