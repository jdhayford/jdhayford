# Popping the Hood on Video Streaming

A couple of years ago I was watching a live sports stream (on a somewhat sketchy site) and got to thinking. Not about the website's questionable legality, strange domain name or borderline offensive sidebar ads. Oh no, I was finally ready to peek behind the black box that had given me hours and hours of rom-coms, compilations of dads catching foul balls and Star Wars fan theories, just to see what I could find out.

Like so many quests for knowledge, this one began by cracking open the Developer sidebar. These ol' moving pictures gotta come from somewhere right? So let's hop on over to the network tab to see what's in the pipes.

> Before we start, I would prefer not to designate a DMCA agent just for this post (an old side-project, [Deja](/projects#deja), already wades in shady waters) so I will be using a simple Twitch "sports" stream as my example.

<video src='https://www.jdhayford.io/videos/blogs/video-1.mp4' alt='Demo of Network Requests in Developer Sidebar' autoPlay loop muted>

Well that certainly looks active. We can see new requests being made every few seconds but what we notice is that there are a bunch of GET requests to some files either ending in `.ts` or `.m3u8`. Let's take a look at a request for a `.ts` file: 

`GET https://video-edge-8c7268.mia02.abs.hls.ttvnw.net/v1/segment/CooFP2R-...etc...brAeZag.ts`

<img class='small' src='https://jdhayford.io/images/request-body.png' alt='request body, it is binary encoded into UTF-8, and its not pretty'>

So actually if you look closely you'll notice `G@` which is commonly used with - just messing around, this is a binary file in mortal tongue (the `Content-Type` header from the response is `application/octet-stream`). Let's see what our file system thinks of it.

<img  src='https://jdhayford.io/images/file-row.png' alt='.ts file in the file browser, showing its suggested file type'>

Now we notice that the file system recognizes this `.ts` file extension as a "MPEG-2 Transport Stream". Now if you aren't familiar with MPEG, it stands for Moving Pictures Experts Group which is the working group that brought us neat things like the MP3 and MP4 (you can learn more about the group, the invention of MP3 and all of the drama involved in [How Music Got Free](https://www.amazon.com/How-Music-Got-Free-Obsession/dp/0143109340)).

A quick wikipedia sesh of "MPEG-2" reveals to us that it is the generic coding of ~~moving pictures and associated audio information~~ video.  Our second trip to wiki tells us that a "Transport Stream" is just a fancy digital container for transmission of different audio and video codecs over unreliable means. Also, the starting sync byte is 0xff000000 ... remember that `G` from before?

When we open the file, our default video player takes over and gives us this:

<video src='https://www.jdhayford.io/videos/blogs/segment-example.mp4' alt='Demo of MPEG-2 transport stream' autoPlay loop muted>

2 seconds of glorious video! So the player is requesting a whole bunch of these tiny videos and stitching them together to make our stream. But this is no time to celebrate, we're not done here. We still have 2 big questions:

- a) Why are the video segments so short?
- b) How does the video player find all of these segments and put them together?

Some of you smarty pants might already have a guess or two for a) but we're going to save that for dessert, leaving us with b). So how does the player know what to do?

This brings us back to those `.m3u8` requests. A quick wiki gets us something called "M3U" which is described as such:

> (MP3 URL or Moving Picture Experts Group Audio Layer 3 Uniform Resource Locator in full) is a computer file format for a multimedia playlist.

Multimedia playlist huh? That sounds promising, let's take a peek at one:

`GET https://video-weaver.mia02.hls.ttvnw.net/v1/playlist/CooFC7G6yWcazgZqDN...etc...tg_EN-uv938sqw.m3u8`

<img src='https://jdhayford.io/images/raw-playlist.png' alt='request body including the content of an m3u8 file'>

Hey, would you look at that, its just a plain text file. As a friend of mine once said, "looks like they just went and commented the whole thing out". Anyway, we can see some cool metadata all prefixed with `#EXT`. There are even some custom tags Twitch has added in the form of `EXT-X-TWITCH-*`. Fun fact, the well known American rapper and songwriter DMX claims these files motivated his hit single "EXT gon' give it to you"  (...nobody?).

The most interesting part of this file is the latter half where we see a list of a bunch of links. If you look close, these links look a whole lot like the one we tracked to get that video segment earlier, and the number in `#EXTINF:2.000,live` matches here roughly to its duration. Neato! 

Now we know that these files are what the player uses to find the video segments for the stream. The problem here is that we only see a handful of 2-second segments here, but our stream keeps on chugging along. So where are the next segments? Time to check out that network activity again.

<img src='https://jdhayford.io/images/m3u-repeats.png' alt='network history filtering for m3u, showing repeated requests to the same url'>

Either our player keeps on forgetting what was in that playlist, or that file is not as static as we may have thought. Let's take a look at some of the responses.

<img src='https://jdhayford.io/images/playlist-timeline.png' alt='3 consecutive results of requests for the playlist file, showing the changes between them as the video segments slide up several places each time'>

So that's the trick. The playlist is constantly being updated and serves as a "sliding window" of the most recent part of the stream. The `EXT-X-MEDIA-SEQUENCE` tag now makes quite a bit of sense as it gives us an explicit way of determining how to order the playlists/manifests, going from 39437 to 39440 to 39441 in the example. All a player needs to do is poll this url on some interval to find if there are any new segments that it should fetch.

Now we know that the player runs off of a manifest file that is constantly updated, but how did we get this manifest url in the first place? And just for fun, how does a video player do things like allow us to change the quality/resolution of our stream?

Let's take a look at where it all began, the very first `.m3u8` request.

`GET https://usher.ttvnw.net/api/channel/hls/cyberlivearena11.m3u8`

<img src='https://jdhayford.io/images/updated-master-manifest.png' alt='content of a master manifest request'>

Jackpot! This manifest is very different from the ones we've seen so far and is often called the "master" manifest. Instead of a playlist of video segments, it serves as a playlist of other stream manifests. Looking at the metadata tags, we can see things like the resolution `RESOLUTION=1280x720`, frame rate `FRAME-RATE=30.000`, and name `NAME="720p"` of each stream option! Those names are exactly what the player uses to populate its quality menu:

<img class='tiny' src='https://jdhayford.io/images/quality-options.png' alt='video quality menu with different options like 720p and 480p'>

It even includes the bandwidth/bitrate `BANDWIDTH=2350314` of each stream. This is super useful because your player can use it with your network speed to determine the best stream it can use without stopping (hence the "Auto" option above), which is also called adaptive bit rate (ABR) streaming.

So there you have it, folks, we've solved the case. The main ingredients for a stream is a player and a manifest (and sometimes a library depending on the browser/platform to help the player with the logistics, i.e. [hls.js](https://github.com/video-dev/hls.js/)). Now remember there is a world of streaming out there and this is only one example, so we'll do some rapid-fire Q&A to solidify our understanding and add context.


### Is all video streaming done like this, using these `.m3u8` and `.ts` files?

> Definitely not, but it is the most common. This particular technique is conveniently called [HLS (HTTP Live Streaming)](https://en.wikipedia.org/wiki/HTTP_Live_Streaming). It was developed by Apple in 2009 and by far the leader in Adaptive Bit Rate streaming. The second most used method is called [MPEG-DASH (Dynamic Adaptive Streaming over HTTP)](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP). DASH also uses the same general strategy of playlist files pointing to segments, however, its "playlists" are `.mpd` (media presentation description) files.

>  Other than `.mpd` files being XML (meh), DASH is codec and container format agnostic and just overall more flexible. It is also the first HTTP ABR method that is an international standard, unlike Apple's [HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming), Microsoft's [Smooth Streaming](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Microsoft_Smooth_Streaming), Adobe's [HDS](https://en.wikipedia.org/wiki/Adaptive_bitrate_streaming#Adobe_HTTP_Dynamic_Streaming), etc. 

> This may not come as a surprise to anyone, but MPEG-DASH is not supported by Safari/iOS. So if you want your DASH stream to get invited to Apple's walled garden party, you'll likely have to generate an HLS compliant `.m3u8` playlist.

> I chose to focus on an HLS example here not only because it is the most prevalent, but also because the pure text manifests provide the friendliest visibility (looking at you XML) into how the bacon gets made.

### Is HLS only for video streams?

> Nuh-uh! Remember a transport stream is a "fancy digital container for transmission of different audio and video codecs". This hints that they can also be used to transmit segments of an audio stream, and manifests still get give us all of the same bells and whistles we talked about earlier.

### Is HLS only for live streams (vs video on-demand aka VOD)?

> Nope! It can easily be used for on-demand content. Instead of a constantly updating sliding window playlist, the manifest will be a static list of all of the segments that make up the entire program. Additionally, it will have the following metadata tag `#EXT-X-PLAYLIST-TYPE` set to `VOD`.

### If a live or on-demand stream tells you where all the segments are, what prevents people from grabbing the videos directly and potentially redistributing them?

> Oh you are a mischievous one aren't you? I won't go too deep into it as there is an entire world of content protection and Digital Rights Management (aka DRM). When it comes down to it, you either restrict access to the files (somewhat effective but relatively straightforward) or encrypt the videos to control the ability to play them with DRM (most effective but difficult due to dependency requirements across many players and platforms).
> 
> This was something I did a bit of exploration on while building a toy project called [Deja](/projects#deja) which is a chrome extension that lets the user generate a replay from a live stream (assuming its using HLS) from the chrome extension or the Deja web app. There are several ways you could approach this, but Deja essentially sent the manifests it saw in network traffic back to a server that, when a replay was requested, would attempt to fetch the relevant segments itself and stitch them together with [ffmpeg](https://ffmpeg.org/). 
> 
> Much like a lock pick set, it is not inherently illegal, but it can pretty easily be used by users to do some naughty things that violate the [DMCA](https://en.wikipedia.org/wiki/Digital_Millennium_Copyright_Act). If you recall from the beginning, I don't feel like dealing with all that hoopla. That is largely why I did it for fun, don't actively host it, and open source it in the hopes of being useful to someone else. 🤷‍♂️

### Why are the segments so short? How do you decide what length to use?

> Ah so you remembered! If we think about it, on the other side of a live video stream there is a constant feed of video that is being chopped up, encoded, and then uploaded to the origin server where our manifest can then include it for the client to fetch it. That means that if our segments are 30 seconds long, even if we ignore all of the intermediate steps, we will always be _at least_ 30 seconds behind the actual live event. So by reducing the size of those segments, we reduce the lowest possible delay between the initial recording and our player (commonly referred to as glass-to-glass in the industry). 
> 
> But why does Twitch stop at 2 seconds, why not go even lower? There are a lot of factors at play here, but we'll take a look at two main ones.
> 
> The first is fairly simple, each request from the client for a segment has some overhead time cost, so shorter segments means more overhead time cost, thus hurting throughput and adding latency. You can see this relationship graphed below for persistent and non-persistent connections ([source](https://streaminglearningcenter.com/blogs/choosing-the-optimal-segment-duration.html)):
>
> <img src='https://jdhayford.io/images/segment-graph.png' alt='graph of throughput vs segment length'>
> 
> The second relates to how the length of a segment affects its compression and memory size (which also determines how much total data has to be transferred through a system for a stream). Video encoding largely accomplishes compression by recording the changes/deltas in the frames over time rather than every single frame. 
> 
> Take a very short video, for example, 1 second long at 60 frames per second. It has to include the first frame as a full image (called the keyframe, which takes much more memory), and the rest of the 59 frames can be recreated from the compressed deltas. A 5-second video could be encoded using 1 keyframe, and then the rest of the 299 frames can be recreated using the deltas. This might not seem like a big difference, but these things can really add up when you are constantly doing multiple live events, each replicated into different quality encodings, and serving those to a massive audience. 
> 
> So why not just do very long segments to sacrifice latency for a cheaper AWS bill at the end of the month? This goes back into encoding, but there are diminishing returns on compression for the length of a segment as keyframes are usually included anyway every couple of seconds in the video for quality/consistency reasons. Just remember that the longer the segment, the longer it takes for a client to download the very first segment and actually start the stream.
> 
> To wrap up, it depends on your priorities but it is generally accepted that 2-6 seconds is a good length to use for live content, and something like 6-10 seconds for on-demand content.

And this brings our lovely [yak-shaving](https://dev.to/dance2die/shaving-yak-4g2m) session to a close. I truly hope this brief journey has left the reader with some understanding, appreciation, and curiosity the next time they watch a video stream. Thanks for tagging along!

> Note: It is also worth noting that we barely touched on the topic of video encoding/compression which is a fascinating and deep field of study in its own right (and a potential future blog topic). For anyone looking to dive a little deeper, I cannot think of a better place to start than with https://github.com/leandromoreira/digital_video_introduction for everything from basic video terminology to video codecs, compression techniques, etc.
> 
> Happy hunting :)