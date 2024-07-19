'reinit'
'clear'

**********prcp*****************
'set vpage 0 8.5 0 10.5'
*'set parea 0.4 3.6 3.3 5.5'
'set parea 1.5 7.0 8.0 10.0'
'open corr_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set grid off'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind blue->white->red -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
*'set clevs -0.515 -0.404 0.404 0.515'
'set clevs -0.50 -0.4 0.4 0.5'

'set xlab on'
'set ylab on'
'set frame on'
'd com.1*(-1)'
*'run /data2/jhson/gs/cbarn_jhson.gs 0.5 0 5.90 0.25'
*'run /data2/jhson/gs/cbarn_jhson.gs 0.7 90 6.80 9.00'
'run /Users/jun-hyeokson/research/gs/cbarn_jhson.gs 0.7 90 6.80 9.00'
'close 1'

*'set parea 0.4 3.6 3.3 5.5'
'set parea 1.5 7.0 8.0 10.0'
'open regr_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set gxout contour'
'set grads off'
*'set cint 0.1'
*'set clevs -0.7 -0.6 -0.5 -0.4 -0.3 0.3 0.4 0.5 0.6 0.7'
*'set clevs -0.9 -0.8 -0.7 -0.6 -0.5 0.5 0.6 0.7 0.8 0.9''
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 8 8 8 8 8 3 3 3 3 3'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'set xlab off'
'set ylab off'
'set frame off'
'set cthick 3'
'd com*(-1)'
'close 1'

**********SST*****************
'set vpage 0 8.5 0 10.5'
'set parea 1.5 7.0 5.5 7.5'
'open corr_sst.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'set clevs -0.50 -0.4 0.4 0.5'

'set xlab on'
'set ylab on'
'set frame on'
'd com.1*(-1)'
*'run /data2/jhson/gs/cbarn_jhson.gs 0.5 0 5.90 0.25'
*'run /data2/jhson/gs/cbarn_jhson.gs 0.7 90 6.80 6.50'
'run /Users/jun-hyeokson/research/gs/cbarn_jhson.gs 0.7 90 6.80 6.50'
'close 1'

'set parea 1.5 7.0 5.5 7.5'
'open regr_sst.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set gxout contour'
'set grads off'
'set clevs -0.9 -0.7 -0.5 -0.3 -0.1 0.1 0.3 0.5 0.7 0.9'
*'set clevs -0.9 -0.8 -0.7 -0.6 -0.5 0.5 0.6 0.7 0.8 0.9'
*'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 4 4 4 4 4 2 2 2 2 2'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'
'set cthick 3'

'set xlab off'
'set ylab off'
'set frame off'
'd com*(-1)'
'close 1'

**********Map for schematic*****************
'set vpage 0 8.5 0 10.5'
'set parea 1.5 7.0 0.5 2.5'
'open corr_sst.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

'set map 1 1 4'
'set clevs -999999 999999'

'set xlab on'
'set ylab on'
'set frame on'
'd com.1*(-1)'
'close 1'

**********wind*****************
'set vpage 0 8.5 0 10.5'
'set parea 1.5 7.0 3.0 5.0'
'set grads off'

'open corr_u.ctl'
'open corr_v.ctl'
'open regr_u.ctl'
'open regr_v.ctl'

'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

*'bu1 = abs(com.1) - 0.3'
*'bv1 = abs(com.2) - 0.3'
*'u1 = maskout (com.3,bu1)'
*'v1 = maskout (com.4,bv1)'
'buv1 = sqrt(com.1*com.1+com.2*com.2)-0.367'
'u1 = maskout (com.3,buv1)'
'v1 = maskout (com.4,buv1)'

*'bu2 = abs(com.1) - 0.5'
*'u2 = maskout (com.3,bu1)'
*'bv2 = abs(com.2) - 0.5'
*'v2 = maskout (com.4,bv1)'

'set arrscl 0.5 2'
rc = arrow(6.3,2.75,0.5,2)
'set arrlab off'

'set ccolor 15'
'set xlab off'
'set ylab off'
'set frame off'
'set cthick 3'
'd skip(com.3,2,2)*(-1);skip(com.4,2,2)*(-1)'
'set ccolor 9'
'set xlab on'
'set ylab on'
'set frame on'
'd skip(u1,2,2)*(-1);skip(v1,2,2)*(-1)'

*'set ccolor 14'
*'d skip(u2,2,2)*(-1);skip(v2,2,2)*(-1)'
****************************************

'set strsiz 0.09'
'set string 1 l 5 90'

'set strsiz 0.10'
'set string 1 l 5 0'
'draw string 2.05 10.12  (a) Regression of PRCP using negative NINO3.4'
'draw string 2.05 7.62  (b) Regression on SST'
'draw string 2.05 5.12  (c) Regression on wind at 925 hPa'
'draw string 2.05 2.62  (d) Schematic diagram'

'gxprint test.png white'


function arrow (x,y,len,scale)
'set line 9 1 4'
'draw line 'x-len/2.' 'y' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y+0.025' 'x+len/2.' 'y
'draw line 'x+len/2.-0.05' 'y-0.025' 'x+len/2.' 'y
'set string 1 c'
'set strsiz 0.09'
'draw string 'x' 'y-0.1' 'scale
return

