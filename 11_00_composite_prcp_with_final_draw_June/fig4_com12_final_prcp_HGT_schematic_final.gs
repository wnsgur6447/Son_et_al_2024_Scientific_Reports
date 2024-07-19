'reinit'
'clear'

'enable print ./temp.gx'

**********com1**********
**********prcp*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 8.0 10.0'
'open com_p_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_0.5/com_p_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_1.0/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set grid off'
'set xlint 40'

'set gxout shaded'
'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
'run /data2/jhson/gs/cbarn_jhson2.gs 0.6 90 8.00 8.50'

'set parea 0.5 4.0 8.0 10.0'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 8 8 8 8 8 3 3 3 3 3'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'

**********OLR(SST)*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 6.0 8.0'
*'open ../11_02_composite_sst/com_p_prcp.ctl'
'open ../11_05_composite_olr/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'run /data2/jhson/gs/color -kind darkgreen->white->saddlebrown -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
'run /data2/jhson/gs/cbarn_jhson2.gs 0.6 90 8.00 6.00'

'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -10.0 -8.0 -6.0 -4.0 -2.0 2.0 4.0 6.0 8.0 10.0'
*'set ccols 8 8 8 8 8 3 3 3 3 3'
'set ccols  3 3 3 3 3 8 8 8 8 8'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'

**********HGT*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 4.0 6.0'
'open ../11_01_composite_HGT/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
'run /data2/jhson/gs/cbarn_jhson2.gs 0.6 90 8.00 6.00'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
'set ccols 4 4 4 4 4 2 2 2 2 2'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)/9.8'
'close 1'


**********com2**********
**********prcp*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 8.0 10.0'
'open com_n_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_0.5/com_n_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_1.0/com_n_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set grid off'
'set xlint 40'
'set ylab off'

'set gxout shaded'
'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com.1(z=2)'

'set parea 4.3 7.8 8.0 10.0'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
'set ccols 8 8 8 8 8 3 3 3 3 3'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'

**********OLR(SST)*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 6.0 8.0'
*'open ../11_02_composite_sst/com_n_prcp.ctl'
'open ../11_05_composite_olr/com_n_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'run /data2/jhson/gs/color -kind darkgreen->white->saddlebrown -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'

'set gxout contour'
'set grads off'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
'set clevs -10.0 -8.0 -6.0 -4.0 -2.0 2.0 4.0 6.0 8.0 10.0'
*'set ccols 8 8 8 8 8 3 3 3 3 3'
'set ccols  3 3 3 3 3 8 8 8 8 8'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'


**********HGT*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 4.0 6.0'
'open ../11_01_composite_HGT/com_n_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
'set ccols 4 4 4 4 4 2 2 2 2 2'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)/9.8'
'close 1'


**********Map for schematic*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 2.0 4.0'
'open com_p_prcp.ctl'
'set grads off'
'set ylab on'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set map 1 1 4'
'set clevs -999999 999999'

'd com.1'

'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 2.0 4.0'
'set grads off'
'set lon 40 280'
'set lat -30 50'
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
*'draw string 2.15 9.95   Composite maps of group-1 and group-2'
'draw string 0.55 9.80  (a) Precipitation (group red)'
'draw string 0.55 7.80  (c) OLR'
'draw string 0.55 5.80  (b) HGT850'
'draw string 0.55 3.80  (d) Schematic diagram'

'draw string 4.35 9.80  (e) Precipitation(group blue)'
'draw string 4.35 7.80  (g) OLR'
'draw string 4.35 5.80  (f) HGT850'
'draw string 4.35 3.80  (h) Schematic diagram'

'gxprint test.eps white'

