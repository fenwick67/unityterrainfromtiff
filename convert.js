var fs = require('fs')
var tiff = require('tiff');
var path = require('path');
const maxSize = 4097;
var outputWidth;
var outputHeight;
var outputFile = process.argv[3];

var filename = process.argv[2];
if (!filename){
  console.error('need to provide input file');
  process.exit(1);
}

var decoder = new tiff.TIFFDecoder( fs.readFileSync( path.join(process.cwd(),filename) ) );

var tiffObject = decoder.decode();

console.log('read '+ tiffObject.ifd[0].bitsPerSample + ' bit input image. Normalizing...' );

var width =  ((tiffObject.ifd[0].width ));
var height = ((tiffObject.ifd[0].height));

var data = tiffObject.ifd[0].data;

var cropped;
//crop it if it's larger than 4097x4097
if(width <= maxSize && height <= maxSize){
  outputWidth = width;
  outputHeight = height;
  cropped = data;
}else{
  
  outputWidth = Math.min(maxSize,width);
  outputHeight = Math.min(maxSize,height);
  cropped = new Array(outputHeight*outputWidth);
  
  var outputIndex = 0;
  
  data.forEach(function(value,index){
    if (index % width >= outputWidth || outputIndex >= outputWidth*outputHeight ){
      //noop
    }else{
      cropped[outputIndex] = value;
      ++outputIndex;
    }
  });
}

var normalized = normalizeToUint16(cropped);

var buf = new Buffer(normalized.buffer);
console.log('writing file '+outputFile);
fs.writeFile(outputFile,buf,function(er,data){
  if(er){
    console.error(er);
    process.exit(1);
  }
  console.log('done.  File is ',outputWidth,'x',outputHeight);
  process.exit(0);
});



function normalizeToUint16(data){
  var min = Infinity;
  var max = -Infinity;
  data.forEach(function(val){
    if (val < min && val > 0) min = val;
    if (val > max) max = val;
  });
  console.log('converting from values ',min,'through',max);

  //got min and max, normalize into 0->65535 range
  var results = new Uint16Array(data.length);
  
  var newMin = Infinity;
  var newMax = 0;
  data.forEach(function(val,idx){
    results[idx] =  ((val - min)/(max-min)) * 65535;    
    newMin = Math.min(newMin,results[idx]);
    newMax = Math.max(newMax,results[idx]);
  });
  
  console.log('converted to values ',newMin,'through',newMax);
  
  return results;
}
