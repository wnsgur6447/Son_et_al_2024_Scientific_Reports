'reinit'
'clear'

'enable print ./temp.gx'

'open corr.ctl'
'open regr.ctl'
'set grads off'
'set lat -45 45'

'set gxout shaded'
'run /das_b/jhson/gs/color -kind blue->white->red -1.5 1.5 1'
*'set clevs -0.515 -0.404 0.404 0.515'
'set clevs -0.404 -0.344 0.344 0.404'
'd com.1'

'set gxout contour'
'set grads off'
*'set cint 0.1'
*'set clevs -0.7 -0.6 -0.5 -0.4 -0.3 0.3 0.4 0.5 0.6 0.7'
*'set clevs -0.9 -0.8 -0.7 -0.6 -0.5 0.5 0.6 0.7 0.8 0.9''
'set clevs -2.5 -2.0 -1.5 -1.0 -0.5 0.5 1.0 1.5 2.0 2.5'

'd com.2'

'run /das_b/jhson/gs/cbarn.gs 0.7 0 4.25 3.75'

'print'
'clear'
'disable print'

'!gxeps -c -i ./temp.gx -o ./corr.eps'
