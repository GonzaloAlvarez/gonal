#!/usr/bin/env bash

function printHelpAndExit {
cat <<EOF
Usage:
  gifv [options] filename
Version:   1.0.0

Convert GIFs and videos into GIF-like videos

Options: (all optional)
  -c CROP:     The x and y crops, from the top left of the image (e.g. 640:480)
  -o OUTPUT:   The basename of the file to be output. The default is the basename
              of the input file.
  -r FPS:      Output at this (frame)rate.
  -s SPEED:    Output using this speed modifier. The default is 1 (equal speed).
  -O OPTIMIZE: Change the compression level used (1-9), with 1 being the fastest,
              with less compression, and 9 being the slowest, with optimal com-
              pression.  The default compression level is 6.
  -p SCALE:    Rescale the output (e.g. 320:240)
  -a START:    Time for the video to start
  -z END:      Number of seconds running
  -x:          Remove the original file

Example:
  gifv -c 240:80 -o my-gifv.mp4 -x my-movie.mov

EOF
exit $1
}

function join { local IFS="$1"; shift; echo "$*"; }

# Initialize variables
levels=(ultrafast superfast veryfast faster fast medium slow slower veryslow)
level=8

OPTERR=0

while getopts "c:o:p:r:s:O:xa:z:h" opt; do
  case $opt in
    c) crop=$OPTARG;;
    h) printHelpAndExit 0;;
    o) output=$OPTARG;;
    p) scale=$OPTARG;;
    r) fps=$OPTARG;;
    s) speed=$OPTARG;;
    O) level=$OPTARG;;
    x) cleanup=1;;
    a) ini=$OPTARG;;
    z) end=$OPTARG;;
    *) printHelpAndExit 1;;
  esac
done

shift $(( OPTIND - 1 ))

filename="$1"

if [ -z "$output" ]; then
  # Strip off extension and add new extension
  ext="${filename##*.}"
  output="$(basename "$filename" ".$ext")"
fi

if [ -z "$filename" ]; then printHelpAndExit 1; fi

if [ $ini ]; then
    ini="-ss ${ini}"
else
    ini=
fi

if [ $end ]; then
    end="-t ${end}"
else
    end=
fi

# Video filters (scale, crop, speed)
if [ $crop ]; then
  crop="crop=${crop}"
else
  crop=
fi

if [ $scale ]; then
  scale="scale=${scale}"
else
  scale=
fi

if [ $speed ]; then
  speed="setpts=$(bc -l <<< "scale=4;1/${speed}")*PTS"
else
  speed=
fi

# Convert GIFs
if [ $(file -b --mime-type "$filename") == image/gif ]; then
  giffix="scale='if(eq(mod(iw,2),0),iw,iw-1)':'if(eq(mod(ih,2),0),ih,ih-1)'"
else
  giffix=
fi

# Concatenate options into a video filter string
# giffix must be applied after any scaling/cropping
if [ $scale ] || [ $crop ] || [ $speed ] || [ $giffix ]; then
  filter="-vf $(join , $scale $crop $speed $giffix)"
else
  filter=
fi

# FPS
if [ $fps ]; then
  fps="-r $fps"
else
  fps=
fi

# Optimization level
#   1: (fastest, worst compression)
#   9: (slowest, best compression)

(( $level > 9 )) && level=9 # OR err
(( $level < 1 )) && level=1 # OR err
optimize="${levels[$level]}"

# Codecs:
#   webm:  libvpx
#   h.264: libx264

# libvpx .webm -cpu-used 0 -b:v 600k -maxrate 600k -bufsize 1200k -qmin 10 -qmax 42 -vf scale=-1:360 -vf crop=620:340:10:10 -threads 4 -an
# libx264 .mp4 -preset slow -b:v 500k -maxrate 500k -bufsize 1000k -vf scale=-1:480 -threads 0 -an
codec="-c:v libx264"
ffmpeg -i "$filename" $ini $end $codec $filter $fps -an -pix_fmt yuv420p -threads 4 -qmin 10 -qmax 42 -bufsize 1200k -b:v 600k -maxrate 600k  -preset "$optimize" -movflags faststart "/tmp/$output.mp4"
codec="-c:v libvpx"
ffmpeg -i "$filename" $ini $end $codec $filter $fps -an -pix_fmt yuv420p -threads 0 -b:v 500k -maxrate 500k -bufsize 1000k  -preset "$optimize" -movflags faststart "/tmp/$output.webm"

s3cmd put -f --acl-public /tmp/$output.mp4 s3://v.gon.al/
s3cmd put -f --acl-public /tmp/$output.webm s3://v.gon.al/

rm -f /tmp/$output.mp4
rm -f /tmp/$output.webm

if [ $cleanup ]; then
  rm "$filename"
fi
