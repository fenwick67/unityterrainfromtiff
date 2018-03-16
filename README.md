# Unity Terrain From TIFF

Get files from opentopography.org or elsewhere and convert them to RAW files for Unity to use for terrain heightmaps

![image of terrain](https://i.imgur.com/mr1fvKk.png)

## Usage:

You'll need node and npm and git
```
>git clone github.com/fenwick67/unityterrainfromtiff.git
>cd unityterrainfromtiff
>npm install
>node convert.js inputfile.tiff outputfile.raw
```

Might register in NPM if anybody wants it.

## Limitations

If your file is under 4097x4097 and isn't exactly (2^n)+1 px wide and high, Unity will produce artifacts at the edges of your terrain.  This is because Unity internally uses heightmaps that are (2^n)+1 square.

The image will get cropped to 4097x4097 (from the top left) if it's bigger than that.  This is the biggest that Unity supports.
