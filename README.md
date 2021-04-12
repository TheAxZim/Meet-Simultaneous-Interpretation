<p align="center">
  <img src="images/logo_128x128.png" width=128 height=128 />
</p>

# Simultaneous Interpretation for Google Meet
A Chrome Extension for making simultaneous interpretation easier for Google Meet.

Link to Chrome Store:
https://chrome.google.com/webstore/detail/simultaneous-interpretati/ofcbaogakobldnkeaabmfndopboipmih


## How it works

Simple: iFrame's the second meeting and adds in controls to the audio DOM elements and augments existing controls.
DOM content is generated in javacript and styled with CSS: both injected using chrome.scripting API.

Google Meet doesn't normally allow iFrames `X-Frame-Options: Deny` but Chrome Extensions have access to the DeclarativeNetRequest API.
This API let's us modify the header to 'SameOrigin', meaning that we can load `meet.google.com` within an iFrame as long as we're on `meet.google.com`. 
