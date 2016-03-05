#Unity Terrain From TIFF

Get files from opentopography.org or elsewhere and convert them to RAW files for Unity to use for terrain heightmaps

usage:

You'll need node and npm and git
```
>git clone github.com/fenwick67/unityterrainfromtiff.git
>cd unityterrainfromtiff
>npm install
>node convert.js inputfile.tiff outputfile.raw
```

Might register in NPM if anybody wants it.

##Issues

It might not work if your image is over 4097 in one dimension, but less than 4097 in the other... haven't tested.
