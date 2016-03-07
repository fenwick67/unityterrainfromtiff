#Unity Terrain From TIFF

Get files from opentopography.org or elsewhere and convert them to RAW files for Unity to use for terrain heightmaps

Crops the image to 4097x4097 if it's bigger than that.

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

If your file is under 4097x4097 and isn't exactly (2^n)+1 px wide and high, unity will produce artifacts at the edges of your terrain.  This is because Unity internally uses heightmaps that are (2^n)+1 square.
