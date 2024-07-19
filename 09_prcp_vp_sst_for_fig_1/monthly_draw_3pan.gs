'reinit'
'clear'

'enable print ./temp.gx'

'set vpage 0 8.5 0 10.5'
*'set vpage 0 8.5 0 4.5'
'set parea 0.4 3.6 3.3 5.5'
'set grads off'
'open prcp_monthly_ave.ctl'

'set gxout bar'
'set lon 0.5 12.5'
*'set barbase 0'
'set bargap 50'
'set vrange 0 12'
*'set xlab off'
'set xlabs |1||2||3||4||5||6||7||8||9||10||11||12|'
*'set ylpos 0 r'

'set grid off'
'set ccolor 1  '
'd com'
'ave1 = com'
'close 1'

'open prcp_monthly_std.ctl'
**********errbar
'set vpage 0 8.5 0 10.5'
*'set vpage 0 8.5 0 4.5'
'set parea 0.4 3.6 3.3 5.5'
'set grads off'

'a1 = ave1+com'
'a2 = ave1-com'

'set gxout errbar'
'set xlab off'
'set grid off'
'set lon 0.5 12.5'
'set bargap 70'
'set cthick 7'
'set vrange 0 12'
'set ccolor 2'
'd a2;a1'
'close 1'

********for july
'open prcp_monthly_ave_july.ctl'

'set gxout bar'
'set lon 0.5 12.5'
*'set barbase 0'
'set bargap 50'
'set vrange 0 12'
*'set xlab off'
'set xlabs |1||2||3||4||5||6||7||8||9||10||11||12|'
*'set ylpos 0 r'

'set grid off'
'set ccolor 3  '
'd com'
'ave1 = com'
'close 1'

'set vpage 0 8.5 0 10.5'
'set parea 0.4 3.6 3.3 5.5'
'set grads off'
'open prcp_monthly_std.ctl'

'a1 = ave1+com'
'a2 = ave1-com'

'set gxout errbar'
'set xlab off'
'set grid off'
'set lon 0.5 12.5'
'set bargap 70'
'set cthick 7'
'set vrange 0 12'
'set ccolor 2'
'd a2;a1'
'close 1'
****************

'open prcp_clim.ctl'
'set vpage 0 8.5 0 10.5'
*'set vpage 0 8.5 5.0 9.0'
'set parea 0.4 8.1 5.8 10.1'
'set lat -45 45'
'set grads off'
'set xlab on'

'set t 7'
'set gxout shaded'
'run /das_b/jhson/gs/color -kind white->green 2 12 2'
'd com'
'set gxout contour'
'set ccolor 16'
'set clab off'
*'set clevs 2 6 10 '
'd com'

'run drawbox domain_box.txt 0.11'

*'run /das_b/jhson/gs/cbarn.gs 0.7 0 4.2 0.25'
'run /das_b/jhson/gs/cbarn_jhson2.gs 0.7 0 4.2 6.25'
'close 1'

'open corr.ctl'
'set vpage 0 8.5 0 10.5'
*'set vpage 0 8.5 5.0 9.0'
'set parea 3.8 8.1 3.75 5.5'
'set lon 40 290'
'set lat -45 45'
'set ylpos 0 r'
'set xlint 40'
'set grads off'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind blue->white->red -0.5 0.5 0.2'
'd com'

'set gxout contour'
'set ccolor 0'
'set clab off'
'd com'

'run /das_b/jhson/gs/cbarn_jhson2.gs 0.5 0 5.90 3.25'

*'set string 1 l 5 -45'
*'set string 1 l 5 0'

'set strsiz 0.09'
'set string 1 l 5 90'
'draw string 0.07 4.10   (mm/day)'

'set strsiz 0.12'
'set string 1 l 5 0'
'draw string 0.45 9.25  (a) Climatological precipitaion on July'
'draw string 0.45 5.65  (b) Indian Monsoon Precipitation'
'draw string 4.00 5.65  (c) Correlation with SST'

'print'
*'clear'
'disable print'

'!gxeps -c -i ./temp.gx -o ./clim.eps'
