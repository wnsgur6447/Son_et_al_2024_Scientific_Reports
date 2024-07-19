#!/bin/csh -f

foreach level ( 1000 925 850 700 600 500 400 300 250 200 150 100 70 50 )

sed s/1000/$level/g 00_cal_vel_pot_and_stream.ncl > temp.ncl

ncl temp.ncl
end

rm -f temp.ncl
