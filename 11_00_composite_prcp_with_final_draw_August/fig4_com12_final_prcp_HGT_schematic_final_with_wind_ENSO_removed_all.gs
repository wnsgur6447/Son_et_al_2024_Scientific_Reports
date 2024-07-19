'reinit'
'clear'

'enable print ./temp.gx'

**********com1**********
**********prcp*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 8.0 10.0'
*'open com_diff_prcp.ctl'
'open com_p_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_0.5/com_p_prcp.ctl'
*'open ../11_00_composite_prcp_with_final_draw_std_1.0/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set grid off'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
*'run /data2/jhson/gs/cbarn.gs 0.6 90 8.00 8.50'
*'run /Users/jun-hyeokson/research/gs/cbarn.gs 0.6 90 8.00 8.50'

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

**********PRCP-ENSO removed (OLR/SST)*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 6.0 8.0'
*'open ../11_05_composite_olr/com_diff_prcp.ctl'
*'open ../11_05_composite_olr/com_p_prcp.ctl'
'open ../11_10_composite_prcp_ENSO_removed/com_p_prcp.ctl'
*'open ../11_02_composite_sst/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind darkgreen->white->saddlebrown -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
*'run /data2/jhson/gs/cbarn.gs 0.6 90 8.00 6.00'
*'run /Users/jun-hyeokson/research/gs/cbarn.gs 0.6 90 8.00 6.00'

'set gxout contour'
'set grads off'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
*'set clevs -10.0 -8.0 -6.0 -4.0 -2.0 2.0 4.0 6.0 8.0 10.0'
*'set clevs -15.0 -12.0 -9.0 -6.0 -3.0 3.0 6.0 9.0 12.0 15.0'
'set ccols 8 8 8 8 8 3 3 3 3 3'
*'set ccols  3 3 3 3 3 8 8 8 8 8'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'

**********HGT*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 4.0 6.0'
*'open ../11_01_composite_HGT/com_p_prcp.ctl'
'open ../11_01_composite_HGT_ENSO_removed/com_p_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind darkred->white->slateblue -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind darkred->white->slateblue -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'
*'run /data2/jhson/gs/cbarn.gs 0.6 90 8.00 6.00'
*'run /Users/jun-hyeokson/research/gs/cbarn.gs 0.6 90 8.00 6.00'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
*'set ccols 4 4 4 4 4 2 2 2 2 2'
'set ccols 2 2 2 2 2 4 4 4 4 4'
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
*'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
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

**********PRCP-ENSO removed (OLR/SST)*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 6.0 8.0'
*'open ../11_02_composite_sst/com_n_prcp.ctl'
*'open ../11_05_composite_olr/com_n_prcp.ctl'
'open ../11_10_composite_prcp_ENSO_removed/com_n_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind darkgreen->white->saddlebrown -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind saddlebrown->white->darkgreen -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'

'set gxout contour'
'set grads off'
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'
*'set clevs -5.0 -4.0 -3.0 -2.0 -1.0 1.0 2.0 3.0 4.0 5.0'
*'set clevs -10.0 -8.0 -6.0 -4.0 -2.0 2.0 4.0 6.0 8.0 10.0'
*'set clevs -15.0 -12.0 -9.0 -6.0 -3.0 3.0 6.0 9.0 12.0 15.0'
'set ccols 8 8 8 8 8 3 3 3 3 3'
*'set ccols  3 3 3 3 3 8 8 8 8 8'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)'
'close 1'


**********HGT*****************
'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 4.0 6.0'
*'open ../11_01_composite_HGT/com_n_prcp.ctl'
'open ../11_01_composite_HGT_ENSO_removed/com_n_prcp.ctl'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'

'set gxout shaded'
*'run /data2/jhson/gs/color -kind slateblue->white->darkred -1.5 1.5 1'
*'run /data2/jhson/gs/color -kind darkred->white->slateblue -1.5 1.5 1'
'run /Users/jun-hyeokson/research/gs/color -kind darkred->white->slateblue -1.5 1.5 1'
'set clevs -1.81 -1.37 1.37 1.81'
'd com(z=2)'

'set gxout contour'
'set grads off'
*'set clevs -1.8 -1.4 -1.0 -0.6 -0.2 0.2 0.6 1.0 1.4 1.8'
'set clevs -18 -14 -10 -6 -2 2 6 10 14 18'
*'set ccols 4 4 4 4 4 2 2 2 2 2'
'set ccols 2 2 2 2 2 4 4 4 4 4'
'set cstyle 1 1 1 1 1 1 1 1'
'set clab masked'

'd com(z=1)/9.8'
'close 1'


**********Map for schematic*****************
'set vpage 0 8.5 0 10.5'
'set parea 0.5 4.0 2.0 4.0'
*'open ../11_03_composite_uwnd/com_p_prcp.ctl'
*'open ../11_04_composite_vwnd/com_p_prcp.ctl'
*'open ../11_03_composite_uwnd/com_n_prcp.ctl'
*'open ../11_04_composite_vwnd/com_n_prcp.ctl'

'open ../11_03_composite_uwnd_ENSO_removed/com_p_prcp.ctl'
'open ../11_04_composite_vwnd_ENSO_removed/com_p_prcp.ctl'
'open ../11_03_composite_uwnd_ENSO_removed/com_n_prcp.ctl'
'open ../11_04_composite_vwnd_ENSO_removed/com_n_prcp.ctl'

'set grads off'
'set ylab on'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'
'set map 1 1 4'

'set arrscl 0.5 4'
rc = arrow(3.75,2.00,0.5,4)
rc = arrow(7.5,2.00,0.5,4)
'set arrlab off'

'b = abs(com.1(z=2))+abs(com.2(z=2)) - 3.0'
'u1 = maskout (com.1(z=1),b)'
'v1 = maskout (com.2(z=1),b)'
'set ccolor 9'
'd skip(u1,2,2);skip(v1,2,2)'


'set vpage 0 8.5 0 10.5'
'set parea 4.3 7.8 2.0 4.0'
'set grads off'
'set lon 40 280'
'set lat -30 50'
'set xlint 40'
'set ylpos 0 r'

'set map 1 1 4'
'set clevs -999999 999999'

'b = abs(com.1(z=2))+abs(com.2(z=2)) - 3.0'
'u1 = maskout (com.3(z=1),b)'
'v1 = maskout (com.4(z=1),b)'
'set ccolor 9'
'd skip(u1,2,2);skip(v1,2,2)'

'close 1'

****************************************
'set strsiz 0.09'
'set string 1 l 5 90'

'set strsiz 0.12'
'set string 1 l 5 0'
*'draw string 0.45 9.80  (a) Precipitation-Group Red'
'draw string 0.45 9.80  (a) Precipitation-'
'draw string 0.45 7.80  (c) PRCP (ENSO signal removed)'
'draw string 0.45 5.80  (e) HGT850'
'draw string 0.45 3.80  (g) Wind925 with schematic diagram'

*'draw string 4.25 9.80  (e) Precipitation-Group Blue'
'draw string 4.25 9.80  (b) Precipitation-'
'draw string 4.25 7.80  (d) PRCP (ENSO signal removed)'
'draw string 4.25 5.80  (f) HGT850'
'draw string 4.25 3.80  (h) Wind925 with schematic diagram'

'set string 2 l 5 0'
'draw string 2.15 9.80  Group Red'
'set string 4 l 5 0'
'draw string 5.95 9.80  Group Blue'

*'gxprint test.eps white'
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


