'reinit'
'clear'

'enable print ./temp.gx'

**********com1**********
**********prcp*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 7.0 10.0'
'open com1.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set grid off'
'set xlint 40'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -2.23 -1.81 1.81 2.23'
'set z 7'
'd com.1(t=2)'
'run /das_b/jhson/gs/cbarn_jhson2.gs 0.6 90 8.00 8.50'

'set parea 0.5 4.0 7.0 10.0'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 8 8 8 8 8 3 3 3 3 3'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'set z 7'
'd com(t=1)'
'close 1'

**********SST(stream, hgt)*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 4.5 7.5'
*'open /das_g/jhson/ncep_doe/program_ENSO_Indian/30_02_corr_sst/com1.ctl'
'open /das_g/jhson/ncep_doe/program_ENSO_Indian/30_03_corr_stream/com1.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'set clevs -2.23 -1.81 1.81 2.23'
'set z 7'
'd com(t=2)'
'run /das_b/jhson/gs/cbarn_jhson2.gs 0.6 90 8.00 6.00'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
'set ccols 4 4 4 4 4 2 2 2 2 2'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'set z 7'
'd com(t=1)'
'close 1'

**********com2**********
**********prcp*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 7.0 10.0'
'open com2.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set grid off'
'set xlint 40'
'set ylab off'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -2.23 -1.81 1.81 2.23'
'set z 7'
'd com.1(t=2)'

'set parea 4.3 7.8 7.0 10.0'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 8 8 8 8 8 3 3 3 3 3'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'set z 7'
'd com(t=1)'
'close 1'

**********SST(stream, hgt)*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 4.5 7.5'
*'open /das_g/jhson/ncep_doe/program_ENSO_Indian/30_02_corr_sst/com2.ctl'
'open /das_g/jhson/ncep_doe/program_ENSO_Indian/30_03_corr_stream/com2.ctl'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'set clevs -2.23 -1.81 1.81 2.23'
'set z 7'
'd com(t=2)'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
'set ccols 4 4 4 4 4 2 2 2 2 2'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'set z 7'
'd com(t=1)'
'close 1'


**********Map for schematic*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 2.0 5.0'
'open /das_g/jhson/ncep_doe/program_ENSO_Indian/30_02_corr_sst/com2.ctl'
'set grads off'
'set ylab on'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'

'set map 1 1 4'
'set clevs -999999 999999'

'd com.1'

'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 2.0 5.0'
'set grads off'
'set lon 40 280'
'set lat -45 45'
'set xlint 40'
'set ylpos 0 r'

'set map 1 1 4'
'set clevs -999999 999999'

'd com.1'
'close 1'

****************************************
'set strsiz 0.09'
'set string 1 l 5 90'

'set strsiz 0.12'
'set string 1 l 5 0'
'draw string 2.15 9.95   Composite maps of group-1 and group-2'
'draw string 0.55 9.40  (a) Group-1 precipitation'
'draw string 0.55 6.90  (c) Group-1 HGT850'
'draw string 0.55 4.40  (e) Group-1 schematic diagram'

'draw string 4.35 9.40  (b) Group-2 precipitation'
'draw string 4.35 6.90  (d) Group-2 HGT850'
'draw string 4.35 4.40  (f) Group-2 schematic diagram'

'print'
'clear'
'disable print'

'!gxeps -c -i ./temp.gx -o ./fig4.eps'
